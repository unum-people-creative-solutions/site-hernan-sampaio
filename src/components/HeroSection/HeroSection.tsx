'use client';
import React from 'react';
import { useLead } from '@/context/LeadContext';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const { openModal } = useLead();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5541999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá%20Hernan,%20gostaria%20de%20iniciar%20minha%20preparação.`;

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden" aria-label="Apresentação Principal">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="object-cover w-full h-full"
          src="/vidro assistencia.mp4"
        />
        <div className="absolute inset-0 bg-black/70" /> {/* Overlay escuro para legibilidade */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4">
            Metodologia de Elite
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white max-w-5xl uppercase leading-[0.9]">
            Execução <span className="text-primary">Técnica</span><br />
            Resultados <span className="italic">Severos</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
            Personal Trainer em Paranaguá especialista em biomecânica e hipertrofia. Metodologia de elite para quem busca resultados reais.
          </p>
          
          <div className="mt-12">
            <button 
              onClick={() => openModal(whatsappUrl)}
              className="group relative bg-transparent text-white font-black text-xl px-12 py-5 uppercase tracking-[0.2em] transition-all duration-300"
            >
              <span className="relative z-10">Iniciar Minha Preparação</span>
              
              {/* Moldura Neon Oscilante no Hover */}
              <span className="absolute inset-0 border-2 border-primary opacity-50 group-hover:opacity-100 group-hover:animate-neon-border transition-all duration-300" />
              
              {/* Glow fixo suave que intensifica no hover */}
              <span className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator - Fixado no fundo da viewport */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
        <span className="uppercase text-[8px] font-black tracking-[0.4em] text-white">Explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary via-neon-blue to-transparent animate-pulse" />
      </div>
    </section>
  );
};
