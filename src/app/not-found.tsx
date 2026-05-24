"use client";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 600 }}>404</h1>
        <p style={{ marginTop: "0.5rem", color: "#666" }}>Page not found.</p>
        <a href="/" style={{ marginTop: "1.5rem", display: "inline-block", color: "#0a0a0a" }}>
          Go home
        </a>
      </body>
    </html>
  );
}
