type LinkRecord = {
  url: string;
  createdAt: string;
};

const links = new Map<string, LinkRecord>();
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomCode(length = 6): string {
  let output = "";
  for (let i = 0; i < length; i += 1) {
    const idx = Math.floor(Math.random() * chars.length);
    output += chars[idx];
  }
  return output;
}

export function createShortCode(url: string): string {
  let code = randomCode();
  while (links.has(code)) {
    code = randomCode();
  }

  links.set(code, {
    url,
    createdAt: new Date().toISOString()
  });

  return code;
}

export function getOriginalUrl(code: string): string | null {
  return links.get(code)?.url ?? null;
}
