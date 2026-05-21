import type {
  BreadcrumbList,
  FAQPage,
  MedicalClinic,
  MedicalProcedure,
  NewsArticle,
  Organization,
  Physician,
  Service,
  WithContext,
} from 'schema-dts'
import { localizedUrl, SITE_URL } from './config'

export interface OrgInfo {
  legalName: string
  description: string
  addressLocality: string
  addressRegion: string
  addressCountry: string
  streetAddress: string
  postalCode: string
  phone: string
  email: string
}

export function medicalClinicJsonLd(
  locale: string,
  org: OrgInfo,
  opts: { logo?: string; sameAs?: string[] } = {}
): WithContext<MedicalClinic> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${SITE_URL}/#clinic`,
    name: org.legalName,
    description: org.description,
    url: localizedUrl(locale, ''),
    logo: opts.logo ? `${SITE_URL}${opts.logo}` : `${SITE_URL}/og-default.jpg`,
    image: `${SITE_URL}/og-default.jpg`,
    telephone: org.phone,
    email: org.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.streetAddress,
      addressLocality: org.addressLocality,
      addressRegion: org.addressRegion,
      postalCode: org.postalCode,
      addressCountry: org.addressCountry,
    },
    medicalSpecialty: [
      'PrimaryCare',
      'Cardiovascular',
      'Gynecologic',
      'Pediatric',
      'Dentistry',
      'Dermatologic',
      'Optometric',
      'Endocrine',
      'Gastroenterologic',
      'Musculoskeletal',
      'Neurologic',
      'Urologic',
    ],
    priceRange: '$$',
    ...(opts.sameAs && opts.sameAs.length > 0 ? { sameAs: opts.sameAs } : {}),
  }
}

export function organizationJsonLd(
  locale: string,
  org: OrgInfo
): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: org.legalName,
    url: localizedUrl(locale, ''),
    logo: `${SITE_URL}/og-default.jpg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: org.phone,
      contactType: 'customer service',
      email: org.email,
      availableLanguage: ['Russian', 'Uzbek', 'English'],
    },
  }
}

export interface PhysicianInfo {
  slug: string
  name: string
  specialty: string
  experienceYears: number
  bio?: string
}

export function physicianJsonLd(
  locale: string,
  doctor: PhysicianInfo,
  org: OrgInfo
): WithContext<Physician> {
  // schema-dts types `medicalSpecialty` as a fixed enum; localized free-text
  // specialties (e.g. "Кардиолог", "Pediatr") are still valid for Google so we
  // cast through `unknown` to bypass the enum constraint.
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    medicalSpecialty: doctor.specialty,
    url: localizedUrl(locale, `doctors/${doctor.slug}`),
    ...(doctor.bio ? { description: doctor.bio } : {}),
    parentOrganization: {
      '@type': 'MedicalOrganization',
      '@id': `${SITE_URL}/#clinic`,
      name: org.legalName,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.streetAddress,
      addressLocality: org.addressLocality,
      addressRegion: org.addressRegion,
      postalCode: org.postalCode,
      addressCountry: org.addressCountry,
    },
    telephone: org.phone,
  } as unknown as WithContext<Physician>
}

export interface ProcedureInfo {
  slug: string
  name: string
  description: string
  durationMinutes: number
  priceMin: number
  priceMax: number
  currency?: string
}

export function medicalProcedureJsonLd(
  locale: string,
  service: ProcedureInfo
): WithContext<MedicalProcedure> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.description,
    url: localizedUrl(locale, `services/${service.slug}`),
    procedureType: 'NoninvasiveProcedure',
  }
}

export function serviceOfferJsonLd(
  locale: string,
  service: ProcedureInfo,
  orgName: string
): WithContext<Service> {
  const currency = service.currency ?? 'UZS'
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: localizedUrl(locale, `services/${service.slug}`),
    provider: {
      '@type': 'MedicalOrganization',
      '@id': `${SITE_URL}/#clinic`,
      name: orgName,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency,
      lowPrice: service.priceMin,
      highPrice: service.priceMax,
      availability: 'https://schema.org/InStock',
    },
  }
}

export interface NewsArticleInfo {
  slug: string
  title: string
  excerpt: string
  body: string
  date: string
  authorName: string
}

export function newsArticleJsonLd(
  locale: string,
  article: NewsArticleInfo,
  orgName: string
): WithContext<NewsArticle> {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: locale,
    url: localizedUrl(locale, `news/${article.slug}`),
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: orgName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-default.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': localizedUrl(locale, `news/${article.slug}`),
    },
  }
}

export interface BreadcrumbItem {
  name: string
  path: string
}

export function breadcrumbJsonLd(
  locale: string,
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  }
}

export interface FAQItem {
  question: string
  answer: string
}

export function faqJsonLd(items: FAQItem[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  }
}
