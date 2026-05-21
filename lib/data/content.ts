/**
 * ShaxKlinika content data — single source of truth per CONTEXT D-05.
 * Translatable strings live in messages/{ru,uz,en}.json keyed by slug (D-07).
 *
 * This file MUST stay free of Unsplash URLs (D-18 / PITFALLS §3) — only `imageQuery`
 * search phrases are stored. Phase 4 components compose the URL at render time.
 *
 * To add or rename a record:
 *   1. Edit the relevant array below (keep slug/id stable if possible).
 *   2. Add the corresponding messages.{ru,uz,en}.json entries.
 *   3. The dev-time integrity check at the bottom will throw on mismatched cross-refs.
 */

// ---------------------------------------------------------------------------
// Type definitions (D-06: types live alongside data)
// ---------------------------------------------------------------------------

export type CategoryId =
  | 'therapy'
  | 'cardiology'
  | 'neurology'
  | 'gynecology'
  | 'urology'
  | 'pediatrics'
  | 'dermatology'
  | 'ophthalmology'
  | 'dentistry'
  | 'endocrinology'
  | 'gastroenterology'
  | 'orthopedics'
  | 'diagnostics';

export type DepartmentId = string;

export interface Category {
  id: CategoryId;
}

export interface Department {
  id: DepartmentId;
  categoryIds: CategoryId[];
}

export interface Service {
  slug: string;
  categoryId: CategoryId;
  departmentId: DepartmentId;
  priceMin: number;
  priceMax: number;
  durationMinutes: number;
  imageQuery: string;
}

export interface Doctor {
  slug: string;
  departmentId: DepartmentId;
  experienceYears: number;
  photoQuery: string;
}

export interface NewsArticle {
  slug: string;
  date: string;
  authorSlug: string;
  categoryId: CategoryId;
  coverImageQuery: string;
}

export interface Review {
  id: string;
  rating: 4 | 5;
  date: string;
  serviceSlug: string;
  doctorSlug: string;
}

// ---------------------------------------------------------------------------
// CATEGORIES (13 — order matches TZ)
// ---------------------------------------------------------------------------

export const CATEGORIES: Category[] = [
  { id: 'therapy' },
  { id: 'cardiology' },
  { id: 'neurology' },
  { id: 'gynecology' },
  { id: 'urology' },
  { id: 'pediatrics' },
  { id: 'dermatology' },
  { id: 'ophthalmology' },
  { id: 'dentistry' },
  { id: 'endocrinology' },
  { id: 'gastroenterology' },
  { id: 'orthopedics' },
  { id: 'diagnostics' },
];

// ---------------------------------------------------------------------------
// DEPARTMENTS (12 — every CategoryId covered at least once)
// ---------------------------------------------------------------------------

export const DEPARTMENTS: Department[] = [
  { id: 'general-medicine', categoryIds: ['therapy', 'pediatrics'] },
  { id: 'cardiology-dept', categoryIds: ['cardiology'] },
  { id: 'neurology-dept', categoryIds: ['neurology'] },
  { id: 'womens-health', categoryIds: ['gynecology'] },
  { id: 'urology-dept', categoryIds: ['urology'] },
  { id: 'dermatology-dept', categoryIds: ['dermatology'] },
  { id: 'eye-clinic', categoryIds: ['ophthalmology'] },
  { id: 'dental-clinic', categoryIds: ['dentistry'] },
  { id: 'endocrinology-dept', categoryIds: ['endocrinology'] },
  { id: 'gastro-dept', categoryIds: ['gastroenterology'] },
  { id: 'surgery', categoryIds: ['orthopedics'] },
  { id: 'diagnostics-lab', categoryIds: ['diagnostics'] },
];

// ---------------------------------------------------------------------------
// SERVICES (28 entries — covers all 13 categories with realistic Tashkent UZS pricing)
// ---------------------------------------------------------------------------

