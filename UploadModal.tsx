
import React, { useState } from 'react';
import { Movie, CATEGORIES } from '../types';
import { generateMovieMetadata } from '../services/geminiService';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (movie: Movie) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Action',
    thumbnail: null as File | null,
    video: null as File | null,
  });

  const handleGenerateAI = async () => {
    if (!formData.title) return;
    setIsGenerating(true);
    const aiData = await generateMovieMetadata(formData.title);
    if (aiData) {
      setFormData(prev => ({
        ...prev,
        description: aiData.description,
        category: aiData.category,
      }));
    }
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.video || !formData.thumbnail) {
        alert("Please provide a title, video file, and thumbnail image.");
        return;
    }

    const videoUrl = URL.createObjectURL(formData.video);
    const thumbnailUrl = URL.createObjectURL(formData.thumbnail);

    const newMovie: Movie = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      thumbnailUrl,
      videoUrl,
      category: formData.category,
      year: new Date().getFullYear(),
      duration: 'TBD',
      rating: 5.0,
      aiReview: `A fresh masterpiece added to Roinmovies on ${new Date().toLocaleDateString()}.`
    };

    onUpload(newMovie);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tighter">UPLOAD CINEMA</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Roinmovies Creator Studio</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Movie Title</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter film title..."
                    className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-red-600 outline-none"
                  />
                  <button 
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={isGenerating || !formData.title}
                    className="p-2 bg-emerald-600/20 text-emerald-500 border border-emerald-500/20 rounded-lg hover:bg-emerald-600/30 transition-colors disabled:opacity-50"
                    title="Generate AI Metadata"
                  >
                    <svg className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-red-600 outline-none"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Thumbnail (Image)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, thumbnail: e.target.files?.[0] || null})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-black border-2 border-dashed border-white/10 rounded-xl px-4 py-6 flex flex-col items-center justify-center space-y-2 group-hover:border-red-600/50 transition-colors">
                    <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-xs text-zinc-500 font-medium">
                      {formData.thumbnail ? formData.thumbnail.name : 'Select JPG/PNG'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter cinematic description..."
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-red-600 outline-none resize-none h-[130px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Movie File (MP4/WebM)</label>
                <div className="relative group">
                   <input 
                    type="file" 
                    accept="video/*"
                    onChange={(e) => setFormData({...formData, video: e.target.files?.[0] || null})}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-black border-2 border-dashed border-white/10 rounded-xl px-4 py-6 flex flex-col items-center justify-center space-y-2 group-hover:border-red-600/50 transition-colors">
                    <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-xs text-zinc-500 font-medium">
                      {formData.video ? formData.video.name : 'Select Movie File'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-red-600 py-4 rounded-xl font-black text-lg tracking-tight hover:bg-red-700 transition-colors shadow-xl shadow-red-600/20 uppercase"
            >
              Publish to Roinmovies
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
