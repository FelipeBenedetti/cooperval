/*
 * Design: Terra Viva — Naturalismo Orgânico
 * 404: Página não encontrada, estilo consistente com o restante do site
 */
import { Leaf, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f2] pt-24 pb-16">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-[#6f8f2e]/10 flex items-center justify-center">
            <Leaf size={48} className="text-[#6f8f2e]" />
          </div>
        </div>

        <h1 className="font-serif text-7xl md:text-8xl font-bold text-[#6f8f2e] mb-4">404</h1>

        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#3a4a2a] mb-4">
          Página não encontrada
        </h2>

        <p className="text-[#6a6a5a] text-lg max-w-md mx-auto mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida.
        </p>

        <button
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#6f8f2e] hover:bg-[#5a7a24] text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <ArrowLeft size={18} />
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
