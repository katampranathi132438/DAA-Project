# 🌐 Graph Traversal Visualizer — BFS and DFS

> A mini-project that lets you **see** how graph traversal works. Build your own graph, pick a starting node, and watch **Breadth-First Search (BFS)** and **Depth-First Search (DFS)** explore it step by step, with a plain-English explanation of every move.

Built with **HTML + CSS + vanilla JavaScript only**: no frameworks, no libraries, no backend, no internet needed. It runs completely in the browser.

**Submitted by:** Your Name | **Roll No:** 12345 | **Course:** Your Course
**Guide:** Prof. Name | **College:** Your College Name

---

## 1. 📖 About the Project

**Graph Traversal Visualizer** is an interactive tool for understanding BFS and DFS. Instead of only reading pseudocode, you draw a graph (circles are nodes, lines are edges), choose a start node, and watch the algorithm work. At every step you can read exactly what it is doing, for example: *"B is a new neighbour of A: mark it and add it to the back of the queue."*

While it runs, the screen shows the **queue** (BFS) or the **stack** (DFS), the **order of visited nodes**, the **edge currently being used**, and live **statistics**.

---

## 2. 🎯 Why I Built This

- Graph traversal is a core topic in Design and Analysis of Algorithms (DAA) and Data Structures, and it is easy to forget when only memorised.
- Seeing the queue and the stack change step by step makes the difference between BFS and DFS much easier to understand and explain.
- It is a good front-end project that practises DOM manipulation, SVG drawing, and animation using only JavaScript.

---

## 3. ✨ Features

- **Graph building**
  - ➕ **Add Node**: enter a unique name (up to 8 characters).
  - 🔗 **Connect Nodes**: pick two existing nodes from drop-downs.
  - 🗑 **Delete Node**: removes the node and all its edges.
  - 📋 **Load Sample Graph**: a ready-made 7-node graph that contains a cycle.
  - ♻️ **Reset Graph**: clears everything.
- **Two algorithms**: BFS (uses a queue) and DFS (uses a stack).
- **Choose a starting node** before every traversal.
- **Step-by-step animation** that replays the real algorithm's intermediate states.
- **Four node states**: unvisited, discovered, currently visited, fully visited.
- **Edge highlighting**: the edge being used right now and the edges already used.
- **Traversal order display** that grows as nodes are visited.
- **Live queue / stack display** (front of queue and top of stack are shown on the left).
- **Playback controls**: Play, Pause, Step Forward, Reset Traversal.
- **Speed selector**: Slow, Normal, Fast, Very fast.
- **Statistics panel**: number of nodes, edges, and visited nodes.
- **Legend** explaining every node and edge color.
- **Built-in theory**: short BFS and DFS explanations and a complexity table.
- **Friendly validation messages** for empty names, duplicates, self-connections, duplicate edges, an empty graph, and disconnected graphs.
- **Responsive design**: one column on mobile, two columns on laptop.

---

## 4. 🛠 Tech Stack

| Technology | Used for |
|---|---|
| **HTML5** | Page structure (controls, panels, SVG drawing area, table) |
| **CSS3** | Colors (CSS variables), layout (Grid and Flexbox), responsive design |
| **JavaScript (ES6)** | Algorithms, step recording, graph editing, animation |
| **SVG** | Drawing circles (nodes) and lines (edges) |
| **setInterval** | The animation timer |

No npm, no build step, no external libraries, no CDNs, no fonts to download. The project works **fully offline**.

---

## 5. 📁 Project Structure

```
graph-visualizer/
│
├── index.html     # Page layout and all the UI elements
├── style.css      # All styling (colors, layout, responsive rules)
├── script.js      # All logic (algorithms, drawing, controls)
└── README.md      # This file
```

**What each file does:**

| File | Responsibility |
|---|---|
| `index.html` | Defines the control panel, message box, SVG graph area, statistics, step text, traversal order, queue/stack display, legend, and the theory and complexity table. |
| `style.css` | Contains the color variables, layout, button and form styles, node and edge state colors, chips, legend, and the mobile rules. |
| `script.js` | Part A: graph data and the BFS/DFS algorithms. Part B: buttons, validation, drawing, and animation. |

---

## 6. ▶️ How to Run (Step by Step)

### Option A: Simplest (just open the file)

1. Create a folder named `graph-visualizer`.
2. Put `index.html`, `style.css`, and `script.js` **in the same folder**.
3. Double-click **`index.html`**. It opens in your default browser.
4. That's it. The app is ready to use.

> 💡 No internet connection is needed at any time.

### Option B: Using VS Code Live Server

1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. Open the project folder in VS Code (**File → Open Folder**).
3. Go to the Extensions tab and install **Live Server**.
4. Right-click `index.html` and choose **Open with Live Server**.
5. The browser opens and refreshes automatically whenever you save a file.

### Cloning from GitHub

