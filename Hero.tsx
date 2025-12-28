
import React from 'react';
import { Movie } from '../types';

interface HeroProps {
  movie?: Movie;
  onPlay: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <img 
        src={movie.thumbnailUrl} 
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-20 left-6 md:left-12 max-w-2xl space-y-6">
        <div className="flex items-center space-x-2 text-sm font-bold text-red-600 uppercase tracking-widest">
          <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px]">NEW</span>
          <span>Featured Film</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
          {movie.title.toUpperCase()}
        </h2>
        
        <p className="text-zinc-300 text-lg line-clamp-3">
          {movie.description}
        </p>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onPlay}
            className="bg-white text-black px-8 py-3 rounded-md font-black flex items-center space-x-2 hover:bg-zinc-200 transition-colors shadow-xl"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            <span>WATCH NOW</span>
          </button>
          
          <button className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-md font-bold flex items-center space-x-2 hover:bg-white/20 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>INFO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
