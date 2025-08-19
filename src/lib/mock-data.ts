import type { Service } from './types';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'service-1',
    title: 'Modern Web App Development',
    description:
      'End-to-end development of a modern, responsive, and high-performance web application using the latest technologies like React, Next.js, and Tailwind CSS. Includes design, development, and deployment.',
    category: 'Web Development',
    price: 2500,
    provider: 'Pixel Perfect Inc.',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'web development code',
    reviews: [
      { id: 'rev-1-1', author: 'John Doe', rating: 5, text: 'Absolutely fantastic work! The final product exceeded all my expectations. Highly recommend.' },
      { id: 'rev-1-2', author: 'Jane Smith', rating: 4, text: 'Great communication and a very professional team. The project was delivered on time.' },
      { id: 'rev-1-3', author: 'Sam Wilson', rating: 5, text: 'Top-notch quality. They transformed our idea into a beautiful and functional app.' },
    ],
    tags: [{name: 'top-rated', type: 'default'}],
    bookingStatus: 'completed',
    paymentStatus: 'cleared',
  },
  {
    id: 'service-2',
    title: 'Mobile App Design',
    description:
      'Comprehensive UI/UX design for iOS and Android applications. We create intuitive, user-friendly, and visually appealing interfaces that enhance user engagement and retention.',
    category: 'Design',
    price: 1200,
    provider: 'Creative Minds',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'mobile app design',
    reviews: [
      { id: 'rev-2-1', author: 'Emily White', rating: 5, text: 'The designs were stunning and very user-friendly. Our users love the new look!' },
      { id: 'rev-2-2', author: 'Michael Brown', rating: 3, text: 'Good design, but the process took a bit longer than we anticipated.' },
    ],
    tags: [{name: 'new', type: 'secondary'}],
    bookingStatus: 'in progress',
    paymentStatus: 'in escrow',
  },
  {
    id: 'service-3',
    title: 'SEO & Digital Marketing',
    description:
      'Boost your online presence with our data-driven SEO and digital marketing strategies. We help you rank higher in search results, attract more traffic, and convert leads into customers.',
    category: 'Marketing',
    price: 800,
    provider: 'Growth Hackers',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'marketing chart analytics',
    reviews: [
      { id: 'rev-3-1', author: 'Chris Green', rating: 5, text: 'Our traffic has doubled in just three months. Incredible results!' },
      { id: 'rev-3-2', author: 'Sarah Blue', rating: 4, text: 'Solid strategy and good reporting. Seeing steady growth.' },
      { id: 'rev-3-3', author: 'Kevin Black', rating: 4, text: 'Very knowledgeable team. They know what they are doing.' },
    ],
    bookingStatus: 'requested',
    paymentStatus: 'pending',
  },
   {
    id: 'service-4',
    title: 'Cloud Infrastructure Setup',
    description:
      'We design and implement scalable, secure, and cost-effective cloud infrastructure on AWS, Google Cloud, or Azure. Perfect for startups and established businesses.',
    category: 'Cloud Services',
    price: 3000,
    provider: 'InfraCloud Solutions',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'cloud infrastructure server',
    reviews: [
      { id: 'rev-4-1', author: 'Linda Harris', rating: 5, text: 'Extremely reliable and secure setup. Our downtime is practically zero now.' },
      { id: 'rev-4-2', author: 'Mark Taylor', rating: 5, text: 'Professional, efficient, and very knowledgeable. They optimized our costs significantly.' },
    ],
    tags: [{name: 'booked', type: 'destructive'}],
    bookingStatus: 'cancelled',
    paymentStatus: 'refunded',
  },
];
