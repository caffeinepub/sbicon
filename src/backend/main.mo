import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";



actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Core Types
  public type ProductID = Text;

  public type Listing = {
    id : ProductID;
    title : Text;
    description : Text;
    price : Nat;
    quantity : Nat;
    images : [Text];
    seller : Principal;
  };

  public type ListingInput = {
    title : Text;
    description : Text;
    price : Nat;
    quantity : Nat;
    images : [Text];
  };

  public type UserProfile = {
    displayName : Text;
  };

  public type SellerProfile = {
    principal : Principal;
    displayName : Text;
    listings : [Listing];
  };

  public type ListingStatus = {
    #active;
    #inactive;
    #reserved;
  };

  // Type-specific comparison function for Sorting by Principal
  module SellerProfile {
    public func compareByPrincipal(profile1 : SellerProfile, profile2 : SellerProfile) : Order.Order {
      Principal.compare(profile1.principal, profile2.principal);
    };
  };

  // State
  let listings = Map.empty<ProductID, Listing>();
  let sellerProfiles = Map.empty<Principal, SellerProfile>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var lastListingId = 0;

  // Marketplace Platform Functions
  public query ({ caller }) func getMarketplaceWebpage() : async Text {
    "E-Commerce Marketplace Platform Powered By The Internet Computer";
  };

  // User Profile Functions (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Seller Profile Functions
  public query ({ caller }) func isSeller() : async Bool {
    // Authentication check: only authenticated users can check seller status
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can check seller status");
    };
    sellerProfiles.containsKey(caller);
  };

  public shared ({ caller }) func createSellerProfile(displayName : Text) : async () {
    // Authentication check: only authenticated users can create seller profiles
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create seller profiles");
    };

    if (sellerProfiles.containsKey(caller)) {
      Runtime.trap("Seller profile already exists");
    };

    let seller : SellerProfile = {
      principal = caller;
      displayName;
      listings = [];
    };

    sellerProfiles.add(caller, seller);
  };

  public query func getAllSellers() : async [SellerProfile] {
    // Public access - anyone can browse sellers
    sellerProfiles.values().toArray().sort(SellerProfile.compareByPrincipal);
  };

  public query ({ caller }) func getSellerProfile(seller : Principal) : async SellerProfile {
    // Public access - anyone can view seller profiles
    switch (sellerProfiles.get(seller)) {
      case (null) { Runtime.trap("Seller profile does not exist") };
      case (?sellerProfile) { sellerProfile };
    };
  };

  // Listing management functions
  func formatListingID(title : Text) : Text {
    lastListingId += 1;
    title.concat(" #").concat(lastListingId.toText());
  };

  // Helper function to ensure seller profile exists
  func ensureSellerProfile(caller : Principal) : SellerProfile {
    switch (sellerProfiles.get(caller)) {
      case (?seller) { seller };
      case (null) {
        // Auto-create seller profile with default display name
        let defaultDisplayName = switch (userProfiles.get(caller)) {
          case (?userProfile) { userProfile.displayName };
          case (null) { "Seller " # caller.toText() };
        };

        let newSeller : SellerProfile = {
          principal = caller;
          displayName = defaultDisplayName;
          listings = [];
        };

        sellerProfiles.add(caller, newSeller);
        newSeller;
      };
    };
  };

  public shared ({ caller }) func createListing(input : ListingInput) : async () {
    // Authentication check: only authenticated users can create listings
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create listings");
    };

    // Ensure seller profile exists (auto-create if needed)
    let seller = ensureSellerProfile(caller);

    // Create new listing
    let newListing : Listing = {
      id = formatListingID(input.title);
      title = input.title;
      description = input.description;
      price = input.price;
      quantity = input.quantity;
      images = input.images;
      seller = caller;
    };

    // Add listing to global map
    listings.add(newListing.id, newListing);

    // Update seller profile with new listing
    let listingsList = List.fromArray<Listing>(seller.listings);
    listingsList.add(newListing);
    let updatedSeller : SellerProfile = {
      principal = seller.principal;
      displayName = seller.displayName;
      listings = listingsList.toArray();
    };

    // Store updated seller profile
    sellerProfiles.add(caller, updatedSeller);
  };

  public shared ({ caller }) func updateListing(id : ProductID, input : ListingInput) : async () {
    // Authentication check: only authenticated users can update listings
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update listings");
    };

    switch (listings.get(id)) {
      case (null) {
        Runtime.trap("Listing not found");
      };
      case (?listing) {
        // Ownership check: only the seller can update their own listing
        if (listing.seller != caller) {
          Runtime.trap("Unauthorized: Only the seller can update this listing");
        };

        let updatedListing : Listing = {
          id = listing.id;
          title = input.title;
          description = input.description;
          price = input.price;
          quantity = input.quantity;
          images = input.images;
          seller = listing.seller;
        };

        listings.add(id, updatedListing);

        // Update SellerProfile
        switch (sellerProfiles.get(caller)) {
          case (null) {
            Runtime.trap("Seller profile not found");
          };
          case (?seller) {
            let updatedListings = seller.listings.map(
              func(item) {
                if (item.id == id) { updatedListing } else { item };
              }
            );
            let updatedSeller : SellerProfile = {
              principal = seller.principal;
              displayName = seller.displayName;
              listings = updatedListings;
            };
            sellerProfiles.add(caller, updatedSeller);
          };
        };
      };
    };
  };

  public shared ({ caller }) func deactivateListing(id : ProductID) : async () {
    // Authentication check: only authenticated users can deactivate listings
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can deactivate listings");
    };

    switch (listings.get(id)) {
      case (null) {
        Runtime.trap("Listing not found");
      };
      case (?listing) {
        // Ownership check: only the seller can deactivate their own listing
        if (listing.seller != caller) {
          Runtime.trap("Unauthorized: Only the seller can deactivate this listing");
        };
        listings.remove(id);
        // Remove from seller listing as well
        switch (sellerProfiles.get(caller)) {
          case (null) {
            Runtime.trap("Seller profile not found");
          };
          case (?seller) {
            let filteredListings = seller.listings.filter(func(item) { item.id != id });
            let updatedSeller : SellerProfile = {
              principal = seller.principal;
              displayName = seller.displayName;
              listings = filteredListings;
            };
            sellerProfiles.add(caller, updatedSeller);
          };
        };
      };
    };
  };

  public query ({ caller }) func getListingsBySeller(seller : Principal) : async [Listing] {
    // Public access - anyone can browse listings by seller
    let filteredListings = listings.values().toArray().filter(
      func(listing) {
        listing.seller == seller;
      }
    );
    filteredListings;
  };

  public query ({ caller }) func getListing(id : ProductID) : async ?Listing {
    // Public access - anyone can view individual listings
    listings.get(id);
  };
};
