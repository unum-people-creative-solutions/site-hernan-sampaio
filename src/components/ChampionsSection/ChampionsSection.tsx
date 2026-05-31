import React from 'react';
import Image from 'next/image';

interface Champion {
  id: string;
  name: string;
  achievement: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  theme: 'red' | 'blue';
}

const CHAMPIONS: Champion[] = [
  {
    id: 'robert-dias',
    name: 'Robert Dias',
    achievement: 'Bicampeão Paranaense IFBB Brasil',
    description: 'Um histórico forjado sob tutela rigorosa. De campeão estreantes a pódios nacionais, Robert é a prova da metodologia em sua forma mais agressiva.',
    imageSrc: '/robert_dias.png',
    imageAlt: 'Robert Dias - Atleta de Fisiculturismo',
    theme: 'red',
  },
  {
    id: 'grazi-lobo',
    name: 'Grazi Lobo',
    achievement: 'Vice-Campeã Copa Sul IFBB (Wellness Máster)',
    description: 'Destaque absoluto na Copa Sul 2018, conquistando o 2º lugar Wellness Máster e o Top 5 Wellness Sênior. Grazielle é o exemplo da metamorfose estética aliada ao alto rendimento competitivo.',
    imageSrc: '/grazi_lobo.png',
    imageAlt: 'Grazi Lobo - Atleta Wellness',
    theme: 'blue',
  },
];

export const ChampionsSection = () => {
  return (
    <section className="py-24 bg-muted text-foreground" aria-label="Hall de Campeões">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-white">
            Hall de <span className="text-neon-red">Campeões</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
            Resultados incontestáveis que validam a eficácia de uma metodologia de ponta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {CHAMPIONS.map((champion) => {
            const isRed = champion.theme === 'red';
            
            return (
              <div 
                key={champion.id}
                className={`group relative bg-background border border-white/10 p-6 shadow-xl transition-all duration-500 ${
                  isRed 
                    ? 'hover:border-neon-red hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]' 
                    : 'hover:border-neon-blue hover:shadow-[0_0_25px_rgba(14,165,233,0.2)]'
                }`}
              >
                
                {/* Badge na posição original com preenchimento sólido cinza escuro e texto neon */}
                <div className={`absolute top-0 right-0 bg-[#1A1A1A] border text-[10px] font-black uppercase px-4 py-1.5 -mt-3 mr-4 z-50 tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.3)] ${
                  isRed 
                    ? 'border-neon-red text-neon-red neon-glow-red' 
                    : 'border-neon-blue text-neon-blue neon-glow-blue'
                }`}>
                  Performance Atleta
                </div>

                <div className="aspect-[4/5] relative overflow-hidden mb-6 grayscale hover:grayscale-0 transition-all duration-700 border border-white/5">
                  <Image 
                    src={champion.imageSrc} 
                    alt={champion.imageAlt} 
                    fill 
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <h3 className="text-3xl font-black uppercase text-foreground mb-2 tracking-tighter">{champion.name}</h3>
                <div className="space-y-2">
                  <p className={`font-bold uppercase text-xs tracking-[0.2em] ${
                    isRed ? 'text-neon-red neon-glow-red' : 'text-neon-blue neon-glow-blue'
                  }`}>
                    {champion.achievement}
                  </p>
                  <p className="text-foreground/70 text-sm leading-relaxed font-medium">
                    {champion.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

