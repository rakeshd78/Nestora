export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'projects'
  | 'project-detail'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'payment-success'
  | 'payment-failure'
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'account';

export interface Project {
  id: string;
  name: string;
  category: string;
  location: string;
  price: string;
  heroImage: string;
  gallery: string[];
  year: string;
  area: string;
  clientType: string;
  tagline: string;
  overview: string;
  designConcept: string;
  materials: string[];
  keyFeatures: string[];
}

export interface Product {
  id: string;
  name: string;
  category: 'Living Room' | 'Seating' | 'Tables' | 'Lighting' | 'Bedroom' | 'Decor';
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  materials: string[];
  dimensions: string;
  leadTime: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id (e.g. productId-material)
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedMaterial: string;
  image: string;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
  orderStatus: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  iconType: 'space-planning' | 'lighting-design' | 'furniture-styling' | 'interior-architecture';
  deliverables: string[];
  idealFor: string;
  duration: string;
  startingFee: string;
  processSteps: { title: string; detail: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  day: string;
  month: string;
  author: string;
  authorRole: string;
  readTime: string;
  category: string;
  heroImage: string;
  excerpt: string;
  content: string[];
  quote?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  project: string;
  avatar: string;
  rating: number;
  isFeatured?: boolean;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: 'new' | 'reviewed' | 'scheduled';
  createdAt: string;
}
