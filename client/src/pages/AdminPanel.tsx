import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Search,
  Calendar,
  FileText,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { sanityClient, News } from "@/lib/sanity";
import NewsForm from "@/components/NewsForm";

export default function AdminPanelPage() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [, navigate] = useLocation();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await sanityClient.fetch(`*[_type == "news"] | order(publishedAt desc)`);
      setNews(data || []);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      // Executar o delete
      await sanityClient.delete(id);
      
      // Remover imediatamente da lista local
      setNews(news.filter((n) => n._id !== id));
      setDeleteConfirm(null);
      
      // Recarregar a lista após um pequeno delay para garantir sincronização
      setTimeout(() => {
        loadNews();
      }, 500);
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
      alert("Erro ao deletar notícia. Tente novamente.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e8e4d8] shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#3a4a2a]">
              Painel de Notícias
            </h1>
            <p className="text-sm text-[#5a5a4a]">
              Bem-vindo, {user?.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8bc34a]"
            />
            <input
              type="text"
              placeholder="Pesquisar notícias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
            />
          </div>

          {/* New Button */}
          <button
            onClick={() => {
              setEditingNews(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8bc34a] hover:bg-[#7ab030] text-white font-semibold rounded-lg transition-all"
          >
            <Plus size={18} />
            Nova Notícia
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 pt-32"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <NewsForm
                news={editingNews}
                onClose={() => {
                  setShowForm(false);
                  setEditingNews(null);
                }}
                onSuccess={() => {
                  setShowForm(false);
                  setEditingNews(null);
                  loadNews();
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* News List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[#8bc34a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#5a5a4a]">Carregando notícias...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-[#e8e4d8]">
              <FileText size={48} className="mx-auto mb-4 text-[#8bc34a]/30" />
              <p className="text-[#5a5a4a] text-lg font-medium">
                {searchTerm ? "Nenhuma notícia encontrada" : "Nenhuma notícia publicada"}
              </p>
            </div>
          ) : (
            filteredNews.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg border border-[#e8e4d8] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-bold text-[#3a4a2a] mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5a5a4a] mb-3 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#6a6a5a]">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
                      </div>
                      {item.category && (
                        <div className="px-2 py-1 bg-[#8bc34a]/10 text-[#6f8f2e] rounded">
                          {item.category}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => window.open(`/noticias/${item.slug.current}`, "_blank")}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      title="Visualizar"
                    >
                      <Eye size={16} />
                      <span className="md:hidden">Ver</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingNews(item);
                        setShowForm(true);
                      }}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#8bc34a]/10 hover:bg-[#8bc34a]/20 text-[#6f8f2e] rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                      <span className="md:hidden">Editar</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(item._id)}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      title="Deletar"
                    >
                      <Trash2 size={16} />
                      <span className="md:hidden">Deletar</span>
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === item._id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between gap-4"
                  >
                    <p className="text-red-700 font-medium">
                      Tem certeza que deseja deletar esta notícia?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1 bg-white border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Deletar
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
