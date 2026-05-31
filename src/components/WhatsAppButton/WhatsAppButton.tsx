'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLead } from '@/context/LeadContext';
import { motion } from 'framer-motion';

export const WhatsAppButton = () => {
  const { openModal } = useLead();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5541999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá%20Hernan,%20gostaria%20de%20iniciar%20minha%20preparação.`;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openModal(whatsappUrl)}
      className="fixed bottom-8 right-8 z-[90] bg-black/90 backdrop-blur-md border-2 p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group animate-neon-border animate-neon-text"
      aria-label="Falar no WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-background border border-border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl border-l-4 border-l-primary">
        Iniciar Evolução
      </span>
    </motion.button>
  );
};
