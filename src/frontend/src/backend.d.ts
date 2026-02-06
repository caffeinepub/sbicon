import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SellerProfile {
    principal: Principal;
    displayName: string;
    listings: Array<Listing>;
}
export interface ListingInput {
    title: string;
    description: string;
    quantity: bigint;
    price: bigint;
    images: Array<string>;
}
export type ProductID = string;
export interface Listing {
    id: ProductID;
    title: string;
    description: string;
    seller: Principal;
    quantity: bigint;
    price: bigint;
    images: Array<string>;
}
export interface UserProfile {
    displayName: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createListing(input: ListingInput): Promise<ProductID>;
    createSellerProfile(displayName: string): Promise<void>;
    deactivateListing(id: ProductID): Promise<void>;
    getAllSellers(): Promise<Array<SellerProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getListing(id: ProductID): Promise<Listing | null>;
    getListingsBySeller(seller: Principal): Promise<Array<Listing>>;
    getMarketplaceWebpage(): Promise<string>;
    getSellerProfile(seller: Principal): Promise<SellerProfile>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isSeller(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateListing(id: ProductID, input: ListingInput): Promise<void>;
}
