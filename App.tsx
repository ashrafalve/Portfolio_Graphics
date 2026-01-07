
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { 
  Palette, 
  Layers, 
  Monitor, 
  PenTool, 
  ArrowRight, 
  ExternalLink, 
  ChevronDown,
  Mail,
  Instagram,
  Dribbble,
  Github,
  X,
  Stamp,
  Scissors,
  Linkedin,
  MapPin,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  Maximize2,
  Scan,
  MonitorSmartphone
} from 'lucide-react';
import { PROJECTS, SKILLS, EXPERIENCE, EDUCATION, MILESTONES } from './constants';
import { Project, ProjectCategory } from './types';

import ContactModal from './components/ContactModal';
import Toast from './components/Toast';

// Reference to the user's uploaded photo
import USER_PHOTO from "./profile_photo.png";

const Tape = ({ className = "", text = "" }) => (
  <div className={`absolute z-20 tape-label px-4 py-1 text-[10px] font-mono tracking-tighter uppercase text-white/70 flex items-center gap-2 ${className}`}
       style={{ clipPath: 'polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)' }}>
    <div className="w-1 h-1 rounded-full bg-white/30" />
    {text}
  </div>
);

const ProfileScan = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="relative group cursor-crosshair"
    >
      {/* Scanning Line */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-purple-500/50 blur-[2px] z-30 pointer-events-none"
      />
      
      {/* Decorative Corners */}
      <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-500 z-30" />
      <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-purple-500 z-30" />
      
      {/* Technical Labels */}
      <div className="absolute top-4 -right-12 rotate-90 origin-left text-[8px] font-mono text-zinc-600 tracking-[0.5em] uppercase pointer-events-none">
        SUBJECT_ID: ASHRAF_ALVE_09
      </div>
      <div className="absolute bottom-4 -left-16 -rotate-90 origin-right text-[8px] font-mono text-zinc-600 tracking-[0.5em] uppercase pointer-events-none">
        STATUS: DESIGN_LEAD_ACTIVE
      </div>

      <div className="relative overflow-hidden w-64 md:w-80 aspect-[2/3] bg-zinc-900 border border-white/10 shadow-2xl">
        <motion.img 
          src={USER_PHOTO} 
          alt="Ashraf Ahmed Alve"
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
          style={{
            x: useTransform(mouseX, [0, 400], [-10, 10]),
            y: useTransform(mouseY, [0, 600], [-10, 10]),
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <Tape className="top-8 -left-8 -rotate-12 bg-white/20" text="ASHRAF_ALVE" />
        <Tape className="-bottom-2 right-10 rotate-2 bg-purple-600/60" text="CREATIVE_DIRECTOR" />
      </div>
      
      <div className="mt-4 flex justify-between items-center px-2 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="text-[9px] font-mono uppercase flex items-center gap-2">
          <Scan className="w-3 h-3 text-purple-500" /> SYNC_ACTIVE
        </div>
        <div className="text-[9px] font-mono uppercase">23.81N 90.41E</div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error'; visible: boolean }>({
    message: '',
    type: 'info',
    visible: false
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateHero = useTransform(scrollYProgress, [0, 0.2], [0, -5]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type, visible: true });
  };

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => 
        Array.isArray(p.category) 
          ? p.category.includes(filter as ProjectCategory)
          : p.category === filter
      );

  const categories: (ProjectCategory | 'All')[] = ['All', 'Poster', 'Banner', 'Branding', 'Card', 'Social Media'];

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white">
      <Toast 
        isVisible={toast.visible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        onSuccess={(msg) => showToast(msg, 'success')} 
      />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[90] px-8 py-8 flex justify-between items-start pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-white text-black px-4 py-1 font-black text-xl tracking-tighter mb-1 uppercase">ASHRAF AHMED ALVE</div>
          <div className="bg-purple-600 text-white px-2 py-0.5 text-[9px] font-mono font-bold tracking-[0.3em] uppercase inline-block">Designer</div>
        </motion.div>
        
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <div className="flex gap-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full px-8 py-3 text-[10px] font-bold tracking-widest uppercase">
            {['Works', 'Specs', 'Contact', 'Switch Portfolio'].map((item) => (
              <button
                key={item}
                onClick={() => item === 'Switch Portfolio' ? window.open('https://ashrafalve.netlify.app/', '_blank', 'noopener,noreferrer') : handleSmoothScroll(item.toLowerCase().replace(' ', ''))}
                className="hover:text-purple-400 transition-colors flex items-center gap-1"
              >
                {item === 'Switch Portfolio' && <MonitorSmartphone className="w-3 h-3" />}
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-8 py-3 bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all shadow-xl shadow-purple-600/20"
          >
            Hire Alve
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-32 overflow-hidden bg-[radial-gradient(circle_at_center,_#111_0%,_#050505_100%)]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]"></div>
        
        <div className="z-10 relative flex flex-col lg:flex-row items-center justify-between gap-16 max-w-7xl w-full">
          <motion.div style={{ rotate: rotateHero }} className="text-center lg:text-left flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 font-mono text-purple-500 text-xs tracking-[0.5em] uppercase font-bold"
            >
              [ ASHRAF AHMED ALVE // B.SC IN CSE ]
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-[8rem] font-black leading-[0.85] mb-8 font-space tracking-tighter uppercase"
            >
              CRAFTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">VISUAL</span>
              <br />NARRATIVES
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl mx-auto lg:mx-0 text-zinc-500 text-lg font-medium mb-12"
            >
              B.Sc in Computer Science & Engineering graduate from UAP. Software developer and graphic designer creating high-impact posters, banners, and digital identities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center lg:justify-start gap-6"
            >
              <button 
                onClick={() => handleSmoothScroll('works')}
                className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] overflow-hidden"
              >
                <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform" />
                <span className="relative z-10 group-hover:text-white transition-colors">Enter Gallery</span>
              </button>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-600">
                <Scissors className="w-4 h-4" />
                CRAFTED BY ALVE
              </div>
            </motion.div>
          </motion.div>

          <div className="flex-1 flex justify-center lg:justify-end">
             <ProfileScan />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-zinc-700 cursor-pointer"
          onClick={() => handleSmoothScroll('works')}
        >
          <div className="text-[10px] font-mono tracking-widest mb-2 text-center uppercase">Scroll to explore</div>
          <ChevronDown className="w-6 h-6 mx-auto" />
        </motion.div>
      </section>

      {/* Portfolio Collage Section */}
      <section id="works" className="py-32 px-6 md:px-20 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="relative">
            <h2 className="text-6xl md:text-9xl font-black font-space leading-none tracking-tighter uppercase">THE <br/> ARCHIVE</h2>
            <div className="absolute -top-6 -right-12 rotate-12 bg-orange-500 text-black px-4 py-1 text-xs font-black uppercase shadow-lg">ALVE_CURATED</div>
          </div>
          
          <div className="flex flex-wrap gap-3 max-w-md md:justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                  ? 'bg-purple-600 text-white scale-110 rotate-1' 
                  : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 items-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', damping: 20 }}
                onClick={() => setSelectedProject(project)}
                className={`group relative cursor-pointer ${index % 2 === 0 ? 'md:mt-12' : 'md:-mt-12'}`}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/10 shadow-2xl transition-transform duration-500 md:group-hover:-rotate-1">
                   <Tape className="top-2 md:top-4 -right-4 md:-right-8 rotate-45 w-24 md:w-32 bg-white/10 text-[8px] md:text-[10px]" text={project.tool} />
                   <Tape className="-bottom-1 md:-bottom-2 left-6 md:left-10 -rotate-2 w-32 md:w-40 bg-purple-500/40 text-[8px] md:text-[10px]" text={Array.isArray(project.category) ? project.category[0] : project.category} />
                   
                   <img 
                     src={project.imageUrl} 
                     alt={project.title}
                     className="w-full h-full object-contain opacity-80 group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0 p-2 md:p-4"
                   />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-8">
                    <h3 className="text-lg md:text-3xl font-black leading-none mb-2 font-space uppercase italic">{project.title}</h3>
                    <div className="flex items-center gap-2 md:gap-4 text-[8px] md:text-[10px] font-mono font-bold tracking-widest text-purple-400">
                      <span>VIEW_FILE</span>
                      <div className="h-[1px] flex-1 bg-purple-500/30"></div>
                      <ExternalLink className="w-2 h-2 md:w-3 md:h-3" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-end px-2">
                  <div className="text-[10px] font-mono text-zinc-600 uppercase font-bold tracking-[0.2em]">{project.id.padStart(3, '0')} // ARCHIVE</div>
                  <div className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">{project.category}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats & Experience Section */}
      <section id="specs" className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')]"></div>
        
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                 <div className="mb-12 flex items-center gap-6">
                    <h2 className="text-5xl md:text-8xl font-black font-space leading-none tracking-tighter uppercase">SYSTEM <br/> SPECS</h2>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 p-1 flex-shrink-0">
                       <img src={USER_PHOTO} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Profile" />
                    </div>
                 </div>
                 <div className="space-y-12">
                    <div className="border-l-4 border-purple-600 pl-6">
                       <div className="flex items-center gap-3 text-xs font-mono font-black text-purple-500 mb-4 uppercase">
                          <MapPin className="w-4 h-4" /> Dhaka, Bangladesh
                       </div>
                       <div className="flex items-center gap-3 text-xs font-mono font-black text-purple-500 mb-4 uppercase">
                          <Phone className="w-4 h-4" /> +88 01798760871
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest">Education // Logic</h3>
                       {EDUCATION.map((edu, idx) => (
                         <div key={idx} className="p-4 bg-zinc-900/50 border border-white/5">
                            <div className="text-sm font-black uppercase flex items-center gap-2"><GraduationCap className="w-4 h-4" /> {edu.degree}</div>
                            <div className="text-[10px] font-mono text-zinc-400 uppercase mt-1">{edu.institution}</div>
                         </div>
                       ))}
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-xs font-mono font-black text-zinc-500 uppercase tracking-widest">Experience // Creative</h3>
                       {EXPERIENCE.map((exp, idx) => (
                         <div key={idx} className="p-4 bg-zinc-900/50 border border-white/5">
                            <div className="text-sm font-black uppercase flex items-center gap-2"><Briefcase className="w-4 h-4" /> {exp.role}</div>
                            <div className="text-[10px] font-mono text-zinc-400 uppercase mt-1">{exp.company} // {exp.period}</div>
                            <ul className="mt-4 space-y-2">
                               {exp.description.map((bullet, i) => (
                                 <li key={i} className="text-[9px] font-mono text-zinc-500 uppercase border-b border-white/5 pb-1">• {bullet}</li>
                               ))}
                            </ul>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SKILLS.map((skill, idx) => (
                      <div key={skill.name} className="group p-6 glass-card">
                        <div className="flex justify-between mb-4">
                          <span className="text-xs font-mono font-black uppercase tracking-widest text-white">{skill.name}</span>
                          <span className="text-xs font-mono text-purple-500">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-black/50 overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5 }}
                              className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                           />
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="bg-zinc-900/50 p-12 border border-dashed border-white/10 relative">
                    <Tape className="-top-3 -left-6 rotate-[-5deg] bg-orange-500 text-black" text="ACHIEVEMENTS" />
                    <div className="space-y-8 mt-4">
                        {MILESTONES.map((stone, i) => (
                          <div key={i} className="flex items-center gap-6 group">
                             <div className="w-12 h-12 flex items-center justify-center bg-white text-black font-black text-xl group-hover:bg-purple-600 group-hover:text-white transition-all"><Award /></div>
                             <div className="flex items-center gap-4 text-xl md:text-3xl font-black font-space uppercase italic tracking-tighter">
                               {stone.includes('View Magazine') ? (
                                 <>
                                   <span>Designed Official CSE Magazine for UAP</span>
                                   <a 
                                     href="https://drive.google.com/file/d/167_dm1D2tbKiKn64spM47VIS0kFXbcCm/view?usp=sharing" 
                                     target="_blank" 
                                     rel="noopener noreferrer"
                                     className="px-3 py-2 bg-purple-600 text-white text-xs md:text-sm font-black uppercase tracking-wider hover:bg-purple-500 transition-all border-2 border-purple-400/30 hover:border-purple-400"
                                   >
                                     View Magazine
                                   </a>
                                 </>
                               ) : (
                                 stone
                               )}
                             </div>
                          </div>
                        ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>



      {/* Footer / Contact */}
      <footer id="contact" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-20">
            <h2 className="text-6xl md:text-[12rem] font-black font-space tracking-tighter leading-none mb-12 uppercase">CONTACT_ALVE</h2>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.5em] mb-12">System.Availability: OPEN_FOR_HIRE // DHAKA_BD</p>
            
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-16 py-8 border-4 border-white text-3xl font-black uppercase tracking-tighter hover:bg-white hover:text-black transition-all group relative"
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute -top-4 -right-4 bg-purple-600 text-white px-3 py-1 text-[10px] group-hover:rotate-12 transition-transform font-black">SEND_NOW</div>
            </button>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12 mb-32">
            {[
              { 
                icon: Mail, 
                label: 'Email', 
                color: 'purple', 
                link: 'mailto:ashrafahmedalve@gmail.com',
                action: 'mail'
              },
              { icon: Linkedin, label: 'LinkedIn', color: 'pink', link: 'https://www.linkedin.com/in/ashraf-ahmed-alve-6a3853376/' },
              { icon: Github, label: 'Github', color: 'blue', link: 'https://github.com/ashrafalve' },
              { icon: Instagram, label: 'Insta', color: 'orange', link: 'https://www.instagram.com/ashraf_ahmed_alve/?hl=en' }
            ].map((soc) => (
              <div key={soc.label} className="group flex flex-col items-center gap-4 cursor-pointer"
                   onClick={() => {
                     if (soc.action === 'mail') {
                       navigator.clipboard.writeText('ashrafahmedalve@gmail.com');
                       showToast('Email copied to clipboard!', 'success');
                     } else {
                       window.open(soc.link, '_blank', 'noopener,noreferrer');
                     }
                   }}>
                 <div className={`p-6 rounded-full border border-white/10 group-hover:border-${soc.color}-500 group-hover:bg-${soc.color}-500/10 transition-all`}>
                   <soc.icon className={`w-8 h-8 text-zinc-600 group-hover:text-white transition-colors`} />
                 </div>
                 <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">{soc.label}</span>
               </div>
            ))}
          </div>

          <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.3em]">
            <div>© ASHRAF_AHMED_ALVE_DESIGN // VER_2.5.0 // B.SC CSE</div>
            <div className="flex gap-12">
              <button onClick={() => showToast("Security logs: Normal")} className="hover:text-white">Privacy_Policy</button>
              <button onClick={() => showToast("Terms accepted.")} className="hover:text-white">Terms_Of_Usage</button>
            </div>
            <div className="px-3 py-1 border border-white/10 text-white/40">Lat: 23.8103 // Lon: 90.4125 // DHAKA</div>
          </div>
        </div>
      </footer>

      {/* Project Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-2 md:p-12 bg-black/98"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="relative max-w-7xl w-full h-full bg-zinc-950 border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,1)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full md:w-3/5 h-1/3 md:h-full bg-zinc-900 relative group overflow-hidden flex items-center justify-center p-4 md:p-8">
                <img src={selectedProject.imageUrl} className="max-w-full max-h-full object-contain md:group-hover:scale-105 transition-transform duration-1000" alt={selectedProject.title} />
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/film.png')] pointer-events-none"></div>
                <Tape className="top-4 md:top-10 left-4 md:left-10 -rotate-12 bg-white/20 w-32 md:w-48 text-[8px] md:text-[10px]" text="RAW_OUTPUT_RENDER" />
              </div>

              <div className="w-full md:w-2/5 p-6 md:p-12 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 md:top-10 right-4 md:right-10 text-zinc-500 hover:text-white transition-all">
                  <X className="w-6 h-6 md:w-10 md:h-10" />
                </button>

                <div>
                  <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8 mt-8 md:mt-0">
                    <div className="px-2 py-1 md:px-3 bg-purple-600 text-white text-[8px] md:text-[10px] font-black uppercase">{selectedProject.tool}</div>
                    <div className="h-px flex-1 bg-white/10"></div>
                  </div>

                  <h2 className="text-2xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-8 font-space tracking-tighter leading-none italic uppercase italic">{selectedProject.title}</h2>
                  <p className="text-zinc-400 font-mono text-xs md:text-sm leading-relaxed mb-6 md:mb-10 border-l-2 border-purple-500 pl-4 md:pl-6 uppercase">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-12 text-[8px] md:text-[10px] font-mono text-zinc-500 uppercase">
                    <div className="p-2 md:p-4 border border-white/5">TYPE: {Array.isArray(selectedProject.category) ? selectedProject.category.join(' / ') : selectedProject.category}</div>
                    <div className="p-2 md:p-4 border border-white/5">YEAR: 2024</div>
                    <div className="p-2 md:p-4 border border-white/5">STATUS: ARCHIVED</div>
                    <div className="p-2 md:p-4 border border-white/5">ID: {selectedProject.id}</div>
                  </div>
                </div>


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
