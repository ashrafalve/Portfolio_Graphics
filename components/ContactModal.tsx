
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess("Your message has been launched into orbit! I'll be in touch soon.");
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 p-6">
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl font-black mb-2 font-space uppercase">LET'S BUILD SOMETHING</h2>
              <p className="text-zinc-500">I'm currently available for freelance graphic design projects and creative consulting.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Your Name</label>
                  <input required type="text" className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-3 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Your Email</label>
                  <input required type="email" className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-3 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Project Type</label>
                <select className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-3 outline-none transition-all text-zinc-400">
                  <option>Branding & Identity</option>
                  <option>Poster & Print Design</option>
                  <option>Social Media Assets</option>
                  <option>UI/UX Layout</option>
                  <option>Other Creative Magic</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Project Brief</label>
                <textarea required rows={4} className="w-full bg-zinc-900 border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-3 outline-none transition-all resize-none" placeholder="Tell me about your vision..."></textarea>
              </div>

              <button
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> TRANSMIT VISION</>}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
