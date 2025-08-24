export const menuItems = [
  { name: "Home", link: "/", submenu: [] },
  {
    name: "Shop All",
    link: "/all-plants",
    submenu: [
      { name: "New Arrivals", link: "/new-arrivals" },
      // { name: "Best Deals", link: "/best-deals" },
    ],
  },
  {
    name: "Houseplants",
    link: "/house-plants",
    submenu: [
      { name: "House Decor", link: "/house-plants/indoor-plants" },
      { name: "Pet-Friendly", link: "/house-plants/pet-friendly-plants" },
      { name: "Easy Care", link: "/house-plants/easy-care-plants" },
      { name: "Low Light", link: "/house-plants/low-light-plants" },
      { name: "Air Purifying ", link: "/house-plants/air-purifying-plants" },
    ],
  },
  {
    name: "Outdoor & Patio",
    link: "/outdoor-patio",
    submenu: [
      { name: "Fruit & Berry", link: "/outdoor-patio/outdoor-plants" },
      { name: "Bonsai & Miniatures", link: "/outdoor-patio/bonsai-miniatures" },
      { name: "Succulents", link: "/outdoor-patio/succulents" },
      { name: "Patio Plants", link: "/outdoor-patio/large-plants" },
      { name: "Flowering Trees", link: "/outdoor-patio/flowering-plants" },
    ],
  },
  {
    name: "Orchids & Blooms",
    link: "/orchids-blooms",
    // submenu: [{ name: "Bundles", link: "/orchids-blooms/bundles" }],
    submenu: [],
  },
  { name: "Gifts", link: "/gifts", submenu: [] },
  { name: "Planters", link: "/planters", submenu: [] },
  { name: "Plant Care", link: "/plant-care", submenu: [] },
  { name: "Sale", link: "/on-sale", submenu: [], className: "text-red-500" },
];

export const OrchidData = [
  {
    id: 1,
    title: "How long does an orchid live?",
    details:
      "When properly cared for, orchids live several years. The Phalaenopsis orchid can bloom for several months. If the orchid does not die once it stops blooming, the plant can start blooming again. The orchid's main structure keeps the plant alive, so it’s essential to provide support and ideal conditions.",
  },
  {
    id: 2,
    title: "How often should orchids be watered?",
    details:
      "Most orchids need the same watering routine. In the winter, they only need water once per week. As the weather warms, they need water twice per week. An orchid in a larger pot will need water less frequently than an orchid in a smaller pot. Pay attention to the moss around your orchid. When it dries, your orchid needs water.",
  },
  {
    id: 3,
    title: "How to keep orchids blooming?",
    details:
      "Phalaenopsis orchids need to be out of direct sunlight so the sun's heat does not scorch their delicate leaves. Orchids also need temperature variations, with cooler temperatures at night. They also need fertilizer and a pot large enough for aeration.",
  },
  {
    id: 4,
    title: "What is so special about orchids?",
    details:
      "Orchids are elegant flowers with a unique asymmetrical design. While they look like complicated flowers to care for, they are easy to keep alive and thriving. Some orchids only bloom for a short time, so their limited flowering time makes them special to those who enjoy them.People who live in chilly climates, but vacation in tropical ones, tend to consider orchids pleasant reminders of their time away from home. Whatever the reason, orchids tend to bring a sense of joy to the spaces they occupy.",
  },
];

export const HOUSEPLANTS_CONFIG = {
  "pet-friendly-plants": {
    title: "Pet-Friendly Plants",
    description: "Plants that are safe for your pets and family.",
    apiParam: "pet-friendly-plants",
  },
  "easy-care-plants": {
    title: "Easy Care Plants",
    description: "Low-maintenance houseplants perfect for beginners.",
    apiParam: "easy-care-plants",
  },
  "low-light-plants": {
    title: "Low Light Plants",
    description: "Houseplants that thrive in low light conditions.",
    apiParam: "low-light-plants",
  },
  "air-purifying-plants": {
    title: "Air Purifying Plants",
    description: "Houseplants that help clean and purify your indoor air.",
    apiParam: "air-purifying-plants",
  },
  "indoor-plants": {
    title: "Stylish House Décor Plants",
    description:
      "Beautiful indoor plants that enhance your home décor with greenery and elegance.",
    apiParam: "indoor-plants",
  },
};

export const OUTDOOR_PATIO_CONFIG = {
  "outdoor-plants": {
    title: "Fruit & Berry",
    description:
      "Delicious fruit and berry plants perfect for your outdoor garden.",
    apiParam: "outdoor-plants",
  },
  "bonsai-miniatures": {
    title: "Bonsai & Miniatures",
    description: "Beautiful miniature and bonsai plants for your patio space.",
    apiParam: "bonsai-miniatures",
  },
  succulents: {
    title: "Succulents",
    description:
      "Hardy and beautiful succulent plants perfect for outdoor conditions.",
    apiParam: "succulents",
  },
  "large-plants": {
    title: "Patio Plants",
    description:
      "Perfect large plants for your patio, deck, and outdoor spaces.",
    apiParam: "large-plants",
  },
  "flowering-plants": {
    title: "Flowering Trees",
    description:
      "Beautiful flowering trees and plants to enhance your outdoor landscape.",
    apiParam: "flowering-plants",
  },
};



