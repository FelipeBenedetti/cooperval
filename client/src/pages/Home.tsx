/*
 * Design: Terra Viva — Naturalismo Orgânico
 * Home: Hero com imagem full-width, seções de serviços, sobre, lojas (carousel) e conselhos
 * Cores: Verdes (#6f8f2e, #8bc34a, #b7d97a) e Azuis (#8fd3f4, #5fb3e6)
 * Tipografia: Playfair Display (títulos), Source Sans 3 (corpo)
 */
import { motion } from "framer-motion";
import { ShoppingCart, Tractor, Factory, Milk, Wheat, Stethoscope, MapPin, Phone, ChevronLeft, ChevronRight, Users, Award } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import { IMAGES, STORES, SERVICES, COUNCILS, STATS, BUSINESS_HOURS } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const iconMap: Record<string, React.ElementType> = {
  ShoppingCart, Tractor, Factory, Milk, Wheat, Stethoscope,
};

function useCounter(end: number, duration: number = 2000, inView: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
}

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const [inView, setInView] = useState(false);
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");
  const count = useCounter(numericValue, 2000, inView);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onViewportEnter={() => setInView(true)}
    >
      <span className="block font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
        {count}{suffix}
      </span>
      <span className="text-white/80 text-sm md:text-base font-medium">{label}</span>
    </motion.div>
  );
}

