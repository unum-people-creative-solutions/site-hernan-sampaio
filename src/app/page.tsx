import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AuthoritySection } from '@/components/AuthoritySection';
import { ChampionsSection } from '@/components/ChampionsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { WhatsAppButton } from '@/components/WhatsAppButton/WhatsAppButton';
import { LeadModal } from '@/components/LeadModal/LeadModal';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Header />
      <HeroSection />
      <AuthoritySection />
      <ChampionsSection />
      <ServicesSection />
      
      {/* Botão Flutuante e Modal de Captura */}
      <WhatsAppButton />
      <LeadModal />
      
      {/* Footer */}
      <footer className="bg-black text-foreground/70 py-12 border-t border-border" role="contentinfo">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 relative">
              <Image 
                src="/logo_simbolo.png" 
                alt="Hernan Sampaio Símbolo" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="w-40 h-10 relative">
              <Image 
                src="/logo_texto.png" 
                alt="Hernan Sampaio Texto" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
          <div className="text-center md:text-right space-y-2">
            <p className="font-bold text-foreground uppercase tracking-widest">
              Hernan Sampaio - High Performance
            </p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Todos os direitos reservados.
            </p>
            <div className="flex gap-4 justify-center md:justify-end mt-4">
              <a href="https://instagram.com/hernansampaio" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                @hernansampaio
              </a>
              <a href="https://instagram.com/hspersonalt" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                @hspersonalt
              </a>
            </div>
          </div>
        </div>
        
        {/* Developer Credit */}
        <div className="container mx-auto px-4 max-w-6xl mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 group cursor-default">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/20 group-hover:text-primary/40 transition-colors duration-500">
              Desenvolvido por
            </span>
            <a 
              href="https://unumpeople.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.3em] font-black text-foreground/40 group-hover:text-primary transition-all duration-500"
            >
              Unum People Creative Solutions
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
