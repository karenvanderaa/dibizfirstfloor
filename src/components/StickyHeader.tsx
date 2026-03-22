import { useState, useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-border"
      }`}
    >
      <div className="container flex items-center justify-between h-14">
        <a href="/" className="font-heading font-bold text-foreground text-sm tracking-tight hover:text-ff-blue transition-colors duration-150">
          First Floor × Dibiz
        </a>
        <div className="flex items-center gap-3">
          <a
            href="/dri"
            className="hidden sm:inline-flex items-center bg-ff-mint/10 text-ff-mint font-heading font-semibold text-sm px-4 py-2 rounded-md hover:bg-ff-mint/20 active:scale-[0.97] transition-all duration-150"
          >
            Gratis DRI scan
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ff-blue text-white font-heading font-semibold text-sm px-5 py-2 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150"
          >
            Plan een gesprek
          </a>
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
