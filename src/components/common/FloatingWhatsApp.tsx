import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const location = useLocation();

  const getDynamicMessage = () => {
    switch (location.pathname) {
      case '/tattoo':
        return 'Hi, I found your Gayatri Art Studio website and would like to discuss a custom tattoo design.';
      case '/blood-painting':
        return 'Hi, I found your Gayatri Art Studio website and would like to discuss a memorial Blood Painting keepsake.';
      case '/rangoli':
        return 'Hi, I found your Gayatri Art Studio website and would like to discuss a rangoli artwork for an upcoming event.';
      case '/sketches':
        return 'Hi, I found your Gayatri Art Studio website and would like to inquire about a custom pencil/charcoal sketch.';
      case '/portraits':
        return 'Hi, I found your Gayatri Art Studio website and would like to order a custom hand-drawn portrait.';
      case '/booking':
        return 'Hi, I would like to confirm my studio consultation booking with Gayatri Art Studio.';
      case '/custom-order':
        return 'Hi, I am ready to share my custom artwork idea with Gayatri Art Studio.';
      default:
        return 'Hi, I found your Gayatri Art Studio website and would like to discuss a custom artwork.';
    }
  };

  const encodedMsg = encodeURIComponent(getDynamicMessage());
  const whatsappUrl = `https://wa.me/918788225420?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 animate-pulse" />
      <span className="hidden sm:inline font-semibold text-sm tracking-wide">
        Chat on WhatsApp
      </span>
    </a>
  );
};
