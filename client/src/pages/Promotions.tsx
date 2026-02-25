import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Calendar, DollarSign } from "lucide-react";
import { fetchPromotions, Promotion, urlFor } from "@/lib/sanity";
import SectionHeading from "@/components/SectionHeading";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      setLoading(true);
      const data = await fetchPromotions();
      setPromotions(data || []);
    } catch (error) {
      console.error("Erro ao carregar promoções:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(
    new Set(promotions.map((p) => p.category).filter(Boolean))
  );

  const filteredPromotions = selectedCategory
    ? promotions.filter((p) => p.category === selectedCategory)
    : promotions;

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#8bc34a] to-[#6f8f2e] text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <ShoppingCart size={40} />
            <h1 className="text-5xl font-bold">Promoções</h1>
          </div>
          <p className="text-lg text-green-100 max-w-2xl">
            Confira as melhores ofertas e promoções especiais da Cooperval. Produtos de qualidade com preços imperdíveis!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          {/* Filter by Category */}
          {categories.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-[#3a4a2a] mb-4">
                Filtrar por Categoria
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === null
                      ? "bg-[#8bc34a] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-[#8bc34a] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Promotions Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-[#8bc34a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Carregando promoções...</p>
            </div>
          ) : filteredPromotions.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-xl text-gray-600">
                {selectedCategory
                  ? "Nenhuma promoção encontrada nesta categoria"
                  : "Nenhuma promoção ativa no momento"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPromotions.map((promotion, index) => {
                const discount = calculateDiscount(
                  promotion.originalPrice,
                  promotion.currentPrice
                );
                const daysLeft = Math.ceil(
                  (new Date(promotion.validUntil).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <motion.div
                    key={promotion._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-gray-100 h-64">
                      {promotion.image && (
                        <img
                          src={urlFor(promotion.image).url()}
                          alt={promotion.productName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      {discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                          -{discount}%
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#3a4a2a] mb-2 line-clamp-2">
                        {promotion.productName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {promotion.description}
                      </p>

                      {/* Prices */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-3xl font-bold text-[#8bc34a]">
                            R$ {promotion.currentPrice.toFixed(2)}
                          </span>
                          {promotion.originalPrice > promotion.currentPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              R$ {promotion.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Category & Validity */}
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        {promotion.category && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#8bc34a] rounded-full" />
                            <span>{promotion.category}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>
                            {daysLeft > 0
                              ? `Válido por ${daysLeft} dias`
                              : "Promoção expirada"}
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={`https://wa.me/5555999999999?text=Olá! Gostaria de saber mais sobre a promoção: ${promotion.productName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#8bc34a] hover:bg-[#7ab030] text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Saiba Mais
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
