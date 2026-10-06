import { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import { sanityClient, ParliamentaryAmendment } from "@/lib/sanity";

interface Props {
  amendment?: ParliamentaryAmendment | null;
  onClose: () => void;
  onSuccess: () => void;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ParliamentaryAmendmentForm({
  amendment,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState({
    title: amendment?.title || "",
    excerpt: amendment?.excerpt || "",
    content: amendment?.content
      ? amendment.content
          .map(
            (block: any) =>
              block.children?.map((c: any) => c.text).join("") ?? ""
          )
          .join("\n")
      : "",
    publishedAt: amendment?.publishedAt
      ? new Date(amendment.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    author: amendment?.author || "",
    category: amendment?.category || "",
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputClass =
    "w-full px-4 py-3 border border-[#e8e4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLoading(true);
    try {
      for (const file of Array.from(e.target.files)) {
        const asset = await sanityClient.assets.upload("image", file);
        setImageUrls(prev => [...prev, asset._id]);
      }
    } catch {
      setError("Erro ao fazer upload de imagem");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const content = formData.content
        .split("\n")
        .filter(Boolean)
        .map((text: string) => ({
          _type: "block",
          _key: Math.random().toString(36).slice(2),
          style: "normal",
          children: [
            {
              _type: "span",
              _key: Math.random().toString(36).slice(2),
              text,
              marks: [],
            },
          ],
          markDefs: [],
        }));
      const amendmentData: any = {
        _type: "parliamentaryAmendment",
        title: formData.title,
        slug: { _type: "slug", current: slugify(formData.title) },
        excerpt: formData.excerpt,
        content,
        publishedAt: new Date(`${formData.publishedAt}T12:00:00`).toISOString(),
        author: formData.author,
        category: formData.category || undefined,
        ...(imageUrls.length > 0 && {
          images: imageUrls.map(id => ({
            _type: "image",
            asset: { _type: "reference", _ref: id },
          })),
        }),
      };
      if (amendment?._id)
        await sanityClient.patch(amendment._id).set(amendmentData).commit();
      else await sanityClient.create(amendmentData);
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar emenda parlamentar"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-[#3a4a2a]">
          {amendment ? "Editar Emenda Parlamentar" : "Nova Emenda Parlamentar"}
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-[#f0ede4] rounded-lg">
          <X size={24} />
        </button>
      </div>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Título *
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Resumo *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Conteúdo *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={8}
            className={`${inputClass} font-mono text-sm`}
          />
          <p className="text-xs text-[#5a5a4a] mt-2">
            Use quebras de linha para separar parágrafos.
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Imagens
          </label>
          <div className="border-2 border-dashed border-[#8bc34a]/30 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="amendment-image-upload"
            />
            <label
              htmlFor="amendment-image-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload size={24} className="text-[#8bc34a]" />
              <span className="text-sm font-medium text-[#3a4a2a]">
                Clique para fazer upload de imagens
              </span>
              <span className="text-xs text-[#5a5a4a]">PNG, JPG até 10MB</span>
            </label>
          </div>
          {imageUrls.length > 0 && (
            <p className="text-sm text-[#3a4a2a] mt-2">
              {imageUrls.length} imagem(ns) adicionada(s)
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
              Data de Publicação *
            </label>
            <input
              type="date"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
              Categoria
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ex.: Infraestrutura"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Autor
          </label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex gap-4 pt-4 border-t border-[#e8e4d8]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-[#e8e4d8] text-[#3a4a2a] font-semibold rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-[#8bc34a] hover:bg-[#7ab030] disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              "Salvando..."
            ) : (
              <>
                <Plus size={18} />
                {amendment ? "Atualizar" : "Publicar"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
