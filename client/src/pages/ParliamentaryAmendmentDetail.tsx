import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft, Share2 } from "lucide-react";
import { PortableText } from "@portabletext/react";
import {
  fetchParliamentaryAmendmentBySlug,
  urlFor,
  ParliamentaryAmendment,
} from "@/lib/sanity";

export default function ParliamentaryAmendmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [amendment, setAmendment] = useState<ParliamentaryAmendment | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await fetchParliamentaryAmendmentBySlug(slug);
        if (!data) setError("Emenda parlamentar não encontrada.");
        else setAmendment(data);
      } catch (err) {
        setError(
          "Erro ao carregar a emenda parlamentar. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8bc34a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#5a5a4a] font-medium">
            Carregando emenda parlamentar...
          </p>
        </div>
      </div>
    );
  if (error || !amendment)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">
            {error || "Emenda parlamentar não encontrada."}
          </p>
          <Link
            href="/emendas-parlamentares"
            className="text-[#8bc34a] hover:underline font-semibold"
          >
            Voltar para Emendas Parlamentares
          </Link>
        </div>
      </div>
    );

  const shareUrl = `${window.location.origin}/emendas-parlamentares/${slug}`;
  const shareText = `Confira esta emenda parlamentar da Cooperval: ${amendment.title}`;

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      {amendment.images?.length > 0 && (
        <div className="bg-[#2d3a1e] pt-20 lg:pt-24">
          <div className="relative overflow-hidden">
            <img
              src={urlFor(amendment.images[0]).width(1200).url()}
              alt={amendment.title}
              className="w-full h-auto block"
            />
          </div>
          <div className="container py-8 md:py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/emendas-parlamentares"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
              >
                <ChevronLeft size={18} />
                Voltar para Emendas Parlamentares
              </Link>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">
                {amendment.title}
              </h1>
            </motion.div>
          </div>
        </div>
      )}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!amendment.images?.length && (
              <>
                <Link
                  href="/emendas-parlamentares"
                  className="inline-flex items-center gap-2 text-[#6f8f2e] hover:text-[#8bc34a] mb-6"
                >
                  <ChevronLeft size={18} />
                  Voltar para Emendas Parlamentares
                </Link>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#3a4a2a] mb-8">
                  {amendment.title}
                </h1>
              </>
            )}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-[#e8e4d8]">
              {amendment.publishedAt && (
                <div className="flex items-center gap-2 text-[#6a6a5a]">
                  <Calendar size={18} />
                  {new Date(amendment.publishedAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
              {amendment.author && (
                <div className="flex items-center gap-2 text-[#6a6a5a]">
                  <User size={18} />
                  {amendment.author}
                </div>
              )}
              {amendment.category && (
                <div className="px-4 py-1 bg-[#8bc34a]/10 text-[#6f8f2e] rounded-full text-sm font-medium">
                  {amendment.category}
                </div>
              )}
            </div>
            {amendment.excerpt && (
              <p className="text-xl text-[#5a5a4a] mb-8 italic font-medium">
                {amendment.excerpt}
              </p>
            )}
            {amendment.content && (
              <div className="prose prose-lg max-w-none mb-12 text-[#3a4a2a]">
                <PortableText
                  value={amendment.content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="mb-4 text-[#5a5a4a] leading-relaxed">
                          {children}
                        </p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="font-serif text-2xl font-bold text-[#3a4a2a] mt-8 mb-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="font-serif text-xl font-bold text-[#3a4a2a] mt-6 mb-3">
                          {children}
                        </h3>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2">
                          {children}
                        </ol>
                      ),
                    },
                  }}
                />
              </div>
            )}
            {amendment.images?.length > 1 && (
              <div className="mb-12">
                <h3 className="font-serif text-2xl font-bold text-[#3a4a2a] mb-6">
                  Galeria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {amendment.images.slice(1).map((img, idx) => (
                    <motion.div
                      key={img._key || idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="rounded-xl overflow-hidden shadow-sm border border-[#e8e4d8]"
                    >
                      <img
                        src={urlFor(img).width(600).url()}
                        alt={img.alt || `Imagem ${idx + 1}`}
                        className="w-full h-auto block hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            <div className="py-8 border-t border-[#e8e4d8]">
              <p className="text-[#5a5a4a] font-semibold mb-4">Compartilhar:</p>
              <div className="flex gap-4">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-full transition-colors"
                >
                  <Share2 size={16} />
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877f2] hover:bg-[#0a66c2] text-white rounded-full transition-colors"
                >
                  <Share2 size={16} />
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
