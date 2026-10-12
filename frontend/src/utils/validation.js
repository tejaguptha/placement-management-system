export function isValidUrl(val) {
  if (!val || typeof val !== "string") return false;
  const trimmed = val.trim();
  if (!trimmed) return false;

  // Must strictly start with http:// or https:// with two slashes followed by non-slash character
  if (!/^https?:\/\/[^\s/]/i.test(trimmed)) {
    return false;
  }

  // Explicitly reject single-slash URLs such as https:/example.com or http:/example.com
  if (/^https?:\/[^/]/i.test(trimmed)) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}
