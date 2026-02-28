// Cooperval - Constantes do site
// URLs de imagens e dados estáticos
import { Building2, Milk, Warehouse, Factory} from "lucide-react";
import logo from '../assets/logo.png'
import logoDetec from '../assets/detec.png'
import logoNutricao from '../assets/nutricao.png'
import soucoop from '../assets/somoscoop2.jpg'
import hero from '../assets/hero.webp'
import about from '../assets/about.png'
import agro from '../assets/agro.webp'
import market from '../assets/market.webp'
import contact from '../assets/contact.webp'
import matriz from '../assets/MATRIZ.jpeg'
import erechim from '../assets/Erechim.jpeg'
import barao from '../assets/barao.jpeg'
import benjamin from '../assets/Benjamin Constant Do Sul.jpeg'
import faxinalzinho from '../assets/Faxinalzinho.jpeg'
import itatiba from '../assets/Itatiba do Sul.jpeg'

import fabricaderacao from '../assets/fabricaderacoes.jpeg'
import mercado from '../assets/mercado.jpeg'
import recolhimentoerecebimento from '../assets/recolhimentoereesfriamentodeleite.jpeg'
import agropecuaria from '../assets/agropecuaria.jpeg'

export const IMAGES = {
  logo,
  logoDetec,
  logoNutricao,
  soucoop,
  hero,
  about,
  agro,
  market,
  contact,
  fabricaderacao,
  mercado,
  recolhimentoerecebimento,
  agropecuaria,
};

export const timeline = [
  { year: "1993", title: "Fundação", desc: "Após a falência da estatal Coorlac, um grupo de agricultores corajosos funda a Cooperval em 16 de junho." },
  { year: "1994", title: "Captação de Leite", desc: "Início das atividades com foco na captação e comercialização de leite in natura." },
  { year: "1996", title: "Expansão", desc: "Ampliação para venda de insumos agropecuários, produtos de mercado e serviços técnicos." },
  { year: "2004", title: "Agropecuária", desc: "Abertura da primeira filial agropecuária." },
  { year: "2014", title: "Comercialização Direta", desc: "A cooperativa passa a administrar diretamente a comercialização de leite, tornando-se mais sólida." },
  { year: "2020", title: "Modernização", desc: "Investimentos em infraestrutura moderna e abertura de novos pontos de atendimento." },
  { year: "Hoje", title: "Consolidação", desc: "Mais de 50 colaboradores, 9 pontos de atendimento em 6 municípios, abrangendo 27 municípios do RS." },
];

export const structures = [
  { icon: Building2, title: "Sede Administrativa", location: "Erval Grande", desc: "Mercado, agropecuária, setor técnico e administrativo" },
  { icon: Milk, title: "Posto de Recebimento de Leite", location: "Erval Grande", desc: "Captação e resfriamento de leite" },
  { icon: Warehouse, title: "Centro de Distribuição", location: "Erval Grande", desc: "Distribuição de insumos agropecuários" },
  { icon: Factory, title: "Fábrica de Rações e Cereais", location: "Benjamin Constant do Sul", desc: "Produção de rações e recebimento de cereais" },
];


export const STORES = [
  {
    name: "Agropecuária Matriz",
    city: "Erval Grande",
    address: "Praça Ulisses Guimarães, 57, Centro",
    whatsapp: "5554984141517",
    whatsappFormatted: "(54) 98414-1517",
    description: "Centro Administrativo, Mercado, Agropecuária, Padaria e mais",
    image: matriz,
    isMain: true,
    hours: [
      { days: "Segunda à sexta", time: "08h às 12h / 13h30 às 18h" },
      { days: "Sábados", time: "08h às 12h" },
    ],
  },
  {
    name: "Agropecuária Faxinalzinho",
    city: "Faxinalzinho",
    address: "Av. Lido Armando Outramari, 586, Centro",
    whatsapp: "5554999442739",
    whatsappFormatted: "(54) 99944-2739",
    description: "Loja agropecuária completa",
    image: faxinalzinho,
    isMain: false,
    hours: [
      { days: "Segunda à sexta", time: "08h às 11h30 / 13h às 17h30" },
      { days: "Sábados", time: "08h às 11h" },
    ],
  },
  {
    name: "Agropecuária Itatiba do Sul",
    city: "Itatiba do Sul",
    address: "Av. Antonilo Angelo Tozzo, 590, Centro",
    whatsapp: "5554999531575",
    whatsappFormatted: "(54) 99953-1575",
    description: "Loja agropecuária completa",
    image: itatiba,
    isMain: false,
    hours: [
      { days: "Segunda à sexta", time: "08h às 11h30 / 13h às 17h30" },
      { days: "Sábados", time: "08h às 11h" },
    ],
  },
  {
    name: "Agropecuária Benjamin Constant",
    city: "Benjamin Constant do Sul",
    address: "Av. Ernesto Gaboardi, 920, Centro",
    whatsapp: "5554984347926",
    whatsappFormatted: "(54) 98434-7926",
    description: "Loja agropecuária e fábrica de rações",
    image: benjamin,
    isMain: false,
    hours: [
      { days: "Segunda à sexta", time: "08h às 11h30 / 13h às 17h30" },
      { days: "Sábados", time: "08h às 11h" },
    ],
  },
  {
    name: "Agropecuária Barão de Cotegipe",
    city: "Barão de Cotegipe",
    address: "Av. Vinte e Um de Abril, 62, Centro",
    whatsapp: "5554999714279",
    whatsappFormatted: "(54) 99971-4279",
    description: "Loja agropecuária completa",
    image: barao,
    isMain: false,
    hours: [
      { days: "Segunda à sexta", time: "08h às 11h30 / 13h às 17h30" },
      { days: "Sábados", time: "08h às 11h" },
    ],
  },
  {
    name: "Agropecuária Erechim",
    city: "Erechim",
    address: "Av. Caldas Junior, 567, Bairro Três Vendas",
    whatsapp: "5554991524686",
    whatsappFormatted: "(54) 99152-4686",
    description: "Loja agropecuária completa",
    image: erechim,
    isMain: false,
    hours: [
      { days: "Segunda à sexta", time: "08h às 11h30 / 13h às 17h30" },
      { days: "Sábados", time: "08h às 11h" },
    ],
  },
];

