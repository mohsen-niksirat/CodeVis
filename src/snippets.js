// Multi-Language Code Snippets (JavaScript, Python, C++)
const extraCode = {
  stack: {
    py: "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)\n    def pop(self):\n        return self.items.pop()\n    def peek(self):\n        return self.items[-1]\n    def is_empty(self):\n        return len(self.items) == 0",
    cpp: "#include <vector>\ntemplate<typename T>\nclass Stack {\n    std::vector<T> items;\npublic:\n    void push(T val) { items.push_back(val); }\n    T pop() { T v = items.back(); items.pop_back(); return v; }\n    T peek() { return items.back(); }\n    bool isEmpty() { return items.empty(); }\n};"
  },
  queue: {
    py: "from collections import deque\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n    def enqueue(self, item):\n        self.items.append(item)\n    def dequeue(self):\n        return self.items.popleft()\n    def front(self):\n        return self.items[0]",
    cpp: "#include <queue>\ntemplate<typename T>\nclass Queue {\n    std::queue<T> q;\npublic:\n    void enqueue(T val) { q.push(val); }\n    T dequeue() { T v = q.front(); q.pop(); return v; }\n    T front() { return q.front(); }\n    bool isEmpty() { return q.empty(); }\n};"
  },
  linkedlist: {
    py: "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def append(self, val):\n        if not self.head:\n            self.head = Node(val); return\n        curr = self.head\n        while curr.next: curr = curr.next\n        curr.next = Node(val)",
    cpp: "struct Node {\n    int val;\n    Node* next = nullptr;\n    Node(int v): val(v) {}\n};\nclass LinkedList {\n    Node* head = nullptr;\npublic:\n    void append(int val) {\n        if (!head) { head = new Node(val); return; }\n        Node* curr = head;\n        while (curr->next) curr = curr->next;\n        curr->next = new Node(val);\n    }\n};"
  },
  binarysearch: {
    py: "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
    cpp: "int binarySearch(const std::vector<int>& arr, int target) {\n    int low = 0, high = (int)arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}"
  },
  bubbleSort: {
    py: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped: break\n    return arr",
    cpp: "void bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                std::swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}"
  },
  quicksort: {
    py: "def quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    mid = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + mid + quick_sort(right)",
    cpp: "void quickSort(std::vector<int>& arr, int low, int high) {\n    if (low >= high) return;\n    int pivot = arr[high], i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) std::swap(arr[++i], arr[j]);\n    }\n    std::swap(arr[i + 1], arr[high]);\n    int pi = i + 1;\n    quickSort(arr, low, pi - 1);\n    quickSort(arr, pi + 1, high);\n}"
  },
  websocket: {
    py: "import asyncio, websockets\n\nasync def connect():\n    async with websockets.connect('wss://api.com/live') as ws:\n        await ws.send('Hello Server!')\n        msg = await ws.recv()\n        print('Live feed:', msg)\n\nasyncio.run(connect())",
    cpp: "#include <boost/beast/websocket.hpp>\nnamespace ws = boost::beast::websocket;\n// 1. Establish TCP socket\n// 2. ws.handshake(\"api.com\", \"/live\");\n// 3. ws.write(net::buffer(\"Hello!\"));\n// 4. ws.read(buffer);"
  },
  vector_embeddings: {
    py: "import numpy as np\n\ndef cosine_similarity(vec_a, vec_b):\n    a = np.array(vec_a)\n    b = np.array(vec_b)\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\n# Query similarity\nscore = cosine_similarity([0.8, 0.6], [0.85, 0.55])",
    cpp: "#include <vector>\n#include <cmath>\n#include <numeric>\n\ndouble cosineSimilarity(const std::vector<double>& a, const std::vector<double>& b) {\n    double dot = 0.0, normA = 0.0, normB = 0.0;\n    for (size_t i = 0; i < a.size(); ++i) {\n        dot += a[i] * b[i];\n        normA += a[i] * a[i];\n        normB += b[i] * b[i];\n    }\n    return dot / (std::sqrt(normA) * std::sqrt(normB));\n}"
  },
  perceptron: {
    py: "class Perceptron:\n    def __init__(self, weights, bias):\n        self.w = weights\n        self.b = bias\n    def predict(self, inputs):\n        z = sum(x * w for x, w in zip(inputs, self.w)) + self.b\n        return 1 if z >= 0 else 0",
    cpp: "#include <vector>\n#include <numeric>\n\nclass Perceptron {\n    std::vector<double> weights;\n    double bias;\npublic:\n    Perceptron(std::vector<double> w, double b): weights(w), bias(b) {}\n    int predict(const std::vector<double>& inputs) {\n        double z = bias;\n        for (size_t i = 0; i < inputs.size(); ++i) z += inputs[i] * weights[i];\n        return z >= 0.0 ? 1 : 0;\n    }\n};"
  },
  token_bucket: {
    py: "import time\n\nclass TokenBucket:\n    def __init__(self, capacity, refill_rate):\n        self.capacity = capacity\n        self.tokens = capacity\n        self.refill_rate = refill_rate\n        self.last = time.time()\n    def allow_request(self):\n        now = time.time()\n        self.tokens = min(self.capacity, self.tokens + (now - self.last) * self.refill_rate)\n        self.last = now\n        if self.tokens >= 1:\n            self.tokens -= 1\n            return True\n        return False # 429",
    cpp: "#include <chrono>\n#include <algorithm>\n\nclass TokenBucket {\n    double capacity, tokens, refillRate;\n    std::chrono::steady_clock::time_point lastRefill;\npublic:\n    TokenBucket(double cap, double rate): capacity(cap), tokens(cap), refillRate(rate),\n        lastRefill(std::chrono::steady_clock::now()) {}\n    bool allow() {\n        auto now = std::chrono::steady_clock::now();\n        double elapsed = std::chrono::duration<double>(now - lastRefill).count();\n        tokens = std::min(capacity, tokens + elapsed * refillRate);\n        lastRefill = now;\n        if (tokens >= 1.0) { tokens -= 1.0; return true; }\n        return false;\n    }\n};"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = extraCode;
}
