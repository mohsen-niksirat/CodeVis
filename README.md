# CodeVis

**Visual programming concepts explained through interactive canvas animations.**

A new concept every day — from data structures to design patterns — with step-by-step playback, synced code, and one-click PNG sharing. Zero dependencies, single HTML file, runs on GitHub Pages.

[Live Demo](https://mohsen-niksirat.github.io/CodeVis/)

---

## Features

- **40+ interactive concepts**: Data structures, algorithms, patterns, DP, web APIs, and OS concepts
- **High-DPI Canvas**: Retina-ready rendering with smooth easing animations
- **Canvas animations**: Step-by-step visual breakdown for each concept
- **Active code highlighting**: Current line synchronized with animation
- **Playback controls**: Play, Pause, Next, Previous + keyboard shortcuts
- **Time-scaled animations**: 0.5x, 1x, 2x, with easing transitions
- **Synced code panel**: Real code displayed alongside the animation
- **Bilingual**: English and Persian (FA) with RTL support
- **Daily streak tracker**: Calendar-based progress with month navigation
- **Stats panel**: Total days, best streak, concepts seen
- **Share as PNG/GIF**: One-click export of concept + code + animation
- **Search & filter**: By category, level, or keyword
- **Keyboard shortcuts**: Arrow keys, Space, R for random
- **Dark/Light theme**: Persistent preference saved in localStorage
- **PWA support**: Installable, works offline with service worker
- **Zero dependencies**: Vanilla HTML/CSS/JS, no frameworks, no build step
- **Single file**: Everything in one `index.html`
- **GitHub Pages ready**: Push and deploy instantly

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Graphics | Canvas API |
| Storage | localStorage |
| Hosting | GitHub Pages |

## Getting Started

### Local

```bash
git clone https://github.com/mohsen-niksirat/CodeVis.git
cd CodeVis
# Open index.html in your browser
```

### GitHub Pages

1. Go to repository Settings > Pages
2. Set source to `main` branch, folder `/ (root)`
3. Save — your site will be live at `https://mohsen-niksirat.github.io/CodeVis/`

## How It Works

Each concept is defined as a JavaScript object with:
- `id`: Unique identifier for the animation renderer
- `title` / `desc`: Bilingual text (EN/FA)
- `category` / `level`: For filtering
- `code`: Real code snippet displayed in the code panel
- `steps`: Array of animation steps rendered on Canvas

The daily concept is selected based on the day of the year, ensuring a consistent experience for all users.

## Roadmap

- [x] 30+ concepts covering more CS topics (49 now)
- [x] Smoother animations with requestAnimationFrame transitions
- [x] Dark/Light theme toggle
- [x] PWA support for full offline usage
- [ ] More languages (Arabic, Spanish, etc.)

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

- **۴۹ مفهوم تعاملی**: ساختمان داده، الگوریتم‌ها، الگوهای طراحی، پویا (DP)، APIهای وب و مفاهیم سیستم‌عامل
- **انیمیشن Canvas**: نمایش مرحله‌به‌مرحله هر مفهوم
- **کنترل پخش**: پخش، توقف، بعدی، قبلی
- **پنل کد همگام**: نمایش کد واقعی کنار انیمیشن
- **دوزبانه**: فارسی و انگلیسی با پشتیبانی RTL
- **ردیاب استریک روزانه**: تقویم پیشرفت ذخیره‌شده در localStorage
- **اشتراک PNG**: خروجی تصویر با یک کلیک شامل مفهوم + کد + توضیح
- **جستجو و فیلتر**: بر اساس دسته (ساختمان داده، الگوریتم، الگو، وب)، سطح (مبتدی، متوسط، پیشرفته) یا کلمه کلیدی
- **حالت تصادفی**: پرش به مفهوم تصادفی
- **بدون وابستگی**: HTML/CSS/JS خالص، بدون فریمورک، بدون بیلد
- **تک‌فایل**: همه چیز در یک `index.html`
- **آماده GitHub Pages**: پوش و دیپلوی فوری

## شروع سریع

### محلی

```bash
git clone https://github.com/mohsen-niksirat/CodeVis.git
cd CodeVis
# فایل index.html را در مرورگر باز کنید
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

- [x] بیش از ۳۰ مفهوم پوشش‌دهنده موضوعات بیشتر علوم کامپیوتر (۴۹ مفهوم)
- [x] انیمیشن‌های روان‌تر با requestAnimationFrame
- [x] سوئیچ تم تاریک/روشن
- [x] پشتیبانی PWA برای استفاده کاملاً آفلاین
- [ ] زبان‌های بیشتر (عربی، اسپانیایی و...)

## مشارکت

یک Issue باز کنید یا PR بفرستید. مفاهیم جدید باید ساختار موجود را دنبال کنند: اضافه کردن ورودی به آرایه `concepts` و یک case جدید در `drawStep()`.

## لایسنس

MIT

</div>
