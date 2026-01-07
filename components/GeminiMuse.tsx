
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, RefreshCcw, Pin, Scissors } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const GeminiMuse: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [inspiration, setInspiration] = useState<{
    concept: string;
    palette: string[];
    layoutIdea: string;
    typography: string;
  } | null>(null);

  const generateInspiration = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a creative graphic design concept for the following request: "${prompt}". 
                   Return the response in JSON format including:
                   - concept: A short, high-impact design description.
                   - palette: An array of 5 hex color codes that match the vibe.
                   - layoutIdea: A suggestion for how to structure the poster/banner.
                   - typography: Suggested font pairings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              concept: { type: Type.STRING },
              palette: { type: Type.ARRAY, items: { type: Type.STRING } },
              layoutIdea: { type: Type.STRING },
              typography: { type: Type.STRING },
            },
            required: ["concept", "palette", "layoutIdea", "typography"]
          }
        },
      });

      const data = JSON.parse(response.text);
      setInspiration(data);
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto relative px-8 py-20 bg-zinc-900 border border-white/5 shadow-inner">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] pointer-events-none"></div>
      
      <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-4">
          <div className="bg-purple-600 text-white px-3 py-1 inline-block font-black text-[10px] tracking-[0.3em] uppercase mb-6">MUSE_V2.0</div>
          <h2 className="text-5xl font-black font-space mb-8 leading-none italic tracking-tighter">DIGITAL <br/>MOODBOARD</h2>
          <p className="text-zinc-500 font-mono text-xs uppercase leading-loose mb-10">
            Feed the machine a keyword. <br/>
            Receive a visual spark. <br/>
            Break the creative block.
          </p>

          <div className="relative group">
             <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'Cyberpunk Tea Party'"
              className="w-full bg-black border border-white/10 px-6 py-5 outline-none focus:border-purple-600 text-sm font-mono tracking-widest placeholder:text-zinc-800 transition-all uppercase"
            />
            <button 
              onClick={generateInspiration}
              disabled={loading || !prompt}
              className="mt-4 w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-purple-600 hover:text-white transition-all disabled:opacity-30 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Sparkles className="w-5 h-5" /> Ignite_Spark</>}
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 relative min-h-[500px] flex items-center justify-center border-l border-white/5 pl-16">
          <AnimatePresence mode="wait">
            {inspiration ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full grid md:grid-cols-2 gap-10"
              >
                <div className="space-y-10">
                   <div className="relative p-8 bg-zinc-800 border-l-4 border-purple-600 shadow-xl">
                      <div className="absolute -top-4 -left-4"><Pin className="text-purple-600 w-8 h-8 rotate-[-20deg]" /></div>
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest mb-4">The_Concept</h4>
                      <p className="text-xl font-black font-space italic text-white/90 uppercase leading-snug">
                        "{inspiration.concept}"
                      </p>
                   </div>

                   <div className="relative p-8 bg-black border-t-4 border-orange-500 shadow-xl">
                      <div className="absolute top-2 right-2"><Scissors className="text-zinc-800 w-4 h-4" /></div>
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest mb-4">Typography_Set</h4>
                      <p className="text-sm font-mono tracking-wider text-orange-500/80 uppercase">
                        {inspiration.typography}
                      </p>
                   </div>
                </div>

                <div className="space-y-10">
                   <div className="p-8 bg-zinc-950 border border-white/10 shadow-2xl relative">
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest mb-6">Visual_Palette</h4>
                      <div className="flex h-20 w-full overflow-hidden rounded-sm">
                        {inspiration.palette.map((color, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex-1 h-full relative group"
                            style={{ backgroundColor: color }}
                          >
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-[8px] font-mono font-bold text-white uppercase">{color}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                   </div>

                   <div className="p-8 bg-zinc-800 border-b-4 border-pink-500 shadow-xl rotate-1">
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest mb-4">Layout_Blueprint</h4>
                      <p className="text-xs font-mono text-zinc-400 leading-loose uppercase">
                        {inspiration.layoutIdea}
                      </p>
                      <button 
                        onClick={() => { setInspiration(null); setPrompt(''); }}
                        className="mt-6 flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-[9px] font-mono font-bold uppercase tracking-widest"
                      >
                        <RefreshCcw className="w-3 h-3" />
                        Reset_Canvas
                      </button>
                   </div>
                </div>
              </motion.div>
            ) : (
              !loading && (
                <div className="text-center opacity-10">
                   <div className="text-[10rem] font-black font-space tracking-tighter">EMPTY_CANVAS</div>
                   <div className="text-xs font-mono tracking-[1em] uppercase">Input your parameters to begin the render</div>
                </div>
              )
            )}
            {loading && (
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-px bg-purple-600 animate-pulse"></div>
                <div className="text-xs font-mono font-black uppercase tracking-[0.5em] animate-pulse">Processing_Inspiration_Data</div>
                <div className="w-24 h-px bg-purple-600 animate-pulse"></div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GeminiMuse;
