/*
 * Design: Terra Viva — Naturalismo Orgânico
 * Header: Navegação sticky com fundo transparente que transiciona para sólido ao scroll
 * Tipografia: Playfair Display para logo, Source Sans 3 para links
 * Cores: Verde escuro (#6f8f2e) como primária, fundo creme ao scroll
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029066893/vPpEKCFaDDJJpPSl.png";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#lojas", label: "Nossas Lojas" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location === "/") {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#2d3a1e] shadow-md`}
    >
      <div className="container flex items-center justify-between h-20 lg:h-24">
        {/* Logo (Removida conforme solicitado, mantendo apenas o link de texto para acessibilidade/navegação se desejar, ou removendo tudo) */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span
              className={`font-serif text-xl lg:text-2xl font-bold text-white`}
          >
            Cooperval
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href.replace("/#", "/")));
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className={`relative px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-[#b7d97a] bg-white/10"
                    : "text-white/90 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-xl text-white`}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#faf8f2]/98 backdrop-blur-lg border-t border-[#6f8f2e]/10 overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/#")) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    } else {
                      setMobileOpen(false);
                    }
                  }}
                  className="px-4 py-3 text-[#4a4a3a] font-medium rounded-xl hover:bg-[#6f8f2e]/10 hover:text-[#6f8f2e] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
