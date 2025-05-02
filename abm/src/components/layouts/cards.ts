import { layoutCardsTexts } from "@/constants";

export const cardsData = [
  {
    description: "",
    title: "Clásico",
    src: "/classic-layout-1.png",
    ctaText: layoutCardsTexts.ctaText,
    ctaLink: layoutCardsTexts.ctaLink,
    type: "classic",
    content:
      "Diseño clásico, se pueden agregar una lista de productos, hasta 4 productos destacados, medios de entrega, medios de pago y redes sociales.",
  },
  {
    description: "",
    title: "Simple",
    src: "/empty-layout-1.png",
    ctaText: layoutCardsTexts.ctaText,
    ctaLink: layoutCardsTexts.ctaLink,
    type: "empty",
    content:
      "Diseño simple, totalmente personalizable. Agregá widgets a tu gusto.",
  },
  {
    description: "",
    title: "Próximamente más...",
    src: "/next.png",
    ctaText: "",
    ctaLink: "",
    type: "",
    content: "",
  },
];