export const SERVICES: Service[] = [
  // therapy (general medicine)
  {
    slug: 'therapy-consultation',
    categoryId: 'therapy',
    departmentId: 'general-medicine',
    priceMin: 120000,
    priceMax: 180000,
    durationMinutes: 30,
    imageQuery: 'general practitioner consultation',
  },
  {
    slug: 'annual-checkup-comprehensive',
    categoryId: 'therapy',
    departmentId: 'general-medicine',
    priceMin: 800000,
    priceMax: 1500000,
    durationMinutes: 120,
    imageQuery: 'medical checkup clinic',
  },
  // cardiology
  {
    slug: 'cardiology-consultation',
    categoryId: 'cardiology',
    departmentId: 'cardiology-dept',
    priceMin: 180000,
    priceMax: 250000,
    durationMinutes: 40,
    imageQuery: 'cardiologist stethoscope',
  },
  {
    slug: 'cardiology-ecg',
    categoryId: 'cardiology',
    departmentId: 'cardiology-dept',
    priceMin: 100000,
    priceMax: 160000,
    durationMinutes: 20,
    imageQuery: 'ecg heart monitor',
  },
  {
    slug: 'cardiology-echo',
    categoryId: 'cardiology',
    departmentId: 'cardiology-dept',
    priceMin: 280000,
    priceMax: 420000,
    durationMinutes: 45,
    imageQuery: 'echocardiogram ultrasound heart',
  },
  // neurology
  {
    slug: 'neurology-consultation',
    categoryId: 'neurology',
    departmentId: 'neurology-dept',
    priceMin: 180000,
    priceMax: 250000,
    durationMinutes: 45,
    imageQuery: 'neurologist examining patient',
  },
  {
    slug: 'neurology-eeg',
    categoryId: 'neurology',
    departmentId: 'neurology-dept',
    priceMin: 220000,
    priceMax: 320000,
    durationMinutes: 60,
    imageQuery: 'eeg brain scan',
  },
  // gynecology
  {
    slug: 'gynecology-consultation',
    categoryId: 'gynecology',
    departmentId: 'womens-health',
    priceMin: 180000,
    priceMax: 240000,
    durationMinutes: 40,
    imageQuery: 'gynecologist consultation room',
  },
  {
    slug: 'gynecology-ultrasound',
    categoryId: 'gynecology',
    departmentId: 'womens-health',
    priceMin: 220000,
    priceMax: 350000,
    durationMinutes: 30,
    imageQuery: 'pelvic ultrasound exam',
  },
  // urology
  {
    slug: 'urology-consultation',
    categoryId: 'urology',
    departmentId: 'urology-dept',
    priceMin: 180000,
    priceMax: 240000,
    durationMinutes: 40,
    imageQuery: 'urologist consultation',
  },
  {
    slug: 'urology-uroflowmetry',
    categoryId: 'urology',
    departmentId: 'urology-dept',
    priceMin: 180000,
    priceMax: 280000,
    durationMinutes: 30,
    imageQuery: 'urology diagnostic equipment',
  },
  // pediatrics — handled inside general-medicine department per D-discretion
  {
    slug: 'pediatrics-consultation',
    categoryId: 'pediatrics',
    departmentId: 'general-medicine',
    priceMin: 150000,
    priceMax: 220000,
    durationMinutes: 30,
    imageQuery: 'pediatrician child checkup',
  },
  {
    slug: 'pediatrics-vaccination',
    categoryId: 'pediatrics',
    departmentId: 'general-medicine',
    priceMin: 120000,
    priceMax: 450000,
    durationMinutes: 20,
    imageQuery: 'child vaccination clinic',
  },
  // dermatology
  {
    slug: 'dermatology-consultation',
    categoryId: 'dermatology',
    departmentId: 'dermatology-dept',
    priceMin: 180000,
    priceMax: 240000,
    durationMinutes: 30,
    imageQuery: 'dermatologist skin examination',
  },
  {
    slug: 'dermatology-laser',
    categoryId: 'dermatology',
    departmentId: 'dermatology-dept',
    priceMin: 350000,
    priceMax: 1200000,
    durationMinutes: 60,
    imageQuery: 'laser dermatology treatment',
  },
  // ophthalmology
  {
    slug: 'ophthalmology-consultation',
    categoryId: 'ophthalmology',
    departmentId: 'eye-clinic',
    priceMin: 180000,
    priceMax: 240000,
    durationMinutes: 30,
    imageQuery: 'ophthalmologist eye exam',
  },
  {
    slug: 'ophthalmology-vision-test',
    categoryId: 'ophthalmology',
    departmentId: 'eye-clinic',
    priceMin: 120000,
    priceMax: 180000,
    durationMinutes: 25,
    imageQuery: 'vision test optometry chart',
  },
  // dentistry
  {
    slug: 'dental-cleaning',
    categoryId: 'dentistry',
    departmentId: 'dental-clinic',
    priceMin: 280000,
    priceMax: 450000,
    durationMinutes: 45,
    imageQuery: 'dental cleaning procedure',
  },
  {
    slug: 'dental-implant',
    categoryId: 'dentistry',
    departmentId: 'dental-clinic',
    priceMin: 4500000,
    priceMax: 12000000,
    durationMinutes: 90,
    imageQuery: 'dental implant procedure',
  },
  {
    slug: 'dental-whitening',
    categoryId: 'dentistry',
    departmentId: 'dental-clinic',
    priceMin: 800000,
    priceMax: 1500000,
    durationMinutes: 60,
    imageQuery: 'teeth whitening clinic',
  },
  // endocrinology
  {
    slug: 'endocrinology-consultation',
    categoryId: 'endocrinology',
    departmentId: 'endocrinology-dept',
    priceMin: 180000,
    priceMax: 250000,
    durationMinutes: 40,
    imageQuery: 'endocrinologist consultation',
  },
  {
    slug: 'endocrinology-thyroid-ultrasound',
    categoryId: 'endocrinology',
    departmentId: 'endocrinology-dept',
    priceMin: 220000,
    priceMax: 320000,
    durationMinutes: 30,
    imageQuery: 'thyroid ultrasound exam',
  },
  // gastroenterology
  {
    slug: 'gastro-consultation',
    categoryId: 'gastroenterology',
    departmentId: 'gastro-dept',
    priceMin: 180000,
    priceMax: 250000,
    durationMinutes: 40,
    imageQuery: 'gastroenterologist consultation',
  },
  {
    slug: 'gastro-fgds',
    categoryId: 'gastroenterology',
    departmentId: 'gastro-dept',
    priceMin: 450000,
    priceMax: 750000,
    durationMinutes: 30,
    imageQuery: 'endoscopy gastroscopy procedure',
  },
  // orthopedics (covered by surgery dept)
  {
    slug: 'orthopedics-consultation',
    categoryId: 'orthopedics',
    departmentId: 'surgery',
    priceMin: 180000,
    priceMax: 250000,
    durationMinutes: 40,
    imageQuery: 'orthopedic surgeon consultation',
  },
  {
    slug: 'orthopedics-joint-injection',
    categoryId: 'orthopedics',
    departmentId: 'surgery',
    priceMin: 450000,
    priceMax: 850000,
    durationMinutes: 45,
    imageQuery: 'joint injection treatment',
  },
  // diagnostics
  {
    slug: 'diagnostics-mri',
    categoryId: 'diagnostics',
    departmentId: 'diagnostics-lab',
    priceMin: 950000,
    priceMax: 1800000,
    durationMinutes: 60,
    imageQuery: 'mri scanner imaging',
  },
  {
    slug: 'diagnostics-blood-panel-full',
    categoryId: 'diagnostics',
    departmentId: 'diagnostics-lab',
    priceMin: 280000,
    priceMax: 480000,
    durationMinutes: 15,
    imageQuery: 'blood test laboratory',
  },
];

