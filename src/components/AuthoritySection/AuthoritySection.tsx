import React from 'react';
import Image from 'next/image';

export const AuthoritySection = () => {
  return (
    <section className="py-24 bg-background text-foreground" aria-label="Sobre o Treinador">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic border-l-4 border-neon-purple pl-4 text-white">
              Treinador <span className="text-neon-purple">Referência</span> em Paranaguá
            </h2>
            
            <p className="text-lg leading-relaxed text-foreground/80 font-medium">
              Com um histórico forjado no mais alto nível do fisiculturismo e hipertrofia, <strong>Hernan Sampaio</strong> é referência como personal trainer em Paranaguá. Seu trabalho não oferece atalhos, mas sim resultados reais através de disciplina e precisão técnica.
            </p>

            <div className="bg-muted p-6 border-l-2 border-neon-blue/50 shadow-[0_0_15px_rgba(0,240,255,0.05)]">
              <h3 className="text-xl font-black mb-3 text-neon-blue uppercase tracking-widest italic">Metodologia</h3>
              <p className="text-foreground/70 leading-relaxed font-medium">
                Uma abordagem rigorosa fundamentada na <strong className="text-white">biomecânica</strong>. Todo o trabalho de base é meticulosamente lapidado em ambientes de alto rendimento, como a Academia <strong>Aquatikus</strong>.
              </p>
            </div>
          </div>

          {/* Image Content (Familia) */}
          <div className="flex-1 w-full max-w-md lg:max-w-none relative">
            <div className="aspect-square relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-border group">
              <Image 
                src="/familia.png" 
                alt="Hernan Sampaio e sua família" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-purple transition-colors duration-700" />
            </div>
            {/* Decorator Neon */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-neon-purple/10 blur-3xl z-[-1] animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
};
