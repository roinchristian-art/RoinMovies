
import React, { useEffect, useState } from 'react';
import { Movie } from '../types';

interface MoviePlayerProps {
  movie: Movie;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie }) => {
  const [showCritic, setShowCritic] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setShowCritic(true), 1500);
    return () => clearTimeout(timer);
  }, [movie]);

  return (
    <div className="min-h-screen bg-black">
      <div className="relative aspect-video w-full bg-zinc-900 shadow-2xl overflow-hidden group">
        <video 
          src={movie.videoUrl} 
          controls 
          autoPlay 
          className="w-full h-full object-contain"
          poster={movie.thumbnailUrl}
        />
        
        {/* AI Branding Overlay */}
        <div className="absolute top-6 right-6 flex items-center space-x-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white tracking-widest uppercase">ROIN-AI Engine Active</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-2 text-zinc-400 text-sm font-medium">
              <span>{movie.year}</span>
              <span className="w-1 h-1 bg-zinc-700 rounded-full" />
              <span>{movie.duration}</span>
              <span className="w-1 h-1 bg-zinc-700 rounded-full" />
              <span className="px-2 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-[10px] text-zinc-300">4K ULTRA HD</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
              {movie.title}
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          <div className="pt-8 border-t border-white/5">
             <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-4">Genre</h3>
             <span className="px-4 py-2 bg-zinc-900 rounded-lg text-white font-medium border border-white/5">{movie.category}</span>
          </div>
        </div>

        <div className="space-y-8">
           {movie.aiReview && (
             <div className={`bg-zinc-900 p-6 rounded-2xl border border-white/5 transition-all duration-1000 transform ${showCritic ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               <div className="flex items-center space-x-2 mb-4 text-emerald-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span className="text-xs font-black uppercase tracking-widest">AI CRITIC'S SUMMARY</span>
               </div>
               <p className="text-zinc-300 italic text-sm leading-relaxed">
                 "{movie.aiReview}"
               </p>
               <div className="mt-6 flex items-center justify-between">
                  <div className="text-xs text-zinc-500">Verified AI Analysis</div>
                  <div className="text-yellow-500 font-bold">Rating: {movie.rating}/5</div>
               </div>
             </div>
           )}

           <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600/10 to-transparent border border-red-600/20">
              <h3 className="text-white font-bold mb-2">Share this film</h3>
              <p className="text-zinc-400 text-xs mb-4">Let others experience the cinematic vision of ROINMOVIES.</p>
              <div className="flex space-x-2">
                 {['Twitter', 'FB', 'Copy Link'].map(p => (
                   <button key={p} className="flex-1 py-2 bg-zinc-800 rounded text-[10px] font-bold hover:bg-zinc-700 transition-colors uppercase tracking-widest">{p}</button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