// ---------------------------------------------------------------------------
// DOCTORS (15 — distributed across departments; mix of male/female Uzbek/Russian names)
// ---------------------------------------------------------------------------

export const DOCTORS: Doctor[] = [
  {
    slug: 'karimov-sherzod-alisherovich',
    departmentId: 'cardiology-dept',
    experienceYears: 22,
    photoQuery: 'uzbek male cardiologist white coat',
  },
  {
    slug: 'yuldasheva-dilnoza-bahtiyorovna',
    departmentId: 'general-medicine',
    experienceYears: 17,
    photoQuery: 'female pediatrician portrait smiling',
  },
  {
    slug: 'nazarov-alisher-rustamovich',
    departmentId: 'neurology-dept',
    experienceYears: 25,
    photoQuery: 'senior male neurologist portrait',
  },
  {
    slug: 'tursunova-malika-shavkatovna',
    departmentId: 'womens-health',
    experienceYears: 14,
    photoQuery: 'female gynecologist portrait',
  },
  {
    slug: 'ismailov-bobur-uktamovich',
    departmentId: 'urology-dept',
    experienceYears: 19,
    photoQuery: 'male urologist white coat portrait',
  },
  {
    slug: 'rakhimova-zuhra-azizovna',
    departmentId: 'dermatology-dept',
    experienceYears: 11,
    photoQuery: 'female dermatologist portrait',
  },
  {
    slug: 'mirzayev-jasur-saidovich',
    departmentId: 'eye-clinic',
    experienceYears: 16,
    photoQuery: 'male ophthalmologist portrait',
  },
  {
    slug: 'kasymova-feruza-tahirovna',
    departmentId: 'dental-clinic',
    experienceYears: 13,
    photoQuery: 'female dentist portrait professional',
  },
  {
    slug: 'usmanov-ravshan-makhmudovich',
    departmentId: 'dental-clinic',
    experienceYears: 20,
    photoQuery: 'male dental surgeon portrait',
  },
  {
    slug: 'nuriddinova-nigora-shavkatovna',
    departmentId: 'endocrinology-dept',
    experienceYears: 15,
    photoQuery: 'female endocrinologist portrait',
  },
  {
    slug: 'tashpulatov-shokhrukh-bakhtiyorovich',
    departmentId: 'gastro-dept',
    experienceYears: 18,
    photoQuery: 'male gastroenterologist portrait',
  },
  {
    slug: 'khodjayeva-gulchehra-rustamovna',
    departmentId: 'general-medicine',
    experienceYears: 28,
    photoQuery: 'senior female therapist portrait',
  },
  {
    slug: 'pulatov-sardor-anvarovich',
    departmentId: 'surgery',
    experienceYears: 24,
    photoQuery: 'male orthopedic surgeon portrait',
  },
  {
    slug: 'azimova-shahnoza-davronovna',
    departmentId: 'diagnostics-lab',
    experienceYears: 12,
    photoQuery: 'female radiologist portrait',
  },
  {
    slug: 'qosimov-akmal-tolkinovich',
    departmentId: 'general-medicine',
    experienceYears: 9,
    photoQuery: 'young male doctor portrait',
  },
];

