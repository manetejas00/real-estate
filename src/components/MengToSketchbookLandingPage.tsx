import { useCallback, useMemo, useRef } from 'react';
import type { CSSProperties, IframeHTMLAttributes } from 'react';
import './MengToSketchbookLandingPage.css';

export type MengToSketchbookLandingPageProps = Omit<IframeHTMLAttributes<HTMLIFrameElement>, 'src' | 'title' | 'onLoad'> & {
  /** An accessible description for the embedded interactive project showcase. */
  title?: string;
  /** Defaults to the included, byte-verified ThreeUI source. */
  sourceUrl?: string;
  /** Primary ink color used throughout the showcase. */
  primaryColor?: string;
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string | number;
  bodyWeight?: string | number;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
  /** Called after the source and visual customizations are ready. */
  onPageLoad?: () => void;
};

const localSource = () => typeof window !== 'undefined' && window.location.protocol === 'file:'
  ? './public/landing-pages/meng-to-sketchbook.html'
  : '/landing-pages/meng-to-sketchbook.html';

/** A reusable React frame preserving the original page turns, loupe, and responsive behavior. */
export function MengToSketchbookLandingPage({
  title = 'Skyline Residency — Virar West', sourceUrl = localSource(), primaryColor = '#2b2721',
  headingFont = 'Instrument Serif', bodyFont = 'Newsreader', headingWeight = '400', bodyWeight = '400',
  headingSize = 30, bodySize = 20, headingLetterSpacing = 0.01, className, style, onPageLoad, ...iframeProps
}: MengToSketchbookLandingPageProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const frameStyle = useMemo(() => ({ '--sketchbook-ink': primaryColor, ...style }) as CSSProperties, [primaryColor, style]);
  const applyCustomization = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    const root = doc.documentElement;
    root.style.setProperty('--ink', primaryColor);
    root.style.setProperty('--display', `'${headingFont}', "Instrument Serif", Georgia, serif`);
    root.style.setProperty('--font', `'${bodyFont}', "Newsreader", Georgia, serif`);
    doc.getElementById('meng-to-react-customization')?.remove();
    const overrides = doc.createElement('style');
    overrides.id = 'meng-to-react-customization';
    overrides.textContent = `.top .name { font-size: clamp(24px, 2.4vw, ${headingSize}px); font-weight: ${headingWeight}; letter-spacing: ${headingLetterSpacing}em; } body { font-size: ${bodySize}px; font-weight: ${bodyWeight}; }`;
    doc.head.append(overrides);
    onPageLoad?.();
  }, [bodyFont, bodySize, bodyWeight, headingFont, headingLetterSpacing, headingSize, headingWeight, onPageLoad, primaryColor]);
  return <section className={['meng-sketchbook', className].filter(Boolean).join(' ')} style={frameStyle} aria-label={title}>
    <iframe {...iframeProps} ref={frameRef} className="meng-sketchbook__frame" src={sourceUrl} title={title} onLoad={applyCustomization} />
  </section>;
}