```
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

Then open `index.html` as in Option A.

---

## 7. 🧭 How to Use the App (Step by Step)

### Step 1: Build the graph

**➕ Add a node**
1. Type a name such as `A` or `1` in the **Node name** box.
2. Click **Add Node** (or press Enter).
3. Names must be unique. `a` and `A` count as the same name.

**🔗 Connect two nodes**
1. Choose one node in each of the two drop-downs.
2. Click **Connect Nodes**.
3. Edges are undirected, so A–B is the same as B–A.

**🗑 Delete a node**
1. Choose the node in the delete drop-down.
2. Click **Delete**. Its edges are removed too.

**📋 Quick start**: click **Load Sample Graph** to get a ready-made graph instantly.

### Step 2: Choose the starting node

Pick the node from the **Starting node** drop-down. The traversal always begins from this node.

### Step 3: Run it

1. Click **Run BFS** or **Run DFS**. The animation starts automatically.
2. Use **Pause** to stop and **Play** to continue.
3. Use **Step Forward** to move **one single step** at a time. This is best for learning and presenting.
4. Click **Reset Traversal** to clear the animation but keep the graph.
5. Change the **Animation speed** at any time.

> Editing the graph (add, connect, delete) cancels any running traversal, because the recorded steps would no longer match the graph.

### Step 4: Read what is happening

- **Graph area**: node and edge colors show the current state.
- **Current step**: a sentence such as *"Step 4 of 20: ..."* explaining the action.
- **Traversal order**: the visit order so far.
- **Queue / Stack**: the live contents of the data structure.
- **Statistics**: nodes, edges, visited count.

When the traversal ends, a message tells you whether all nodes were visited or whether the graph is disconnected.

---

## 8. 🧮 Algorithms Included

| # | Algorithm | Idea in one line |
|---|---|---|
| 1 | **Breadth-First Search (BFS)** | Visit the start node, then all its neighbours, then their neighbours, and so on (level by level). Uses a **queue**. |
| 2 | **Depth-First Search (DFS)** | Go as deep as possible along one path, then backtrack. Uses a **stack**. |

### BFS in simple steps
```
1. Put the start node in the queue and mark it as discovered.
2. While the queue is not empty:
     a. Remove the node at the FRONT and visit it.
     b. For each neighbour (in sorted order):
          if it is not discovered, mark it and add it to the BACK.
     c. The removed node is now fully visited.
```

### DFS in simple steps
```
1. Visit the start node and push it onto the stack.
2. While the stack is not empty:
     a. Look at the node on TOP.
     b. If it has an unvisited neighbour: visit it and push it (go deeper).
     c. Otherwise: pop the node (backtrack). It is fully visited.
