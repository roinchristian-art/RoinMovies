
import React from 'react';
import { Movie } from '../types';

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieCard: React.FC<{ movie: Movie; onClick: () => void }> = ({ movie, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-red-600/50 transition-colors">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Hover Controls */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
            <svg className="w-6 h-6 text-black fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex items-center justify-between">
           <h3 className="font-bold text-white group-hover:text-red-500 transition-colors truncate pr-2">
            {movie.title}
          </h3>
          <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 font-bold">{movie.duration}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-zinc-500 mt-1">
          <span>{movie.year}</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span>{movie.category}</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span className="text-yellow-500 font-bold">★ {movie.rating}</span>
        </div>
      </div>
    </div>
  );
};

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelectMovie }) => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
        <div className="w-1 h-6 bg-red-600 rounded-full" />
        <span>Latest Releases</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
