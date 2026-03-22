import { useState, useEffect, useCallback } from "react";

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    sessionStorage.setItem("exit-popup-shown", "1");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("exit-popup-shown")) return;

    let timer: ReturnType<typeof setTimeout>;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !sessionStorage.getItem("exit-popup-shown")) {
        setShow(true);
        sessionStorage.setItem("exit-popup-shown", "1");
      }
    };

    // Also show after 60s inactivity
    timer = setTimeout(() => {
      if (!sessionStorage.getItem("exit-popup-shown")) {
        setShow(true);
        sessionStorage.setItem("exit-popup-shown", "1");
      }
    }, 60000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-ff-dark rounded-lg p-8 max-w-md mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors text-xl leading-none"
        >
          ×
        </button>
        <h3 className="font-heading font-bold text-white text-xl mb-3">Nog niet zeker?</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Doe de Delivery Readiness Index — 10 vragen, geen registratie, direct resultaat + downloadbaar rapport.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/dri"
            onClick={handleClose}
            className="bg-ff-blue text-white font-heading font-semibold px-5 py-2.5 rounded-md hover:brightness-110 active:scale-[0.97] transition-all duration-150 text-sm"
          >
            Start de DRI
          </a>
          <button onClick={handleClose} className="text-gray-500 hover:text-white text-sm transition-colors">
            Nee bedankt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
