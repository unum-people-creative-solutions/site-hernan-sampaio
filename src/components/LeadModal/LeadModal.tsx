'use client';

import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLead } from '@/context/LeadContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IMaskInput } from "react-imask";
import { sendLeadToCRM, LeadData } from "@/lib/crm";
import { Loader2 } from "lucide-react";

const leadSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  telefone: z.string().min(14, "Telefone incompleto"), // (00) 00000-0000
});

type LeadFormValues = z.infer<typeof leadSchema>;

export const LeadModal: React.FC = () => {
  const { isOpen, closeModal, whatsappUrl, tracking } = useLead();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: LeadFormValues) => {
    setIsLoading(true);

    let origem = "Orgânico";
    if (tracking.gclid) {
      origem = "Google Ads";
    } else if (tracking.utm_source === "facebook" || tracking.utm_source === "instagram" || tracking.fbclid) {
      origem = "Social Ads";
    } else if (tracking.utm_source) {
      origem = tracking.utm_source;
    }

    const leadData: LeadData = {
      ...data,
      ...tracking,
      origem: origem,
      metadados: {
        url_conversao: whatsappUrl,
        data_hora: new Date().toISOString(),
        hostname: window.location.hostname,
      },
    };

    try {
      await sendLeadToCRM(leadData);
    } catch (crmError) {
      console.error("Erro ao enviar para o CRM:", crmError);
    } finally {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-background border border-border p-8 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-foreground/50 hover:text-primary transition-colors"
              aria-label="Fechar"
            >
              <IoClose className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tight text-white italic">
                Inicie Sua <span className="text-primary">Evolução</span>
              </h2>
              <p className="mt-2 text-foreground/60 text-sm font-medium">
                Triagem obrigatória para avaliação de perfil e objetivos.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-[10px] font-black uppercase mb-1.5 text-primary tracking-widest">
                  Nome Completo
                </label>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="modal-name"
                      className={`w-full bg-muted border ${errors.nome ? 'border-red-500' : 'border-border'} p-4 text-white focus:outline-none focus:border-primary transition-all duration-300 text-sm font-medium`}
                      placeholder="DIGITE SEU NOME"
                    />
                  )}
                />
                {errors.nome && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.nome.message}</p>}
              </div>

              <div>
                <label htmlFor="modal-whatsapp" className="block text-[10px] font-black uppercase mb-1.5 text-primary tracking-widest">
                  WhatsApp (DDD + NÚMERO)
                </label>
                <Controller
                  name="telefone"
                  control={control}
                  render={({ field }) => (
                    <IMaskInput
                      mask="(00) 00000-0000"
                      lazy={true}
                      value={field.value}
                      onAccept={(value) => field.onChange(value)}
                      className={`w-full bg-muted border ${errors.telefone ? 'border-red-500' : 'border-border'} p-4 text-white focus:outline-none focus:border-primary transition-all duration-300 text-sm font-medium`}
                      placeholder="(00) 00000-0000"
                    />
                  )}
                />
                {errors.telefone && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.telefone.message}</p>}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-[10px] font-black uppercase mb-1.5 text-primary tracking-widest">
                  E-mail (Opcional)
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="modal-email"
                      className={`w-full bg-muted border ${errors.email ? 'border-red-500' : 'border-border'} p-4 text-white focus:outline-none focus:border-primary transition-all duration-300 text-sm font-medium`}
                      placeholder="seu@email.com"
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-black font-black py-5 uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 mt-6 text-xs shadow-[0_0_20px_rgba(250,204,21,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'ENVIAR E FALAR COM HERNAN'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
