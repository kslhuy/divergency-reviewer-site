import { defineConfig } from 'vite';
import { sites } from '@openai/sites-vite-plugin';
process.env.WRANGLER_WRITE_LOGS = 'false';
process.env.WRANGLER_LOG_PATH = '.wrangler/logs';
process.env.MINIFLARE_REGISTRY_PATH = '.wrangler/registry';
const { cloudflare } = await import('@cloudflare/vite-plugin');
export default defineConfig({
  publicDir: false,
  plugins: [sites(), cloudflare({ viteEnvironment: { name: 'server' }, config: {
    name: 'divergency-team-editor', main: './online/worker.mjs', compatibility_date: '2026-05-15',
    compatibility_flags: ['nodejs_compat'],
    d1_databases: [{ binding: 'DB', database_name: 'divergency', database_id: '00000000-0000-4000-8000-000000000000' }],
    r2_buckets: [{ binding: 'UPLOADS', bucket_name: 'divergency-uploads' }],
  } })],
});
