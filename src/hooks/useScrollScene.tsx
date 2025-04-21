import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollSceneOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollScene<T extends HTMLElement>(
  options: ScrollSceneOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return [ref, isInView];
}

export function useProgressiveScroll(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}