// ---------------------------------------------------------------------------
// NEWS (12 articles — dates spread across 2025-10-25 .. 2026-04-25)
// ---------------------------------------------------------------------------

export const NEWS: NewsArticle[] = [
  {
    slug: 'clinic-opens-new-pediatric-wing',
    date: '2026-04-12',
    authorSlug: 'yuldasheva-dilnoza-bahtiyorovna',
    categoryId: 'pediatrics',
    coverImageQuery: 'modern pediatric clinic interior',
  },
  {
    slug: 'free-cardio-screening-day',
    date: '2026-03-28',
    authorSlug: 'karimov-sherzod-alisherovich',
    categoryId: 'cardiology',
    coverImageQuery: 'cardiology screening event',
  },
  {
    slug: 'winter-flu-prevention-tips',
    date: '2026-01-15',
    authorSlug: 'khodjayeva-gulchehra-rustamovna',
    categoryId: 'therapy',
    coverImageQuery: 'flu prevention vaccine clinic',
  },
  {
    slug: 'dental-implant-technology-update',
    date: '2026-02-22',
    authorSlug: 'usmanov-ravshan-makhmudovich',
    categoryId: 'dentistry',
    coverImageQuery: 'modern dental clinic equipment',
  },
  {
    slug: 'women-health-week-2026',
    date: '2026-03-08',
    authorSlug: 'tursunova-malika-shavkatovna',
    categoryId: 'gynecology',
    coverImageQuery: 'womens health awareness',
  },
  {
    slug: 'new-mri-machine-installation',
    date: '2025-12-10',
    authorSlug: 'azimova-shahnoza-davronovna',
    categoryId: 'diagnostics',
    coverImageQuery: 'mri scanner installation hospital',
  },
  {
    slug: 'vaccination-schedule-children-2026',
    date: '2026-01-30',
    authorSlug: 'yuldasheva-dilnoza-bahtiyorovna',
    categoryId: 'pediatrics',
    coverImageQuery: 'child vaccination calendar',
  },
  {
    slug: 'diabetes-awareness-month',
    date: '2025-11-14',
    authorSlug: 'nuriddinova-nigora-shavkatovna',
    categoryId: 'endocrinology',
    coverImageQuery: 'diabetes glucose meter',
  },
  {
    slug: 'eye-health-screen-time-tips',
    date: '2025-10-29',
    authorSlug: 'mirzayev-jasur-saidovich',
    categoryId: 'ophthalmology',
    coverImageQuery: 'eye health office workers',
  },
  {
    slug: 'dermatologist-acne-treatment-guide',
    date: '2025-11-25',
    authorSlug: 'rakhimova-zuhra-azizovna',
    categoryId: 'dermatology',
    coverImageQuery: 'dermatology skincare consultation',
  },
  {
    slug: 'family-medicine-package-launch',
    date: '2026-02-05',
    authorSlug: 'qosimov-akmal-tolkinovich',
    categoryId: 'therapy',
    coverImageQuery: 'family medicine clinic',
  },
  {
    slug: 'partnership-with-tashkent-medical-academy',
    date: '2025-12-20',
    authorSlug: 'nazarov-alisher-rustamovich',
    categoryId: 'neurology',
    coverImageQuery: 'medical academy collaboration',
  },
];