```

---

## 9. ⏱ Complexity Table

| Algorithm | Time | Space | Data structure |
|---|---|---|---|
| BFS | O(V + E) | O(V) | Queue |
| DFS | O(V + E) | O(V) | Stack / recursion |

**Quick glossary**

- **V** = number of vertices (nodes), **E** = number of edges.
- **Time O(V + E)**: every node is processed once and every edge is checked a constant number of times.
- **Space O(V)**: the visited set and the queue/stack hold at most V nodes.
- The graph is stored as an **adjacency list**, which takes O(V + E) memory.

---

## 10. ⚙️ How the Code Works (Step by Step)

This is the most important part to understand (and to explain in a viva).

### The core idea: "record first, play later"

Instead of animating while the algorithm runs, the project works in **two phases**:

1. **Record phase**: the algorithm runs completely and, at every important moment, saves a **step** (a snapshot) into a list.
2. **Playback phase**: the app plays through that list one step at a time and draws each snapshot.

Because of this, we can **pause, resume, step once, and reset** easily, all from the same list. The animation is guaranteed to match what the real algorithm did.

### Step 1: The graph (`graph`)

An **adjacency list**: an object where each node name maps to a `Set` of its neighbours.

```
{ A: Set{B, C}, B: Set{A, D, E}, C: Set{A, F}, ... }
```

Using a `Set` automatically prevents duplicate edges. Edges are undirected, so when A–B is added, B is stored in A's set and A in B's set.

### Step 2: Deterministic order (`compareNames`, `sortedNeighbors`)

Neighbours are always sorted the same way (letters alphabetically, numbers numerically, so `2` comes before `10`). The same graph and start node always give the same traversal order.

### Step 3: BFS with a queue (`bfsSteps`)

- A `queue` array is used: `queue.push(v)` adds at the back and `queue.shift()` removes from the front.
- A `visited` set marks a node **when it is added to the queue**, so no node is ever added twice. This makes cycles safe.
- After each important action, `record(...)` saves a snapshot.

### Step 4: DFS with a stack (`dfsSteps`)

- A `stack` array holds items like `{ node, next }`. `next` remembers which neighbour to try next, which imitates recursion.
- `stack.push(...)` means go deeper. `stack.pop()` means backtrack.
- Visited neighbours are skipped, so cycles are safe.

### Step 5: What a recorded step stores

| Field | Meaning |
|---|---|
| `message` | A human-readable sentence explaining the step |
| `current` | The node being visited right now |
| `edge` | The edge used at this step (highlighted orange) |
| `container` | A copy of the queue (BFS) or stack (DFS) |
| `visited` | All discovered nodes |
| `finished` | Nodes whose neighbours have all been checked |
| `order` | The visit order so far |
| `treeEdges` | Edges already used to discover nodes (green) |

### Step 6: Editing the graph (`addNode`, `connectNodes`, `deleteNode`, `resetGraph`, `loadSample`)

Each function validates the input first and shows a friendly message if something is wrong. After a successful change it calls `graphChanged()`, which cancels any running traversal, refreshes the drop-downs, and redraws the graph.

### Step 7: Drawing (`nodePositions`, `render`)

- `nodePositions` places the nodes evenly around an ellipse so they never overlap.
- `render` clears the SVG and draws every edge first (so nodes appear on top), then every node. CSS classes decide the colors.
- The same function updates the statistics, step text, traversal order, and queue/stack display from the current step.

### Step 8: Animation (`play`, `pause`, `nextStep`)

1. `startTraversal` builds the step list with BFS or DFS and starts playing.
2. `play` uses `setInterval` to call `nextStep` every N milliseconds (set by the speed selector).
3. `nextStep` moves the step index forward by one and calls `render`.
4. When the last step is shown, `finishTraversal` stops the timer and checks whether all nodes were visited.

### Step 9: Buttons

| Button | What it does |
|---|---|
| **Run BFS / Run DFS** | Validates, generates the steps, and starts the animation |
| **Play** | Starts or restarts the animation |
| **Pause** | Stops the timer on the current step |
| **Step Forward** | Pauses, then shows exactly one more step |
| **Reset Traversal** | Clears the animation but keeps the graph |

### Step 10: Separation of concerns

`script.js` is split into **Part A** (graph data and algorithms, with no HTML code) and **Part B** (user interface). The algorithms can be understood and tested without any of the drawing code.

---

## 11. 🎨 Color Legend

### Nodes

| Color | Meaning |
|---|---|
| ⚪ White with grey border | **Unvisited**: not discovered yet |
| 🔵 Light blue | **Discovered**: waiting in the queue (BFS) or on the stack (DFS) |
| 🟠 Orange | **Currently being visited** |
| 🟢 Green | **Fully visited**: all neighbours checked |

### Edges

| Color | Meaning |
|---|---|
| Grey, thin | Normal edge |
| 🟠 Orange, thick | Edge being used right now |
| 🟢 Green, medium | Edge already used by the traversal |

---

## 12. 🔁 Cycles and Disconnected Graphs

- **Cycles**: the sample graph contains the cycle A–B–E–F–C–A. A node is marked as visited the moment it is discovered, so the algorithms never revisit it and never loop forever.
- **Disconnected graphs**: a traversal only reaches nodes connected to the start node. When it finishes and some nodes were not visited, the app shows a message listing the unreachable nodes. (To cover every node, you would restart the algorithm from each unvisited node.)

---

## 13. 🧪 Worked Example (Sample Graph)

Edges: A–B, A–C, B–D, B–E, C–F, E–F, F–G.

```
        A
       / \
      B   C
     / \   \
    D   E---F---G
```

| Algorithm | Start | Visit order |
|---|---|---|
| BFS | A | **A, B, C, D, E, F, G** |
| DFS | A | **A, B, D, E, F, C, G** |

**Why they differ:** BFS finishes all nodes close to A (B, C) before going further. DFS follows A → B → D to the end, backtracks, then goes B → E → F, and only later reaches C.

---

## 14. ✅ Testing Checklist

> The algorithm orders above were verified by hand-tracing the code. Run this checklist in your browser to confirm everything works on your machine, then delete this note.

- [ ] Add node `A`: it appears and the Nodes count is 1.
- [ ] Add `A` and then `a` again: a duplicate-name error appears.
- [ ] Add an empty name: an error appears.
- [ ] Connect a node to itself: an error appears.
- [ ] Connect the same pair twice: an error appears.
- [ ] Delete a node: it and its edges disappear.
- [ ] Load Sample Graph: 7 nodes and 7 edges.
- [ ] BFS from A: order is A, B, C, D, E, F, G, and the queue is shown.
- [ ] DFS from A: order is A, B, D, E, F, C, G, and the stack is shown.
- [ ] Pause, Play, Step Forward, and Reset Traversal all work.
- [ ] The speed selector changes the animation speed.
- [ ] Add isolated nodes `X` and `Y`, run from A: a "DISCONNECTED" message lists them.
- [ ] Narrow the browser window: the layout becomes one column.
- [ ] Turn off the internet and reload: everything still works.

## 15. 📚 Glossary

| Term | Meaning |
|---|---|
| Graph | A set of nodes connected by edges |
| Node / Vertex | A point in the graph (drawn as a circle) |
| Edge | A connection between two nodes (drawn as a line) |
| Neighbour | A node directly connected to another node |
| Adjacency list | Storing each node with the list of its neighbours |
| Queue | First In, First Out (FIFO) |
| Stack | Last In, First Out (LIFO) |
| Traversal | Visiting every reachable node in a systematic order |
| Cycle | A path that starts and ends at the same node |
| Backtracking | Returning to a previous node to try another path |
| Deterministic | Always gives the same output for the same input |

---