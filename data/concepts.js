// 53 Visual Programming Concepts (Data Structures, Algorithms, Patterns, Web APIs, Modern AI)
const concepts = [
  {
    "id": "stack",
    "title": {
      "en": "Stack",
      "fa": "پشته"
    },
    "category": "ds",
    "level": "beginner",
    "desc": {
      "en": "A Last-In-First-Out (LIFO) data structure. Elements are pushed on top and popped from the top.",
      "fa": "ساختمان داده آخر-ورودی-اول-خروجی. عناصر از بالا اضافه و از بالا حذف می‌شوند."
    },
    "code": "class Stack {\n  constructor() { this.items = []; }\n  push(item) { this.items.push(item); }\n  pop() { return this.items.pop(); }\n  peek() { return this.items[this.items.length-1]; }\n  isEmpty() { return this.items.length === 0; }\n}",
    "steps": [
      {
        "type": "push",
        "val": "A"
      },
      {
        "type": "push",
        "val": "B"
      },
      {
        "type": "push",
        "val": "C"
      },
      {
        "type": "pop"
      },
      {
        "type": "pop"
      }
    ]
  },
  {
    "id": "queue",
    "title": {
      "en": "Queue",
      "fa": "صف"
    },
    "category": "ds",
    "level": "beginner",
    "desc": {
      "en": "A First-In-First-Out (FIFO) data structure. Elements are enqueued at the back and dequeued from the front.",
      "fa": "ساختمان داده اول-ورودی-اول-خروجی. عناصر از انتها وارد و از ابتدا خارج می‌شوند."
    },
    "code": "class Queue {\n  constructor() { this.items = []; }\n  enqueue(item) { this.items.push(item); }\n  dequeue() { return this.items.shift(); }\n  front() { return this.items[0]; }\n  isEmpty() { return this.items.length === 0; }\n}",
    "steps": [
      {
        "type": "enqueue",
        "val": "A"
      },
      {
        "type": "enqueue",
        "val": "B"
      },
      {
        "type": "enqueue",
        "val": "C"
      },
      {
        "type": "dequeue"
      },
      {
        "type": "dequeue"
      }
    ]
  },
  {
    "id": "linkedlist",
    "title": {
      "en": "Linked List",
      "fa": "لیست پیوندی"
    },
    "category": "ds",
    "level": "intermediate",
    "desc": {
      "en": "A linear data structure where each element points to the next node, allowing O(1) insertions.",
      "fa": "ساختمان داده خطی که هر عنصر به گره بعدی اشاره می‌کند و درج O(1) را ممکن می‌سازد."
    },
    "code": "class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}\nclass LinkedList {\n  append(val) {\n    const node = new Node(val);\n    if (!this.head) { this.head = node; return; }\n    let curr = this.head;\n    while (curr.next) curr = curr.next;\n    curr.next = node;\n  }\n}",
    "steps": [
      {
        "type": "add",
        "val": "A"
      },
      {
        "type": "add",
        "val": "B"
      },
      {
        "type": "add",
        "val": "C"
      },
      {
        "type": "traverse"
      },
      {
        "type": "remove"
      }
    ]
  },
  {
    "id": "binarysearch",
    "title": {
      "en": "Binary Search",
      "fa": "جستجوی دودویی"
    },
    "category": "algo",
    "level": "beginner",
    "desc": {
      "en": "An efficient search algorithm that divides the sorted array in half each step. O(log n) time complexity.",
      "fa": "الگوریتم جستجوی کارآمد که آرایه مرتب را در هر مرحله نصف می‌کند. پیچیدگی زمانی O(log n)."
    },
    "code": "function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "steps": [
      {
        "type": "init",
        "range": [
          0,
          15
        ]
      },
      {
        "type": "mid",
        "val": 7
      },
      {
        "type": "narrow",
        "dir": "right"
      },
      {
        "type": "mid",
        "val": 11
      },
      {
        "type": "found",
        "val": 11
      }
    ]
  },
  {
    "id": "recursion",
    "title": {
      "en": "Recursion",
      "fa": "بازگشت"
    },
    "category": "pattern",
    "level": "intermediate",
    "desc": {
      "en": "A function that calls itself with a base case to terminate. Each call creates a new frame on the call stack.",
      "fa": "تابعی که خودش را با یک حالت پایه فراخوانی می‌کند. هر فراخوانی فریم جدیدی روی پشته ایجاد می‌کند."
    },
    "code": "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nfactorial(5);\n// 5 * 4 * 3 * 2 * 1 = 120",
    "steps": [
      {
        "type": "call",
        "val": 5
      },
      {
        "type": "call",
        "val": 4
      },
      {
        "type": "call",
        "val": 3
      },
      {
        "type": "base",
        "val": 1
      },
      {
        "type": "return"
      }
    ]
  },
  {
    "id": "bubbleSort",
    "title": {
      "en": "Bubble Sort",
      "fa": "مرتب‌سازی حبابی"
    },
    "category": "algo",
    "level": "beginner",
    "desc": {
      "en": "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      "fa": "به طور مکرر لیست را پیمایش می‌کند، عناصر مجاور را مقایسه و در صورت نیاز جابجا می‌کند."
    },
    "code": "function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j+1]) {\n        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}",
    "steps": [
      {
        "type": "compare",
        "i": 0,
        "j": 1
      },
      {
        "type": "swap",
        "i": 0,
        "j": 1
      },
      {
        "type": "compare",
        "i": 1,
        "j": 2
      },
      {
        "type": "pass"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "hashmap",
    "title": {
      "en": "Hash Map",
      "fa": "جدول هش"
    },
    "category": "ds",
    "level": "intermediate",
    "desc": {
      "en": "Stores key-value pairs using a hash function to compute an index into an array of buckets for O(1) average lookup.",
      "fa": "جفت‌های کلید-مقدار را با استفاده از تابع هش برای محاسبه اندیس ذخیره می‌کند. جستجوی متوسط O(1)."
    },
    "code": "class HashMap {\n  constructor(size = 16) {\n    this.buckets = new Array(size).fill(null).map(() => []);\n    this.size = size;\n  }\n  hash(key) { return key.toString().length % this.size; }\n  set(key, val) { this.buckets[this.hash(key)].push([key, val]); }\n  get(key) {\n    return this.buckets[this.hash(key)].find(([k]) => k === key)?.[1];\n  }\n}",
    "steps": [
      {
        "type": "insert",
        "key": "name",
        "val": "Ali"
      },
      {
        "type": "hash",
        "key": "name",
        "bucket": 4
      },
      {
        "type": "insert",
        "key": "age",
        "val": 25
      },
      {
        "type": "hash",
        "key": "age",
        "bucket": 3
      },
      {
        "type": "lookup",
        "key": "name"
      }
    ]
  },
  {
    "id": "observer",
    "title": {
      "en": "Observer Pattern",
      "fa": "الگوی ناظر"
    },
    "category": "pattern",
    "level": "advanced",
    "desc": {
      "en": "A design pattern where an object (subject) maintains a list of observers and notifies them of state changes automatically.",
      "fa": "الگوی طراحی که شیء (موضوع) لیستی از ناظران را نگه می‌دارد و تغییرات حالت را خودکار اطلاع می‌دهد."
    },
    "code": "class Subject {\n  constructor() { this.observers = []; }\n  subscribe(fn) { this.observers.push(fn); }\n  notify(data) { this.observers.forEach(fn => fn(data)); }\n}\nconst sub = new Subject();\nsub.subscribe(d => console.log('Got:', d));\nsub.notify('hello');",
    "steps": [
      {
        "type": "subscribe",
        "who": "A"
      },
      {
        "type": "subscribe",
        "who": "B"
      },
      {
        "type": "event",
        "val": "update"
      },
      {
        "type": "notify",
        "to": "A"
      },
      {
        "type": "notify",
        "to": "B"
      }
    ]
  },
  {
    "id": "dom",
    "title": {
      "en": "DOM Tree",
      "fa": "درخت DOM"
    },
    "category": "web",
    "level": "beginner",
    "desc": {
      "en": "The Document Object Model represents HTML as a tree structure where each node is an object representing a part of the document.",
      "fa": "مدل شیء سند، HTML را به صورت ساختار درختی نمایش می‌دهد که هر گره بخشی از سند است."
    },
    "code": "document.querySelector('#app')\n  .addEventListener('click', (e) => {\n    const el = document.createElement('div');\n    el.textContent = 'Clicked!';\n    e.target.appendChild(el);\n  });",
    "steps": [
      {
        "type": "build",
        "tag": "html"
      },
      {
        "type": "build",
        "tag": "body"
      },
      {
        "type": "build",
        "tag": "div"
      },
      {
        "type": "event",
        "val": "click"
      },
      {
        "type": "mutate"
      }
    ]
  },
  {
    "id": "closure",
    "title": {
      "en": "Closure",
      "fa": "بسته (کلوژر)"
    },
    "category": "pattern",
    "level": "advanced",
    "desc": {
      "en": "A closure is a function that retains access to its lexical scope even when executed outside that scope.",
      "fa": "بسته تابعی است که حتی وقتی خارج از اسکوپ اصلی اجرا شود، به اسکوپ لغوی خود دسترسی دارد."
    },
    "code": "function counter() {\n  let count = 0;\n  return {\n    inc: () => ++count,\n    get: () => count\n  };\n}\nconst c = counter();\nc.inc(); c.inc(); c.get(); // 2",
    "steps": [
      {
        "type": "create",
        "scope": "outer"
      },
      {
        "type": "capture",
        "var": "count"
      },
      {
        "type": "call",
        "fn": "inc"
      },
      {
        "type": "call",
        "fn": "inc"
      },
      {
        "type": "call",
        "fn": "get"
      }
    ]
  },
  {
    "id": "bintree",
    "title": {
      "en": "Binary Tree",
      "fa": "درخت دودویی"
    },
    "category": "ds",
    "level": "intermediate",
    "desc": {
      "en": "A tree data structure where each node has at most two children: left and right.",
      "fa": "ساختمان داده درختی که هر گره حداکثر دو فرزند دارد: چپ و راست."
    },
    "code": "class TreeNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}\nconst root = new TreeNode(1);\nroot.left = new TreeNode(2);\nroot.right = new TreeNode(3);",
    "steps": [
      {
        "type": "root",
        "val": 1
      },
      {
        "type": "left",
        "val": 2
      },
      {
        "type": "right",
        "val": 3
      },
      {
        "type": "traverse"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "bfs",
    "title": {
      "en": "Graph BFS",
      "fa": "پیمایش سطحی گراف"
    },
    "category": "algo",
    "level": "intermediate",
    "desc": {
      "en": "Breadth-First Search explores all neighbors at the current depth before moving deeper.",
      "fa": "جستجوی سطحی تمام همسایه‌ها را در عمق فعلی قبل از رفتن به عمق بیشتر بررسی می‌کند."
    },
    "code": "function bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  while (queue.length) {\n    const node = queue.shift();\n    if (!visited.has(node)) {\n      visited.add(node);\n      for (const n of graph[node]) queue.push(n);\n    }\n  }\n}",
    "steps": [
      {
        "type": "visit",
        "val": "A"
      },
      {
        "type": "enqueue",
        "val": "B,C"
      },
      {
        "type": "visit",
        "val": "B"
      },
      {
        "type": "visit",
        "val": "C"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "dfs",
    "title": {
      "en": "Graph DFS",
      "fa": "پیمایش عمقی گراف"
    },
    "category": "algo",
    "level": "intermediate",
    "desc": {
      "en": "Depth-First Search goes as deep as possible along each branch before backtracking.",
      "fa": "جستجوی عمقی تا حد ممکن در هر شاخه پیش می‌رود قبل از بازگشت."
    },
    "code": "function dfs(graph, node, visited = new Set()) {\n  if (visited.has(node)) return;\n  visited.add(node);\n  for (const n of graph[node]) dfs(graph, n, visited);\n}",
    "steps": [
      {
        "type": "visit",
        "val": "A"
      },
      {
        "type": "go",
        "val": "B"
      },
      {
        "type": "go",
        "val": "D"
      },
      {
        "type": "backtrack"
      },
      {
        "type": "go",
        "val": "C"
      }
    ]
  },
  {
    "id": "mergesort",
    "title": {
      "en": "Merge Sort",
      "fa": "مرتب‌سازی ادغامی"
    },
    "category": "algo",
    "level": "intermediate",
    "desc": {
      "en": "Divides the array in half, recursively sorts each half, then merges them back together.",
      "fa": "آرایه را نصف می‌کند، هر نیمه را مرتب و سپس ادغام می‌کند."
    },
    "code": "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}",
    "steps": [
      {
        "type": "split",
        "val": "[5,3,8,1]"
      },
      {
        "type": "split",
        "val": "[5,3][8,1]"
      },
      {
        "type": "sort",
        "val": "[3,5][1,8]"
      },
      {
        "type": "merge",
        "val": "[1,3,5,8]"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "quicksort",
    "title": {
      "en": "Quick Sort",
      "fa": "مرتب‌سازی سریع"
    },
    "category": "algo",
    "level": "advanced",
    "desc": {
      "en": "Selects a pivot element and partitions the array so elements less than pivot go left, greater go right.",
      "fa": "یک محور انتخاب و آرایه را طوری تقسیم می‌کند که کوچکترها چپ و بزرگترها راست بروند."
    },
    "code": "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = arr.slice(1).filter(x => x < pivot);\n  const right = arr.slice(1).filter(x => x >= pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}",
    "steps": [
      {
        "type": "pivot",
        "val": 5
      },
      {
        "type": "partition"
      },
      {
        "type": "left",
        "val": "[3,1]"
      },
      {
        "type": "right",
        "val": "[8,7]"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "singleton",
    "title": {
      "en": "Singleton Pattern",
      "fa": "الگوی تک‌نمونه"
    },
    "category": "pattern",
    "level": "beginner",
    "desc": {
      "en": "Ensures a class has only one instance and provides a global point of access to it.",
      "fa": "تضمین می‌کند کلاس فقط یک نمونه داشته باشد و دسترسی سراسری به آن فراهم شود."
    },
    "code": "class Singleton {\n  static #instance = null;\n  static getInstance() {\n    if (!Singleton.#instance)\n      Singleton.#instance = new Singleton();\n    return Singleton.#instance;\n  }\n}",
    "steps": [
      {
        "type": "call1"
      },
      {
        "type": "create"
      },
      {
        "type": "call2"
      },
      {
        "type": "same"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "factory",
    "title": {
      "en": "Factory Pattern",
      "fa": "الگوی کارخانه"
    },
    "category": "pattern",
    "level": "intermediate",
    "desc": {
      "en": "Provides an interface for creating objects without specifying their exact class.",
      "fa": "رابطی برای ساخت اشیاء بدون مشخص کردن کلاس دقیق آن‌ها فراهم می‌کند."
    },
    "code": "function createAnimal(type) {\n  const animals = { dog: Dog, cat: Cat };\n  return new animals[type]();\n}\nconst a = createAnimal('dog');\na.speak();",
    "steps": [
      {
        "type": "input",
        "val": "dog"
      },
      {
        "type": "lookup"
      },
      {
        "type": "create"
      },
      {
        "type": "return"
      },
      {
        "type": "use"
      }
    ]
  },
  {
    "id": "promise",
    "title": {
      "en": "Promise / Async",
      "fa": "پرامیس / ناهمگام"
    },
    "category": "web",
    "level": "intermediate",
    "desc": {
      "en": "A Promise represents a value that may be available now, later, or never. Used for async operations.",
      "fa": "پرامیس مقداری را نشان می‌دهد که الان، بعداً یا هیچوقت موجود است. برای عملیات ناهمگام استفاده می‌شود."
    },
    "code": "fetch('/api/data')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));",
    "steps": [
      {
        "type": "pending"
      },
      {
        "type": "fetch"
      },
      {
        "type": "resolve"
      },
      {
        "type": "then"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "eventloop",
    "title": {
      "en": "Event Loop",
      "fa": "حلقه رویداد"
    },
    "category": "web",
    "level": "advanced",
    "desc": {
      "en": "The event loop continuously checks the call stack and task queue, pushing tasks to execute.",
      "fa": "حلقه رویداد به طور مداوم پشته فراخوانی و صف وظایف را بررسی و وظایف را اجرا می‌کند."
    },
    "code": "console.log('1');\nsetTimeout(() => console.log('2'), 0);\nconsole.log('3');\n// Output: 1, 3, 2",
    "steps": [
      {
        "type": "sync",
        "val": "1"
      },
      {
        "type": "queue",
        "val": "setTimeout"
      },
      {
        "type": "sync",
        "val": "3"
      },
      {
        "type": "dequeue"
      },
      {
        "type": "exec",
        "val": "2"
      }
    ]
  },
  {
    "id": "http",
    "title": {
      "en": "HTTP Request",
      "fa": "درخواست HTTP"
    },
    "category": "web",
    "level": "beginner",
    "desc": {
      "en": "Client sends an HTTP request to a server, which processes it and returns a response.",
      "fa": "کلاینت درخواست HTTP به سرور می‌فرستد، سرور پردازش و پاسخ برمی‌گرداند."
    },
    "code": "const res = await fetch('https://api.example.com/users', {\n  method: 'GET',\n  headers: { 'Content-Type': 'application/json' }\n});\nconst data = await res.json();",
    "steps": [
      {
        "type": "client"
      },
      {
        "type": "request"
      },
      {
        "type": "server"
      },
      {
        "type": "response"
      },
      {
        "type": "render"
      }
    ]
  },
  {
    "id": "array",
    "title": {
      "en": "Array",
      "fa": "آرایه"
    },
    "category": "ds",
    "level": "beginner",
    "desc": {
      "en": "An ordered collection of elements accessed by numeric index. O(1) random access.",
      "fa": "مجموعه مرتبی از عناصر که با اندیس عددی دسترسی می‌شوند. دسترسی تصادفی O(1)."
    },
    "code": "const arr = [10, 20, 30, 40];\narr[0]; // 10\narr.push(50);\narr.splice(1, 1);",
    "steps": [
      {
        "type": "init"
      },
      {
        "type": "access",
        "idx": 2
      },
      {
        "type": "push",
        "val": 50
      },
      {
        "type": "splice",
        "idx": 1
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "deque",
    "title": {
      "en": "Deque",
      "fa": "صف دوطرفه"
    },
    "category": "ds",
    "level": "intermediate",
    "desc": {
      "en": "A double-ended queue allowing insertion and deletion at both front and back.",
      "fa": "صف دوطرفه که امکان درج و حذف از ابتدا و انتها را فراهم می‌کند."
    },
    "code": "class Deque {\n  constructor() { this.items = {}; this.head = 0; this.tail = 0; }\n  addFront(val) { this.items[--this.head] = val; }\n  addBack(val) { this.items[this.tail++] = val; }\n  removeFront() { return this.items[this.head++]; }\n  removeBack() { return this.items[--this.tail]; }\n}",
    "steps": [
      {
        "type": "addBack",
        "val": "A"
      },
      {
        "type": "addBack",
        "val": "B"
      },
      {
        "type": "addFront",
        "val": "Z"
      },
      {
        "type": "removeFront"
      },
      {
        "type": "removeBack"
      }
    ]
  },
  {
    "id": "heap",
    "title": {
      "en": "Heap",
      "fa": "هیپ"
    },
    "category": "ds",
    "level": "advanced",
    "desc": {
      "en": "A complete binary tree where parent is always smaller (min-heap) or larger (max-heap) than children.",
      "fa": "درخت دودویی کامل که والد همیشه کوچکتر (مین-هیپ) یا بزرگتر (مکس-هیپ) از فرزندان است."
    },
    "code": "class MinHeap {\n  constructor() { this.data = []; }\n  insert(val) {\n    this.data.push(val);\n    this.bubbleUp(this.data.length - 1);\n  }\n  extractMin() {\n    const min = this.data[0];\n    const last = this.data.pop();\n    if (this.data.length) { this.data[0] = last; this.sinkDown(0); }\n    return min;\n  }\n}",
    "steps": [
      {
        "type": "insert",
        "val": 5
      },
      {
        "type": "insert",
        "val": 3
      },
      {
        "type": "insert",
        "val": 7
      },
      {
        "type": "extract"
      },
      {
        "type": "rebalance"
      }
    ]
  },
  {
    "id": "trie",
    "title": {
      "en": "Trie",
      "fa": "درخت پیشوندی"
    },
    "category": "ds",
    "level": "advanced",
    "desc": {
      "en": "A tree-like data structure for efficient prefix searching, commonly used for autocomplete.",
      "fa": "ساختمان داده شبه‌درختی برای جستجوی کارآمد پیشوند، معمولاً برای تکمیل خودکار استفاده می‌شود."
    },
    "code": "class TrieNode {\n  constructor() { this.children = {}; this.isEnd = false; }\n}\nclass Trie {\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node.children[ch]) node.children[ch] = new TrieNode();\n      node = node.children[ch];\n    }\n    node.isEnd = true;\n  }\n}",
    "steps": [
      {
        "type": "insert",
        "val": "cat"
      },
      {
        "type": "insert",
        "val": "car"
      },
      {
        "type": "insert",
        "val": "card"
      },
      {
        "type": "search",
        "val": "car"
      },
      {
        "type": "found"
      }
    ]
  },
  {
    "id": "insertionsort",
    "title": {
      "en": "Insertion Sort",
      "fa": "مرتب‌سازی درجی"
    },
    "category": "algo",
    "level": "beginner",
    "desc": {
      "en": "Builds the sorted array one element at a time by inserting each element into its correct position.",
      "fa": "آرایه مرتب را عنصر به عنصر با درج هر عنصر در جایگاه صحیحش می‌سازد."
    },
    "code": "function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    const key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }\n    arr[j+1] = key;\n  }\n  return arr;\n}",
    "steps": [
      {
        "type": "pick",
        "val": 3
      },
      {
        "type": "compare"
      },
      {
        "type": "shift"
      },
      {
        "type": "insert"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "selectionsort",
    "title": {
      "en": "Selection Sort",
      "fa": "مرتب‌سازی انتخابی"
    },
    "category": "algo",
    "level": "beginner",
    "desc": {
      "en": "Repeatedly finds the minimum element from the unsorted part and places it at the beginning.",
      "fa": "به طور مکرر کمینه عنصر بخش نامرتب را پیدا و در ابتدا قرار می‌دهد."
    },
    "code": "function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < arr.length; j++)\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n  }\n  return arr;\n}",
    "steps": [
      {
        "type": "findmin"
      },
      {
        "type": "swap"
      },
      {
        "type": "findmin2"
      },
      {
        "type": "swap2"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "strategy",
    "title": {
      "en": "Strategy Pattern",
      "fa": "الگوی استراتژی"
    },
    "category": "pattern",
    "level": "advanced",
    "desc": {
      "en": "Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.",
      "fa": "خانواده‌ای از الگوریتم‌ها را تعریف، هر کدام را محصور و در زمان اجرا قابل تعویض می‌کند."
    },
    "code": "class Sorter {\n  setStrategy(strategy) { this.strategy = strategy; }\n  sort(arr) { return this.strategy.sort(arr); }\n}\nconst s = new Sorter();\ns.setStrategy(new QuickSort());\ns.sort([3,1,2]);",
    "steps": [
      {
        "type": "context"
      },
      {
        "type": "setA"
      },
      {
        "type": "execute"
      },
      {
        "type": "setB"
      },
      {
        "type": "execute"
      }
    ]
  },
  {
    "id": "decorator",
    "title": {
      "en": "Decorator Pattern",
      "fa": "الگوی تزئین‌کننده"
    },
    "category": "pattern",
    "level": "advanced",
    "desc": {
      "en": "Attaches additional responsibilities to an object dynamically without modifying its structure.",
      "fa": "مسئولیت‌های اضافی را به صورت پویا بدون تغییر ساختار شیء به آن اضافه می‌کند."
    },
    "code": "function withLogging(fn) {\n  return function(...args) {\n    console.log('Calling:', fn.name);\n    return fn(...args);\n  };\n}\nconst loggedAdd = withLogging(add);",
    "steps": [
      {
        "type": "original"
      },
      {
        "type": "wrap"
      },
      {
        "type": "call"
      },
      {
        "type": "log"
      },
      {
        "type": "result"
      }
    ]
  },
  {
    "id": "boxmodel",
    "title": {
      "en": "CSS Box Model",
      "fa": "مدل جعبه CSS"
    },
    "category": "web",
    "level": "beginner",
    "desc": {
      "en": "Every HTML element is a box consisting of content, padding, border, and margin layers.",
      "fa": "هر عنصر HTML یک جعبه شامل لایه‌های محتوا، فاصله داخلی، حاشیه و فاصله خارجی است."
    },
    "code": "div {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid;\n  margin: 10px;\n}\n/* Total width = 200 + 40 + 10 + 20 = 270px */",
    "steps": [
      {
        "type": "content"
      },
      {
        "type": "padding"
      },
      {
        "type": "border"
      },
      {
        "type": "margin"
      },
      {
        "type": "total"
      }
    ]
  },
  {
    "id": "flexbox",
    "title": {
      "en": "Flexbox",
      "fa": "فلکس‌باکس"
    },
    "category": "web",
    "level": "intermediate",
    "desc": {
      "en": "A CSS layout model that distributes space among items in a container along a single axis.",
      "fa": "مدل چیدمان CSS که فضا را بین عناصر در یک کانتینر entlang یک محور توزیع می‌کند."
    },
    "code": ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n}",
    "steps": [
      {
        "type": "container"
      },
      {
        "type": "items"
      },
      {
        "type": "justify"
      },
      {
        "type": "align"
      },
      {
        "type": "gap"
      }
    ]
  },
  {
    "id": "avl",
    "title": {
      "en": "AVL Tree",
      "fa": "درخت AVL"
    },
    "category": "ds",
    "level": "advanced",
    "desc": {
      "en": "Self-balancing binary search tree with height rotation.",
      "fa": "درخت دودویی جستجو با تعادل خودکار با چرخش ارتفاع."
    },
    "code": "function getBalance(n){return n?n.left.height-n.right.height:0}\nfunction rotateRight(y){const x=y.left;x.right=y.left;x.height=Math.max(x.left.height,x.right.height)+1;y.height=Math.max(y.left.height,y.right.height)+1;return x}",
    "steps": [
      {
        "type": "insert"
      },
      {
        "type": "check"
      },
      {
        "type": "rotate"
      },
      {
        "type": "balance"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "dijkstra",
    "title": {
      "en": "Dijkstra",
      "fa": "دیکسترا"
    },
    "category": "algo",
    "level": "advanced",
    "desc": {
      "en": "Shortest path in weighted graph with non-negative edges.",
      "fa": "کوتاه‌ترین مسیر در گراف وزن‌دار با یک‌جهت‌گیری مثبت."
    },
    "code": "function dijkstra(graph,s){const d={},pq=new PriorityQueue();for(const n in graph)d[n]=Infinity;d[s]=0;pq.enqueue([s,0]);while(!pq.isEmpty()){const[u,w]=pq.dequeue();if(w>d[u])continue;for(const[v,c]of graph[u]){if(d[u]+c<d[v]){d[v]=d[u]+c;pq.enqueue([v,d[v]])}}}return d}",
    "steps": [
      {
        "type": "init"
      },
      {
        "type": "visit"
      },
      {
        "type": "relax"
      },
      {
        "type": "update"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "toposort",
    "title": {
      "en": "Topological Sort",
      "fa": "مرتب‌سازی شی‌داری"
    },
    "category": "algo",
    "level": "advanced",
    "desc": {
      "en": "Linear ordering of vertices where each edge goes from earlier to later.",
      "fa": "ترتیب خطی رئوی گراف که هر یک‌جهت‌گیری از زودتر به بعد می‌رود."
    },
    "code": "function topoSort(g){const v=new Set(),r=[];function visit(n){if(v.has(n))return;v.add(n);for(const x of g[n])visit(x);r.push(n)}for(const n in g)visit(n);return r.reverse()}",
    "steps": [
      {
        "type": "start"
      },
      {
        "type": "dfs"
      },
      {
        "type": "reached"
      },
      {
        "type": "add"
      },
      {
        "type": "reverse"
      }
    ]
  },
  {
    "id": "fib_dp",
    "title": {
      "en": "Fibonacci DP",
      "fa": "فیبوناچی با پویا"
    },
    "category": "algo",
    "level": "intermediate",
    "desc": {
      "en": "Memoization vs tabulation for optimal substructure.",
      "fa": "حافظه موقت مقابل جدول‌بندی برای زیرساختار بهینه."
    },
    "code": "function fibMem(n,c={}){if(n<=1)return n;if(c[n])return c[n];c[n]=fibMemo(n-1,c)+fibMemo(n-2,c);return c[n]}\nfunction fibTab(n){const d=[0,1];for(let i=2;i<=n;i++)d[i]=d[i-1]+d[i-2];return d[n]}",
    "steps": [
      {
        "type": "fib0"
      },
      {
        "type": "fib1"
      },
      {
        "type": "fib2"
      },
      {
        "type": "fib3"
      },
      {
        "type": "fib4"
      },
      {
        "type": "fib5"
      }
    ]
  },
  {
    "id": "knapsack",
    "title": {
      "en": "0/1 Knapsack",
      "fa": "کپس‌پی"
    },
    "category": "algo",
    "level": "advanced",
    "desc": {
      "en": "Maximize value within weight capacity using dynamic programming.",
      "fa": "بیشینه کردن ارزش در محدودیت وزن با پویای برنامه‌نویسی."
    },
    "code": "function knap(items,W){const dp=Array(W+1).fill(0);for(const{w,v}of items)for(let c=W;c>=w;c--)dp[c]=Math.max(dp[c],dp[c-w]+v);return dp[W]}",
    "steps": [
      {
        "type": "init"
      },
      {
        "type": "iterate"
      },
      {
        "type": "choose"
      },
      {
        "type": "fill"
      },
      {
        "type": "result"
      }
    ]
  },
  {
    "id": "virtualmem",
    "title": {
      "en": "Virtual Memory",
      "fa": "حافظه مجازی"
    },
    "category": "ds",
    "level": "advanced",
    "desc": {
      "en": "Page table translation from virtual to physical addresses.",
      "fa": "ترجمه آدرس مجازی به فیزیکی با جدول صفحه."
    },
    "code": "// VirtualAddr: 32-bit\n// Page = VirtualAddr >> 12 (high 20 bits)\n// Offset = VirtualAddr & 0xFFF (low 12 bits)\nphysicalAddr = (pageTable[page] << 12) | offset",
    "steps": [
      {
        "type": "virtual"
      },
      {
        "type": "split"
      },
      {
        "type": "lookup"
      },
      {
        "type": "translate"
      },
      {
        "type": "cache"
      }
    ]
  },
  {
    "id": "callstack",
    "title": {
      "en": "Call Stack",
      "fa": "پشته فراخوانی"
    },
    "category": "web",
    "level": "beginner",
    "desc": {
      "en": "Function call frames pushed onto and popped from the call stack in LIFO order.",
      "fa": "فریم‌های فراخوانی تابع به صورت LIFO روی پشته فراخوانی افزوده و حذف می‌شوند."
    },
    "code": "function outer(){\n  const a=1;        // Stack frame 1\n  function inner(){\n    const b=2;      // Stack frame 2\n    return a+b;\n  }\n  return inner();    // frames: outer->inner->return->pop\n}\nouter();",
    "steps": [
      {
        "type": "push"
      },
      {
        "type": "local"
      },
      {
        "type": "nested"
      },
      {
        "type": "return"
      },
      {
        "type": "pop"
      }
    ]
  },
  {
    "id": "heapvsstack",
    "title": {
      "en": "Heap vs Stack",
      "fa": "هیپ مقابل پشته"
    },
    "category": "ds",
    "level": "intermediate",
    "desc": {
      "en": "Stack for local vars, heap for objects. GC reclaims unused heap memory.",
      "fa": "پشته برای متغیرهای محلی، هیپ برای اشیاء. GC حافظه هیپ استفاده‌نشده را آزاد می‌کند."
    },
    "code": "// Stack: fast allocation, auto cleanup\n// Heap: slower, manual reference counting or GC\nlet primitive = 42;          // Stack\nlet obj = {x:1, y:2};        // Heap\n// When obj refs = 0, GC frees it",
    "steps": [
      {
        "type": "stack"
      },
      {
        "type": "heap"
      },
      {
        "type": "alloc"
      },
      {
        "type": "gc"
      },
      {
        "type": "cleanup"
      }
    ]
  },
  {
    "id": "jwt",
    "title": {
      "en": "JWT Lifecycle",
      "fa": "چرخه عمر JWT"
    },
    "category": "web",
    "level": "intermediate",
    "desc": {
      "en": "Header, payload, signature - base64url encoded for client-side storage and server verification.",
      "fa": "سربرگ، بار محتوا، امضا - به صورت base64url برای ذخیره‌سازی سمت کلاینت و اعتبارسنجی سرور."
    },
    "code": "// Header: {\"alg\":\"HS256\",\"typ\":\"JWT\"}\n// Payload: {\"sub\":123,\"exp\":1234567890}\n// Signature: HMAC(base64(header)+\".\"+base64(payload), secret)\n// Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyM30...",
    "steps": [
      {
        "type": "header"
      },
      {
        "type": "payload"
      },
      {
        "type": "sign"
      },
      {
        "type": "token"
      },
      {
        "type": "verify"
      }
    ]
  },
  {
    "id": "webworker",
    "title": {
      "en": "Web Worker",
      "fa": "ویب ورکر"
    },
    "category": "web",
    "level": "advanced",
    "desc": {
      "en": "Background thread for CPU-intensive tasks without blocking main thread.",
      "fa": "رشته پس‌زمینه برای وظایف سنگین بدون مسدود کردن رشته اصلی."
    },
    "code": "// Main thread\nconst w = new Worker('worker.js');\nw.postMessage({cmd:'process',data:largeArray});\nw.onmessage = e => console.log(e.data);\n\n// worker.js\nself.onmessage = e => {\n  const r = e.data.data.reduce((a,b)=>a+b,0);\n  self.postMessage(r);\n};",
    "steps": [
      {
        "type": "spawn"
      },
      {
        "type": "post"
      },
      {
        "type": "process"
      },
      {
        "type": "result"
      },
      {
        "type": "terminate"
      }
    ]
  },
  {
    "id": "gc",
    "title": {
      "en": "Garbage Collection",
      "fa": "جمع‌آوری زباله"
    },
    "category": "ds",
    "level": "advanced",
    "desc": {
      "en": "Mark-and-sweep: identify reachable objects, mark, then sweep unreachable memory.",
      "fa": "علامت و پاک‌سازی: شناسایی اشیاء قابل‌دسترس، علامت‌گذاری، سپس پاک‌سازی حافظه غیرمرجع."
    },
    "code": "// Phase 1: Mark all roots and reachable objects\n// Phase 2: Sweep all unmarked memory regions as garbage\n// Phase 3: Compact heap if fragmentation > threshold\nfunction isGarbage(obj){return !obj.reachableFromGC}",
    "steps": [
      {
        "type": "roots"
      },
      {
        "type": "mark"
      },
      {
        "type": "sweep"
      },
      {
        "type": "free"
      },
      {
        "type": "compact"
      }
    ]
  },
  {
    "id": "bloom",
    "title": {
      "en": "Bloom Filter",
      "fa": "فیلتر بلوم"
    },
    "category": "ds",
    "level": "advanced",
    "desc": {
      "en": "Space-efficient probabilistic set membership test with false positive rate.",
      "fa": "تست عضویت احتمالی فضای صرفه‌جویی‌شده با نرخ خطای مثبت."
    },
    "code": "class BloomFilter{\n  constructor(size,hashCount){this.bits=new Uint8Array(size);this.k=hashCount}\n  add(item){for(const h of this.hash(item))this.bits[h%this.bits.length]=1}\n  mightContain(item){return this.hash(item).every(h=>this.bits[h%this.bits.length]===1)}\n}",
    "steps": [
      {
        "type": "init"
      },
      {
        "type": "hash"
      },
      {
        "type": "set"
      },
      {
        "type": "query"
      },
      {
        "type": "result"
      }
    ]
  },
  {
    "id": "lru",
    "title": {
      "en": "LRU Cache",
      "fa": "کش LRU"
    },
    "category": "ds",
    "level": "intermediate",
    "desc": {
      "en": "Evict least recently used item when cache is full. Doubly-linked list + hash map for O(1) operations.",
      "fa": "حذف کمترین دسترسی اخیر وقت کش پر است. لیست دوطرفه + جدotle هش برای عملیات O(1)."
    },
    "code": "class LRUCache{constructor(k){this.c=k;this.map=new Map()}\nget(k){if(!this.map.has(k))return-1;const v=this.map.get(k);this.map.delete(k);this.map.set(k,v);return v}\nput(k,v){if(this.map.has(k))this.map.delete(k);else if(this.map.size===this.c){const f=this.map.keys().next().value;this.map.delete(f);this.map.set(k,v)}}",
    "steps": [
      {
        "type": "get"
      },
      {
        "type": "hit"
      },
      {
        "type": "reorder"
      },
      {
        "type": "miss"
      },
      {
        "type": "evict"
      }
    ]
  },
  {
    "id": "debounce",
    "title": {
      "en": "Debounce",
      "fa": "دبانس"
    },
    "category": "web",
    "level": "beginner",
    "desc": {
      "en": "Delay function execution until after a pause. Essential for search input optimization.",
      "fa": "تأخیر اجرای تابع تا پس از یک توقف. ضروری برای بهینه‌سازی ورودی جستجو."
    },
    "code": "function debounce(fn, delay){\n  let t;\n  return (...args)=>{\n    clearTimeout(t);\n    t=setTimeout(()=>fn(...args),delay);\n  };\n}\n// Usage: window.addEventListener('resize', debounce(handleResize, 300));",
    "steps": [
      {
        "type": "call"
      },
      {
        "type": "wait"
      },
      {
        "type": "cancel"
      },
      {
        "type": "exec"
      },
      {
        "type": "done"
      }
    ]
  },
  {
    "id": "promiseAll",
    "title": {
      "en": "Promise.all",
      "fa": "پرامیس.اُل"
    },
    "category": "web",
    "level": "intermediate",
    "desc": {
      "en": "Wait for all promises to resolve or first rejection. Useful for parallel API calls.",
      "fa": "منتظر رسیدن همه پرامیس یا اولین ارجاع خطا. مفید برای فراخوانی‌های موازی API."
    },
    "code": "Promise.all([\n  fetch('/api/users'),   // Promise 1\n  fetch('/api/posts'),   // Promise 2\n  fetch('/api/comments')  // Promise 3\n]).then(([users, posts, comments])=>{\n  // All resolved\n  console.log(users, posts, comments);\n}).catch(err=>{\n  // First rejection stops execution\n  console.error('One failed:', err);\n});",
    "steps": [
      {
        "type": "start"
      },
      {
        "type": "fetch1"
      },
      {
        "type": "fetch2"
      },
      {
        "type": "fetch3"
      },
      {
        "type": "resolve"
      }
    ]
  },
  {
    "id": "cors",
    "title": {
      "en": "CORS",
      "fa": "CORS"
    },
    "category": "web",
    "level": "intermediate",
    "desc": {
      "en": "Cross-Origin Resource Sharing: HTTP headers controlling which origins can access resources.",
      "fa": "تبادل منابع بین‌مرکزی: سرآیندهای HTTP که کنترل دسترسی مناطع را فراهم می‌کنند."
    },
    "code": "// Server must send CORS headers:\nAccess-Control-Allow-Origin: https://your-site.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Content-Type, Authorization\n\n// Browser blocks cross-origin requests without these headers",
    "steps": [
      {
        "type": "request"
      },
      {
        "type": "blocked"
      },
      {
        "type": "header"
      },
      {
        "type": "allowed"
      },
      {
        "type": "cache"
      }
    ]
  },
  {
    "id": "regex",
    "title": {
      "en": "Regex",
      "fa": "نگاه منظم"
    },
    "category": "web",
    "level": "intermediate",
    "desc": {
      "en": "Pattern matching with anchors, quantifiers, character classes, and capturing groups.",
      "fa": "جستجوی الگو با نقطه‌گذاری، شمارنده، کلاس‌های کاراکتر و گروه‌های گرفتن."
    },
    "code": "// Email validation\nconst email=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\n\n// Phone number\nconst phone=/\\d{3}-\\d{3}-\\d{4}/;\n\n// Match and extract\ntext.match(email)           // returns array or null\ntext.replace(phone, 'XXX-XXX-XXXX')  // replace",
    "steps": [
      {
        "type": "pattern"
      },
      {
        "type": "anchor"
      },
      {
        "type": "match"
      },
      {
        "type": "capture"
      },
      {
        "type": "result"
      }
    ]
  },
  {
    "id": "heapSort",
    "title": {
      "en": "Heap Sort",
      "fa": "مرتب‌سازی هیپ"
    },
    "category": "algo",
    "level": "advanced",
    "desc": {
      "en": "Build max-heap then repeatedly extract max for O(n log n) sort.",
      "fa": "ساخت تمام‌گرا سپس استخراج مکرر بیشینه برای مرتب‌سازی O(n log n)."
    },
    "code": "function heapSort(arr){\n  heapify(arr, arr.length);\n  for(let i=arr.length-1;i>0;i--){[arr[0],arr[i]]=[arr[i],arr[0]];heapify(arr,i)};\n  return arr;\n}\nfunction heapify(arr,n,i){let l=2*i+1,r=2*i+2,largest=i;\n  if(l<n&&arr[l]>arr[largest])largest=l;\n  if(r<n&&arr[r]>arr[largest])largest=r;\n  if(largest!==i){[arr[i],arr[largest]]=[arr[largest],arr[i]];heapify(arr,n,largest)};\n}",
    "steps": [
      {
        "type": "build"
      },
      {
        "type": "swap"
      },
      {
        "type": "restore"
      },
      {
        "type": "extract"
      },
      {
        "type": "sorted"
      }
    ]
  },
  {
    "id": "websocket",
    "title": {
      "en": "WebSocket",
      "fa": "وب‌سوکت"
    },
    "category": "web",
    "level": "intermediate",
    "desc": {
      "en": "Full-duplex bidirectional persistent connection over a single TCP socket.",
      "fa": "اتصال دوطرفه همزمان و پایدار بین کلاینت و سرور روی یک سوکت TCP."
    },
    "code": "const ws = new WebSocket('wss://api.example.com/live');\nws.onopen = () => {\n  console.log('Connected!');\n  ws.send(JSON.stringify({ type: 'subscribe' }));\n};\nws.onmessage = (event) => {\n  const msg = JSON.parse(event.data);\n  console.log('Update:', msg);\n};\nws.onclose = () => console.log('Closed');",
    "steps": [
      {
        "type": "handshake"
      },
      {
        "type": "upgrade"
      },
      {
        "type": "open"
      },
      {
        "type": "bidirectional"
      },
      {
        "type": "close"
      }
    ]
  },
  {
    "id": "quicksortAvg",
    "title": {
      "en": "Quick Sort Avg",
      "fa": "مرتب‌سازی سریع میانگین"
    },
    "category": "algo",
    "level": "advanced",
    "desc": {
      "en": "Average-case complexity analysis: why quicksort O(n log n) expected despite O(n²) worst case.",
      "fa": "تحلیل پیچیدگی متوسط: چرا مرتب‌سازی سریع O(n log n) متوسط علی‌رغم بدترین حالت O(n²)."
    },
    "code": "// Best/Average: O(n log n) -> partition splits data evenly\n// Worst: O(n²) -> already sorted + bad pivot\n// Use random pivot or median-of-three to avoid worst case\nfunction medianOfThree(arr,l,r){const m=l+Math.floor((r-l)/2);return arr[l]<arr[m]?arr[m]<arr[r]?m:r[arr[m]<arr[r]?r:m]:arr[l]<arr[r]?r:m];}",
    "steps": [
      {
        "type": "analysis"
      },
      {
        "type": "average"
      },
      {
        "type": "worst"
      },
      {
        "type": "pivot"
      },
      {
        "type": "optimize"
      }
    ]
  },
  {
    "id": "vector_embeddings",
    "title": {
      "en": "Vector Embeddings",
      "fa": "بردارهای تعبیه (AI Embeddings)"
    },
    "category": "algo",
    "level": "intermediate",
    "desc": {
      "en": "Text mapped to high-dimensional geometric vectors where semantic similarity is measured via cosine distance.",
      "fa": "نگاشت متن به بردارهای هندسی در فضای چندبعدی که شباهت معنایی با زاویه کسینوسی بردارها محاسبه می‌شود."
    },
    "code": "function cosineSim(vecA, vecB) {\n  let dot = 0, normA = 0, normB = 0;\n  for (let i = 0; i < vecA.length; i++) {\n    dot += vecA[i] * vecB[i];\n    normA += vecA[i] ** 2;\n    normB += vecB[i] ** 2;\n  }\n  return dot / (Math.sqrt(normA) * Math.sqrt(normB));\n}",
    "steps": [
      {
        "type": "tokens"
      },
      {
        "type": "project"
      },
      {
        "type": "query"
      },
      {
        "type": "angle"
      },
      {
        "type": "match"
      }
    ]
  },
  {
    "id": "perceptron",
    "title": {
      "en": "Perceptron (Neuron)",
      "fa": "پرسپترون (نورون عصبی)"
    },
    "category": "algo",
    "level": "intermediate",
    "desc": {
      "en": "The foundational building block of neural networks: computes weighted sum of inputs plus bias, passed through an activation function.",
      "fa": "واحد بنیادین شبکه‌های عصبی: محاسبه مجموع وزن‌دار ورودی‌ها به اضافه بایاس و عبور از تابع فعال‌ساز."
    },
    "code": "function perceptron(inputs, weights, bias) {\n  const z = inputs.reduce((sum, x, i) => sum + x * weights[i], bias);\n  return z >= 0 ? 1 : 0; // Step activation function\n}\n// Activation triggers decision boundary",
    "steps": [
      {
        "type": "inputs"
      },
      {
        "type": "weights"
      },
      {
        "type": "sum"
      },
      {
        "type": "activation"
      },
      {
        "type": "output"
      }
    ]
  },
  {
    "id": "token_bucket",
    "title": {
      "en": "Token Bucket (Rate Limit)",
      "fa": "سطل توکن (محدودکننده نرخ)"
    },
    "category": "web",
    "level": "advanced",
    "desc": {
      "en": "API rate limiting algorithm: tokens accumulate at fixed intervals; requests consume tokens or get dropped with HTTP 429.",
      "fa": "الگوریتم مدیریت ترافیک و محدودسازی نرخ API: توکن‌ها با نرخ ثابت واریز می‌شوند؛ درخواست‌ها با مصرف توکن عبور کرده یا ریجکت (۴۲۹) می‌شوند."
    },
    "code": "class TokenBucket {\n  constructor(capacity, refillRate) {\n    this.capacity = capacity;\n    this.tokens = capacity;\n    this.refillRate = refillRate; // tokens/sec\n    this.lastRefill = Date.now();\n  }\n  allowRequest() {\n    this.refill();\n    if (this.tokens >= 1) { this.tokens--; return true; }\n    return false; // HTTP 429 Too Many Requests\n  }\n}",
    "steps": [
      {
        "type": "bucket"
      },
      {
        "type": "refill"
      },
      {
        "type": "request"
      },
      {
        "type": "consume"
      },
      {
        "type": "drop"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = concepts;
}
