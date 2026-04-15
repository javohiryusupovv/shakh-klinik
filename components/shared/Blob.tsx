// RSC — decorative background blobs, pointer-events-none, 20% opacity max
// Applied in locale layout behind all content (PITFALLS §11 — glass selective)
export function Blob() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top-left primary blob */}
      <svg
        className="absolute -top-40 -left-40 opacity-20"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="300" r="300" fill="var(--color-primary)" />
      </svg>

      {/* Top-right mint blob */}
      <svg
        className="absolute -top-20 -right-32 opacity-20"
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="250" cy="200" rx="280" ry="250" fill="var(--color-mint)" />
      </svg>

      {/* Bottom-center primary-deep blob */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10"
        width="800"
        height="400"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="400" cy="400" rx="450" ry="300" fill="var(--color-primary-deep)" />
      </svg>
    </div>
  )
}
