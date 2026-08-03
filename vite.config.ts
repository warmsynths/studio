import { defineConfig, Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

function serveSiblingDocs(): Plugin {
  const apps = [
    'beat-mapper',
    'chroma-chords',
    'circuit-chords',
    'hypersyn-chord-helper',
    'j6-companion',
  ];

  return {
    name: 'serve-sibling-docs',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const cleanUrl = req.url.split('?')[0];
        for (const app of apps) {
          const prefix = `/${app}`;
          if (cleanUrl === prefix || cleanUrl.startsWith(`${prefix}/`)) {
            const relPath = cleanUrl.slice(prefix.length) || '/index.html';
            const filePath = path.resolve(__dirname, '..', app, 'docs', relPath.startsWith('/') ? relPath.slice(1) : relPath);
            const targetFile = fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
              ? path.join(filePath, 'index.html')
              : filePath;

            if (fs.existsSync(targetFile) && !fs.statSync(targetFile).isDirectory()) {
              const ext = path.extname(targetFile).toLowerCase();
              const mimeTypes: Record<string, string> = {
                '.html': 'text/html',
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.svg': 'image/svg+xml',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.json': 'application/json',
                '.woff2': 'font/woff2',
                '.wasm': 'application/wasm',
              };
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              fs.createReadStream(targetFile).pipe(res);
              return;
            }
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [serveSiblingDocs()],
  build: {
    target: 'es2022',
    outDir: 'docs',
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
});
