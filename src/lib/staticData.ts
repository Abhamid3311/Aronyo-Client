import {
  SquareTerminal,
  ShoppingCart,
  Heart,
  History,
  Boxes,
  ClipboardList,
  FolderTree,
  BookOpen,
  Users,
  Star,
  User,
} from "lucide-react";

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

export const roleMenus = {
  common: [
    {
      title: "Profile",
      url: "/dashboard",
      icon: User,
    },
  ],
  user: [
    {
      title: "Order History",
      url: "/dashboard/order-history",
      icon: ClipboardList,
    },
    {
      title: "Cart",
      url: "/dashboard/cart",
      icon: ShoppingCart,
    },
    {
      title: "Wishlist",
      url: "/dashboard/wishlist",
      icon: Heart,
    },
  ],

  staffAdmin: [
    {
      title: "Overview",
      url: "/dashboard/admin/overview",
      icon: SquareTerminal,
    },
    {
      title: "Product Management",
      url: "/dashboard/admin/product-managment",
      icon: Boxes,
    },
    {
      title: "Order Management",
      url: "/dashboard/admin/order-managment",
      icon: ClipboardList,
    },

    {
      title: "Blog Management",
      url: "/dashboard/admin/blog-managment",
      icon: BookOpen,
    },
  ],
  admin: [
    {
      title: "Category Management",
      url: "/dashboard/admin/category-managment",
      icon: FolderTree,
    },
    {
      title: "User Management",
      url: "/dashboard/admin/user-managment",
      icon: Users,
    },
    {
      title: "Reviews",
      url: "/dashboard/admin/reviews",
      icon: Star,
    },
  ],
};

// Order status options
export const ORDER_STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "shipped",
    label: "Shipped",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "bg-green-100 text-green-800",
  },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

// Payment status options
export const PAYMENT_STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  { value: "paid", label: "Paid", color: "bg-green-100 text-green-800" },
  { value: "failed", label: "Failed", color: "bg-red-100 text-red-800" },
  {
    value: "refunded",
    label: "Refunded",
    color: "bg-purple-100 text-purple-800",
  },
];

export const ORDER_STATUS_COLORS: Record<
  "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
  string
> = {
  pending: "bg-yellow-200 text-gray-800",
  confirmed: "bg-blue-500 text-white",
  shipped: "bg-orange-200 text-dark-800",
  delivered: "bg-green-400 text-white-800",
  cancelled: "bg-red-200 text-red-800",
};

// Plant review data
export const plantReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    review:
      "The Monstera Deliciosa I ordered arrived in perfect condition! The plant was healthy, well-packaged, and even bigger than expected. Amazing quality and fast delivery.",
    rating: 5,
    img: "/reviews/rev-1.jpg",
    plantPurchased: "Monstera Deliciosa",
  },
  {
    id: 2,
    name: "Michael Chen",
    review:
      "Absolutely love my new Snake Plant collection! Perfect for beginners like me. The care instructions were detailed and the plants are thriving in my apartment.",
    rating: 5,
    img: "/reviews/rev-2.jpg",
    plantPurchased: "Snake Plant Variety Pack",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    review:
      "The succulent arrangement was stunning! Each plant was carefully selected and the decorative pot was a nice touch. Great value for money.",
    rating: 4,
    img: "/reviews/rev-3.jpg",
    plantPurchased: "Succulent Garden Set",
  },
  {
    id: 4,
    name: "David Thompson",
    review:
      "My Fiddle Leaf Fig arrived healthy and beautiful. The packaging was excellent - not a single damaged leaf! Customer service was also very responsive.",
    rating: 5,
    img: "/reviews/rev-5.jpeg",
    plantPurchased: "Fiddle Leaf Fig",
  },
  {
    id: 5,
    name: "Jessica Park",
    review:
      "The Peace Lily I ordered has been blooming beautifully for months! Great quality plants and the care guide helped me keep it healthy.",
    rating: 4,
    img: "/reviews/rev-4.jpeg",
    plantPurchased: "Peace Lily",
  },
  {
    id: 6,
    name: "Robert Kim",
    review:
      "Fantastic variety in the indoor plant starter kit! Perfect for someone looking to create a green oasis. All plants arrived in excellent condition.",
    rating: 5,
    img: "/reviews/rev-6.jpeg",
    plantPurchased: "Indoor Plant Starter Kit",
  },
];

export const PRODUCT_SIZES = ["Small", "Medium", "Large"];
export const PRODUCT_TAGS = [
  "sale",
  "new-arrivals",
  "gift",
  "decor",
  "out-door",
  "indoor",
  "planter",
  "bonsai",
  "plant-care",
];
