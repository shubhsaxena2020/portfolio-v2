'use client';

import { useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import type React from 'react';
import { useInView } from 'motion/react';
import { useTheme } from 'next-themes';
import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket';

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function Highlighter({
  children,
  action = 'highlight',
  color,
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const isInView = useInView(elementRef, { once: false, margin: '-10%' });
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const resolvedColor =
      color ||
      getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim() ||
      '#5b8bff';

    const annotation = annotate(element, {
      type: action,
      color: resolvedColor,
      strokeWidth,
      animationDuration: prefersReducedMotion ? 0 : animationDuration,
      iterations,
      padding,
      multiline,
    });
    annotationRef.current = annotation;

    return () => {
      annotation.remove();
      annotationRef.current = null;
    };
  }, [
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    prefersReducedMotion,
    resolvedTheme,
  ]);

  useLayoutEffect(() => {
    const annotation = annotationRef.current;
    if (!annotation) return;

    if (isInView) {
      annotation.show();
    } else {
      annotation.hide();
    }
  }, [isInView]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
