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
      className={`fixed top-0 left-0 right-0 z-50 bg-ff-dark transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-14">
        <span className="font-heading font-bold text-white text-sm tracking-tight">
          First Floor × Dibiz
        </span>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ff-blue text-white font-heading font-semibold text-sm px-5 py-2 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150"
        >
          Plan een gesprek
        </a>
      </div>
    </header>
  );
};

export default StickyHeader;
