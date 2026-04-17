export interface Shoot {
  id: string;
  title: string;
  location: string;
  image: string; // unsplash url
  span?: "tall" | "wide" | "normal";
}

export interface YearBlock {
  year: number;
  caption: { it: string; en: string };
  shoots: Shoot[];
}

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const portfolio: YearBlock[] = [
  {
    year: 2025,
    caption: {
      it: "Un anno di luce nuova — dalle Dolomiti alla costa amalfitana.",
      en: "A year of new light — from the Dolomites to the Amalfi coast.",
    },
    shoots: [
      { id: "25-1", title: "Sofia & Marco", location: "Lago di Como, IT", image: u("photo-1519741497674-611481863552"), span: "tall" },
      { id: "25-2", title: "Emma & Liam", location: "Positano, IT", image: u("photo-1606216794074-735e91aa2c92") },
      { id: "25-3", title: "Chiara & Paul", location: "Val d'Orcia, IT", image: u("photo-1511285560929-80b456fea0bc"), span: "wide" },
      { id: "25-4", title: "Anna & Theo", location: "Santorini, GR", image: u("photo-1465495976277-4387d4b0b4c6") },
    ],
  },
  {
    year: 2024,
    caption: {
      it: "Coppie internazionali, paesaggi italiani: un dialogo costante.",
      en: "International couples, Italian landscapes: a constant dialogue.",
    },
    shoots: [
      { id: "24-1", title: "Hannah & Noah", location: "Siena, IT", image: u("photo-1519225421980-715cb0215aed") },
      { id: "24-2", title: "Léa & Antoine", location: "Provence, FR", image: u("photo-1525772764200-be829a350797"), span: "tall" },
      { id: "24-3", title: "Maya & Jonas", location: "Cinque Terre, IT", image: u("photo-1583939003579-730e3918a45a") },
      { id: "24-4", title: "Olivia & Sam", location: "Capri, IT", image: u("photo-1537633552985-df8429e8048b"), span: "wide" },
    ],
  },
  {
    year: 2023,
    caption: {
      it: "L'anno dei piccoli matrimoni intimi e dei viaggi più lunghi.",
      en: "The year of intimate weddings and longer journeys.",
    },
    shoots: [
      { id: "23-1", title: "Greta & Ben", location: "Lisbon, PT", image: u("photo-1511795409834-ef04bbd61622"), span: "wide" },
      { id: "23-2", title: "Ines & Diego", location: "Sevilla, ES", image: u("photo-1519671482749-fd09be7ccebf") },
      { id: "23-3", title: "Aurora & Tom", location: "Roma, IT", image: u("photo-1465495976277-4387d4b0b4c6"), span: "tall" },
      { id: "23-4", title: "Mila & Jack", location: "Mykonos, GR", image: u("photo-1525772764200-be829a350797") },
    ],
  },
  {
    year: 2022,
    caption: {
      it: "I primi viaggi fuori dall'Europa, le prime collaborazioni con il team.",
      en: "First trips outside Europe, first collaborations with the team.",
    },
    shoots: [
      { id: "22-1", title: "Beatrice & Luca", location: "Puglia, IT", image: u("photo-1519741497674-611481863552") },
      { id: "22-2", title: "Sara & Ahmad", location: "Marrakech, MA", image: u("photo-1583939003579-730e3918a45a"), span: "wide" },
      { id: "22-3", title: "Nora & Felix", location: "Wien, AT", image: u("photo-1606216794074-735e91aa2c92"), span: "tall" },
      { id: "22-4", title: "Eva & Karl", location: "Hallstatt, AT", image: u("photo-1511285560929-80b456fea0bc") },
    ],
  },
];

export const CONTACTS = {
  whatsapp: "+393331234567", // placeholder
  whatsappLink: "https://wa.me/393331234567",
  instagram: "https://instagram.com/nicola.weddings",
  instagramHandle: "@nicola.weddings",
  email: "hello@nicola-photography.com",
};
