'use client';

import { useEffect, useState } from 'react';

const FACES = ['🙂', '😐', '🙃'];

export function MoodEmoji() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FACES.length);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="ml-2 inline-block" aria-hidden="true">
      {FACES[index]}
    </span>
  );
}
