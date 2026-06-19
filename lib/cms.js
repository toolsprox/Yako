import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const journalsDirectory = path.join(process.cwd(), 'content/journals');

/**
 * Gets all journal slugs by reading the files in the directory.
 */
export function getJournalSlugs() {
  if (!fs.existsSync(journalsDirectory)) return [];
  return fs.readdirSync(journalsDirectory).filter((file) => file.endsWith('.md'));
}

/**
 * Gets the raw content and metadata for a specific journal by slug.
 */
export function getJournalBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(journalsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || '',
    author: data.author || 'Yako London',
    content,
  };
}

/**
 * Gets all journals, sorted by date (newest first).
 */
export function getAllJournals() {
  const slugs = getJournalSlugs();
  const journals = slugs
    .map((slug) => getJournalBySlug(slug))
    .filter(Boolean)
    // sort journals by date in descending order
    .sort((journal1, journal2) => (journal1.date > journal2.date ? -1 : 1));
  return journals;
}
