// Multiple-choice concept comprehension quizzes (Active Recall)
const quizzes = {
  stack: {
    q: { en: "Which order does a Stack follow for element removal?", fa: "پشته (Stack) از چه ترتیبی برای حذف عناصر پیروی می‌کند؟" },
    opts: {
      en: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "Random Order"],
      fa: ["FIFO (اولین ورودی اولین خروجی)", "LIFO (آخرین ورودی اولین خروجی)", "ترتیب تصادفی"]
    },
    ans: 1,
    exp: { en: "Stack is LIFO: the most recently pushed element is the first one popped.", fa: "پشته LIFO است: آخرین عنصری که اضافه شده، اولین عنصری است که حذف می‌شود." }
  },
  queue: {
    q: { en: "Where are new elements added in a Queue?", fa: "در صف (Queue)، عناصر جدید در کدام قسمت اضافه می‌شوند؟" },
    opts: {
      en: ["At the front", "At the back (rear)", "In the middle"],
      fa: ["در ابتدا (Front)", "در انتها (Rear)", "در وسط"]
    },
    ans: 1,
    exp: { en: "Queue is FIFO: elements enter at the rear and exit from the front.", fa: "صف FIFO است: عناصر از انتها وارد و از ابتدا خارج می‌شوند." }
  },
  binarysearch: {
    q: { en: "What prerequisite must an array satisfy for Binary Search to work?", fa: "آرایه برای اجرای جستجوی دودویی چه پیش‌شرطی باید داشته باشد؟" },
    opts: {
      en: ["Must have unique values only", "Must be sorted in ascending/descending order", "Must have an even length"],
      fa: ["فقط دارای مقادیر یکتا باشد", "باید مرتب‌شده (Sorted) باشد", "طول آن زوج باشد"]
    },
    ans: 1,
    exp: { en: "Binary Search requires a sorted array to divide the search space in half.", fa: "جستجوی دودویی به آرایه مرتب نیاز دارد تا بتواند فضای جستجو را در هر مرحله نصف کند." }
  },
  quicksort: {
    q: { en: "What is the average time complexity of QuickSort?", fa: "پیچیدگی زمانی میانگین الگوریتم QuickSort چقدر است؟" },
    opts: {
      en: ["O(n log n)", "O(n²)", "O(log n)"],
      fa: ["O(n log n)", "O(n²)", "O(log n)"]
    },
    ans: 0,
    exp: { en: "On average, dividing around balanced pivots takes O(n log n) time.", fa: "در حالت میانگین با انتخاب مناسب pivot، پیچیدگی O(n log n) حاصل می‌شود." }
  },
  websocket: {
    q: { en: "How does WebSocket differ from standard HTTP request/response?", fa: "وب‌سوکت چه تفاوتی با چرخه درخواست/پاسخ استاندارد HTTP دارد؟" },
    opts: {
      en: ["Requires reconnecting for every request", "Provides a persistent, full-duplex bidirectional connection", "Only transfers JSON strings"],
      fa: ["برای هر درخواست نیاز به اتصال مجدد دارد", "یک اتصال پایدار و دوطرفه همزمان فراهم می‌کند", "فقط رشته‌های JSON منتقل می‌کند"]
    },
    ans: 1,
    exp: { en: "WebSocket maintains an open TCP tunnel allowing client and server to stream frames anytime.", fa: "وب‌سوکت یک سوکت باز TCP نگه می‌دارد که هر دو طرف می‌توانند آزادانه داده بفرستند." }
  },
  vector_embeddings: {
    q: { en: "How is semantic similarity between two embedding vectors measured in AI?", fa: "شباهت معنایی بین دو بردار تعبیه در هوش مصنوعی چگونه سنجیده می‌شود؟" },
    opts: {
      en: ["Cosine similarity (angle between vectors)", "String length comparison", "Alphabetical sorting"],
      fa: ["شباهت کسینوسی (زاویه بین بردارها)", "مقایسه طول رشته‌ها", "ترتیب الفبایی"]
    },
    ans: 0,
    exp: { en: "Cosine similarity measures the angle between high-dimensional vectors; closer to 1 means semantically related.", fa: "شباهت کسینوسی زاویه بین بردارها را می‌سنجد؛ هرچه به ۱ نزدیک‌تر باشد معنای نزدیک‌تری دارند." }
  },
  perceptron: {
    q: { en: "What is the role of an activation function in a Perceptron neuron?", fa: "نقش تابع فعال‌ساز در نورون پرسپترون چیست؟" },
    opts: {
      en: ["To store database records", "To decide whether the neuron fires based on weighted sum + bias", "To sort the input array"],
      fa: ["برای ذخیره رکورد در پایگاه داده", "تصمیم‌گیری برای شلیک/فعال‌شدن نورون بر اساس مجموع وزن‌ها و بایاس", "مرتب‌سازی آرایه ورودی"]
    },
    ans: 1,
    exp: { en: "The activation function introduces non-linearity and maps weighted sum to an output (0 or 1).", fa: "تابع فعال‌ساز مجموع وزن‌دار را به خروجی تصمیم‌گیری (۰ یا ۱) تبدیل می‌کند." }
  },
  token_bucket: {
    q: { en: "What HTTP status code is returned when the token bucket has no tokens left?", fa: "وقتی سطل توکن خالی است، سرور چه کد خطای HTTP برمی‌گرداند؟" },
    opts: {
      en: ["404 Not Found", "429 Too Many Requests", "500 Internal Server Error"],
      fa: ["404 Not Found", "429 Too Many Requests", "500 Internal Server Error"]
    },
    ans: 1,
    exp: { en: "HTTP 429 Too Many Requests is the standard status code for rate limiting.", fa: "کد وضعیت 429 نشان‌دهنده فراتر رفتن از سقف مجاز نرخ درخواست‌هاست." }
  },
  observer: {
    q: { en: "Which design pattern is best for decoupling event producers from subscribers?", fa: "کدام الگوی طراحی برای جداسازی تولیدکننده رویداد از شنوندگان مناسب است؟" },
    opts: {
      en: ["Observer Pattern", "Singleton Pattern", "Factory Pattern"],
      fa: ["الگوی ناظر (Observer)", "الگوی تک‌نمونه (Singleton)", "الگوی کارخانه (Factory)"]
    },
    ans: 0,
    exp: { en: "Observer pattern maintains a subscriber list and automatically notifies them upon state changes.", fa: "الگوی ناظر با نگه داشتن لیستی از مشترکین، تغییرات را به صورت خودکار به آن‌ها اطلاع می‌دهد." }
  },
  heapvsstack: {
    q: { en: "Where are dynamic objects with unknown lifetime typically allocated in memory?", fa: "اشیاء پویا با طول عمر نامشخص معمولاً در کدام بخش حافظه تخصیص می‌یابند؟" },
    opts: {
      en: ["Stack Memory", "Heap Memory", "CPU Registers"],
      fa: ["حافظه پشته (Stack)", "حافظه هیپ (Heap)", "رجیسترهای CPU"]
    },
    ans: 1,
    exp: { en: "The Heap holds dynamically allocated objects managed by Garbage Collection or pointers.", fa: "حافظه هیپ اشیاء با تخصیص پویا را نگهداری می‌کند که توسط زباله‌روب مدیریت می‌شوند." }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = quizzes;
}
