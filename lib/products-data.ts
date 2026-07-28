export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  type:
    'template' | 'ui-kit' | 'source-code' | 'course' | 'ebook' | 'automation';
  isNew: boolean;
  isPopular: boolean;
  createdAt: string;
  downloads: number;
  features: string[];
  requirements: string[];
  includedFiles: string[];
  compatibility: string[];
  fileSize: string;
  version: string;
  lastUpdated: string;
  license: string;
  galleryImages: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const categories = [
  'AI Tools',
  'Templates',
  'UI Kits',
  'Source Code',
  'Courses',
  'Automation',
  'eBooks',
  'Design Assets',
] as const;

export const productTypes = [
  { value: 'template', label: 'Template' },
  { value: 'ui-kit', label: 'UI Kit' },
  { value: 'source-code', label: 'Source Code' },
  { value: 'course', label: 'Course' },
  { value: 'ebook', label: 'eBook' },
  { value: 'automation', label: 'Automation' },
] as const;

export const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
] as const;

export const products: Product[] = [
  {
    id: '1',
    title: 'AI Landing Page Generator',
    description:
      'Generate stunning landing pages with AI in seconds. Includes 50+ templates and customization options.',
    longDescription:
      'The AI Landing Page Generator is a powerful tool that leverages cutting-edge artificial intelligence to create beautiful, conversion-optimized landing pages in seconds. Whether you are a startup founder, marketer, or agency, this tool helps you ship professional landing pages without writing a single line of code. With 50+ pre-built templates, customizable color schemes, and AI-powered copy generation, you can go from idea to published page in under five minutes. The generator supports responsive design out of the box, SEO optimization, and one-click export to HTML, React, or Next.js projects.',
    category: 'AI Tools',
    price: 49,
    originalPrice: 99,
    rating: 4.9,
    reviewCount: 284,
    type: 'template',
    isNew: true,
    isPopular: true,
    createdAt: '2024-12-15',
    downloads: 12450,
    features: [
      'AI-powered page generation from text prompts',
      '50+ pre-built, conversion-optimized templates',
      'Customizable color schemes and typography',
      'AI copywriting for headlines and CTAs',
      'Responsive design for all screen sizes',
      'SEO meta tag generation',
      'One-click export to HTML, React, or Next.js',
      'A/B testing variant generation',
      'Drag-and-drop editing interface',
      'Custom domain support',
    ],
    requirements: [
      'Node.js 18 or higher',
      'Modern web browser (Chrome, Firefox, Safari, Edge)',
      'Internet connection for AI features',
      'No coding knowledge required',
    ],
    includedFiles: [
      'Source code (TypeScript)',
      '50+ HTML templates',
      'React component library',
      'Next.js starter project',
      'Documentation (PDF + Markdown)',
      'Figma design file',
      'License key',
    ],
    compatibility: [
      'Next.js 13+',
      'React 18+',
      'Vue 3+',
      'Plain HTML/CSS/JS',
      'WordPress (via plugin)',
    ],
    fileSize: '24.5 MB',
    version: '2.4.1',
    lastUpdated: '2024-12-15',
    license: 'Extended Commercial License',
    galleryImages: [
      'dashboard-preview',
      'template-gallery',
      'ai-generation-flow',
      'export-options',
      'customization-panel',
    ],
  },
  {
    id: '2',
    title: 'SaaS Dashboard Kit',
    description:
      'Complete dashboard template with 50+ components, charts, tables, and dark mode support.',
    longDescription:
      'The SaaS Dashboard Kit is a comprehensive, production-ready dashboard template built with React, TypeScript, and Tailwind CSS. It includes 50+ reusable components, interactive charts, data tables, form elements, and full dark mode support. Designed for SaaS applications, admin panels, and analytics platforms, this kit saves you weeks of development time. Every component is fully typed, accessible, and customizable through a powerful theming system.',
    category: 'Templates',
    price: 79,
    originalPrice: 149,
    rating: 4.8,
    reviewCount: 192,
    type: 'template',
    isNew: false,
    isPopular: true,
    createdAt: '2024-11-20',
    downloads: 8920,
    features: [
      '50+ reusable React components',
      'Interactive charts (line, bar, pie, area)',
      'Advanced data tables with sorting and filtering',
      'Full dark mode support',
      'Responsive layout system',
      'Form components with validation',
      'Authentication pages included',
      'Settings and profile pages',
      'Notification system',
      'Command palette (Cmd+K)',
    ],
    requirements: [
      'Node.js 16 or higher',
      'React 18+',
      'Tailwind CSS 3+',
      'TypeScript 4.7+',
    ],
    includedFiles: [
      'React source code (TypeScript)',
      'Tailwind configuration',
      'Figma design system',
      'Storybook setup',
      'Documentation site',
      'Example pages',
      'License key',
    ],
    compatibility: ['React 18+', 'Next.js 13+', 'Vite', 'Tailwind CSS 3+'],
    fileSize: '18.2 MB',
    version: '3.1.0',
    lastUpdated: '2024-11-20',
    license: 'Extended Commercial License',
    galleryImages: [
      'dashboard-overview',
      'chart-components',
      'data-tables',
      'settings-page',
      'dark-mode',
    ],
  },
  {
    id: '3',
    title: 'Glassmorphism UI Pack',
    description:
      '200+ glassmorphism components for modern apps. Built with React and Tailwind CSS.',
    longDescription:
      'The Glassmorphism UI Pack brings the trendy frosted-glass aesthetic to your projects with 200+ beautifully crafted components. Each component features backdrop blur effects, subtle gradients, and translucent surfaces that create depth and visual interest. Perfect for modern SaaS apps, portfolios, and landing pages that want to stand out.',
    category: 'UI Kits',
    price: 39,
    originalPrice: 89,
    rating: 4.7,
    reviewCount: 156,
    type: 'ui-kit',
    isNew: false,
    isPopular: false,
    createdAt: '2024-10-05',
    downloads: 6230,
    features: [
      '200+ glassmorphism components',
      'Cards, modals, dropdowns, navigation',
      'Backdrop blur effects',
      'Gradient overlays',
      'Responsive and accessible',
      'React + Vue versions included',
    ],
    requirements: ['Node.js 16+', 'React 18+ or Vue 3+', 'Tailwind CSS 3+'],
    includedFiles: [
      'React components',
      'Vue components',
      'Tailwind presets',
      'Figma file',
      'Documentation',
      'License key',
    ],
    compatibility: ['React 18+', 'Vue 3+', 'Tailwind CSS 3+'],
    fileSize: '12.8 MB',
    version: '1.8.2',
    lastUpdated: '2024-10-05',
    license: 'Commercial License',
    galleryImages: [
      'glass-cards',
      'glass-modal',
      'glass-navigation',
      'glass-forms',
      'color-variations',
    ],
  },
  {
    id: '4',
    title: 'NextAuth Boilerplate',
    description:
      'Production-ready authentication boilerplate with OAuth, email, and magic link support.',
    longDescription:
      'Skip weeks of auth setup with this production-ready NextAuth boilerplate. It includes OAuth (Google, GitHub, Apple), email/password, magic links, role-based access control, session management, and a beautiful pre-built login UI. Fully typed with TypeScript and tested.',
    category: 'Source Code',
    price: 59,
    originalPrice: 129,
    rating: 5.0,
    reviewCount: 98,
    type: 'source-code',
    isNew: true,
    isPopular: false,
    createdAt: '2024-12-10',
    downloads: 4180,
    features: [
      'OAuth (Google, GitHub, Apple, Twitter)',
      'Email and password authentication',
      'Magic link authentication',
      'Role-based access control (RBAC)',
      'Session management with JWT',
      'Pre-built login and signup UI',
      'Password reset flow',
      'Email verification',
      'Two-factor authentication (2FA)',
      'Fully typed with TypeScript',
    ],
    requirements: ['Node.js 18+', 'Next.js 13+', 'PostgreSQL or MySQL'],
    includedFiles: [
      'Next.js source code',
      'Database migrations',
      'Email templates',
      'Environment setup guide',
      'API documentation',
      'License key',
    ],
    compatibility: ['Next.js 13+', 'PostgreSQL', 'MySQL', 'SQLite'],
    fileSize: '8.4 MB',
    version: '2.0.0',
    lastUpdated: '2024-12-10',
    license: 'Extended Commercial License',
    galleryImages: [
      'login-page',
      'signup-page',
      'oauth-providers',
      'dashboard-auth',
      '2fa-setup',
    ],
  },
  {
    id: '5',
    title: 'React Animation Course',
    description:
      'Master advanced React animations from scratch. 12 hours of content with real-world projects.',
    longDescription:
      'This comprehensive course takes you from animation basics to advanced techniques used in production at top companies. You will learn CSS transitions, Framer Motion, GSAP, scroll-based animations, layout animations, and gesture-driven interactions. Includes 12 hours of video, 20+ exercises, and 5 real-world projects you can add to your portfolio.',
    category: 'Courses',
    price: 89,
    originalPrice: 199,
    rating: 4.8,
    reviewCount: 312,
    type: 'course',
    isNew: false,
    isPopular: true,
    createdAt: '2024-09-18',
    downloads: 15600,
    features: [
      '12 hours of HD video content',
      '20+ hands-on exercises',
      '5 real-world portfolio projects',
      'CSS transitions and keyframes',
      'Framer Motion deep dive',
      'GSAP integration',
      'Scroll-based animations',
      'Layout and gesture animations',
      'Performance optimization',
      'Lifetime access and updates',
    ],
    requirements: [
      'Basic React knowledge',
      'Node.js 16+',
      'Code editor (VS Code recommended)',
    ],
    includedFiles: [
      '12 hours of video (streaming + download)',
      'Exercise files',
      'Project source code',
      'Course notes (PDF)',
      'Certificate of completion',
      'Community access',
    ],
    compatibility: ['Any modern browser', 'VS Code', 'Node.js 16+'],
    fileSize: '2.1 GB',
    version: '4.2.0',
    lastUpdated: '2024-09-18',
    license: 'Personal License',
    galleryImages: [
      'course-intro',
      'framer-motion-demo',
      'scroll-animation',
      'gesture-demo',
      'final-project',
    ],
  },
  {
    id: '6',
    title: 'Workflow Automation Pack',
    description:
      'Automate repetitive tasks with 100+ templates for Zapier, Make, and n8n.',
    longDescription:
      'The Workflow Automation Pack includes 100+ pre-built automation templates for Zapier, Make (Integromat), and n8n. Covering marketing, sales, operations, and developer workflows, this pack helps you automate your business in minutes instead of weeks.',
    category: 'Automation',
    price: 35,
    originalPrice: 79,
    rating: 4.6,
    reviewCount: 127,
    type: 'automation',
    isNew: false,
    isPopular: false,
    createdAt: '2024-11-01',
    downloads: 5430,
    features: [
      '100+ automation templates',
      'Zapier, Make, and n8n support',
      'Marketing automation workflows',
      'Sales pipeline automation',
      'Developer CI/CD templates',
      'Documentation and setup guides',
    ],
    requirements: [
      'Zapier, Make, or n8n account',
      'Basic automation knowledge',
    ],
    includedFiles: [
      '100+ template files (JSON)',
      'Setup documentation',
      'Video walkthroughs',
      'Community access',
      'License key',
    ],
    compatibility: ['Zapier', 'Make (Integromat)', 'n8n', 'Pipedream'],
    fileSize: '5.6 MB',
    version: '1.5.0',
    lastUpdated: '2024-11-01',
    license: 'Commercial License',
    galleryImages: [
      'workflow-overview',
      'zapier-templates',
      'make-templates',
      'n8n-templates',
      'setup-guide',
    ],
  },
  {
    id: '7',
    title: 'Minimal Portfolio Template',
    description:
      'A sleek, minimal portfolio template for developers and designers. Built with Next.js.',
    longDescription:
      'A minimal, fast, and beautiful portfolio template built with Next.js, TypeScript, and Tailwind CSS. Features a clean design, smooth animations, blog integration, project showcase, and a contact form. Perfect for developers and designers who want a professional online presence.',
    category: 'Templates',
    price: 29,
    originalPrice: 59,
    rating: 4.9,
    reviewCount: 203,
    type: 'template',
    isNew: true,
    isPopular: false,
    createdAt: '2024-12-01',
    downloads: 7890,
    features: [
      'Clean, minimal design',
      'Smooth scroll animations',
      'Blog with MDX support',
      'Project showcase grid',
      'Contact form (pre-wired)',
      'Dark mode support',
      'SEO optimized',
      'Responsive on all devices',
    ],
    requirements: ['Node.js 16+', 'Basic React knowledge'],
    includedFiles: [
      'Next.js source code',
      'MDX blog setup',
      'Figma design file',
      'Documentation',
      'License key',
    ],
    compatibility: ['Next.js 13+', 'Vercel', 'Netlify'],
    fileSize: '6.3 MB',
    version: '2.1.0',
    lastUpdated: '2024-12-01',
    license: 'Commercial License',
    galleryImages: [
      'portfolio-home',
      'project-page',
      'blog-page',
      'about-page',
      'contact-page',
    ],
  },
  {
    id: '8',
    title: 'Design System eBook',
    description:
      'The complete guide to building scalable design systems. 300+ pages of practical advice.',
    longDescription:
      'This eBook is the definitive guide to building, scaling, and maintaining design systems. With 300+ pages of practical advice, real-world examples, and actionable frameworks, you will learn everything from token architecture to component APIs to governance models.',
    category: 'eBooks',
    price: 25,
    originalPrice: 49,
    rating: 4.7,
    reviewCount: 89,
    type: 'ebook',
    isNew: false,
    isPopular: false,
    createdAt: '2024-08-22',
    downloads: 3210,
    features: [
      '300+ pages of expert content',
      'Real-world case studies',
      'Design token architecture',
      'Component API design',
      'Governance and contribution models',
      'Tools and workflow recommendations',
      'PDF, ePub, and Kindle formats',
    ],
    requirements: ['Any e-reader or PDF viewer'],
    includedFiles: [
      'PDF (300+ pages)',
      'ePub format',
      'Kindle format (.mobi)',
      'Source Markdown files',
      'Bonus templates',
      'License key',
    ],
    compatibility: [
      'PDF readers',
      'Kindle',
      'Apple Books',
      'Google Play Books',
    ],
    fileSize: '15.4 MB',
    version: '1.0.0',
    lastUpdated: '2024-08-22',
    license: 'Personal License',
    galleryImages: [
      'ebook-cover',
      'chapter-preview',
      'case-study',
      'token-architecture',
      'bonus-templates',
    ],
  },
  {
    id: '9',
    title: 'Icon Library Pro',
    description:
      '5,000+ premium icons in SVG, React, and Vue formats. Regularly updated.',
    longDescription:
      'Icon Library Pro gives you access to 5,000+ meticulously crafted icons in multiple formats. With consistent stroke widths, pixel-perfect alignment, and regular updates, this library is the last icon set you will ever need.',
    category: 'Design Assets',
    price: 45,
    originalPrice: 99,
    rating: 4.8,
    reviewCount: 167,
    type: 'ui-kit',
    isNew: false,
    isPopular: true,
    createdAt: '2024-10-30',
    downloads: 9870,
    features: [
      '5,000+ premium icons',
      'SVG, React, and Vue formats',
      'Consistent 2px stroke width',
      'Pixel-perfect at all sizes',
      'Regular monthly updates',
      'Figma plugin included',
      'Categories: UI, business, social, arrows, and more',
    ],
    requirements: ['Any code editor', 'Figma (optional, for plugin)'],
    includedFiles: [
      '5,000+ SVG files',
      'React component library',
      'Vue component library',
      'Figma file with plugin',
      'Icon search app',
      'License key',
    ],
    compatibility: ['React', 'Vue', 'Angular', 'Svelte', 'Figma', 'Sketch'],
    fileSize: '32.7 MB',
    version: '5.3.0',
    lastUpdated: '2024-10-30',
    license: 'Extended Commercial License',
    galleryImages: [
      'icon-grid',
      'icon-categories',
      'react-components',
      'figma-plugin',
      'search-app',
    ],
  },
  {
    id: '10',
    title: 'AI Code Review Tool',
    description:
      'Automated code review powered by AI. Catches bugs, suggests improvements, and enforces best practices.',
    longDescription:
      'The AI Code Review Tool automatically reviews your pull requests using advanced AI models. It catches bugs, suggests improvements, enforces coding standards, and provides actionable feedback — all before a human reviewer ever sees the code.',
    category: 'AI Tools',
    price: 69,
    originalPrice: 149,
    rating: 4.9,
    reviewCount: 145,
    type: 'automation',
    isNew: true,
    isPopular: true,
    createdAt: '2024-12-05',
    downloads: 6720,
    features: [
      'AI-powered code analysis',
      'Bug detection and prevention',
      'Best practice enforcement',
      'Security vulnerability scanning',
      'Performance optimization suggestions',
      'GitHub and GitLab integration',
      'Custom review rules',
      'PR comments and summaries',
      'Multi-language support (20+ languages)',
      'CI/CD pipeline integration',
    ],
    requirements: ['GitHub or GitLab account', 'Node.js 18+'],
    includedFiles: [
      'Source code (TypeScript)',
      'GitHub Action',
      'GitLab CI template',
      'Docker image',
      'Configuration guide',
      'API documentation',
      'License key',
    ],
    compatibility: [
      'GitHub',
      'GitLab',
      'Bitbucket',
      'Docker',
      'CI/CD pipelines',
    ],
    fileSize: '14.2 MB',
    version: '1.8.0',
    lastUpdated: '2024-12-05',
    license: 'Extended Commercial License',
    galleryImages: [
      'review-dashboard',
      'pr-comment',
      'bug-detection',
      'security-scan',
      'ci-integration',
    ],
  },
  {
    id: '11',
    title: 'E-commerce Starter Kit',
    description:
      'Full-featured e-commerce starter with cart, checkout, payments, and admin dashboard.',
    longDescription:
      'A complete, production-ready e-commerce starter kit built with Next.js, TypeScript, and Tailwind CSS. Includes shopping cart, checkout flow, Stripe payment integration, product catalog, admin dashboard, order management, and customer accounts. Ship your store in days, not months.',
    category: 'Source Code',
    price: 99,
    originalPrice: 199,
    rating: 4.7,
    reviewCount: 178,
    type: 'source-code',
    isNew: false,
    isPopular: false,
    createdAt: '2024-09-10',
    downloads: 5340,
    features: [
      'Full shopping cart with persistence',
      'Stripe checkout integration',
      'Product catalog with variants',
      'Admin dashboard',
      'Order management system',
      'Customer accounts and profiles',
      'Inventory tracking',
      'Discount codes and coupons',
      'Email notifications',
      'Analytics dashboard',
    ],
    requirements: [
      'Node.js 18+',
      'Next.js 13+',
      'PostgreSQL',
      'Stripe account',
    ],
    includedFiles: [
      'Next.js source code',
      'Database schema and migrations',
      'Stripe integration',
      'Admin dashboard',
      'Email templates',
      'Documentation',
      'License key',
    ],
    compatibility: ['Next.js 13+', 'PostgreSQL', 'Stripe', 'Vercel'],
    fileSize: '28.9 MB',
    version: '3.0.1',
    lastUpdated: '2024-09-10',
    license: 'Extended Commercial License',
    galleryImages: [
      'store-front',
      'product-page',
      'checkout-flow',
      'admin-dashboard',
      'order-management',
    ],
  },
  {
    id: '12',
    title: 'TypeScript Mastery Course',
    description:
      'From basics to advanced TypeScript. 8 hours of content with hands-on exercises.',
    longDescription:
      'Master TypeScript from fundamentals to advanced patterns. This 8-hour course covers types, interfaces, generics, conditional types, utility types, module systems, and real-world application architecture. Perfect for JavaScript developers ready to level up.',
    category: 'Courses',
    price: 75,
    originalPrice: 159,
    rating: 4.8,
    reviewCount: 234,
    type: 'course',
    isNew: false,
    isPopular: false,
    createdAt: '2024-11-15',
    downloads: 8900,
    features: [
      '8 hours of HD video content',
      '15+ hands-on exercises',
      'Type fundamentals and advanced types',
      'Generics and conditional types',
      'Utility types deep dive',
      'Module systems and project structure',
      'Real-world application patterns',
      'Type-safe API design',
      'Lifetime access and updates',
      'Certificate of completion',
    ],
    requirements: [
      'JavaScript knowledge',
      'Node.js 16+',
      'VS Code recommended',
    ],
    includedFiles: [
      '8 hours of video (streaming + download)',
      'Exercise files',
      'Project source code',
      'Course notes (PDF)',
      'Cheatsheet',
      'Certificate of completion',
    ],
    compatibility: ['Any modern browser', 'VS Code', 'Node.js 16+'],
    fileSize: '1.4 GB',
    version: '3.5.0',
    lastUpdated: '2024-11-15',
    license: 'Personal License',
    galleryImages: [
      'course-intro',
      'types-demo',
      'generics-demo',
      'project-build',
      'advanced-patterns',
    ],
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    author: 'Sarah Chen',
    avatar: 'SC',
    rating: 5,
    date: '2024-12-10',
    title: 'Game-changer for our marketing team',
    content:
      'We have been using this for three months and it has completely transformed how we create landing pages. What used to take our team a full day now takes 15 minutes. The AI copy generation is surprisingly good and the templates are beautiful.',
    verified: true,
  },
  {
    id: 'r2',
    productId: '1',
    author: 'Marcus Rodriguez',
    avatar: 'MR',
    rating: 5,
    date: '2024-12-05',
    title: 'Worth every penny',
    content:
      'As a solo founder, this tool pays for itself in the first week. The export to Next.js feature is flawless and the code quality is excellent. Highly recommend for anyone building SaaS products.',
    verified: true,
  },
  {
    id: 'r3',
    productId: '1',
    author: 'Emily Watson',
    avatar: 'EW',
    rating: 4,
    date: '2024-11-28',
    title: 'Great tool, minor learning curve',
    content:
      'The AI generation is impressive and the templates are top-notch. It took me a bit to get used to the interface, but once I did, it became indispensable. Would love to see more template variety in the future.',
    verified: true,
  },
  {
    id: 'r4',
    productId: '1',
    author: 'David Kim',
    avatar: 'DK',
    rating: 5,
    date: '2024-11-20',
    title: 'Best purchase this year',
    content:
      'I have tried every landing page builder out there and this is by far the best. The AI understands context and generates relevant copy. The responsive design is perfect on every device.',
    verified: true,
  },
  {
    id: 'r5',
    productId: '1',
    author: 'Lisa Anderson',
    avatar: 'LA',
    rating: 5,
    date: '2024-11-15',
    title: 'Incredible time saver',
    content:
      'Our agency has replaced three different tools with this one. The A/B testing variant generation alone is worth the price. Customer support is also fantastic and responsive.',
    verified: false,
  },
];