export const SERVICES = [
  {
    icon: "Factory",
    title: "Fábrica de Rações - Nutrição",
    image: logoDetec,
    description: "Produção própria de rações para bovinos, suínos, aves e ovinos com a marca Nutrição Cooperval. Foco principal da empresa em qualidade e nutrição animal.",
    featured: false,
  },
  {
    icon: "ShoppingCart",
    title: "Mercado",
    description: "Linha completa de produtos de mercearia, higiene e limpeza, açougue e padaria com os melhores preços.",
  },
  {
    icon: "Tractor",
    title: "Agropecuária",
    description: "Ampla variedade de medicamentos veterinários, rações, utensílios para pecuária e lavoura, hortifrutigranjeiros.",
  },
  {
    icon: "Milk",
    title: "Recebimento de Leite",
    description: "Captação e comercialização de leite in natura e prestação de serviços de resfriamento para empresas parceiras.",
  },
  {
    icon: "Wheat",
    title: "Recebimento de Cereais",
    description: "Recebimento de safras de inverno e verão com infraestrutura moderna e eficiente.",
  },
  {
    icon: "Stethoscope",
    title: "Assistência Técnica",
    description: "Serviços em clínica veterinária, assistência agrícola e nutrição animal com profissionais especializados.",
  },
];

export const COUNCILS = {
  fiscal: {
    title: "Conselho Fiscal",
    period: "2025-2026",
    effective: ["Ivo Ostroski", "Dolcimar Antonio Orso", "Vladenice Bertotti"],
    substitutes: ["João Batista Rubas", "Ari Francisco Steinke", "Jandir Buratti"],
  },
  administrative: {
    title: "Conselho Administrativo",
    period: "2024-2026",
    president: "Giovani Tessaro",
    vicePresident: "Fabrício Rocco Gasparetto",
    sec: "Ademir Baldo",
    counselors: [
      "Jaci Agustinho Auziliero",
      "Marcel Liotto",
      "Gessi Fátima Cortina Vieira Dos Santos",
      "Evandro Carlos Bertela",
    ],
  },
};

export const STATS = [
  { value: "30+", label: "Anos de história" },
  { value: "50+", label: "Colaboradores" },
  { value: "9", label: "Pontos de atendimento" },
  { value: "27", label: "Municípios atendidos" },
];

export const BUSINESS_HOURS = {
  market: {
    name: "Mercado",
    hours: [
      { days: "Segunda à sexta", time: "08h às 12h / 13h30 às 19h" },
      { days: "Sábados", time: "08h às 12h / 14h às 18h" },
      { days: "Domingos", time: "08h30 às 11h30" },
    ],
  },
  agroMatrix: {
    name: "Agropecuária Matriz e Logística",
    hours: [
      { days: "Segunda à sexta", time: "08h às 12h / 13h30 às 18h" },
      { days: "Sábados", time: "08h às 12h" },
    ],
  },
  agroFilial: {
    name: "Agropecuárias Filiais",
    hours: [
      { days: "Segunda à sexta", time: "08h às 11h30 / 13h às 17h30" },
      { days: "Sábados", time: "08h às 11h" },
    ],
  },
  administrative: {
    name: "Setor Administrativo",
    hours: [
      { days: "Segunda à sexta", time: "08h às 12h / 13h30 às 18h" },
      { days: "Sábados", time: "08h às 12h" },
    ],
  },
  feedFactory: {
    name: "Fábrica de Rações",
    hours: [
      { days: "Segunda à sexta", time: "07h às 12h / 13h às 17h" },
      { days: "Sábados", time: "07h às 11h" },
    ],
  },
  milkCollection: {
    name: "Posto de Recebimento de Leite",
    hours: [
      { days: "Segunda à sexta", time: "06h às 12h / 12h às 18h" },
      { days: "Sábados e domingos", time: "06h às 16h" },
    ],
  },
  distributionCenter: {
    name: "Centro de Distribuição",
    hours: [
      { days: "Segunda à sexta", time: "08h às 12h / 13h30 às 18h" },
      { days: "Sábados", time: "08h às 12h" },
    ],
  },
};
