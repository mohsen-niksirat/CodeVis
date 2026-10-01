// Achievement Badges Specification
const badges = [
  {
    id: "first_step",
    icon: "🌟",
    title: { en: "First Step", fa: "اولین گام" },
    desc: { en: "Explored your first visual programming concept", fa: "اولین مفهوم برنامه‌نویسی را مشاهده کردید" }
  },
  {
    id: "explorer",
    icon: "🧭",
    title: { en: "Explorer", fa: "کاوشگر" },
    desc: { en: "Completed 5 visual concepts", fa: "۵ مفهوم برنامه‌نویسی را یاد گرفتید" }
  },
  {
    id: "scholar",
    icon: "📚",
    title: { en: "Scholar", fa: "پژوهشگر" },
    desc: { en: "Explored 15 concepts in your journey", fa: "۱۵ مفهوم را در مسیر یادگیری مرور کردید" }
  },
  {
    id: "ds_master",
    icon: "🌲",
    title: { en: "Data Structure Ace", fa: "استاد ساختار داده" },
    desc: { en: "Explored all foundational Data Structures", fa: "تمام مفاهیم پایه ساختار داده را مشاهده کردید" }
  },
  {
    id: "algo_ace",
    icon: "⚡",
    title: { en: "Algorithm Master", fa: "قهرمان الگوریتم" },
    desc: { en: "Explored sorting, searching and graph algorithms", fa: "مفاهیم مرتب‌سازی، جستجو و گراف را یاد گرفتید" }
  },
  {
    id: "ai_pioneer",
    icon: "🤖",
    title: { en: "AI Pioneer", fa: "پیشگام هوش مصنوعی" },
    desc: { en: "Learned Vector Embeddings & Perceptron neural models", fa: "مفاهیم بردارهای تعبیه و پرسپترون عصبی را مرور کردید" }
  },
  {
    id: "web_guru",
    icon: "🌐",
    title: { en: "Web Architect", fa: "متخصص وب" },
    desc: { en: "Explored WebSocket, HTTP, CORS, and Token Bucket", fa: "مفاهیم وب‌سوکت، CORS و سطل توکن را یاد گرفتید" }
  },
  {
    id: "week_streak",
    icon: "🔥",
    title: { en: "Week Warrior", fa: "رزمنده هفته" },
    desc: { en: "Maintained a 7-day learning streak", fa: "استریک یادگیری ۷ روزه ثبت کردید" }
  },
  {
    id: "quiz_whiz",
    icon: "🎯",
    title: { en: "Quiz Whiz", fa: "استاد کوئیز" },
    desc: { en: "Answered concept quiz questions correctly", fa: "به پرسش‌های مفهومی آزمون پاسخ صحیح دادید" }
  },
  {
    id: "speed_demon",
    icon: "⚔️",
    title: { en: "Speed Demon", fa: "قهرمان سرعت" },
    desc: { en: "Simulated an algorithm showdown in the Battle Arena", fa: "شاهد رقابت زنده دو الگوریتم در میدان نبرد بودید" }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = badges;
}
