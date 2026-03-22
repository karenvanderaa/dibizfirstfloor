import { useState, useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/ff-dibiz";

const navLinks = [
  { label: "Probleem", href: "#probleem" },
  { label: "Aanpak", href: "#diensten" },
  { label: "Hoe het werkt", href: "#approach" },
  { label: "Transformatie Scan", href: "#scan" },
  { label: "Contact", href: "#contact" },
];

const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground font-heading text-sm transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-foreground hover:text-ff-blue font-heading text-sm transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default StickyHeader;