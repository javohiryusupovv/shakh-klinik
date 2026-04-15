// instrumentation-client.ts — Next 16 convention (runs before app code, after HTML load)
// Yandex Metrika non-blocking client analytics (D-19, ANA-02)
// See: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_YM_ID) {
  const ymId = Number(process.env.NEXT_PUBLIC_YM_ID)

  // Standard Yandex Metrika init snippet — loads with async=true (non-blocking, D-20)
  ;(function (m: Window & typeof globalThis, e: Document, t: string, r: string, i: string, k?: HTMLScriptElement, a?: Element | null) {
    const mi = m as unknown as Record<string, unknown>
    mi[i] =
      mi[i] ||
      function (...args: unknown[]) {
        ;((mi[i] as { a?: unknown[] }).a = (mi[i] as { a?: unknown[] }).a || []).push(args)
      }
    ;(mi[i] as { l?: number }).l = Number(new Date())
    k = e.createElement(t) as HTMLScriptElement
    a = e.getElementsByTagName(t)[0]
    k.async = true
    k.src = r
    a?.parentNode?.insertBefore(k, a)
  })(
    window,
    document,
    'script',
    'https://mc.yandex.ru/metrika/tag.js',
    'ym'
  )
  ;(window as unknown as Record<string, (...args: unknown[]) => void>).ym(ymId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false, // disabled by default for privacy
  })
}
