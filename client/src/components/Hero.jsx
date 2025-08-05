'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // shadcn/ui button

const slides = [
  {
    image: '/images/hero1.jpg',
    headline: 'Latest Tech, Unbeatable Prices',
    subtext: 'Explore the best deals on electronics now!',
    cta: 'Shop Now',
  },
  {
    image: '/images/hero2.jpg',
    headline: 'Trendy Fashion Arrivals',
    subtext: 'Stay ahead in style. Discover what’s new.',
    cta: 'Browse Fashion',
  },
  {
    image: '/images/hero3.jpg',
    headline: 'Your Home, Your Style',
    subtext: 'Upgrade your space with top-rated decor.',
    cta: 'Shop Home',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="min-w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10 text-white max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.headline}</h1>
              <p className="text-lg md:text-xl mb-6">{slide.subtext}</p>
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-3 text-base">
                {slide.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
