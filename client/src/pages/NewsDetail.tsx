import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft, Share2 } from "lucide-react";
import { fetchNewsBySlug, urlFor, News } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import WaveDivider from "@/components/WaveDivider";

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await fetchNewsBySlug(slug);
        if (!data) {
          setError("Notícia não encontrada.");
        } else {
          setNews(data);
        }
      } catch (err) {
        setError("Erro ao carregar a notícia. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8bc34a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#5a5a4a] font-medium">Carregando notícia...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">
            {error || "Notícia não encontrada."}
          </p>
          <Link href="/noticias" className="text-[#8bc34a] hover:underline font-semibold">
            Voltar para Notícias
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/noticias/${slug}`;
  const shareText = `Confira esta notícia da Cooperval: ${news.title}`;

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      {/* Header com Imagem */}
      {news.images && news.images.length > 0 && (
        <div className="relative h-96 md:h-[500px] overflow-hidden bg-[#f0ede4]">
          <img
            src={urlFor(news.images[0]).width(1200).height(600).url()}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Breadcrumb e Título */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ChevronLeft size={18} />
                Voltar para Notícias
              </Link>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">
                {news.title}
              </h1>
            </motion.div>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Meta Informações */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-[#e8e4d8]">
              {news.publishedAt && (
                <div className="flex items-center gap-2 text-[#6a6a5a]">
                  <Calendar size={18} />
                  <span>
                    {new Date(news.publishedAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {news.author && (
                <div className="flex items-center gap-2 text-[#6a6a5a]">
                  <User size={18} />
                  <span>{news.author}</span>
                </div>
              )}
              {news.category && (
                <div className="px-4 py-1 bg-[#8bc34a]/10 text-[#6f8f2e] rounded-full text-sm font-medium">
                  {news.category}
                </div>
              )}
            </div>

            {/* Excerpt */}
            {news.excerpt && (
              <p className="text-xl text-[#5a5a4a] mb-8 italic font-medium">
                {news.excerpt}
              </p>
            )}

            {/* Conteúdo Rich Text */}
            {news.content && (
              <div className="prose prose-lg max-w-none mb-12 text-[#3a4a2a]">
                <PortableText
                  value={news.content}
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

            {/* Galeria de Imagens */}
            {news.images && news.images.length > 1 && (
              <div className="mb-12">
                <h3 className="font-serif text-2xl font-bold text-[#3a4a2a] mb-6">
                  Galeria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {news.images.slice(1).map((img, idx) => (
                    <motion.div
                      key={img._key}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="rounded-xl overflow-hidden shadow-sm border border-[#e8e4d8]"
                    >
                      <img
                        src={urlFor(img).width(600).height(400).url()}
                        alt={img.alt || `Imagem ${idx + 1}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Compartilhar */}
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

      {/* Notícias Relacionadas */}
      <section className="py-20 md:py-28 bg-[#f0ede4]">
        <WaveDivider color="#faf8f2" />
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a4a2a] text-center mb-12">
            Outras Notícias
          </h2>
          <div className="text-center">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#8bc34a] hover:bg-[#7ab030] text-white font-semibold rounded-full transition-all duration-300 shadow-md"
            >
              Ver Todas as Notícias
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
