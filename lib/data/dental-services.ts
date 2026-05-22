/**
 * Dental services price list — single editable source of truth.
 *
 * HOW TO EDIT (easy):
 *   • Each service is one object inside the DENTAL_SERVICES array below.
 *   • `name` holds all three languages: { ru, uz, en }.
 *   • `price` is the amount in Russian rubles (₽).
 *       - use the number, e.g. 8500
 *       - use 'free' for "бесплатно"
 *       - add `priceTo` for a range, e.g. { price: 8000, priceTo: 15000 }
 *   • `category` must match one of the DENTAL_CATEGORIES ids.
 *
 * Source: "Дента Комфорт" price list (Терапия / Ортопедия / Хирургия / Ортодонтия).
 * NOTE: prices were transcribed from photos — please double-check before publishing.
 */

export type Locale = 'ru' | 'uz' | 'en'
export type Localized = Record<Locale, string>

export interface DentalCategory {
  id: string
  name: Localized
}

export interface DentalService {
  id: string
  category: string
  name: Localized
  /** Amount in rubles, or 'free' for "бесплатно". */
  price: number | 'free'
  /** When set, the price is shown as a range: `price – priceTo ₽`. */
  priceTo?: number
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------

export const DENTAL_CATEGORIES: DentalCategory[] = [
  { id: 'therapy', name: { ru: 'Терапия', uz: 'Terapiya', en: 'Therapy' } },
  { id: 'orthopedics', name: { ru: 'Ортопедия', uz: 'Ortopediya', en: 'Prosthetics' } },
  { id: 'surgery', name: { ru: 'Хирургия', uz: 'Jarrohlik', en: 'Surgery' } },
  { id: 'orthodontics', name: { ru: 'Ортодонтия', uz: 'Ortodontiya', en: 'Orthodontics' } },
]

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------

export const DENTAL_SERVICES: DentalService[] = [
  // ===== ТЕРАПИЯ / THERAPY =====
  { id: 't1', category: 'therapy', price: 'free', name: { ru: 'Первичная консультация', uz: 'Birlamchi konsultatsiya', en: 'Initial consultation' } },
  { id: 't2', category: 'therapy', price: 600, name: { ru: 'Анестезия (аппликационная + карпульная)', uz: 'Anesteziya (applikatsion + karpulli)', en: 'Anesthesia (topical + cartridge)' } },
  { id: 't3', category: 'therapy', price: 600, name: { ru: 'R-диагностика (снимок)', uz: 'R-diagnostika (rentgen surat)', en: 'X-ray diagnostics (image)' } },
  { id: 't4', category: 'therapy', price: 8500, name: { ru: 'Пломба светового отверждения (всё включено)', uz: 'Yorug‘likda qotadigan plomba (hammasi kiritilgan)', en: 'Light-cured filling (all inclusive)' } },
  { id: 't5', category: 'therapy', price: 9500, name: { ru: 'Реставрация переднего зуба (всё включено)', uz: 'Old tishni restavratsiya qilish (hammasi kiritilgan)', en: 'Front tooth restoration (all inclusive)' } },
  { id: 't6', category: 'therapy', price: 9500, name: { ru: 'Восстановление зуба (всё включено)', uz: 'Tishni tiklash (hammasi kiritilgan)', en: 'Tooth restoration (all inclusive)' } },
  { id: 't7', category: 'therapy', price: 6000, name: { ru: 'Жидкий композит', uz: 'Suyuq kompozit', en: 'Flowable composite' } },
  { id: 't8', category: 'therapy', price: 900, name: { ru: 'Лечебная прокладка', uz: 'Davolovchi qatlam', en: 'Therapeutic lining' } },
  { id: 't9', category: 'therapy', price: 1900, name: { ru: 'Пришлифование и полирование пломбы', uz: 'Plombani silliqlash va jilolash', en: 'Filling grinding and polishing' } },
  { id: 't10', category: 'therapy', price: 700, name: { ru: 'Временная пломба', uz: 'Vaqtinchalik plomba', en: 'Temporary filling' } },
  { id: 't11', category: 'therapy', price: 1600, name: { ru: 'Постановка (титанового/стекловолоконного) штифта с фиксацией', uz: '(Titan/shisha tolali) shtift o‘rnatish va mahkamlash', en: 'Placement of (titanium/fiberglass) post with fixation' } },
  { id: 't12', category: 'therapy', price: 700, name: { ru: 'Вскрытие полости зуба', uz: 'Tish bo‘shlig‘ini ochish', en: 'Opening the tooth cavity' } },
  { id: 't13', category: 'therapy', price: 1600, name: { ru: 'Механико-медикаментозная обработка (1-го канала)', uz: 'Mexanik-medikamentoz ishlov (1 kanal)', en: 'Mechanical-medical canal treatment (1 canal)' } },
  { id: 't14', category: 'therapy', price: 1900, name: { ru: 'Распломбирование (1-го канала)', uz: 'Kanalni qayta ochish (1 kanal)', en: 'Canal re-opening (1 canal)' } },
  { id: 't15', category: 'therapy', price: 900, name: { ru: 'Временное пломбирование лечебной пастой (1-го канала)', uz: 'Davolovchi pasta bilan vaqtinchalik plombalash (1 kanal)', en: 'Temporary filling with medicated paste (1 canal)' } },
  { id: 't16', category: 'therapy', price: 1800, name: { ru: 'Пломбирование гуттаперчевыми штифтами (1 канала)', uz: 'Guttaperch shtiftlar bilan plombalash (1 kanal)', en: 'Gutta-percha root filling (1 canal)' } },
  { id: 't17', category: 'therapy', price: 1800, name: { ru: 'Извлечение штифта из корневого канала', uz: 'Ildiz kanalidan shtiftni olib tashlash', en: 'Removing a post from the root canal' } },
  { id: 't18', category: 'therapy', price: 1900, name: { ru: 'Закрытие перфорации корня зуба', uz: 'Tish ildizi perforatsiyasini yopish', en: 'Closing a root perforation' } },
  { id: 't19', category: 'therapy', price: 350, name: { ru: 'Удаление зубного налёта ультразвуковым методом (1 зуб)', uz: 'Tish karashini ultratovush bilan tozalash (1 tish)', en: 'Ultrasonic plaque removal (1 tooth)' } },
  { id: 't20', category: 'therapy', price: 6000, name: { ru: 'Удаление зубного налёта ультразвуковым методом (вся полость рта)', uz: 'Tish karashini ultratovush bilan tozalash (butun og‘iz bo‘shlig‘i)', en: 'Ultrasonic plaque removal (whole mouth)' } },
  { id: 't21', category: 'therapy', price: 450, name: { ru: 'Удаление зубного налёта методом AirFlow (1 зуб)', uz: 'AirFlow usulida tish karashini tozalash (1 tish)', en: 'AirFlow plaque removal (1 tooth)' } },
  { id: 't22', category: 'therapy', price: 7000, name: { ru: 'Удаление зубного налёта методом AirFlow (вся полость рта)', uz: 'AirFlow usulida tish karashini tozalash (butun og‘iz bo‘shlig‘i)', en: 'AirFlow plaque removal (whole mouth)' } },
  { id: 't23', category: 'therapy', price: 9500, name: { ru: 'Удаление зубного налёта ультразвуком и методом AirFlow (вся полость рта)', uz: 'Ultratovush va AirFlow usulida tish karashini tozalash (butun og‘iz)', en: 'Ultrasonic + AirFlow plaque removal (whole mouth)' } },
  { id: 't24', category: 'therapy', price: 300, name: { ru: 'Покрытие зубов фторлаком (1 зуб)', uz: 'Tishlarni ftorlak bilan qoplash (1 tish)', en: 'Fluoride varnish coating (1 tooth)' } },
  { id: 't25', category: 'therapy', price: 3000, name: { ru: 'Покрытие зубов фторлаком (вся полость рта)', uz: 'Tishlarni ftorlak bilan qoplash (butun og‘iz)', en: 'Fluoride varnish coating (whole mouth)' } },
  { id: 't26', category: 'therapy', price: 2000, name: { ru: 'Аппликация лечебными препаратами', uz: 'Davolovchi preparatlar bilan applikatsiya', en: 'Application of therapeutic agents' } },
  { id: 't27', category: 'therapy', price: 30000, name: { ru: 'Отбеливание (домашнее)', uz: 'Oqartirish (uyda)', en: 'Whitening (home)' } },
  { id: 't28', category: 'therapy', price: 1900, name: { ru: 'Пародонтальная повязка', uz: 'Parodontal bog‘lam', en: 'Periodontal dressing' } },
  { id: 't29', category: 'therapy', price: 1900, name: { ru: 'Обработка пародонтального кармана', uz: 'Parodontal cho‘ntakka ishlov berish', en: 'Periodontal pocket treatment' } },
  { id: 't30', category: 'therapy', price: 7500, name: { ru: 'Клиновидный дефект', uz: 'Ponasimon nuqson', en: 'Wedge-shaped defect treatment' } },
  { id: 't31', category: 'therapy', price: 7500, name: { ru: 'Пломба светового отверждения под коронку', uz: 'Toj ostiga yorug‘likda qotadigan plomba', en: 'Light-cured filling under a crown' } },

  // ===== ОРТОПЕДИЯ / PROSTHETICS =====
  { id: 'p101', category: 'orthopedics', price: 5000, name: { ru: 'Изготовление диагностической модели', uz: 'Diagnostik model tayyorlash', en: 'Diagnostic model fabrication' } },
  { id: 'p102', category: 'orthopedics', price: 1500, name: { ru: 'Снятие цельнолитой/металлокерамической коронки', uz: 'Yaxlit quyma/metallokeramika tojini olib tashlash', en: 'Removal of cast / metal-ceramic crown' } },
  { id: 'p103', category: 'orthopedics', price: 2000, name: { ru: 'Фиксация металлокерамической/цельнолитой коронки/культевой вкладки', uz: 'Metallokeramika/yaxlit quyma toj/kult qistirmasini mahkamlash', en: 'Fixation of metal-ceramic/cast crown / core inlay' } },
  { id: 'p104', category: 'orthopedics', price: 1500, name: { ru: 'Фиксация на временный цемент', uz: 'Vaqtinchalik sementga mahkamlash', en: 'Fixation with temporary cement' } },
  { id: 'p105', category: 'orthopedics', price: 4500, name: { ru: 'Фиксация ортопедической конструкции на цемент двойного отверждения', uz: 'Ortopedik konstruksiyani ikki tomonlama qotadigan sementga mahkamlash', en: 'Fixation of a prosthetic structure with dual-cure cement' } },
  { id: 'p106', category: 'orthopedics', price: 3500, name: { ru: 'Коронка пластмассовая (временная)', uz: 'Plastmassa toj (vaqtinchalik)', en: 'Plastic crown (temporary)' } },
  { id: 'p107', category: 'orthopedics', price: 8500, name: { ru: 'Коронка пластмассовая, с Wax-up моделированием', uz: 'Wax-up modellashtirilgan plastmassa toj', en: 'Plastic crown with wax-up modeling' } },
  { id: 'p108', category: 'orthopedics', price: 23000, name: { ru: 'Коронка металлокерамическая Noritake (Япония)', uz: 'Metallokeramika toj Noritake (Yaponiya)', en: 'Metal-ceramic crown Noritake (Japan)' } },
  { id: 'p109', category: 'orthopedics', price: 29000, name: { ru: 'Безметалловая керамическая коронка на оксиде циркония', uz: 'Sirkoniy oksidli metalsiz keramik toj', en: 'Metal-free zirconia ceramic crown' } },
  { id: 'p110', category: 'orthopedics', price: 43000, name: { ru: 'Коронка металлокерамическая на имплантат', uz: 'Implantatga metallokeramika toj', en: 'Metal-ceramic crown on implant' } },
  { id: 'p111', category: 'orthopedics', price: 29000, name: { ru: 'Вкладка керамическая', uz: 'Keramik qistirma', en: 'Ceramic inlay' } },
  { id: 'p112', category: 'orthopedics', price: 29000, name: { ru: 'Винир керамический', uz: 'Keramik vinir', en: 'Ceramic veneer' } },
  { id: 'p113', category: 'orthopedics', price: 9900, name: { ru: 'Фрезерованная временная коронка', uz: 'Frezalangan vaqtinchalik toj', en: 'Milled temporary crown' } },
  { id: 'p114', category: 'orthopedics', price: 8900, name: { ru: 'Культевая вкладка (кобальт-хромовый сплав)', uz: 'Kult qistirma (kobalt-xrom qotishma)', en: 'Core inlay (cobalt-chrome alloy)' } },
  { id: 'p115', category: 'orthopedics', price: 55000, name: { ru: 'Съёмный протез с импортным гарнитуром', uz: 'Import garniturali olinadigan protez', en: 'Removable denture with imported teeth set' } },
  { id: 'p116', category: 'orthopedics', price: 69000, name: { ru: 'Съёмный протез Acry-free', uz: 'Acry-free olinadigan protez', en: 'Acry-free removable denture' } },
  { id: 'p117', category: 'orthopedics', price: 69000, name: { ru: 'Съёмный протез с нейлоновыми кламмерами', uz: 'Neylon klammerli olinadigan protez', en: 'Removable denture with nylon clasps' } },
  { id: 'p118', category: 'orthopedics', price: 19900, name: { ru: 'Съёмный протез «бабочка» (до двух зубов)', uz: '«Kapalak» olinadigan protez (ikki tishgacha)', en: '"Butterfly" removable denture (up to two teeth)' } },
  { id: 'p119', category: 'orthopedics', price: 79500, name: { ru: 'Бюгельный протез с кламмерами', uz: 'Klammerli byugel protez', en: 'Clasp-retained cast (bugel) denture' } },
  { id: 'p120', category: 'orthopedics', price: 89000, name: { ru: 'Бюгель с двумя замками «Бредент»', uz: 'Ikki qulfli «Bredent» byugel', en: 'Bugel denture with two "Bredent" attachments' } },
  { id: 'p121', category: 'orthopedics', price: 85000, name: { ru: 'Шинирующий бюгельный протез с кламмерами', uz: 'Shinalovchi klammerli byugel protez', en: 'Splinting clasp bugel denture' } },
  { id: 'p122', category: 'orthopedics', price: 66000, name: { ru: 'Съёмный протез с замком МК-1 (односторонний)', uz: 'MK-1 qulfli olinadigan protez (bir tomonlama)', en: 'Removable denture with MK-1 attachment (one-sided)' } },
  { id: 'p123', category: 'orthopedics', price: 29000, name: { ru: 'Безметалловая керамическая коронка E-MAX', uz: 'Metalsiz keramik toj E-MAX', en: 'Metal-free ceramic crown E-MAX' } },
  { id: 'p124', category: 'orthopedics', price: 9900, name: { ru: 'Мягкая прокладка', uz: 'Yumshoq qatlam', en: 'Soft lining' } },
  { id: 'p125', category: 'orthopedics', price: 9900, name: { ru: 'Замена матриц в замковом/бюгельном протезе', uz: 'Qulfli/byugel protezda matritsalarni almashtirish', en: 'Matrix replacement in attachment/bugel denture' } },
  { id: 'p126', category: 'orthopedics', price: 9900, name: { ru: 'Перебазировка съёмного протеза', uz: 'Olinadigan protezni qayta bazalash', en: 'Removable denture relining' } },
  { id: 'p127', category: 'orthopedics', price: 2500, name: { ru: 'Перебазировка временной коронки (изготовленной в другой клинике)', uz: 'Vaqtinchalik tojni qayta bazalash (boshqa klinikada tayyorlangan)', en: 'Relining of a temporary crown (made in another clinic)' } },
  { id: 'p128', category: 'orthopedics', price: 10000, name: { ru: 'Армирование съёмного протеза сеткой/проволокой', uz: 'Olinadigan protezni to‘r/sim bilan armaturalash', en: 'Reinforcement of a removable denture with mesh/wire' } },

  // ===== ХИРУРГИЯ / SURGERY =====
  { id: 's201', category: 'surgery', price: 5000, name: { ru: 'Удаление зуба простое (с анестезией)', uz: 'Tishni oddiy olib tashlash (anesteziya bilan)', en: 'Simple tooth extraction (with anesthesia)' } },
  { id: 's202', category: 'surgery', price: 5500, name: { ru: 'Удаление зуба сложное (с анестезией)', uz: 'Tishni murakkab olib tashlash (anesteziya bilan)', en: 'Complex tooth extraction (with anesthesia)' } },
  { id: 's203', category: 'surgery', price: 4000, name: { ru: 'Удаление молочного зуба (с анестезией)', uz: 'Sut tishini olib tashlash (anesteziya bilan)', en: 'Milk tooth extraction (with anesthesia)' } },
  { id: 's204', category: 'surgery', price: 6500, name: { ru: 'Удаление зуба мудрости (с анестезией)', uz: 'Aql tishini olib tashlash (anesteziya bilan)', en: 'Wisdom tooth extraction (with anesthesia)' } },
  { id: 's205', category: 'surgery', price: 3000, name: { ru: 'Удаление стенки зуба (с анестезией)', uz: 'Tish devorini olib tashlash (anesteziya bilan)', en: 'Tooth wall removal (with anesthesia)' } },
  { id: 's206', category: 'surgery', price: 19000, name: { ru: 'Цистэктомия с резекцией верхушки корня', uz: 'Ildiz uchini rezeksiya qilib sistektomiya', en: 'Cystectomy with root apex resection' } },
  { id: 's207', category: 'surgery', price: 15000, name: { ru: 'Гемисекция, ампутация (с анестезией)', uz: 'Gemiseksiya, amputatsiya (anesteziya bilan)', en: 'Hemisection, amputation (with anesthesia)' } },
  { id: 's208', category: 'surgery', price: 4000, name: { ru: 'Экзостоз (шлифование костного выступа)', uz: 'Ekzostoz (suyak o‘simtasini silliqlash)', en: 'Exostosis (smoothing of bony protrusion)' } },
  { id: 's209', category: 'surgery', price: 1300, name: { ru: 'Наложение швов на лунку', uz: 'Yaraga (chuqurchaga) tikuv qo‘yish', en: 'Suturing the socket' } },
  { id: 's210', category: 'surgery', price: 43000, name: { ru: 'Имплантат «OSSTEM»', uz: '«OSSTEM» implantati', en: '"OSSTEM" implant' } },
  { id: 's211', category: 'surgery', price: 45000, name: { ru: 'Синус-лифтинг (открытый)', uz: 'Sinus-lifting (ochiq)', en: 'Sinus lift (open)' } },
  { id: 's212', category: 'surgery', price: 28000, name: { ru: 'Синус-лифтинг (закрытый)', uz: 'Sinus-lifting (yopiq)', en: 'Sinus lift (closed)' } },
  { id: 's213', category: 'surgery', price: 4000, name: { ru: 'Иссечение капюшона (лечение перикоронарита)', uz: 'Kapyushonni kesib olish (perikoronarit davolash)', en: 'Operculectomy (pericoronitis treatment)' } },
  { id: 's214', category: 'surgery', price: 900, name: { ru: 'Постановка дренажа', uz: 'Drenaj o‘rnatish', en: 'Drain placement' } },
  { id: 's215', category: 'surgery', price: 2000, name: { ru: 'Профилактика альвеолита', uz: 'Alveolit profilaktikasi', en: 'Alveolitis prevention' } },
  { id: 's216', category: 'surgery', price: 4500, name: { ru: 'Лечение альвеолита', uz: 'Alveolitni davolash', en: 'Alveolitis treatment' } },
  { id: 's217', category: 'surgery', price: 2000, name: { ru: 'Вскрытие периостита (разрез)', uz: 'Periostitni ochish (kesma)', en: 'Periostitis incision' } },
  { id: 's218', category: 'surgery', price: 3000, name: { ru: 'Раскрытие пародонтального абсцесса с медикаментозной обработкой', uz: 'Parodontal abssessni ochish va medikamentoz ishlov', en: 'Drainage of a periodontal abscess with medical treatment' } },
  { id: 's219', category: 'surgery', price: 900, name: { ru: 'Кюретаж (чистка) десневого кармана в области одного зуба', uz: 'Bir tish sohasida milk cho‘ntagini kyuretaj (tozalash)', en: 'Curettage of the gum pocket at one tooth' } },
  { id: 's220', category: 'surgery', price: 14000, name: { ru: 'Лоскутная операция в области одного зуба', uz: 'Bir tish sohasida laxtali operatsiya', en: 'Flap surgery at one tooth' } },
  { id: 's221', category: 'surgery', price: 3500, name: { ru: 'Гингивэктомия (иссечение десны)', uz: 'Gingivektomiya (milkni kesib olish)', en: 'Gingivectomy (gum excision)' } },
  { id: 's222', category: 'surgery', price: 9000, name: { ru: 'Пластика уздечки верхней/нижней губы', uz: 'Yuqori/pastki lab yuganchasi plastikasi', en: 'Frenuloplasty of the upper/lower lip' } },
  { id: 's223', category: 'surgery', price: 10000, name: { ru: 'Вестибулопластика (пластика преддверия)', uz: 'Vestibuloplastika (dahliz plastikasi)', en: 'Vestibuloplasty' } },
  { id: 's224', category: 'surgery', price: 15000, name: { ru: 'Использование костно-пластического материала (0.5 гр)', uz: 'Suyak-plastik material ishlatish (0.5 gr)', en: 'Use of bone graft material (0.5 g)' } },
  { id: 's225', category: 'surgery', price: 70000, name: { ru: 'Направленная костная регенерация', uz: 'Yo‘naltirilgan suyak regeneratsiyasi', en: 'Guided bone regeneration' } },
  { id: 's226', category: 'surgery', price: 16000, name: { ru: 'Удаление ретинированного/дистопированного зуба', uz: 'Retinatsiyalangan/distopiyalangan tishni olib tashlash', en: 'Removal of an impacted/dystopic tooth' } },
  { id: 's227', category: 'surgery', price: 30000, name: { ru: 'Использование мембраны Bio-Gide', uz: 'Bio-Gide membranasini ishlatish', en: 'Use of a Bio-Gide membrane' } },
  { id: 's228', category: 'surgery', price: 10000, name: { ru: 'Формирователь десны', uz: 'Milk shakllantirgich', en: 'Gum former (healing abutment)' } },
  { id: 's229', category: 'surgery', price: 80000, name: { ru: 'Имплантат «Straumann»', uz: '«Straumann» implantati', en: '"Straumann" implant' } },

  // ===== ОРТОДОНТИЯ / ORTHODONTICS =====
  { id: 'o301', category: 'orthodontics', price: 'free', name: { ru: 'Консультация', uz: 'Konsultatsiya', en: 'Consultation' } },
  { id: 'o302', category: 'orthodontics', price: 'free', name: { ru: 'Снятие оттиска', uz: 'Qolip (ottisk) olish', en: 'Impression taking' } },
  { id: 'o303', category: 'orthodontics', price: 1200, name: { ru: 'Отлитие диагностической модели', uz: 'Diagnostik modelni quyish', en: 'Casting a diagnostic model' } },
  { id: 'o304', category: 'orthodontics', price: 3700, name: { ru: 'Расчёт моделей', uz: 'Modellarni hisoblash', en: 'Model calculation' } },
  { id: 'o305', category: 'orthodontics', price: 4600, name: { ru: 'Определение конструктивного прикуса', uz: 'Konstruktiv tishlamni aniqlash', en: 'Determining the constructive bite' } },
  { id: 'o306', category: 'orthodontics', price: 'free', name: { ru: 'Плановый приём (раз в месяц)', uz: 'Rejali qabul (oyiga bir marta)', en: 'Scheduled visit (once a month)' } },
  { id: 'o307', category: 'orthodontics', price: 7500, name: { ru: 'Фиксация брекет-системы (одна челюсть)', uz: 'Breket-tizimini mahkamlash (bir jag‘)', en: 'Bracket system fixation (one jaw)' } },
  { id: 'o308', category: 'orthodontics', price: 25000, name: { ru: 'Снятие брекет-системы', uz: 'Breket-tizimini olib tashlash', en: 'Bracket system removal' } },
  { id: 'o309', category: 'orthodontics', price: 12500, name: { ru: 'Ретейнер (одна челюсть)', uz: 'Reteyner (bir jag‘)', en: 'Retainer (one jaw)' } },
  { id: 'o280', category: 'orthodontics', price: 7500, name: { ru: 'Каппа ретенционная (одна челюсть)', uz: 'Retentsion kappa (bir jag‘)', en: 'Retention mouthguard (one jaw)' } },
  { id: 'o281', category: 'orthodontics', price: 8000, priceTo: 15000, name: { ru: 'Минивинт', uz: 'Minivint', en: 'Mini-screw (mini-implant)' } },
  { id: 'o282', category: 'orthodontics', price: 'free', name: { ru: 'Анализ ортопантомограммы', uz: 'Ortopantomogramma tahlili', en: 'Orthopantomogram analysis' } },
  { id: 'o273', category: 'orthodontics', price: 108000, name: { ru: 'Брекеты металлические (лечение, несъёмная аппаратура)', uz: 'Metall breketlar (davolash, olinmaydigan apparat)', en: 'Metal braces (treatment, fixed appliance)' } },
  { id: 'o274', category: 'orthodontics', price: 140000, name: { ru: 'Брекеты керамические (лечение, несъёмная аппаратура)', uz: 'Keramik breketlar (davolash, olinmaydigan apparat)', en: 'Ceramic braces (treatment, fixed appliance)' } },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FREE_LABEL: Localized = { ru: 'Бесплатно', uz: 'Bepul', en: 'Free' }
const RUB_FORMAT = new Intl.NumberFormat('ru-RU')

/** Format a service price for display, e.g. "8 500 ₽", "8 000 – 15 000 ₽" or "Бесплатно". */
export function formatDentalPrice(service: DentalService, locale: Locale): string {
  if (service.price === 'free') return FREE_LABEL[locale]
  if (service.priceTo != null) {
    return `${RUB_FORMAT.format(service.price)} – ${RUB_FORMAT.format(service.priceTo)} ₽`
  }
  return `${RUB_FORMAT.format(service.price)} ₽`
}

export function getDentalServicesByCategory(categoryId: string): DentalService[] {
  return DENTAL_SERVICES.filter((s) => s.category === categoryId)
}
