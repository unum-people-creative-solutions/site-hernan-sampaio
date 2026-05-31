'use client';
import React from 'react';
import { FaDumbbell, FaBullseye, FaTrophy } from 'react-icons/fa6';
import { useLead } from '@/context/LeadContext';
import { cn } from '@/lib/utils';

export const ServicesSection = () => {
  const { openModal } = useLead();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5541999999999";

  const services = [
    {
      title: "Consultoria Online",
      description: "Prescrição de treinos à distância com foco absoluto em recomposição corporal. Planejamento técnico e ajustes cirúrgicos via plataforma digital.",
      icon: <FaBullseye className="w-8 h-8 text-neon-yellow" />,
      cta: "Treinar Online",
      color: "border-neon-yellow/30",
      hoverColor: "hover:border-neon-yellow",
      btnColor: "border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black",
      glow: "hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
      titleStyle: "text-neon-blue group-hover:neon-glow-blue",
      whatsappUrl: `https://wa.me/${whatsappNumber}?text=Olá%20Hernan,%20gostaria%20de%20saber%20mais%20sobre%20a%20Consultoria%20Online.`
    },
    {
      title: "Treinamento Presencial",
      description: "Execução assistida (Personal). Correção biomecânica em tempo real para extração máxima de performance. Onde cada repetição conta.",
      icon: <FaDumbbell className="w-8 h-8 text-neon-yellow" />,
      cta: "Agendar Presencial",
      color: "border-neon-yellow/30",
      hoverColor: "hover:border-neon-yellow",
      btnColor: "border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black",
      glow: "hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]",
      titleStyle: "text-neon-pink group-hover:neon-glow-pink",
      whatsappUrl: `https://wa.me/${whatsappNumber}?text=Olá%20Hernan,%20gostaria%20de%20saber%20mais%20sobre%20o%20Treinamento%20Presencial.`
    },
    {
      title: "Preparação de Atletas",
      description: "Planejamento completo de periodização para competições de fisiculturismo. Do off-season à finalização agressiva para os palcos.",
      icon: <FaTrophy className="w-8 h-8 text-neon-yellow" />,
      cta: "Seja um Atleta",
      color: "border-neon-yellow/30",
      hoverColor: "hover:border-neon-yellow",
      btnColor: "border-neon-red text-neon-red hover:bg-neon-red hover:text-black",
      glow: "hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]",
      titleStyle: "text-neon-red group-hover:neon-glow-red",
      whatsappUrl: `https://wa.me/${whatsappNumber}?text=Olá%20Hernan,%20gostaria%20de%20saber%20mais%20sobre%20a%20Preparação%20de%20Atletas.`
    }
  ];

  return (
    <section className="py-24 bg-background text-foreground" aria-label="Serviços Oferecidos">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
            Modelos de <span className="text-neon-blue">Atuação</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
            Escolha o seu campo de batalha. Resultados de alto padrão exigem acompanhamento de elite.
          </p>
        </div>

        <ul className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <li 
              key={index} 
              className={cn(
                "bg-muted p-8 border backdrop-blur-sm transition-all duration-500 flex flex-col h-full group relative",
                service.color,
                service.hoverColor,
                service.glow
              )}
            >
              <div className="mb-6 bg-background inline-block p-4 rounded-sm border border-border w-fit group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className={cn(
                "text-2xl font-black mb-4 uppercase tracking-tighter",
                service.titleStyle
              )}>
                {service.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed mb-8 flex-grow font-medium">
                {service.description}
              </p>
              <button 
                onClick={() => openModal(service.whatsappUrl)}
                className={cn(
                  "w-full py-4 border font-black uppercase tracking-widest text-[10px] transition-all duration-300 hover:text-black",
                  service.btnColor
                )}
              >
                {service.cta}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