export const productFaqs: FaqItem[] = [
  {
    question: 'What is included in the license?',
    answer:
      'The Extended Commercial License allows you to use the product in unlimited personal and commercial projects. You may not resell or redistribute the product itself. Full license terms are included with your purchase.',
  },
  {
    question: 'How do I receive my purchase?',
    answer:
      'After completing your purchase, you will receive an instant download link via email and on your account dashboard. The download includes all source files, documentation, and your license key.',
  },
  {
    question: 'Are updates included?',
    answer:
      'Yes, all purchases include lifetime updates. You will be notified via email when a new version is released, and you can download the latest version from your dashboard at any time.',
  },
  {
    question: 'What is the refund policy?',
    answer:
      'We offer a 14-day money-back guarantee. If you are not satisfied with your purchase for any reason, contact our support team within 14 days for a full refund — no questions asked.',
  },
  {
    question: 'Can I use this in client projects?',
    answer:
      'Yes, the Commercial License permits use in client projects. You may use the product to create websites, applications, and other deliverables for your clients. You may not, however, resell the product as-is.',
  },
  {
    question: 'Do you offer technical support?',
    answer:
      'Yes, all purchases include 6 months of premium technical support via email and our community Discord. Extended support plans are available for purchase separately.',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(
  productId: string,
  category: string,
  limit = 4,
): Product[] {
  return products
    .filter((p) => p.id !== productId && p.category === category)
    .concat(
      products.filter((p) => p.id !== productId && p.category !== category),
    )
    .slice(0, limit);
}

export function getReviewsForProduct(productId: string): Review[] {
  const productReviews = reviews.filter((r) => r.productId === productId);
  if (productReviews.length > 0) return productReviews;
  return reviews;
}

export function getCategoryByName(name: string): string | undefined {
  return categories.find((c) => c === name);
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter((p) => p.category === categoryName);
}

export function getCategoryDescription(categoryName: string): string {
  const descriptions: Record<string, string> = {
    'AI Tools':
      'AI-powered tools and applications to automate your workflow, generate content, and supercharge your productivity.',
    Templates:
      'Production-ready website and app templates built with modern frameworks. Ship faster with beautiful, responsive designs.',
    'UI Kits':
      'Comprehensive UI component libraries and design systems. Hundreds of reusable components for React, Vue, and more.',
    'Source Code':
      'Full-stack source code and boilerplates. Skip months of development with production-ready codebases.',
    Courses:
      'Expert-led video courses to master modern web development. Learn React, TypeScript, design systems, and more.',
    Automation:
      'Workflow automation templates and tools. Connect your favorite apps and automate repetitive tasks in minutes.',
    eBooks:
      'In-depth guides and eBooks on design, development, and business. Learn from industry experts at your own pace.',
    'Design Assets':
      'Premium icons, illustrations, fonts, and design resources. Elevate your projects with professional assets.',
  };
  return descriptions[categoryName] ?? '';
}
