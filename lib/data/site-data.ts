/**
 * site-data.ts — ShaxKlinika yagona statik ma'lumot fayli
 *
 * Bu faylga qo'shilgan barcha qiymatlar:
 *  - Klinika kontakt ma'lumotlari (CLINIC)
 *  - Navigatsiya linklari (NAV_LINKS, FOOTER_NAV_LINKS)
 *  - Ijtimoiy tarmoqlar (SOCIAL_LINKS)
 *  - Stats ikonkalari meta (STATS_ICONS_META)
 *  - "Nima uchun biz" ikonkalari meta (WHY_REASONS_ICONS)
 *  - Xizmatlar va kategoriyalar rang-ikonka meta (SERVICE_CATEGORY_META)
 *
 * Matnlar (title, subtitle, label) translations/messages/*.json da saqlanadi.
 * Bu faylda faqat struktural va vizual meta ma'lumotlar bo'ladi.
 *
 * Yangi qiymat qo'shish:
 *   1. Tegishli array/objectga qo'shing
 *   2. Kerak bo'lsa messages/*.json ga tarjima qo'shing
 *   3. Komponentda ishlatilayotgan map() indeksiga mos kelishiga ishonch hosil qiling
 */

// ─────────────────────────────────────────────
// 1. KLINIKA — asosiy kontakt va identifikatsiya
// ─────────────────────────────────────────────

export const CLINIC = {
  name: 'Shakh Clinic',
  nameShort: 'Shakh',
  nameAccent: 'Clinic',

  phone: '+7 (977) 712-03-03',
  phoneRaw: '+79777120303',
  email: 'info@shaxklinika.uz',
  website: 'https://shaxklinika.uz',

  /** Telegram bot / kanal */
  telegram: 'https://t.me/shaxzod_z',
  instagram: 'https://instagram.com/shaxklinika',
  facebook: 'https://facebook.com/shaxklinika',
  youtube: 'https://youtube.com/@shaxklinika',

  /** Ish vaqti (tarjimalar footer hours key da ham bor) */
  hoursWeekdays: '8:00 – 20:00',
  hoursWeekends: '9:00 – 15:00',

  /** Joylashuv */
  latitude: 41.2995,
  longitude: 69.2401,

  /** Google Maps embed src (o'rnating) */
  mapEmbedSrc:
    'https://maps.google.com/maps?q=41.2995,69.2401&z=16&output=embed',
} as const

// ─────────────────────────────────────────────
// 2. NAVIGATSIYA LINKLARI
// ─────────────────────────────────────────────

/** Header navigatsiyasi uchun */
export const NAV_LINKS = [
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'doctors', href: '/doctors' },
  { key: 'news', href: '/news' },
  { key: 'contacts', href: '/contact' },
] as const

/** Footer navigatsiyasi uchun (kengaytirilgan) */
export const FOOTER_NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'doctors', href: '/doctors' },
  { key: 'news', href: '/news' },
  { key: 'contacts', href: '/contact' },
] as const

// ─────────────────────────────────────────────
// 3. IJTIMOIY TARMOQLAR
// ─────────────────────────────────────────────

export type SocialPlatform = 'telegram' | 'instagram' | 'facebook' | 'youtube'

export const SOCIAL_LINKS: { platform: SocialPlatform; href: string; label: string }[] = [
  { platform: 'telegram', href: CLINIC.telegram, label: 'Telegram' },
  { platform: 'instagram', href: CLINIC.instagram, label: 'Instagram' },
  { platform: 'facebook', href: CLINIC.facebook, label: 'Facebook' },
  { platform: 'youtube', href: CLINIC.youtube, label: 'YouTube' },
]

// ─────────────────────────────────────────────
// 4. STATS — ikonka meta (matnlar translations da)
//    Tartibi messages.home.stats.items tartibi bilan mos bo'lishi shart!
// ─────────────────────────────────────────────

export type StatsIconKey = 'Users2' | 'CalendarCheck' | 'Stethoscope' | 'UserCheck'

export const STATS_ICONS_META: {
  iconKey: StatsIconKey
  accentColor: string
  bgColor: string
}[] = [
  { iconKey: 'Users2', accentColor: '#4A9EE7', bgColor: 'rgba(74,158,231,0.12)' },
  { iconKey: 'CalendarCheck', accentColor: '#2B7FCC', bgColor: 'rgba(43,127,204,0.12)' },
  { iconKey: 'Stethoscope', accentColor: '#4A9EE7', bgColor: 'rgba(74,158,231,0.12)' },
  { iconKey: 'UserCheck', accentColor: '#1A5A94', bgColor: 'rgba(26,90,148,0.12)' },
]

// ─────────────────────────────────────────────
// 5. "NIMA UCHUN BIZ" — ikonka + rang meta
//    Tartibi messages.home.whyChooseUs.items bilan mos bo'lsin!
// ─────────────────────────────────────────────

export type WhyIconKey =
  | 'Stethoscope'
  | 'Award'
  | 'Clock'
  | 'Pill'
  | 'Smartphone'
  | 'HeartPulse'

