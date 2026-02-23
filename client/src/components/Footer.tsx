/*
 * Design: Terra Viva — Naturalismo Orgânico
 * Footer: Fundo verde escuro com informações da cooperativa, links e redes sociais
 */
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { IMAGES } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-[#2d3a1e] text-white/90">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[calc(100%-2px)]">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="#2d3a1e"
          />
        </svg>
      </div>

      <div className="container py-16 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={IMAGES.logo} alt="Cooperval" className="h-14 w-auto" />
              <span className="font-serif text-xl font-bold text-white">
                Cooperval
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Cooperativa dos Pequenos Agropecuaristas de Erval Grande.
              Promovendo o desenvolvimento econômico, social e humano desde
              1993.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-[#b7d97a]">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Início" },
                { href: "/quem-somos", label: "Quem Somos" },
                { href: "/#servicos", label: "Serviços" },
                { href: "/#lojas", label: "Nossas Lojas" },
                { href: "/contato", label: "Contato" },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#b7d97a] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-[#b7d97a]">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={16} className="shrink-0 mt-0.5 text-[#8bc34a]" />
                <span>
                  Praça Ulisses Guimarães, 57, Centro — Erval Grande, RS
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Phone size={16} className="shrink-0 text-[#8bc34a]" />
                <span>(54)98414-1517 ou (54) 3375-1277</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Mail size={16} className="shrink-0 text-[#8bc34a]" />
                <span>adm01@cooperval-eg.com.br</span>
              </li>
            </ul>
          </div>
          {/* Logos */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-[#b7d97a]">
              Nossos Selos
            </h4>
            <div className="flex flex-wrap items-center gap-6">
              <img
                src={IMAGES.logoDetec}
                alt="DETEC Cooperval"
                className="h-14 w-auto object-contain"
              />
              <img
                src={IMAGES.logoNutricao}
                alt="Nutrição Cooperval"
                className="h-24 w-auto object-contain"
              />
              <img
                src={IMAGES.soucoop}
                alt="Certificado soucoop"
                className="h-14 w-auto object-contain bg-white/10 p-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Cooperval — Todos os direitos
            reservados.
          </p>
          <p className="text-white/50 text-xs">CNPJ: 73.273.526/0001-19</p>
        </div>
      </div>
    </footer>
  );
}
