import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Configuração do cliente Sanity
// Você precisará substituir os valores abaixo pelos seus valores do Sanity
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "seu-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
  token: import.meta.env.VITE_SANITY_TOKEN,
});

// Builder para URLs de imagens
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => {
  return builder.image(source);
};

// Tipos TypeScript para Notícias
export interface NewsImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface News {
  _id: string;
  _type: "news";
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any; // Rich text (Portable Text)
  images: NewsImage[];
  publishedAt: string;
  author?: string;
  category?: string;
}

// Queries GROQ
export const newsQueries = {
  // Obter todas as notícias (ordenadas por data de publicação)
  allNews: `*[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": images[0],
    author,
    category
  }`,

  // Obter notícia por slug
  newsBySlug: (slug: string) => `*[_type == "news" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    images,
    publishedAt,
    author,
    category
  }`,

  // Obter notícias recentes (últimas 5)
  recentNews: `*[_type == "news"] | order(publishedAt desc)[0..4] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": images[0],
    author,
    category
  }`,

  // Obter notícias por categoria
  newsByCategory: (category: string) => `*[_type == "news" && category == "${category}"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "mainImage": images[0],
    author,
    category
  }`,
};

// Funções auxiliares para fetching
export const fetchNews = async (): Promise<News[]> => {
  try {
    const data = await sanityClient.fetch(newsQueries.allNews);
    return data;
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
};

export const fetchNewsBySlug = async (slug: string): Promise<News | null> => {
  try {
    const data = await sanityClient.fetch(newsQueries.newsBySlug(slug));
    return data;
  } catch (error) {
    console.error("Erro ao buscar notícia:", error);
    return null;
  }
};

export const fetchRecentNews = async (): Promise<News[]> => {
  try {
    const data = await sanityClient.fetch(newsQueries.recentNews);
    return data;
  } catch (error) {
    console.error("Erro ao buscar notícias recentes:", error);
    return [];
  }
};
