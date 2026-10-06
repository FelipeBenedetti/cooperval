/*
 * Design: Terra Viva — Naturalismo Orgânico
 * Contato: Formulário de contato, mapa, informações de contato e redes sociais
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import { IMAGES, STORES } from "@/lib/constants";
import { MapView } from "@/components/Map";
import { toast } from "sonner";

export default function Contato() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível enviar sua mensagem.");
      }

      setSubmitted(true);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível enviar sua mensagem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.contact} alt="Paisagem rural" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#2d3a1e]/70" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Contato</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Entre em contato conosco. Estamos prontos para atender você.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-12 md:h-16 lg:h-20" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,10 1080,50 C1260,65 1380,55 1440,40 L1440,80 L0,80 Z" fill="#faf8f2" />
          </svg>
        </div>
      </section>

      {/* Formulário + Info */}
      <section className="py-20 md:py-28 bg-[#faf8f2]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3a4a2a] mb-2">
                Envie sua mensagem
              </h2>
              <p className="text-[#6a6a5a] mb-8">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </p>

              {submitted ? (
                <motion.div
                  className="bg-[#6f8f2e]/10 rounded-2xl p-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={56} className="text-[#6f8f2e] mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold text-[#3a4a2a] mb-2">Mensagem Enviada!</h3>
                  <p className="text-[#6a6a5a]">Obrigado pelo contato. Retornaremos em breve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4a4a3a] mb-1.5">Nome completo *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#e0dcd0] rounded-xl text-[#3a4a2a] placeholder:text-[#a0a090] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]/50 focus:border-[#8bc34a] transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4a4a3a] mb-1.5">E-mail *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#e0dcd0] rounded-xl text-[#3a4a2a] placeholder:text-[#a0a090] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]/50 focus:border-[#8bc34a] transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4a4a3a] mb-1.5">Telefone</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#e0dcd0] rounded-xl text-[#3a4a2a] placeholder:text-[#a0a090] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]/50 focus:border-[#8bc34a] transition-all"
                        placeholder="(54) 98414-1382"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4a4a3a] mb-1.5">Assunto *</label>
                      <select
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#e0dcd0] rounded-xl text-[#3a4a2a] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]/50 focus:border-[#8bc34a] transition-all"
                      >
                        <option value="">Selecione...</option>
                        <option value="informacoes">Informações Gerais</option>
                        <option value="mercado">Mercado</option>
                        <option value="agropecuaria">Agropecuária</option>
                        <option value="racoes">Fábrica de Rações</option>
                        <option value="leite">Recebimento de Leite</option>
                        <option value="tecnica">Assistência Técnica</option>
                        <option value="associacao">Quero me Associar</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4a4a3a] mb-1.5">Mensagem *</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#e0dcd0] rounded-xl text-[#3a4a2a] placeholder:text-[#a0a090] focus:outline-none focus:ring-2 focus:ring-[#8bc34a]/50 focus:border-[#8bc34a] transition-all resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#6f8f2e] hover:bg-[#5a7a24] text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Send size={18} />
                    {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e4d8] mb-6">
                <h3 className="font-serif text-xl font-bold text-[#3a4a2a] mb-6">Informações de Contato</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6f8f2e]/10 flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-[#6f8f2e]" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-[#3a4a2a]">Endereço</span>
                      <span className="text-sm text-[#6a6a5a]">Praça Ulisses Guimarães, 57, Centro<br />Erval Grande — RS</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6f8f2e]/10 flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-[#6f8f2e]" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-[#3a4a2a]">Telefone / WhatsApp</span>
                      <a href="tel:+5554984141517" className="text-sm text-[#5fb3e6] hover:underline">(54) 98414-1517</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6f8f2e]/10 flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-[#6f8f2e]" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-[#3a4a2a]">E-mail</span>
                      <a href="mailto:adm01@cooperval-eg.com.br" className="text-sm text-[#5fb3e6] hover:underline">adm01@cooperval-eg.com.br</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6f8f2e]/10 flex items-center justify-center shrink-0">
                      <Clock size={20} className="text-[#6f8f2e]" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-[#3a4a2a]">Horário de Funcionamento</span>
                      <span className="text-sm text-[#6a6a5a]">Seg a Sex: 7h30 às 18h<br />Sáb: 7h30 às 12h</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* WhatsApp das lojas */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e8e4d8]">
                <h3 className="font-serif text-xl font-bold text-[#3a4a2a] mb-4">WhatsApp das Lojas</h3>
                <ul className="space-y-3">
                  {STORES.map((store) => (
                    <li key={store.name}>
                      <a
                        href={`https://wa.me/${store.whatsapp}?text=Olá! Gostaria de mais informações.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#25d366]/5 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#25d366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25d366]/20 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25d366]">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        <div>
                          <span className="block text-sm font-semibold text-[#3a4a2a]">{store.city}</span>
                          <span className="text-xs text-[#6a6a5a]">{store.whatsappFormatted}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="relative">
        <WaveDivider color="#f0ede4" />
        <div className="bg-[#f0ede4] py-16 md:py-20 -mt-1">
          <div className="container">
            <SectionHeading title="Nossa Localização" subtitle="Sede administrativa em Erval Grande, RS" />
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-[#e8e4d8] h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4239.050278161992!2d-52.5706752!3d-27.3902018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1774547453236!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Cooperval - Erval Grande, RS"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
