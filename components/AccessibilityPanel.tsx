import React, { useEffect, useRef } from 'react';
import { Eye, RotateCcw, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang, a11y, updateA11y, resetA11y } = useSite();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t =
    lang === 'fr'
      ? {
          title: 'Paramètres d’accessibilité',
          subtitle: 'Réglages sauvegardés localement pour votre confort de lecture (WCAG 2.1 AA).',
          textSize: 'Taille du texte',
          contrast: 'Contraste élevé (WCAG AAA)',
          contrastDesc: 'Renforce le contraste du texte, des bordures et des surfaces.',
          dyslexia: 'Lisibilité accrue (espacement)',
          dyslexiaDesc: 'Augmente l’espacement des lettres, des mots et l’interligne.',
          motion: 'Désactiver les animations',
          motionDesc: 'Supprime les transitions et mouvements à l’écran.',
          links: 'Souligner les liens et focus clavier',
          linksDesc: 'Rend tous les liens soulignés et renforce les contours clavier.',
          reset: 'Réinitialiser',
          close: 'Fermer le panneau',
        }
      : {
          title: 'Accessibility Settings',
          subtitle: 'Preferences saved locally for reading comfort (WCAG 2.1 AA).',
          textSize: 'Text size',
          contrast: 'High Contrast (WCAG AAA)',
          contrastDesc: 'Maximizes contrast for text, borders, and surface boundaries.',
          dyslexia: 'Enhanced readability spacing',
          dyslexiaDesc: 'Increases letter spacing, word spacing, and line height.',
          motion: 'Disable animations',
          motionDesc: 'Turns off transitions and screen motion.',
          links: 'Underline links & strong focus rings',
          linksDesc: 'Underlines all links and reinforces keyboard focus outlines.',
          reset: 'Reset',
          close: 'Close panel',
        };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-panel-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white a11y-surface h-full border-l border-slate-200 p-6 overflow-y-auto flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-slate-900 shrink-0" aria-hidden="true" />
              <h2
                id="a11y-panel-title"
                className="text-lg font-semibold text-slate-900"
              >
                {t.title}
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-600 a11y-muted">{t.subtitle}</p>

          <div className="mt-6 space-y-6">
            {/* 1. Text size */}
            <div>
              <span className="block text-sm font-semibold text-slate-900 mb-2">
                {t.textSize}
              </span>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label={t.textSize}>
                {([100, 115, 130] as const).map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    aria-pressed={a11y.textScale === scale}
                    onClick={() => updateA11y({ textScale: scale })}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-colors tabular-nums ${
                      a11y.textScale === scale
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {scale}%
                  </button>
                ))}
              </div>
            </div>

            {/* 2. High Contrast */}
            <label className="flex items-start justify-between gap-4 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div>
                <span className="block text-sm font-semibold text-slate-900">
                  {t.contrast}
                </span>
                <span className="block text-xs text-slate-600 a11y-muted mt-1">
                  {t.contrastDesc}
                </span>
              </div>
              <input
                type="checkbox"
                checked={a11y.highContrast}
                onChange={(e) => updateA11y({ highContrast: e.target.checked })}
                className="mt-1 h-5 w-5 accent-slate-900 shrink-0"
              />
            </label>

            {/* 3. Dyslexia spacing */}
            <label className="flex items-start justify-between gap-4 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div>
                <span className="block text-sm font-semibold text-slate-900">
                  {t.dyslexia}
                </span>
                <span className="block text-xs text-slate-600 a11y-muted mt-1">
                  {t.dyslexiaDesc}
                </span>
              </div>
              <input
                type="checkbox"
                checked={a11y.dyslexiaMode}
                onChange={(e) => updateA11y({ dyslexiaMode: e.target.checked })}
                className="mt-1 h-5 w-5 accent-slate-900 shrink-0"
              />
            </label>

            {/* 4. Reduced Motion */}
            <label className="flex items-start justify-between gap-4 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div>
                <span className="block text-sm font-semibold text-slate-900">
                  {t.motion}
                </span>
                <span className="block text-xs text-slate-600 a11y-muted mt-1">
                  {t.motionDesc}
                </span>
              </div>
              <input
                type="checkbox"
                checked={a11y.reducedMotion}
                onChange={(e) => updateA11y({ reducedMotion: e.target.checked })}
                className="mt-1 h-5 w-5 accent-slate-900 shrink-0"
              />
            </label>

            {/* 5. Underline Links & Strong Focus */}
            <label className="flex items-start justify-between gap-4 p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
              <div>
                <span className="block text-sm font-semibold text-slate-900">
                  {t.links}
                </span>
                <span className="block text-xs text-slate-600 a11y-muted mt-1">
                  {t.linksDesc}
                </span>
              </div>
              <input
                type="checkbox"
                checked={a11y.underlineLinks}
                onChange={(e) => updateA11y({ underlineLinks: e.target.checked })}
                className="mt-1 h-5 w-5 accent-slate-900 shrink-0"
              />
            </label>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={resetA11y}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            {t.reset}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