// ---------------------------------------------------------------------------
// REVIEWS (20 entries — r-001 .. r-020; rating 4 or 5; dates last 12 months)
// ---------------------------------------------------------------------------

export const REVIEWS: Review[] = [
  {
    id: 'r-001',
    rating: 5,
    date: '2026-04-18',
    serviceSlug: 'cardiology-consultation',
    doctorSlug: 'karimov-sherzod-alisherovich',
  },
  {
    id: 'r-002',
    rating: 5,
    date: '2026-04-10',
    serviceSlug: 'pediatrics-consultation',
    doctorSlug: 'yuldasheva-dilnoza-bahtiyorovna',
  },
  {
    id: 'r-003',
    rating: 4,
    date: '2026-03-30',
    serviceSlug: 'dental-cleaning',
    doctorSlug: 'kasymova-feruza-tahirovna',
  },
  {
    id: 'r-004',
    rating: 5,
    date: '2026-03-22',
    serviceSlug: 'gynecology-ultrasound',
    doctorSlug: 'tursunova-malika-shavkatovna',
  },
  {
    id: 'r-005',
    rating: 5,
    date: '2026-03-15',
    serviceSlug: 'neurology-consultation',
    doctorSlug: 'nazarov-alisher-rustamovich',
  },
  {
    id: 'r-006',
    rating: 5,
    date: '2026-03-04',
    serviceSlug: 'ophthalmology-consultation',
    doctorSlug: 'mirzayev-jasur-saidovich',
  },
  {
    id: 'r-007',
    rating: 4,
    date: '2026-02-26',
    serviceSlug: 'dermatology-consultation',
    doctorSlug: 'rakhimova-zuhra-azizovna',
  },
  {
    id: 'r-008',
    rating: 5,
    date: '2026-02-19',
    serviceSlug: 'cardiology-echo',
    doctorSlug: 'karimov-sherzod-alisherovich',
  },
  {
    id: 'r-009',
    rating: 5,
    date: '2026-02-12',
    serviceSlug: 'dental-implant',
    doctorSlug: 'usmanov-ravshan-makhmudovich',
  },
  {
    id: 'r-010',
    rating: 5,
    date: '2026-02-04',
    serviceSlug: 'endocrinology-consultation',
    doctorSlug: 'nuriddinova-nigora-shavkatovna',
  },
  {
    id: 'r-011',
    rating: 4,
    date: '2026-01-28',
    serviceSlug: 'gastro-fgds',
    doctorSlug: 'tashpulatov-shokhrukh-bakhtiyorovich',
  },
  {
    id: 'r-012',
    rating: 5,
    date: '2026-01-15',
    serviceSlug: 'urology-consultation',
    doctorSlug: 'ismailov-bobur-uktamovich',
  },
  {
    id: 'r-013',
    rating: 5,
    date: '2026-01-08',
    serviceSlug: 'annual-checkup-comprehensive',
    doctorSlug: 'khodjayeva-gulchehra-rustamovna',
  },
  {
    id: 'r-014',
    rating: 5,
    date: '2025-12-22',
    serviceSlug: 'orthopedics-joint-injection',
    doctorSlug: 'pulatov-sardor-anvarovich',
  },
  {
    id: 'r-015',
    rating: 4,
    date: '2025-12-14',
    serviceSlug: 'diagnostics-mri',
    doctorSlug: 'azimova-shahnoza-davronovna',
  },
  {
    id: 'r-016',
    rating: 5,
    date: '2025-11-30',
    serviceSlug: 'therapy-consultation',
    doctorSlug: 'qosimov-akmal-tolkinovich',
  },
  {
    id: 'r-017',
    rating: 5,
    date: '2025-11-19',
    serviceSlug: 'dental-whitening',
    doctorSlug: 'kasymova-feruza-tahirovna',
  },
  {
    id: 'r-018',
    rating: 4,
    date: '2025-10-28',
    serviceSlug: 'pediatrics-vaccination',
    doctorSlug: 'yuldasheva-dilnoza-bahtiyorovna',
  },
  {
    id: 'r-019',
    rating: 5,
    date: '2025-08-12',
    serviceSlug: 'cardiology-ecg',
    doctorSlug: 'karimov-sherzod-alisherovich',
  },
  {
    id: 'r-020',
    rating: 5,
    date: '2025-06-04',
    serviceSlug: 'gynecology-consultation',
    doctorSlug: 'tursunova-malika-shavkatovna',
  },
];

