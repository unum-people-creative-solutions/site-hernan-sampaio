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
          <Link href="/" className="relative transition-all duration-500 ease-in-out">
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
        </div>
      </div>
    </header>
  );
};
