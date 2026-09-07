import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Image, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
        <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-700 shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 bg-amber-100/60 px-3 py-1 rounded-full">
          Error 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-4 font-bold">
          Page Not Found
        </h1>

        <p className="text-stone-600 mt-3 text-sm leading-relaxed">
          The canvas you are looking for does not exist, may have moved, or is still being sketched in our studio.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-all text-sm shadow-md"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 text-stone-800 font-medium hover:bg-stone-200 transition-all text-sm"
          >
            <Image className="w-4 h-4" /> Explore Gallery
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-400 flex items-center justify-center gap-1">
          <button 
            onClick={() => window.history.back()}
            className="hover:text-stone-600 inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