export default function Home() {
  const [currentStore, setCurrentStore] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextStore = useCallback(() => {
    setCurrentStore((prev) => (prev + 1) % STORES.length);
  }, []);

  const prevStore = useCallback(() => {
    setCurrentStore((prev) => (prev - 1 + STORES.length) % STORES.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextStore, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextStore]);

  return (
    <div className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-32 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Paisagem rural do Rio Grande do Sul"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#2d3a1e]/60" />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-[#8bc34a]/20 backdrop-blur-sm border border-[#8bc34a]/30 rounded-full text-[#b7d97a] text-sm font-medium mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              Desde 1993 no coração do Alto Uruguai
            </motion.span>

            <div className="flex flex-col lg:flex-row lg:items-center mb-8 relative">
              <div className="lg:w-3/5 z-10">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                  Nossa missão é {" "}
                  <span className="text-[#b7d97a]">Inspirar</span> pessoas a{" "}
                  <span className="text-[#8fd3f4]">cooperar</span> para{" "}
                  <span className="text-[#b7d97a]">evoluir</span>
                </h1>
              </div>
              
              {/* Logo - Mobile: Abaixo do texto / Desktop: Alinhada ao final da tela à direita dentro do Hero */}
              <div className="mt-8 lg:mt-0 lg:absolute lg:-right-48 lg:top-1/2 lg:-translate-y-1/2 shrink-0 flex justify-center lg:justify-end pointer-events-none">
                <img 
                  src={IMAGES.logo} 
                  alt="Logo Cooperval" 
                  className="h-40 sm:h-56 md:h-72 lg:h-[680px] w-auto max-w-none object-contain drop-shadow-2xl transition-all duration-700"
                />
              </div>
            </div>

            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Cooperativa dos Pequenos Agropecuaristas de Erval Grande. 
              Promovendo o desenvolvimento econômico, social e humano de forma sustentável.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/quem-somos"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#6f8f2e] hover:bg-[#5a7a24] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Conheça Nossa História
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
              >
                Nossos Serviços
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16 lg:h-20" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,10 1080,50 C1260,65 1380,55 1440,40 L1440,80 L0,80 Z" fill="#faf8f2" />
          </svg>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="bg-[#6f8f2e] py-12 md:py-16 -mt-1">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVIÇOS ========== */}
      <section id="servicos" className="py-20 md:py-28 bg-[#faf8f2]">
        <div className="container">
          <SectionHeading
            title="Nossos Serviços"
            subtitle="Somos uma cooperativa do agronegócio com atendimento personalizado em todos os setores. Confira nossa linha completa de produtos e serviços."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon] || ShoppingCart;
              const isFeatured = (service as any).featured;
              return (
                <motion.div
                  key={service.title}
                  className={`group relative rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border overflow-hidden ${
                    isFeatured
                      ? "bg-gradient-to-br from-[#6f8f2e] to-[#5a7a24] text-white border-[#8bc34a] lg:col-span-2"
                      : "bg-white border-[#e8e4d8] hover:border-[#8bc34a]/30"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {!isFeatured && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6f8f2e] via-[#8bc34a] to-[#b7d97a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />}
                  
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${
                    isFeatured
                      ? "bg-white/20"
                      : "bg-[#6f8f2e]/10 group-hover:bg-[#6f8f2e]/20"
                  }`}>
                    <Icon size={28} className={isFeatured ? "text-white" : "text-[#6f8f2e]"} />
                  </div>

                  <h3 className={`font-serif text-xl font-bold mb-3 ${
                    isFeatured ? "text-white" : "text-[#3a4a2a]"
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`leading-relaxed text-[15px] ${
                    isFeatured ? "text-white/90" : "text-[#6a6a5a]"
                  }`}>
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Extra info */}
          <motion.div
            className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden h-64 lg:h-auto">
              <img
                src={IMAGES.agro}
                alt="Loja agropecuária Cooperval"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a1e]/70 to-transparent flex items-end p-6">
                <p className="text-white font-serif text-xl font-semibold">
                  Agropecuária completa para sua propriedade
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-64 lg:h-auto">
              <img
                src={IMAGES.market}
                alt="Mercado Cooperval"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a1e]/70 to-transparent flex items-end p-6">
                <p className="text-white font-serif text-xl font-semibold">
                  Mercado com açougue, padaria e espaço kids
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SOBRE (resumo) ========== */}
      <section className="relative">
        <WaveDivider color="#6f8f2e" />
        <div className="bg-[#6f8f2e] py-16 md:py-24 -mt-1">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[#b7d97a] text-sm font-medium mb-4">
                  Nossa História
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Mais de 30 anos de cooperativismo
                </h2>
                <p className="text-white/85 text-lg leading-relaxed mb-6">
                  A COOPERVAL tem na sua história a essência do cooperativismo em promover o desenvolvimento econômico, social e humano de forma sustentável e equilibrada. Fundada em 16 de junho de 1993, nasceu da coragem e união de um grupo de agricultores que enxergaram na cooperação uma oportunidade de crescimento.
                </p>
                <p className="text-white/75 leading-relaxed mb-8">
                  Hoje, somos mais de 50 colaboradores, com estrutura moderna, múltiplos pontos de atendimento e atuação em 27 municípios da região norte do RS. Mantemos os pés no passado para valorizar nossa história, mas o olhar está voltado para o futuro.
                </p>
                <a
                  href="/quem-somos"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#6f8f2e] font-semibold rounded-full hover:bg-[#f5f5f0] transition-all duration-300 shadow-lg"
                >
                  Saiba Mais Sobre Nós
                </a>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={IMAGES.about}
                    alt="Equipe Cooperval"
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#8bc34a]/20 flex items-center justify-center">
                      <Users size={24} className="text-[#6f8f2e]" />
                    </div>
                    <div>
                      <span className="block font-serif text-2xl font-bold text-[#3a4a2a]">1993</span>
                      <span className="text-sm text-[#6a6a5a]">Ano de fundação</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <WaveDivider color="#faf8f2" />
      </section>

      {/* ========== LOJAS (Carousel) ========== */}
      <section id="lojas" className="py-20 md:py-28 bg-[#faf8f2] -mt-1">
        <div className="container">
          <SectionHeading
            title="Nossas Lojas"
            subtitle="Estamos presentes em 6 municípios com 9 pontos de atendimento. Encontre a loja mais próxima de você."
          />

          {/* Carousel */}
          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentStore * 100}%)` }}
              >
                {STORES.map((store) => (
                  <div key={store.name} className="w-full shrink-0 px-2">
                    <div className="bg-white rounded-2xl shadow-lg border border-[#e8e4d8] p-8 md:p-10">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            {store.isMain && (
                              <span className="px-2.5 py-0.5 bg-[#6f8f2e]/10 text-[#6f8f2e] text-xs font-semibold rounded-full">
                                MATRIZ
                              </span>
                            )}
                            <span className="text-[#5fb3e6] text-sm font-medium">{store.city}</span>
                          </div>
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#3a4a2a] mb-3">
                            {store.name}
                          </h3>
                          <p className="text-[#6a6a5a] mb-4">{store.description}</p>
                          
                          <div className="flex items-start gap-2 text-[#5a5a4a] mb-2">
                            <MapPin size={18} className="shrink-0 mt-0.5 text-[#8bc34a]" />
                            <span className="text-sm">{store.address} — {store.city}, RS</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#5a5a4a] mb-6">
                            <Phone size={18} className="shrink-0 text-[#8bc34a]" />
                            <span className="text-sm">{store.whatsappFormatted}</span>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#6f8f2e] hover:bg-[#5a7a24] text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
                                Saiba Mais
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none bg-[#faf8f2]">
                              <div className="relative h-48 sm:h-64">
                                <img 
                                  src={(store as any).image || IMAGES.agro} 
                                  alt={store.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <DialogHeader className="absolute bottom-0 left-0 p-6 text-left">
                                  <DialogTitle className="text-2xl font-serif font-bold text-white">
                                    {store.name}
                                  </DialogTitle>
                                </DialogHeader>
                              </div>
                              <div className="p-6 space-y-6">
                                <div>
                                  <h4 className="text-sm font-semibold text-[#6f8f2e] uppercase tracking-wider mb-2">Localização</h4>
                                  <div className="flex items-start gap-2 text-[#3a4a2a]">
                                    <MapPin size={18} className="shrink-0 mt-0.5 text-[#8bc34a]" />
                                    <span>{store.address} — {store.city}, RS</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-semibold text-[#6f8f2e] uppercase tracking-wider mb-2">Horário de Atendimento</h4>
                                  <div className="bg-white rounded-xl p-4 border border-[#e8e4d8] space-y-2">
                                    {((store as any).hours || []).map((h: any, i: number) => (
                                      <div key={i} className="flex justify-between text-sm">
                                        <span className="font-medium text-[#3a4a2a]">{h.days}</span>
                                        <span className="text-[#6a6a5a]">{h.time}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                  <a
                                    href={`https://wa.me/${store.whatsapp}?text=Olá! Gostaria de mais informações sobre a unidade ${store.name}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white font-semibold rounded-full transition-all duration-300 shadow-md"
                                  >
                                    <Phone size={18} />
                                    Falar no WhatsApp
                                  </a>
                                  <button 
                                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address + ' ' + store.city)}`, '_blank')}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#e8e4d8] text-[#3a4a2a] font-semibold rounded-full hover:bg-[#f5f5f0] transition-all duration-300"
                                  >
                                    <MapPin size={18} />
                                    Ver no Mapa
                                  </button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevStore}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#6f8f2e] hover:bg-[#6f8f2e] hover:text-white transition-all duration-300"
              aria-label="Loja anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextStore}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#6f8f2e] hover:bg-[#6f8f2e] hover:text-white transition-all duration-300"
              aria-label="Próxima loja"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {STORES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStore(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentStore ? "w-8 bg-[#6f8f2e]" : "w-2.5 bg-[#6f8f2e]/25 hover:bg-[#6f8f2e]/40"
                  }`}
                  aria-label={`Ir para loja ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONSELHOS ========== */}
      <section className="relative">
        <WaveDivider color="#f0ede4" />
        <div className="bg-[#f0ede4] py-20 md:py-28 -mt-1">
          <div className="container">
            <SectionHeading
              title="Nossos Conselhos"
              subtitle="A governança da Cooperval é exercida por conselhos eleitos democraticamente pelos associados."
            />

            <div className="max-w-5xl mx-auto space-y-12">
              {/* Diretoria Executiva */}
              <motion.div
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#e8e4d8]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#6f8f2e]/10 flex items-center justify-center">
                    <Award size={24} className="text-[#6f8f2e]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#3a4a2a]">{COUNCILS.executive.title}</h3>
                    <span className="text-sm text-[#8bc34a] font-medium">{COUNCILS.executive.period}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#6f8f2e]/5 rounded-2xl border border-[#6f8f2e]/10">
                    <span className="text-xs font-bold text-[#6f8f2e] uppercase tracking-widest">Presidente</span>
                    <p className="text-xl text-[#3a4a2a] font-bold mt-2">{COUNCILS.executive.president}</p>
                  </div>
                  <div className="p-6 bg-[#6f8f2e]/5 rounded-2xl border border-[#6f8f2e]/10">
                    <span className="text-xs font-bold text-[#6f8f2e] uppercase tracking-widest">Vice-presidente</span>
                    <p className="text-xl text-[#3a4a2a] font-bold mt-2">{COUNCILS.executive.vicePresident}</p>
                  </div>
                </div>
              </motion.div>

              {/* Conselheiros */}
              <motion.div
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#e8e4d8]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#5fb3e6]/10 flex items-center justify-center">
                    <Users size={24} className="text-[#5fb3e6]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#3a4a2a]">{COUNCILS.counselors.title}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COUNCILS.counselors.members.map((member, idx) => (
                    <div key={idx} className="p-4 bg-[#f9f9f5] rounded-xl border border-[#e8e4d8]/50 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#8bc34a]" />
                      <span className="text-[#5a5a4a] font-medium">{member}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HORÁRIOS DE FUNCIONAMENTO ========== */}
      <section className="py-20 md:py-28 bg-[#faf8f2]">
        <div className="container">
          <SectionHeading
            title="Horários de Funcionamento"
            subtitle="Confira os horários de atendimento de todos os nossos setores e unidades."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {Object.entries(BUSINESS_HOURS).map(([key, sector], index) => (
              <motion.div
                key={key}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e4d8] hover:border-[#8bc34a]/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="font-serif text-lg font-bold text-[#3a4a2a] mb-4">
                  {sector.name}
                </h3>
                <div className="space-y-3">
                  {sector.hours.map((hour, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <span className="text-sm font-semibold text-[#6f8f2e]">{hour.days}</span>
                      <span className="text-sm text-[#5a5a4a] text-right">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={IMAGES.contact}
            alt="Paisagem rural"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2d3a1e]/75" />
        </div>
        <div className="container relative z-10 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Venha nos visitar
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Estamos prontos para atender você e sua família. Entre em contato ou visite uma de nossas lojas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contato"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#8bc34a] hover:bg-[#7ab33a] text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
              >
                Fale Conosco
              </a>
              <a
                href="https://wa.me/5554999749865?text=Olá! Gostaria de mais informações."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
