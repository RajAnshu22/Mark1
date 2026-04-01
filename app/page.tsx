"use client";

import { FormEvent, useMemo, useState } from "react";

type ApiResponse = {
  shortUrl: string;
  code: string;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => url.trim().length > 0 && !loading, [url, loading]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setShortUrl(null);

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() })
      });

      if (!response.ok) {
        const payload = await response.json();
        setError(payload.error ?? "Unable to shorten this URL.");
        return;
      }

      const payload = (await response.json()) as ApiResponse;
      setShortUrl(payload.shortUrl);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="card">
        <h1>Link shortener</h1>
        <p>Clean, calm, and minimal. Paste a URL to create a short link instantly.</p>

        <form onSubmit={onSubmit}>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
          />
          <button type="submit" disabled={!canSubmit}>
            {loading ? "Creating…" : "Create short link"}
          </button>
        </form>

        {error ? <p role="alert">{error}</p> : null}

        {shortUrl ? (
          <div className="result">
            <span>Your short URL:</span>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        ) : null}

        <p className="note">Note: this starter uses in-memory storage. Connect a database for production persistence.</p>
      </section>
    </main>
  );
}