export const WHY_REASONS_META: {
  iconKey: WhyIconKey
  color: string
  bgColor: string
}[] = [
  { iconKey: 'Stethoscope', color: '#4A9EE7', bgColor: 'rgba(74,158,231,0.10)' },
  { iconKey: 'Award', color: '#2B7FCC', bgColor: 'rgba(43,127,204,0.10)' },
  { iconKey: 'Clock', color: '#1A5A94', bgColor: 'rgba(26,90,148,0.10)' },
  { iconKey: 'Pill', color: '#4A9EE7', bgColor: 'rgba(74,158,231,0.10)' },
  { iconKey: 'Smartphone', color: '#2B7FCC', bgColor: 'rgba(43,127,204,0.10)' },
  { iconKey: 'HeartPulse', color: '#1A5A94', bgColor: 'rgba(26,90,148,0.10)' },
]

// ─────────────────────────────────────────────
// 6. XIZMAT KATEGORIYALARI — rang va ikonka meta
//    categoryId → UI meta
// ─────────────────────────────────────────────

export type CategoryIconKey =
  | 'Stethoscope'
  | 'HeartPulse'
  | 'Brain'
  | 'Baby'
  | 'Microscope'
  | 'Pill'
  | 'Eye'
  | 'Smile'
  | 'Activity'
  | 'Thermometer'
  | 'Scan'
  | 'Bone'
  | 'FlaskConical'

export const CATEGORY_META: Record<
  string,
  { iconKey: CategoryIconKey; color: string; bgColor: string }
> = {
  therapy: {
    iconKey: 'Stethoscope',
    color: '#4A9EE7',
    bgColor: 'rgba(74,158,231,0.10)',
  },
  cardiology: {
    iconKey: 'HeartPulse',
    color: '#E74A4A',
    bgColor: 'rgba(231,74,74,0.10)',
  },
  neurology: {
    iconKey: 'Brain',
    color: '#9B59B6',
    bgColor: 'rgba(155,89,182,0.10)',
  },
  gynecology: {
    iconKey: 'Baby',
    color: '#E91E8C',
    bgColor: 'rgba(233,30,140,0.10)',
  },
  urology: {
    iconKey: 'Microscope',
    color: '#2B7FCC',
    bgColor: 'rgba(43,127,204,0.10)',
  },
  pediatrics: {
    iconKey: 'Baby',
    color: '#FF9800',
    bgColor: 'rgba(255,152,0,0.10)',
  },
  dermatology: {
    iconKey: 'Scan',
    color: '#4CAF50',
    bgColor: 'rgba(76,175,80,0.10)',
  },
  ophthalmology: {
    iconKey: 'Eye',
    color: '#00BCD4',
    bgColor: 'rgba(0,188,212,0.10)',
  },
  dentistry: {
    iconKey: 'Smile',
    color: '#4A9EE7',
    bgColor: 'rgba(74,158,231,0.10)',
  },
  endocrinology: {
    iconKey: 'Activity',
    color: '#FF5722',
    bgColor: 'rgba(255,87,34,0.10)',
  },
  gastroenterology: {
    iconKey: 'Pill',
    color: '#795548',
    bgColor: 'rgba(121,85,72,0.10)',
  },
  orthopedics: {
    iconKey: 'Bone',
    color: '#607D8B',
    bgColor: 'rgba(96,125,139,0.10)',
  },
  diagnostics: {
    iconKey: 'FlaskConical',
    color: '#2B7FCC',
    bgColor: 'rgba(43,127,204,0.10)',
  },
}

// ─────────────────────────────────────────────
// 7. HOMEPAGE DA KO'RSATILADIGAN XIZMATLAR
//    (dental-services.ts dagi ID lar)
// ─────────────────────────────────────────────

export const FEATURED_SERVICE_IDS = [
  't4', 't5', 'p109', 'p112', 's210', 's229', 'o307', 'o273',
] as const

// ─────────────────────────────────────────────
// 8. IMPLANT STAGES — emoji + rang meta
//    (matnlar messages/home.implantStages da)
// ─────────────────────────────────────────────

/**
 * iconKeys → komponentdagi STAGE_ICON_MAP bilan mos bo'lishi shart
 * gradientTop → 3D icon tile uchun top color (accent dan ochiqroq)
 */
export const IMPLANT_STAGE_META = [
  {
    stageNum: 1,
    iconKeys: ['MessageCircle', 'Camera', 'ScanFace', 'ClipboardList'] as const,
    accent: '#4A9EE7',
    gradientTop: '#72C4F8',
    lightBg: '#EBF5FF',
    borderColor: 'rgba(74,158,231,0.18)',
  },
  {
    stageNum: 2,
    iconKeys: ['Syringe', 'Settings2', 'Stethoscope', 'Award'] as const,
    accent: '#2B7FCC',
    gradientTop: '#4A9EE7',
    lightBg: '#E3F0FF',
    borderColor: 'rgba(43,127,204,0.18)',
  },
  {
    stageNum: 3,
    iconKeys: ['Smile', 'UserRound', 'Crown', 'CalendarCheck'] as const,
    accent: '#1A5A94',
    gradientTop: '#2B7FCC',
    lightBg: '#D6E8FF',
    borderColor: 'rgba(26,90,148,0.18)',
  },
] as const
