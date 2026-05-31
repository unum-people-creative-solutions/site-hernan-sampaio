"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TrackingParams {
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

interface LeadContextType {
  isOpen: boolean;
  openModal: (whatsappUrl: string) => void;
  closeModal: () => void;
  whatsappUrl: string;
  tracking: TrackingParams;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const initialTracking: TrackingParams = {
  gclid: null,
  fbclid: null,
  msclkid: null,
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
};

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [tracking] = useState<TrackingParams>(() => {
    if (typeof window === "undefined") return initialTracking;

    const params = new URLSearchParams(window.location.search);
    const newTracking = {
      gclid: params.get("gclid"),
      fbclid: params.get("fbclid"),
      msclkid: params.get("msclkid"),
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
    };

    if (Object.values(newTracking).some((val) => val !== null)) {
      sessionStorage.setItem("unum_tracking", JSON.stringify(newTracking));
      return newTracking;
    }

    const saved = sessionStorage.getItem("unum_tracking");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved tracking info:", e);
      }
    }

    return initialTracking;
  });

  const openModal = (url: string) => {
    setWhatsappUrl(url);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setWhatsappUrl("");
  };

  return (
    <LeadContext.Provider value={{ isOpen, openModal, closeModal, whatsappUrl, tracking }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLead must be used within a LeadProvider");
  }
  return context;
}
