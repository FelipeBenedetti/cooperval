import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, User, ChevronRight } from "lucide-react";
import { fetchNews, urlFor, News } from "@/lib/sanity";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNews();
        setNews(data);
      } catch (err) {
        setError("Erro ao carregar notícias. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8bc34a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#5a5a4a] font-medium">Carregando notícias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#8bc34a] text-white rounded-full hover:bg-[#7ab030] transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#6f8f2e] to-[#5a7a25] py-20 md:py-28 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Notícias da Cooperval
            </h1>
            <p className="text-white/90 text-lg">
              Fique atualizado com as últimas novidades, eventos e informações sobre a Cooperativa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#5a5a4a] text-lg font-medium">
                Nenhuma notícia publicada ainda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e4d8] hover:shadow-lg hover:border-[#8bc34a]/30 transition-all duration-300 group flex flex-col"
                >
                  {/* Imagem */}
                  {item.images && item.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden bg-[#f0ede4]">
                      <img
                        src={urlFor(item.images[0]).width(400).height(300).url()}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Categoria e Data */}
                    <div className="flex items-center gap-3 mb-3 text-sm text-[#6a6a5a]">
                      {item.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {new Date(item.publishedAt).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                        </div>
                      )}
                      {item.author && (
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{item.author}</span>
                        </div>
                      )}
                    </div>

                    {/* Título */}
                    <h3 className="font-serif text-xl font-bold text-[#3a4a2a] mb-2 line-clamp-2 group-hover:text-[#8bc34a] transition-colors">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#5a5a4a] text-sm mb-4 line-clamp-3 flex-grow">
                      {item.excerpt}
                    </p>

                    {/* Link para Detalhes */}
                    <Link
                      href={`/noticias/${item.slug.current}`}
                      className="inline-flex items-center gap-2 text-[#8bc34a] font-semibold hover:gap-3 transition-all"
                    >
                      Ler Mais
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#f0ede4]">
        <WaveDivider color="#faf8f2" />
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3a4a2a] mb-4">
              Quer receber as novidades?
            </h2>
            <p className="text-[#5a5a4a] text-lg mb-8 max-w-2xl mx-auto">
              Acompanhe nossas redes sociais ou entre em contato para ficar sempre
              atualizado sobre as notícias da Cooperval.
            </p>
            <a
              href="https://wa.me/5554999749865?text=Olá! Gostaria de receber as novidades da Cooperval."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#8bc34a] hover:bg-[#7ab030] text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Entrar em Contato
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
