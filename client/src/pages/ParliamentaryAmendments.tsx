import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, User, ChevronRight } from "lucide-react";
import {
  fetchParliamentaryAmendments,
  urlFor,
  ParliamentaryAmendment,
} from "@/lib/sanity";

export default function ParliamentaryAmendmentsPage() {
  const [amendments, setAmendments] = useState<ParliamentaryAmendment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAmendments = async () => {
      try {
        setLoading(true);
        setAmendments(await fetchParliamentaryAmendments());
      } catch (err) {
        setError(
          "Erro ao carregar emendas parlamentares. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAmendments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f2]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8bc34a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#5a5a4a] font-medium">
            Carregando emendas parlamentares...
          </p>
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
      <section className="relative bg-gradient-to-br from-[#6f8f2e] to-[#5a7a25] py-20 md:py-28 pt-32 lg:pt-40 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Emendas Parlamentares
            </h1>
            <p className="text-white/90 text-lg">
              Acompanhe as emendas parlamentares destinadas à Cooperval e os
              resultados gerados para nossa cooperativa.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          {amendments.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#5a5a4a] text-lg font-medium">
                Nenhuma emenda parlamentar publicada ainda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amendments.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8e4d8] hover:shadow-lg hover:border-[#8bc34a]/30 transition-all duration-300 group flex flex-col"
                >
                  {item.images?.length > 0 && (
                    <div className="relative h-48 overflow-hidden bg-[#f0ede4]">
                      <img
                        src={urlFor(item.images[0])
                          .width(400)
                          .height(300)
                          .url()}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
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
                    <h3 className="font-serif text-xl font-bold text-[#3a4a2a] mb-2 line-clamp-2 group-hover:text-[#8bc34a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#5a5a4a] text-sm mb-4 line-clamp-3 flex-grow">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/emendas-parlamentares/${item.slug.current}`}
                      className="inline-flex items-center gap-2 text-[#8bc34a] font-semibold hover:gap-3 transition-all"
                    >
                      Ler Mais <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
