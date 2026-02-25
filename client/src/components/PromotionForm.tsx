import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { sanityClient, Promotion } from "@/lib/sanity";

interface PromotionFormProps {
  promotion?: Promotion | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PromotionForm({
  promotion,
  onClose,
  onSuccess,
}: PromotionFormProps) {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    originalPrice: 0,
    currentPrice: 0,
    category: "",
    validUntil: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (promotion) {
      setFormData({
        productName: promotion.productName,
        description: promotion.description,
        originalPrice: promotion.originalPrice,
        currentPrice: promotion.currentPrice,
        category: promotion.category || "",
        validUntil: promotion.validUntil.split("T")[0],
      });
    }
  }, [promotion]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "originalPrice" || name === "currentPrice"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let imageAsset = null;

      // Upload imagem se fornecida
      if (imageFile) {
        const formDataImage = new FormData();
        formDataImage.append("file", imageFile);

        const uploadResponse = await sanityClient.assets.upload(
          "image",
          imageFile,
          {
            filename: imageFile.name,
          }
        );

        imageAsset = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadResponse._id,
          },
        };
      }

      const promotionData = {
        _type: "promotion",
        productName: formData.productName,
        slug: {
          _type: "slug",
          current: generateSlug(formData.productName),
        },
        description: formData.description,
        originalPrice: formData.originalPrice,
        currentPrice: formData.currentPrice,
        category: formData.category || undefined,
        validUntil: new Date(formData.validUntil).toISOString(),
        createdAt: new Date().toISOString(),
        ...(imageAsset && { image: imageAsset }),
      };

      if (promotion) {
        // Atualizar promoção existente
        await sanityClient
          .patch(promotion._id)
          .set(promotionData)
          .commit();
      } else {
        // Criar nova promoção
        await sanityClient.create(promotionData);
      }

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar promoção"
      );
      console.error("Erro ao salvar promoção:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-[#3a4a2a]">
          {promotion ? "Editar Promoção" : "Nova Promoção"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
          Nome do Produto *
        </label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
          placeholder="Ex: Adubo Organico 50kg"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
          Descrição *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
          placeholder="Descreva os detalhes do produto..."
        />
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Preço Original *
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
            Preço Promocional *
          </label>
          <input
            type="number"
            name="currentPrice"
            value={formData.currentPrice}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
          Categoria
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
        >
          <option value="">Selecione uma categoria</option>
          <option value="Sementes">Sementes</option>
          <option value="Adubo">Adubo</option>
          <option value="Ferramentas">Ferramentas</option>
          <option value="Ração">Ração</option>
          <option value="Medicamentos">Medicamentos</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* Valid Until */}
      <div>
        <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
          Válido até *
        </label>
        <input
          type="date"
          name="validUntil"
          value={formData.validUntil}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-[#3a4a2a] mb-2">
          Imagem do Produto
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
        />
        <p className="text-xs text-gray-500 mt-2">
          Formatos: JPG, PNG, WebP (máximo 10MB)
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-[#8bc34a] hover:bg-[#7ab030] text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Salvando..." : promotion ? "Atualizar" : "Criar"}
        </button>
      </div>
    </form>
  );
}
