/*
 * Design: Terra Viva — Naturalismo Orgânico
 * Quem Somos: História da Cooperval, missão, valores, estrutura física e timeline
 */
import { motion } from "framer-motion";
import { Heart, Target, Eye } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import { timeline, structures } from "../lib/constants";
import { IMAGES, STATS } from "@/lib/constants";

export default function QuemSomos() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.about} alt="Equipe Cooperval" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#2d3a1e]/70" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Quem Somos
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Conheça a história, missão e valores da Cooperval
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-12 md:h-16 lg:h-20" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,10 1080,50 C1260,65 1380,55 1440,40 L1440,80 L0,80 Z" fill="#faf8f2" />
          </svg>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 md:py-28 bg-[#faf8f2]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {[
              { icon: Target, title: "Missão", text: "Promover o desenvolvimento econômico, social e humano dos nossos associados e da comunidade, oferecendo produtos e serviços de qualidade com atendimento personalizado." },
              { icon: Eye, title: "Visão", text: "Ser referência em cooperativismo no agronegócio gaúcho, reconhecida pela excelência no atendimento e pelo compromisso com o desenvolvimento sustentável da região." },
              { icon: Heart, title: "Valores", text: "Cooperação, transparência, sustentabilidade, respeito às pessoas, compromisso com a comunidade e valorização do trabalho rural." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e4d8] text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#6f8f2e]/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={32} className="text-[#6f8f2e]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3a4a2a] mb-3">{item.title}</h3>
                <p className="text-[#6a6a5a] leading-relaxed text-[15px]">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* História */}
          <SectionHeading
            title="Nossa História"
            subtitle="Uma trajetória de coragem, união e crescimento no coração do Alto Uruguai gaúcho."
          />

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="prose prose-lg max-w-none mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#5a5a4a] text-lg leading-relaxed mb-6">
                A <strong className="text-[#6f8f2e]">COOPERVAL</strong> tem na sua história a essência do cooperativismo em promover o desenvolvimento econômico, social e humano de forma sustentável e equilibrada. Fundada em <strong>16 de junho de 1993</strong>, após a falência da estatal Coorlac, nasceu da coragem e união de um grupo de agricultores, que enxergaram na cooperação uma oportunidade de crescimento.
              </p>
              <p className="text-[#5a5a4a] text-lg leading-relaxed mb-6">
                No início, atuava apenas na captação de leite. Com o tempo, as atividades se expandiram para a venda de insumos agropecuários, produtos de mercado e serviços técnicos, sempre voltados a valorizar os associados e suas famílias. A cooperativa passou também a administrar diretamente a comercialização de leite, tornando-se cada vez mais sólida e independente.
              </p>
              <p className="text-[#5a5a4a] text-lg leading-relaxed">
                Hoje, somos mais de <strong className="text-[#6f8f2e]">50 colaboradores</strong>, com estrutura moderna, múltiplos pontos de atendimento e atuação em <strong className="text-[#6f8f2e]">27 municípios</strong> da região norte do RS. Mantemos os pés no passado para valorizar nossa história, mas o olhar está voltado para o futuro, construído diariamente com o coração no presente.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#8bc34a]/30 md:-translate-x-px" />
              
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <span className="font-serif text-3xl font-bold text-[#6f8f2e]">{item.year}</span>
                    <h4 className="font-serif text-xl font-semibold text-[#3a4a2a] mt-1">{item.title}</h4>
                    <p className="text-[#6a6a5a] mt-2 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#8bc34a] rounded-full border-4 border-[#faf8f2] -translate-x-1/2 mt-1.5 z-10" />
                  
                  <div className="md:hidden pl-10">
                    <span className="font-serif text-2xl font-bold text-[#6f8f2e]">{item.year}</span>
                    <h4 className="font-serif text-lg font-semibold text-[#3a4a2a] mt-1">{item.title}</h4>
                    <p className="text-[#6a6a5a] mt-1 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Estrutura Física */}
      <section className="relative">
        <WaveDivider color="#6f8f2e" />
        <div className="bg-[#6f8f2e] py-16 md:py-24 -mt-1">
          <div className="container">
            <SectionHeading title="Estrutura Física" light />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {structures.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <s.icon size={32} className="text-[#b7d97a] mb-4" />
                  <h4 className="font-serif text-lg font-bold text-white mb-1">{s.title}</h4>
                  <p className="text-[#b7d97a] text-sm font-medium mb-2">{s.location}</p>
                  <p className="text-white/70 text-sm">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider color="#faf8f2" />
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-[#faf8f2] -mt-1">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="block font-serif text-4xl md:text-5xl font-bold text-[#6f8f2e] mb-2">{stat.value}</span>
                <span className="text-[#6a6a5a] text-sm font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