// ---------------------------------------------------------------------------
// Dev-time integrity check — fails fast if any cross-reference is broken.
// Skipped in production to avoid runtime overhead.
// ---------------------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
  const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
  const doctorSlugs = new Set(DOCTORS.map((d) => d.slug));
  const departmentIds = new Set(DEPARTMENTS.map((d) => d.id));
  const categoryIds = new Set<string>(CATEGORIES.map((c) => c.id));

  for (const s of SERVICES) {
    if (!categoryIds.has(s.categoryId)) {
      throw new Error(`Service ${s.slug} → unknown categoryId ${s.categoryId}`);
    }
    if (!departmentIds.has(s.departmentId)) {
      throw new Error(`Service ${s.slug} → unknown departmentId ${s.departmentId}`);
    }
  }
  for (const d of DOCTORS) {
    if (!departmentIds.has(d.departmentId)) {
      throw new Error(`Doctor ${d.slug} → unknown departmentId ${d.departmentId}`);
    }
  }
  for (const n of NEWS) {
    if (!doctorSlugs.has(n.authorSlug)) {
      throw new Error(`News ${n.slug} → unknown authorSlug ${n.authorSlug}`);
    }
    if (!categoryIds.has(n.categoryId)) {
      throw new Error(`News ${n.slug} → unknown categoryId ${n.categoryId}`);
    }
  }
  for (const r of REVIEWS) {
    if (!serviceSlugs.has(r.serviceSlug)) {
      throw new Error(`Review ${r.id} → unknown serviceSlug ${r.serviceSlug}`);
    }
    if (!doctorSlugs.has(r.doctorSlug)) {
      throw new Error(`Review ${r.id} → unknown doctorSlug ${r.doctorSlug}`);
    }
  }
}
