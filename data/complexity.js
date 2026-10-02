// Phase 5 additions
const complexityData = {
  "stack": {
    "time": "O(1)",
    "space": "O(n)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "action": "push('A')",
        "top": "'A'",
        "size": 1,
        "memory": "Stack Frame"
      },
      {
        "action": "push('B')",
        "top": "'B'",
        "size": 2,
        "memory": "Stack Frame"
      },
      {
        "action": "push('C')",
        "top": "'C'",
        "size": 3,
        "memory": "Stack Frame"
      },
      {
        "action": "pop() -> 'C'",
        "top": "'B'",
        "size": 2,
        "memory": "Deallocated"
      },
      {
        "action": "pop() -> 'B'",
        "top": "'A'",
        "size": 1,
        "memory": "Deallocated"
      }
    ]
  },
  "queue": {
    "time": "O(1)",
    "space": "O(n)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "action": "enqueue('A')",
        "front": "'A'",
        "rear": "'A'",
        "size": 1
      },
      {
        "action": "enqueue('B')",
        "front": "'A'",
        "rear": "'B'",
        "size": 2
      },
      {
        "action": "enqueue('C')",
        "front": "'A'",
        "rear": "'C'",
        "size": 3
      },
      {
        "action": "dequeue() -> 'A'",
        "front": "'B'",
        "rear": "'C'",
        "size": 2
      },
      {
        "action": "dequeue() -> 'B'",
        "front": "'C'",
        "rear": "'C'",
        "size": 1
      }
    ]
  },
  "linkedlist": {
    "time": "O(n)",
    "space": "O(n)",
    "curve": "O_n",
    "timeRating": "fair",
    "spaceRating": "fair",
    "vars": [
      {
        "node": "Head",
        "val": 10,
        "next": "0x1A",
        "ptr": "head"
      },
      {
        "node": "Node 1",
        "val": 20,
        "next": "0x2B",
        "ptr": "curr"
      },
      {
        "node": "Node 2",
        "val": 30,
        "next": "null",
        "ptr": "curr.next"
      },
      {
        "action": "insert(25)",
        "prev": "0x1A",
        "new": "0x3C",
        "next": "0x2B"
      },
      {
        "action": "linked",
        "count": 4,
        "status": "traversed"
      }
    ]
  },
  "binarysearch": {
    "time": "O(log n)",
    "space": "O(1)",
    "curve": "O_log_n",
    "timeRating": "good",
    "spaceRating": "good",
    "vars": [
      {
        "low": 0,
        "high": 6,
        "mid": 3,
        "arrMid": 31,
        "target": 42,
        "cmp": "31 < 42"
      },
      {
        "low": 4,
        "high": 6,
        "mid": 5,
        "arrMid": 55,
        "target": 42,
        "cmp": "55 > 42"
      },
      {
        "low": 4,
        "high": 4,
        "mid": 4,
        "arrMid": 42,
        "target": 42,
        "cmp": "42 == 42"
      },
      {
        "status": "FOUND",
        "index": 4,
        "comparisons": 3
      },
      {
        "status": "COMPLETED",
        "searchSpace": "1/8 of N",
        "efficiency": "Logarithmic"
      }
    ]
  },
  "recursion": {
    "time": "O(2ⁿ)",
    "space": "O(n)",
    "curve": "O_2_n",
    "timeRating": "poor",
    "spaceRating": "fair",
    "vars": [
      {
        "call": "fib(4)",
        "depth": 1,
        "stackFrames": 1
      },
      {
        "call": "fib(3) + fib(2)",
        "depth": 2,
        "stackFrames": 3
      },
      {
        "call": "fib(2) + fib(1)",
        "depth": 3,
        "stackFrames": 5
      },
      {
        "call": "baseCase fib(1)=1",
        "depth": 4,
        "returning": 1
      },
      {
        "call": "unwinding",
        "result": 3,
        "totalCalls": 9
      }
    ]
  },
  "bubbleSort": {
    "time": "O(n²)",
    "space": "O(1)",
    "curve": "O_n_2",
    "timeRating": "poor",
    "spaceRating": "good",
    "vars": [
      {
        "pass": 1,
        "i": 0,
        "j": 0,
        "cmp": "arr[0] > arr[1]",
        "swapped": true
      },
      {
        "pass": 1,
        "i": 0,
        "j": 2,
        "cmp": "arr[2] > arr[3]",
        "swapped": true
      },
      {
        "pass": 2,
        "i": 1,
        "j": 1,
        "cmp": "arr[1] < arr[2]",
        "swapped": false
      },
      {
        "pass": 3,
        "i": 2,
        "j": 0,
        "cmp": "in-order",
        "sortedTail": 3
      },
      {
        "status": "SORTED",
        "totalPasses": 4,
        "totalSwaps": 6
      }
    ]
  },
  "hashmap": {
    "time": "O(1)",
    "space": "O(n)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "key": "'name'",
        "hash": "hash('name') % 8",
        "bucket": 3
      },
      {
        "action": "store",
        "bucket": 3,
        "val": "'Alice'",
        "collisions": 0
      },
      {
        "key": "'age'",
        "hash": "hash('age') % 8",
        "bucket": 7
      },
      {
        "action": "store",
        "bucket": 7,
        "val": 28,
        "collisions": 0
      },
      {
        "action": "lookup('name')",
        "bucket": 3,
        "found": "'Alice'",
        "time": "O(1)"
      }
    ]
  },
  "observer": {
    "time": "O(n)",
    "space": "O(n)",
    "curve": "O_n",
    "timeRating": "fair",
    "spaceRating": "fair",
    "vars": [
      {
        "event": "register",
        "subscribers": [
          "UI_Logger",
          "Analytics"
        ]
      },
      {
        "event": "register",
        "subscribers": [
          "UI_Logger",
          "Analytics",
          "Notification"
        ]
      },
      {
        "event": "publish('USER_LOGIN')",
        "activeSubscriber": "UI_Logger"
      },
      {
        "event": "notified",
        "activeSubscriber": "Analytics",
        "payload": "{id:42}"
      },
      {
        "event": "complete",
        "totalNotified": 3,
        "decoupled": true
      }
    ]
  },
  "dom": {
    "time": "O(n)",
    "space": "O(n)",
    "curve": "O_n",
    "timeRating": "fair",
    "spaceRating": "fair"
  },
  "closure": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "bintree": {
    "time": "O(n)",
    "space": "O(h)",
    "curve": "O_n",
    "timeRating": "fair",
    "spaceRating": "fair"
  },
  "bfs": {
    "time": "O(V + E)",
    "space": "O(V)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "queue": [
          "A"
        ],
        "visited": [
          "A"
        ],
        "curr": "A"
      },
      {
        "queue": [
          "B",
          "C"
        ],
        "visited": [
          "A",
          "B",
          "C"
        ],
        "curr": "B"
      },
      {
        "queue": [
          "C",
          "D"
        ],
        "visited": [
          "A",
          "B",
          "C",
          "D"
        ],
        "curr": "C"
      },
      {
        "queue": [
          "D",
          "E"
        ],
        "visited": [
          "A",
          "B",
          "C",
          "D",
          "E"
        ],
        "curr": "D"
      },
      {
        "status": "TRAVERSED",
        "order": "Level-Order",
        "totalVisited": 5
      }
    ]
  },
  "dfs": {
    "time": "O(V + E)",
    "space": "O(V)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "stack": [
          "A"
        ],
        "visited": [
          "A"
        ],
        "curr": "A"
      },
      {
        "stack": [
          "A",
          "B"
        ],
        "visited": [
          "A",
          "B"
        ],
        "curr": "B"
      },
      {
        "stack": [
          "A",
          "B",
          "D"
        ],
        "visited": [
          "A",
          "B",
          "D"
        ],
        "curr": "D (leaf)"
      },
      {
        "backtrack": "to B -> to C",
        "stack": [
          "A",
          "C"
        ],
        "curr": "C"
      },
      {
        "status": "TRAVERSED",
        "order": "Depth-First",
        "totalVisited": 5
      }
    ]
  },
  "mergesort": {
    "time": "O(n log n)",
    "space": "O(n)",
    "curve": "O_n_log_n",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "divide": "split [38, 27, 43, 3]",
        "left": "[38, 27]",
        "right": "[43, 3]"
      },
      {
        "divide": "atomic sub-arrays",
        "units": "[38], [27], [43], [3]"
      },
      {
        "conquer": "merge pairs",
        "left": "[27, 38]",
        "right": "[3, 43]"
      },
      {
        "merge": "compare 27 vs 3",
        "result": "[3, ...]"
      },
      {
        "status": "SORTED",
        "result": "[3, 27, 38, 43]",
        "stable": true
      }
    ]
  },
  "quicksort": {
    "time": "O(n log n)",
    "space": "O(log n)",
    "curve": "O_n_log_n",
    "timeRating": "good",
    "spaceRating": "good",
    "vars": [
      {
        "pivot": 45,
        "low": 0,
        "high": 5,
        "array": "[23, 76, 12, 89, 45]"
      },
      {
        "partition": "i=0, j=2",
        "swap": "76 <-> 12",
        "pivot": 45
      },
      {
        "partition": "pivot placed",
        "index": 2,
        "left": "[23, 12]",
        "right": "[76, 89]"
      },
      {
        "recursive": "left sort [12, 23]",
        "rightSort": "[76, 89]"
      },
      {
        "status": "SORTED",
        "final": "[12, 23, 45, 76, 89]",
        "avgTime": "O(n log n)"
      }
    ]
  },
  "quicksortAvg": {
    "time": "O(n log n)",
    "space": "O(log n)",
    "curve": "O_n_log_n",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "singleton": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "factory": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "promise": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "eventloop": {
    "time": "O(1)",
    "space": "O(n)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "http": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "array": {
    "time": "O(1) access",
    "space": "O(n)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "deque": {
    "time": "O(1)",
    "space": "O(n)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "heap": {
    "time": "O(log n)",
    "space": "O(n)",
    "curve": "O_log_n",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "trie": {
    "time": "O(k)",
    "space": "O(ALPHABET * k)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "insertionsort": {
    "time": "O(n²)",
    "space": "O(1)",
    "curve": "O_n_2",
    "timeRating": "poor",
    "spaceRating": "good"
  },
  "selectionsort": {
    "time": "O(n²)",
    "space": "O(1)",
    "curve": "O_n_2",
    "timeRating": "poor",
    "spaceRating": "good"
  },
  "strategy": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "decorator": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "boxmodel": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "flexbox": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "avl": {
    "time": "O(log n)",
    "space": "O(n)",
    "curve": "O_log_n",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "dijkstra": {
    "time": "O((V + E) log V)",
    "space": "O(V)",
    "curve": "O_n_log_n",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "toposort": {
    "time": "O(V + E)",
    "space": "O(V)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "fib_dp": {
    "time": "O(n)",
    "space": "O(n)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "knapsack": {
    "time": "O(n * W)",
    "space": "O(n * W)",
    "curve": "O_n_2",
    "timeRating": "fair",
    "spaceRating": "fair"
  },
  "virtualmem": {
    "time": "O(1)",
    "space": "O(pages)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "callstack": {
    "time": "O(1)",
    "space": "O(depth)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "heapvsstack": {
    "time": "O(1)",
    "space": "O(heap)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "jwt": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "webworker": {
    "time": "O(1)",
    "space": "O(thread)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "gc": {
    "time": "O(live objects)",
    "space": "O(1)",
    "curve": "O_n",
    "timeRating": "fair",
    "spaceRating": "good"
  },
  "bloom": {
    "time": "O(k)",
    "space": "O(m bits)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "lru": {
    "time": "O(1)",
    "space": "O(capacity)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "debounce": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "promiseAll": {
    "time": "O(max(t))",
    "space": "O(n)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair"
  },
  "cors": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "regex": {
    "time": "O(n)",
    "space": "O(states)",
    "curve": "O_n",
    "timeRating": "fair",
    "spaceRating": "fair"
  },
  "heapSort": {
    "time": "O(n log n)",
    "space": "O(1)",
    "curve": "O_n_log_n",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "websocket": {
    "time": "O(1) frames",
    "space": "O(buffer)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good"
  },
  "vector_embeddings": {
    "time": "O(d)",
    "space": "O(v * d)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "space": "2D Latent Grid",
        "vocabulary": [
          "king",
          "queen",
          "apple"
        ],
        "dim": 2
      },
      {
        "query": "monarch",
        "coords": [
          490,
          190
        ],
        "status": "vectorized"
      },
      {
        "metric": "Cosine Sim",
        "formula": "dot(A,B)/(||A||*||B||)",
        "angle": "θ ≈ 4°"
      },
      {
        "topNeighbors": [
          "king (0.98)",
          "queen (0.97)"
        ],
        "rejected": "apple (0.12)"
      },
      {
        "status": "RETRIEVED",
        "searchType": "Approx Nearest Neighbor (ANN)"
      }
    ]
  },
  "perceptron": {
    "time": "O(inputs)",
    "space": "O(weights)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good",
    "vars": [
      {
        "x1": 1,
        "x2": 0.5,
        "status": "signals input"
      },
      {
        "w1": 0.8,
        "w2": -0.4,
        "weightedSum": "(1*0.8) + (0.5*-0.4) = 0.6"
      },
      {
        "bias": 0.2,
        "preActivation_z": "0.6 + 0.2 = 0.8"
      },
      {
        "activationFunc": "Heaviside step(z)",
        "threshold": "z >= 0 ? 1 : 0"
      },
      {
        "output_y": 1,
        "decision": "Neuron Fired (Class 1)"
      }
    ]
  },
  "token_bucket": {
    "time": "O(1)",
    "space": "O(1)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "good",
    "vars": [
      {
        "capacity": 4,
        "tokens": 2,
        "refillRate": "1 token/sec",
        "status": "IDLE"
      },
      {
        "capacity": 4,
        "tokens": 4,
        "status": "BUCKET FULL"
      },
      {
        "incoming": "GET /api/data",
        "tokensAvailable": 3,
        "check": "tokens >= 1"
      },
      {
        "consumed": 1,
        "remaining": 2,
        "httpResponse": "200 OK"
      },
      {
        "burstReq": "Excess traffic",
        "remaining": 0,
        "httpResponse": "429 Too Many Requests"
      }
    ]
  },
  "a_star": {
    "time": "O(E log V)",
    "space": "O(V)",
    "curve": "O_n_log_n",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "openSet": "[(0,0) f=9]",
        "closed": "[]",
        "g": "{start:0}"
      },
      {
        "expand": "(0,0)",
        "f": 9,
        "g": 0,
        "h": 9
      },
      {
        "neighbor": "(1,0)",
        "g": 1,
        "h": 8,
        "f": 9
      },
      {
        "goalReached": "(6,4)",
        "pathLength": 10,
        "explored": 18
      },
      {
        "reconstruct": "trace parents back",
        "path": "10 tiles",
        "optimal": true
      }
    ]
  },
  "n_queens": {
    "time": "O(N!)",
    "space": "O(N)",
    "curve": "O_2_n",
    "timeRating": "poor",
    "spaceRating": "fair",
    "vars": [
      {
        "row": 0,
        "col": 0,
        "board": "Q......."
      },
      {
        "row": 1,
        "col": 2,
        "board": "Q..Q....",
        "safe": true
      },
      {
        "row": 2,
        "col": 4,
        "conflict": "diagonal",
        "action": "prune"
      },
      {
        "row": 2,
        "col": 0,
        "backtracked": true,
        "tries": 3
      },
      {
        "solved": true,
        "board": "Q...Q...Q...",
        "solutions": 92
      }
    ]
  },
  "kadane": {
    "time": "O(n)",
    "space": "O(1)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "good",
    "vars": [
      {
        "i": 0,
        "cur": -2,
        "best": -2
      },
      {
        "i": 1,
        "nums": 1,
        "cur": 1,
        "best": 1,
        "decision": "restart"
      },
      {
        "i": 3,
        "nums": 4,
        "cur": 4,
        "best": 4
      },
      {
        "i": 6,
        "cur": 6,
        "best": 6,
        "subarray": "[4,-1,2,1]"
      },
      {
        "status": "DONE",
        "maxSum": 6,
        "scanned": 9
      }
    ]
  },
  "union_find": {
    "time": "O(α(n))",
    "space": "O(n)",
    "curve": "O_1",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "parent": "[0,1,2,3,4]",
        "rank": "all 0"
      },
      {
        "union": "0+1",
        "parent": "[0,0,2,3,4]"
      },
      {
        "find": "4",
        "path": "4 -> 2 -> 3",
        "root": 3
      },
      {
        "compress": "4 -> 3",
        "depth": 1
      },
      {
        "connected": "0 and 1",
        "result": true,
        "components": 3
      }
    ]
  },
  "monotonic_stack": {
    "time": "O(n)",
    "space": "O(n)",
    "curve": "O_n",
    "timeRating": "good",
    "spaceRating": "fair",
    "vars": [
      {
        "i": 0,
        "push": 2,
        "stack": "[0]"
      },
      {
        "i": 3,
        "val": 4,
        "pop": "2 and 1 and 2",
        "stack": "[]"
      },
      {
        "resolved": "{0:4, 1:2, 2:4}",
        "stackAfter": "[3]"
      },
      {
        "i": 4,
        "peek": 3,
        "topVal": 3
      },
      {
        "status": "DONE",
        "stack": "[3, 5]",
        "unresolved": "-1"
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = complexityData;
}
