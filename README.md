# CodeVis

**Visual programming concepts explained through interactive canvas animations.**

A new concept every day — from data structures to design patterns — with step-by-step playback, synced code, and one-click PNG sharing. Zero dependencies, single HTML file, runs on GitHub Pages.

[Live Demo](https://mohsen-niksirat.github.io/CodeVis/)

---

## Features

- **53 interactive concepts**: Data structures, algorithms, patterns, DP, web APIs, OS concepts, and modern AI models (Vector Embeddings, Perceptron, Token Bucket)
- **Gamification & Badges**: 9 unlockable achievement badges with celebration audio chords
- **Active Recall Concept Quizzes**: Interactive modal testing comprehension with real-time feedback and scoring
- **Enhanced Social Share Card**: Export beautiful PNG cards showcasing concept visualization, synchronized code, streak, and achievements
- **Interactive Playground**: Custom live input for Stack, Queue, Binary Search, and Array Shuffle for sorting algorithms
- **Multi-language code tabs**: Switch between JavaScript, Python, and C++ implementations
- **Web Audio sound effects**: Melodic synthesized tones synchronized with animation steps and comparisons
- **High-DPI Canvas**: Retina-ready rendering with smooth easing animations
- **Active code highlighting**: Current line synchronized with animation
- **Playback controls**: Play, Pause, Next, Previous + keyboard shortcuts
- **Time-scaled animations**: 0.5x, 1x, 2x, with easing transitions
- **Synced code panel**: Real code displayed alongside the animation
- **Bilingual**: English and Persian (FA) with RTL support
- **Daily streak tracker**: Calendar-based progress with month navigation
- **Stats panel**: Total days, best streak, concepts seen, quiz score, and badges
- **Search & filter**: By category, level, or keyword
- **Learning paths**: Recommended concepts based on progress, with study list
- **Keyboard shortcuts**: Arrow keys, Space, R for random
- **Dark/Light theme**: Persistent preference saved in localStorage
- **PWA support**: Installable, works offline with service worker
- **Modular build architecture**: Clean `src/` and `data/` structure with zero-dependency `npm run build` and `npm test`
- **Zero external runtime dependencies**: Pure HTML/CSS/JS, runs directly on GitHub Pages
- **Single file distribution**: Everything compiled cleanly in `index.html`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Graphics | Canvas API (High-DPI scaled) |
| Audio | Web Audio API Synthesizer |
| Storage | localStorage |
| Build & CI | Pure Node.js (`scripts/build.js`, `scripts/test.js`, GitHub Actions) |
| Hosting | GitHub Pages |

## Getting Started

### Local

```bash
git clone https://github.com/mohsen-niksirat/CodeVis.git
cd CodeVis
# Open index.html directly in your browser, or:
npm test        # Run simulation tests across all 53 concepts
npm run build   # Compile modular data & src into index.html
```

### GitHub Pages

1. Go to repository Settings > Pages
2. Set source to `main` branch, folder `/ (root)`
3. Save — your site will be live at `https://mohsen-niksirat.github.io/CodeVis/`

## Architecture & Modular Structure

CodeVis maintains single-file zero-dependency distribution while having a clean modular developer structure:

- `data/concepts.js`: Definitions and step sequences for all 53 visual concepts
- `data/quizzes.js`: Active recall comprehension quizzes (EN/FA)
- `data/badges.js`: Achievement specifications and unlocking requirements
- `src/snippets.js`: Multi-language code implementations (JS, Python, C++)
- `src/audio.js`: Web Audio tone and celebration chord synthesizer
- `src/badges.js`: Badge tracker and shelf renderer
- `src/quiz.js`: Interactive quiz modal and scoring controller
- `scripts/build.js`: Compiles `data/` and `src/` into the root `index.html`
- `scripts/test.js`: Comprehensive headless canvas simulation test suite

## How It Works

Each concept is defined as a JavaScript object with:
- `id`: Unique identifier for the animation renderer
- `title` / `desc`: Bilingual text (EN/FA)
- `category` / `level`: For filtering
- `code`: Real code snippet displayed in the code panel
- `steps`: Array of animation steps rendered on Canvas

The daily concept is selected based on the day of the year, ensuring a consistent experience for all users.

## Roadmap

### Phase 0: Foundation ✅
- [x] Fix all syntax errors
- [x] Add CI workflow (node check + lighthouse)
- [x] Add SEO files (robots.txt, sitemap.xml)

### Phase 1: User Experience ✅
- [x] Hash-based URL routing (#/concept/{id})
- [x] Speed slider control (500ms-2000ms)
- [x] Fullscreen mode

### Phase 2: Content & Export ✅
- [x] Timeline scrubber for step navigation
- [x] WebM video export
- [x] 50 foundational & web concepts (including WebSocket & Memory models)
- [x] Interactive playground & custom user inputs
- [x] Web Audio melodic sound effects
- [x] Multi-language code panel (JS, Python, C++)

### Phase 3: Gamification, AI & Architecture ✅
- [x] Achievement badges system (9 unlockable badges)
- [x] Active recall concept comprehension quiz modal
- [x] Enhanced social share card with streak and badge metrics
- [x] Modern AI & system concepts (Vector Embeddings, Perceptron, Token Bucket Rate Limiting)
- [x] Modular codebase architecture (`src/`, `data/`, `scripts/build.js`, `scripts/test.js`)
- [x] 53 total concepts fully rendered and tested in EN and FA

## Contributing

Open an issue or submit a PR. New concepts should follow the existing structure: add an entry to the `concepts` array and a matching `drawStep()` case.

## License

MIT

---

<div dir="rtl">

# کدویس

**مفاهیم برنامه‌نویسی به صورت بصری با انیمیشن‌های تعاملی Canvas.**

هر روز یک مفهوم جدید — از ساختمان داده تا الگوهای طراحی — با پخش مرحله‌ای، کد همگام و اشتراک‌گذاری تک‌کلیکی PNG. بدون وابستگی، تک‌فایل HTML، قابل اجرا روی GitHub Pages.

[دموی زنده](https://mohsen-niksirat.github.io/CodeVis/)

---

## ویژگی‌ها

- **۵۳ مفهوم تعاملی**: ساختمان داده، الگوریتم‌ها، الگوهای طراحی، برنامه‌نویسی پویا (DP)، وب، سیستم‌عامل و مدل‌های نوین هوش مصنوعی (بردارهای تعبیه، نورون پرسپترون، و سطل توکن)
- **گیمیفیکیشن و نشان‌ها (Badges)**: ۹ نشان دستاورد قابل بازگشایی همراه با افکت‌های صوتی ملودیک جشن موفقیت
- **آزمون‌های درک مطلب (Active Recall)**: مدال تعاملی آزمون چهارگزینه‌ای با بازخورد بلادرنگ، توضیحات آموزشی و سیستم امتیازدهی
- **کارت اشتراک‌گذاری اجتماعی پیشرفته**: استخراج تصویر باکیفیت شامل انیمیشن مفهوم، کد همگام، استریک یادگیری و نشان‌های کاربر
- **آزمایشگاه تعاملی (Playground)**: ورودی دلخواه کاربر برای پشته، صف، جستجوی دودویی و شافل آرایه مرتب‌سازی
- **تب‌های چندزبانه کد**: سوییچ بین پیاده‌سازی‌های JavaScript، Python و ++C
- **جلوه‌های صوتی ملودیک**: تون‌های صوتی هماهنگ با مراحل الگوریتم‌ها با Web Audio API
- **انیمیشن Canvas**: نمایش مرحله‌به‌مرحله هر مفهوم با رندرینگ High-DPI
- **کنترل پخش**: پخش، توقف، بعدی، قبلی و کلیدهای میانبر کیبورد
- **پنل کد همگام**: نمایش کد واقعی کنار انیمیشن
- **دوزبانه کامل**: فارسی و انگلیسی با پشتیبانی RTL
- **ردیاب استریک روزانه**: تقویم پیشرفت ذخیره‌شده در localStorage
- **پنل آمار**: مجموع روزها، بهترین استریک، مفاهیم مشاهده‌شده، امتیاز کوئیز و نشان‌ها
- **جستجو و فیلتر**: بر اساس دسته (ساختمان داده، الگوریتم، الگو، وب، هوش مصنوعی)، سطح یا کلمه کلیدی
- **مسیرهای یادگیری**: مفاهیم پیشنهادی بر اساس پیشرفت، با لیست مطالعه
- **معماری ماژولار و بیلد اختصاصی**: ساختار تمیز `src/` و `data/` با دستورات `npm run build` و `npm test` بدون هیچ وابستگی خارجی
- **بدون وابستگی خارجی**: HTML/CSS/JS خالص، آماده استقرار در GitHub Pages
- **توزیع تک‌فایلی**: تمام کدهای بیلدشده درون فایل ریشه `index.html`

## شروع سریع

### محلی

```bash
git clone https://github.com/mohsen-niksirat/CodeVis.git
cd CodeVis
# باز کردن مستقیم index.html در مرورگر یا:
npm test        # اجرای تست شبیه‌سازی روی هر ۵۳ مفهوم
npm run build   # کامپایل ماژول‌های src و data درون index.html
```

### GitHub Pages

1. به Settings > Pages ریپو بروید
2. منبع را روی شاخه `main` و پوشه `/ (root)` تنظیم کنید
3. ذخیره کنید — سایت شما در `https://mohsen-niksirat.github.io/CodeVis/` فعال می‌شود

## نحوه کار

هر مفهوم به صورت یک شیء جاوااسکریپت تعریف شده شامل:
- `id`: شناسه یکتا برای رندر انیمیشن
- `title` / `desc`: متن دوزبانه (FA/EN)
- `category` / `level`: برای فیلتر کردن
- `code`: قطعه کد واقعی نمایش‌داده‌شده در پنل کد
- `steps`: آرایه مراحل انیمیشن روی Canvas

مفهوم روزانه بر اساس شماره روز سال انتخاب می‌شود تا تجربه یکسانی برای همه کاربران ایجاد شود.

## نقشه راه

### فاز ۰: پایه ✅
- [x] رفع تمام خطاهای سینتکس
- [x] افزودن CI (بررسی node + lighthouse)
- [x] افزودن فایل‌های سئو (robots.txt، sitemap.xml)

### فاز ۱: تجربه کاربری ✅
- [x] مسیریابی URL بر پایه هش (#/concept/{id})
- [x] اسلایدر سرعت (500ms-2000ms)
- [x] حالت تماشا

### فاز ۲: محتوا و خروجی ✅
- [x] اسکرول‌تایم‌لاین برای ناوبری گام‌ها
- [x] صدور ویدیو WebM
- [x] ۵۰ مفهوم فعال پایه و وب (شامل وب‌سوکت و مدل‌های حافظه)
- [x] آزمایشگاه تعاملی و ورودی سفارشی کاربر
- [x] جلوه‌های صوتی سینتی‌سایزر Web Audio
- [x] پنل کد چندزبانه (JS، Python و ++C)

### فاز ۳: گیمیفیکیشن، هوش مصنوعی و معماری مدرن ✅
- [x] سیستم نشان‌ها و دستاوردهای یادگیری (۹ نشان)
- [x] مدال کوئیز و آزمون درک مطلب تعاملی
- [x] کارت اشتراک‌گذاری اجتماعی پیشرفته همراه با آمار و استریک
- [x] مفاهیم مدرن هوش مصنوعی و سیستم (بردار تعبیه، پرسپترون، سطل توکن)
- [x] معماری ماژولار و اسکریپت‌های بیلد و تست بدون پکیج‌های خارجی
- [x] رندر و اعتبارسنجی کامل ۵۳ مفهوم به دو زبان فارسی و انگلیسی

## مشارکت

یک Issue باز کنید یا PR بفرستید. مفاهیم جدید باید ساختار موجود را دنبال کنند: اضافه کردن ورودی به آرایه `concepts` و یک case جدید در `drawStep()`.

## لایسنس

MIT

</div>
