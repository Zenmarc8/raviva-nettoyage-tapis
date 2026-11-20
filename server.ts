import fs from 'fs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const PORT = 3000;

const DEFAULT_PUBLIC_ROUTES: Array<{ fr: string; en: string }> = [
  { fr: '/', en: '/' },
  { fr: '/services-commerciaux', en: '/commercial-services' },
  { fr: '/services-residentiels', en: '/residential-services' },
  { fr: '/realisations', en: '/projects' },
  { fr: '/guides', en: '/guides' },
  { fr: '/zones-desservies', en: '/service-areas' },
  { fr: '/a-propos', en: '/about' },
  { fr: '/faq', en: '/faq' },
  { fr: '/soumission', en: '/quote' },
  { fr: '/politique-confidentialite', en: '/privacy-policy' },
  { fr: '/conditions-utilisation', en: '/terms-of-use' },
];

const DEFAULT_PUBLISHED_ARTICLE_SLUGS: Array<{ fr: string; en: string }> = [
  {
    fr: '/guides/11-questions-a-poser-avant-nettoyage-tapis',
    en: '/guides/11-questions-to-ask-before-carpet-cleaning',
  },
  {
    fr: '/guides/meilleure-methode-nettoyage-tapis',
    en: '/guides/best-carpet-cleaning-method',
  },
];

function getRequestDomain(req: express.Request): string {
  const forwardedHost = req.headers['x-forwarded-host'];
  const rawHost = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost || req.headers.host || 'ravivanettoyagedetapis.com';
  return rawHost.split(':')[0].replace(/^www\./, '').toLowerCase();
}

function getProtocol(req: express.Request): string {
  const proto = req.headers['x-forwarded-proto'];
  if (typeof proto === 'string' && proto.length > 0) return proto.split(',')[0];
  return req.protocol || 'https';
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const hasSupabase = Boolean(
    supabaseUrl &&
      supabaseKey &&
      supabaseUrl.startsWith('https://') &&
      !supabaseUrl.includes('your-project.supabase.co')
  );
  const supabase = hasSupabase ? createClient(supabaseUrl!, supabaseKey!) : null;

  app.get('/robots.txt', (req, res) => {
    const domain = getRequestDomain(req);
    const proto = getProtocol(req);
    const origin = `${proto}://${domain}`;
    res.type('text/plain');
    res.send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /dashboard',
        '',
        `Sitemap: ${origin}/sitemap.xml`,
      ].join('\n')
    );
  });

  app.get('/sitemap.xml', async (req, res) => {
    const domain = getRequestDomain(req);
    const proto = getProtocol(req);
    const origin = `${proto}://${domain}`;

    let articleRoutes = [...DEFAULT_PUBLISHED_ARTICLE_SLUGS];

    if (supabase) {
      try {
        const { data: site } = await supabase
          .from('sites')
          .select('id, is_active')
          .eq('domain', domain)
          .eq('is_active', true)
          .maybeSingle();

        if (site?.id) {
          const { data: articles } = await supabase
            .from('articles')
            .select('slug_fr, slug_en')
            .eq('site_id', site.id)
            .eq('status', 'published');

          if (articles && articles.length > 0) {
            articleRoutes = articles.map((a) => ({
              fr: `/guides/${a.slug_fr}`,
              en: `/guides/${a.slug_en}`,
            }));
          }
        }
      } catch {
        // Fallback to default published article slugs when offline
      }
    }

    const urlEntries: string[] = [];
    for (const pair of DEFAULT_PUBLIC_ROUTES) {
      const frLoc = `${origin}${pair.fr}`;
      const enLoc = `${origin}${pair.en}`;
      urlEntries.push(
        `  <url>
    <loc>${escapeXml(frLoc)}</loc>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${escapeXml(frLoc)}" />
    <xhtml:link rel="alternate" hreflang="en-CA" href="${escapeXml(enLoc)}" />
    <changefreq>weekly</changefreq>
  </url>`
      );
      if (pair.en !== pair.fr) {
        urlEntries.push(
          `  <url>
    <loc>${escapeXml(enLoc)}</loc>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${escapeXml(frLoc)}" />
    <xhtml:link rel="alternate" hreflang="en-CA" href="${escapeXml(enLoc)}" />
    <changefreq>weekly</changefreq>
  </url>`
        );
      }
    }

    for (const pair of articleRoutes) {
      const frLoc = `${origin}${pair.fr}`;
      const enLoc = `${origin}${pair.en}`;
      urlEntries.push(
        `  <url>
    <loc>${escapeXml(frLoc)}</loc>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${escapeXml(frLoc)}" />
    <xhtml:link rel="alternate" hreflang="en-CA" href="${escapeXml(enLoc)}" />
    <changefreq>monthly</changefreq>
  </url>`,
        `  <url>
    <loc>${escapeXml(enLoc)}</loc>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="${escapeXml(frLoc)}" />
    <xhtml:link rel="alternate" hreflang="en-CA" href="${escapeXml(enLoc)}" />
    <changefreq>monthly</changefreq>
  </url>`
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

    res.type('application/xml');
    res.send(xml);
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir, { index: false }));
    app.use('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
