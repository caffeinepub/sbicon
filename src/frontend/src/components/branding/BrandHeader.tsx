export default function BrandHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <img
        src="/assets/generated/fidget-market-logo.dim_512x512.png"
        alt="Fidget Market Logo"
        className="h-32 w-32 object-contain drop-shadow-lg"
      />
      <img
        src="/assets/generated/fidget-mascot.dim_768x768.png"
        alt="Fidget Market Mascot"
        className="h-40 w-40 object-contain drop-shadow-lg animate-bounce"
        style={{ animationDuration: '3s' }}
      />
    </div>
  );
}
