import type { MetadataRoute } from 'next'
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from '@/lib/seo/config'
import {
  getAllServices,
  getAllDoctors,
  getAllNews,
} from '@/lib/services'

type Entry = MetadataRoute.Sitemap[number]

function makeEntry(
  path: string,
  opts: { changeFrequency?: Entry['changeFrequency']; priority?: number; lastModified?: string | Date } = {}
): Entry {
  const clean = path.replace(/^\//, '').replace(/\/$/, '')
  const url = `${SITE_URL}/${DEFAULT_LOCALE}${clean ? '/' + clean : ''}`
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${clean ? '/' + clean : ''}`
  }
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${clean ? '/' + clean : ''}`
  return {
    url,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? 'weekly',
    priority: opts.priority ?? 0.7,
    alternates: { languages },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    makeEntry('', { changeFrequency: 'weekly', priority: 1 }),
    makeEntry('services', { changeFrequency: 'weekly', priority: 0.9 }),
    makeEntry('doctors', { changeFrequency: 'weekly', priority: 0.9 }),
    makeEntry('news', { changeFrequency: 'daily', priority: 0.8 }),
    makeEntry('contact', { changeFrequency: 'monthly', priority: 0.6 }),
  ]

  for (const s of getAllServices()) {
    entries.push(
      makeEntry(`services/${s.slug}`, { changeFrequency: 'monthly', priority: 0.7 })
    )
  }
  for (const d of getAllDoctors()) {
    entries.push(
      makeEntry(`doctors/${d.slug}`, { changeFrequency: 'monthly', priority: 0.6 })
    )
  }
  for (const n of getAllNews()) {
    entries.push(
      makeEntry(`news/${n.slug}`, {
        changeFrequency: 'monthly',
        priority: 0.5,
        lastModified: n.date,
      })
    )
  }

  return entries
}
