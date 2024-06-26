export function generateSlug(title: string): string {
  // Normalize and create the base slug
  let slug = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // Ensure the slug is unique by appending a timestamp if necessary
  const timestamp = Date.now();
  let uniqueSlug = `${slug}-${timestamp}`;

  return uniqueSlug;
}
