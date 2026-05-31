"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-transparent",
        isScrolled ? "py-2" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative transition-all duration-500 ease-in-out group">
            <div
              className={cn(
                "relative transition-all duration-500 ease-in-out",
                isScrolled ? "w-14 h-14" : "w-28 h-28 md:w-32 md:h-32"
              )}
            >
              <Image
                src="/logo_simbolo.png"
                alt="Hernan Sampaio Symbol"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div
            className={cn(
              "relative transition-all duration-500 ease-in-out overflow-hidden pointer-events-none",
              isScrolled ? "w-0 opacity-0 invisible" : "w-48 h-12 md:w-64 md:h-16 opacity-100 visible"
            )}
          >
            <Image
              src="/logo_texto.png"
              alt="Hernan Sampaio Text"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
};
