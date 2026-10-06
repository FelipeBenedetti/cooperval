import { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { sanityClient, News } from "@/lib/sanity";

interface NewsFormProps {
  news?: News | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewsForm({ news, onClose, onSuccess }: NewsFormProps) {
  const [formData, setFormData] = useState({
    title: news?.title || "",
    excerpt: news?.excerpt || "",
    content: news?.content
      ? news.content
        .map((block: any) =>
          block.children?.map((c: any) => c.text).join("") ?? ""
        )
        .join("\n")
      : "",
    publishedAt: news?.publishedAt
      ? new Date(news.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    author: news?.author || "",
    category: news?.category || "noticia",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    try {
      for (const file of Array.from(files)) {
        const asset = await sanityClient.assets.upload("image", file);
        setImageUrls((prev) => [...prev, asset._id]);
      }
    } catch (err) {
      setError("Erro ao fazer upload de imagem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const newsData: any = {
        _type: "news",
        title: formData.title,
        slug: { current: slug },
        excerpt: formData.excerpt,
        content: (typeof formData.content === "string" ? formData.content : "")
          .split("\n")
          .filter(Boolean)
          .map((text: string) => ({
            _type: "block",
            _key: Math.random().toString(36).slice(2),
            style: "normal",
            children: [{ _type: "span", _key: Math.random().toString(36).slice(2), text, marks: [] }],
            markDefs: [],
          })),
        publishedAt: new Date(formData.publishedAt).toISOString(),
        author: formData.author,
        category: formData.category,
        images: imageUrls.map((id) => ({
          _type: "image",
          asset: { _type: "reference", _ref: id },
        })),
      };

      if (news?._id) {
        // Atualizar
        await sanityClient.patch(news._id).set(newsData).commit();
      } else {
        // Criar
        await sanityClient.create(newsData);
      }

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar notícia"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-[#3a4a2a]">
          {news ? "Editar Notícia" : "Nova Notícia"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#f0ede4] rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Título *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Título da notícia"
            className="w-full px-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
            required
          />
        </div>

        {/* Resumo */}
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Resumo *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Breve resumo da notícia"
            rows={3}
            className="w-full px-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
            required
          />
        </div>

        {/* Conteúdo */}
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Conteúdo *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Conteúdo completo da notícia"
            rows={8}
            className="w-full px-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a] font-mono text-sm"
            required
          />
          <p className="text-xs text-[#5a5a4a] mt-2">
            Dica: Use quebras de linha para separar parágrafos
          </p>
        </div>

        {/* Imagens */}
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Imagens
          </label>
          <div className="border-2 border-dashed border-[#8bc34a]/30 rounded-lg p-6 text-center hover:border-[#8bc34a]/60 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload size={24} className="text-[#8bc34a]" />
              <span className="text-sm font-medium text-[#3a4a2a]">
                Clique para fazer upload de imagens
              </span>
              <span className="text-xs text-[#5a5a4a]">
                PNG, JPG até 10MB
              </span>
            </label>
          </div>
          {imageUrls.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-[#3a4a2a]">
                {imageUrls.length} imagem(ns) adicionada(s)
              </p>
            </div>
          )}
        </div>

        {/* Data de Publicação */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
              Data de Publicação *
            </label>
            <input
              type="date"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
              required
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
              Categoria
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
            >
              <option value="noticia">Notícia</option>
              <option value="evento">Evento</option>
              <option value="comunicado">Comunicado</option>
              <option value="destaque">Destaque</option>
            </select>
          </div>
        </div>

        {/* Autor */}
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Autor
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Nome do autor"
            className="w-full px-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4 pt-4 border-t border-[#e8e4d8]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-[#e8e4d8] text-[#3a4a2a] font-semibold rounded-lg hover:bg-[#f0ede4] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-[#8bc34a] hover:bg-[#7ab030] disabled:opacity-50 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Plus size={18} />
                {news ? "Atualizar" : "Publicar"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
