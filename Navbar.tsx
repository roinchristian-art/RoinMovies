
import React from 'react';

interface NavbarProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenUpload: () => void;
  onOpenSettings: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, onToggleAdmin, onOpenUpload, onOpenSettings, onSearch }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/95 via-black/80 to-transparent z-40 px-6 md:px-12 flex items-center justify-between backdrop-blur-sm transition-all duration-300">
      <div className="flex items-center space-x-12">
        <h1 
          onClick={() => window.location.reload()}
          className="text-2xl font-black text-red-600 tracking-tighter cursor-pointer hover:scale-105 transition-transform"
        >
          ROINMOVIES
        </h1>
        
        <div className="hidden lg:flex space-x-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors border-b-2 border-red-600 pb-1">Movies</a>
          <a href="#" className="hover:text-white transition-colors">Series</a>
          <a href="#" className="hover:text-white transition-colors">Trending</a>
        </div>
      </div>

      <div className="flex items-center space-x-4 md:space-x-8">
        <div className="relative group hidden sm:block">
          <input 
            type="text" 
            placeholder="Search titles..." 
            onChange={(e) => onSearch(e.target.value)}
            className="bg-zinc-900/50 border border-white/10 rounded-full py-2 px-5 text-xs w-48 focus:w-72 transition-all duration-500 outline-none text-white focus:border-red-600/50 focus:bg-zinc-900"
          />
          <svg className="w-4 h-4 absolute right-4 top-2.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        <div className="flex items-center space-x-3">
          {isAdmin ? (
            <>
              <button 
                onClick={onOpenUpload}
                className="bg-red-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-tighter flex items-center space-x-2 hover:bg-white hover:text-black transition-all shadow-xl shadow-red-600/20 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span>Upload Movie</span>
              </button>
              
              <button 
                onClick={onOpenSettings}
                className="p-2.5 bg-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                title="Security Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>

              <button 
                onClick={onToggleAdmin}
                className="p-2.5 bg-zinc-800 rounded-full text-red-500 hover:bg-zinc-700 transition-colors"
                title="Logout from Studio"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </>
          ) : (
            <button 
              onClick={onToggleAdmin}
              className="px-4 py-2 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white transition-all active:scale-95"
            >
              Creator Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
