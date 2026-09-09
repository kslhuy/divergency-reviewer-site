import path from 'node:path';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from 'node:fs';

export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const extensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);
const fail = (message, status = 400) => Object.assign(new Error(message), { status });

function imageInfo(root, file) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  return {
    src: relative.split('/').map(encodeURIComponent).join('/'),
    name: path.basename(file),
    folder: path.posix.dirname(relative).replace(/^imgs\/?/, '') || 'Khác',
    bytes: statSync(file).size,
  };
}

export function listImages(root) {
  const base = path.join(root, 'imgs');
  if (!existsSync(base)) return [];
  if (!realpathSync(base).startsWith(realpathSync(root) + path.sep)) throw fail('Thư viện ảnh nằm ngoài dự án.', 403);
  const images = [];
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(file);
      else if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) images.push(imageInfo(root, file));
    }
  }
  visit(base);
  return images.sort((a, b) => a.folder.localeCompare(b.folder) || a.name.localeCompare(b.name));
}

function imageExtension(bytes) {
  if (bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) && bytes.toString('ascii', 12, 16) === 'IHDR') return '.png';
  if (bytes.length >= 4 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 && bytes.at(-2) === 255 && bytes.at(-1) === 217) return '.jpg';
  if (bytes.length >= 14 && ['GIF87a', 'GIF89a'].includes(bytes.toString('ascii', 0, 6))) return '.gif';
  if (bytes.length >= 20 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') return '.webp';
  throw fail('Chọn ảnh PNG, JPG, GIF hoặc WebP hợp lệ.');
}

export function saveImage(root, originalName, bytes) {
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw fail('Mỗi ảnh cần nhỏ hơn hoặc bằng 20 MB.', 413);
  const extension = imageExtension(bytes);
  const basename = path.posix.basename(String(originalName || 'anh').replaceAll('\\', '/'));
  const stem = path.parse(basename).name.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[đĐ]/g, 'd')
    .replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'anh';
  const digest = createHash('sha256').update(bytes).digest('hex');
  const directory = path.join(root, 'imgs', 'uploads');
  for (const target of [path.join(root, 'imgs'), directory]) {
    if (existsSync(target) && !realpathSync(target).startsWith(realpathSync(root) + path.sep)) throw fail('Thư mục tải ảnh không hợp lệ.', 403);
  }
  mkdirSync(directory, { recursive: true });
  if (!realpathSync(directory).startsWith(realpathSync(root) + path.sep)) throw fail('Thư mục tải ảnh không hợp lệ.', 403);
  const file = path.join(directory, `${stem}-${digest.slice(0, 16)}${extension}`);
  try { writeFileSync(file, bytes, { flag: 'wx' }); }
  catch (error) {
    if (error.code !== 'EEXIST' || !readFileSync(file).equals(bytes)) throw error;
  }
  return imageInfo(root, file);
}
