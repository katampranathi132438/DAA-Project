/* =====================================================================
   GRAPH TRAVERSAL VISUALIZER – script.js
   Part A: Graph data + algorithms (no HTML/DOM code here)
   Part B: User interface (buttons, drawing, animation)
   ===================================================================== */

/* =====================  PART A: DATA + ALGORITHMS  ===================== */

// The graph is an ADJACENCY LIST: each node name maps to a Set of its neighbours.
// Example: { A: Set{B, C}, B: Set{A}, C: Set{A} }
let graph = {};

// Compare names so the order is always the same (A, B, C ... and 2 before 10).
function compareNames(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

// Neighbours in a fixed (sorted) order => traversal is deterministic.
function sortedNeighbors(g, node) {
  return [...g[node]].sort(compareNames);
}

/* ---------- BFS (uses a QUEUE) ----------
   Returns a list of "steps". Each step is a snapshot of the algorithm's state,
   so the animation simply replays what the real algorithm did. */
function bfsSteps(g, start) {
  const steps = [];
  const visited = new Set([start]); // discovered nodes (marked when added to queue)
  const finished = new Set();       // nodes whose neighbours were all checked
  const order = [];                 // order in which nodes are visited
  const treeEdges = [];             // edges used to discover new nodes
  const queue = [start];            // the queue: add at back, remove from front

  function record(message, current, edge) {
    steps.push({
      message, current, edge,
      container: [...queue],
      visited: [...visited],
      finished: [...finished],
      order: [...order],
      treeEdges: treeEdges.map(e => [...e])
    });
  }

  record(`Start: put ${start} in the queue and mark it as discovered.`, null, null);

  while (queue.length > 0) {
    const u = queue.shift();        // DEQUEUE from the front
    order.push(u);
    record(`Remove ${u} from the front of the queue and visit it.`, u, null);

    for (const v of sortedNeighbors(g, u)) {
      if (!visited.has(v)) {        // cycle-safe: never add a node twice
        visited.add(v);
        queue.push(v);              // ENQUEUE at the back
        treeEdges.push([u, v]);
        record(`${v} is a new neighbour of ${u}: mark it and add it to the back of the queue.`, u, [u, v]);
      }
    }

    finished.add(u);
    record(`All neighbours of ${u} are checked. ${u} is fully visited.`, null, null);
  }

  record(`BFS finished. Visit order: ${order.join(" → ")}.`, null, null);
  return steps;
}

/* ---------- DFS (uses a STACK that imitates recursion) ----------
   Each stack item remembers its node and which neighbour to try next. */
function dfsSteps(g, start) {
  const steps = [];
  const visited = new Set([start]);
  const finished = new Set();
  const order = [start];
  const treeEdges = [];
  const stack = [{ node: start, next: 0 }];

  function record(message, current, edge) {
    steps.push({
      message, current, edge,
      container: stack.map(item => item.node),
      visited: [...visited],
      finished: [...finished],
      order: [...order],
      treeEdges: treeEdges.map(e => [...e])
    });
  }

  record(`Start: visit ${start} and push it onto the stack.`, start, null);

  while (stack.length > 0) {
    const top = stack[stack.length - 1];
    const neighbors = sortedNeighbors(g, top.node);

    // Skip neighbours that were already visited (this handles cycles).
    while (top.next < neighbors.length && visited.has(neighbors[top.next])) {
      top.next++;
    }

    if (top.next < neighbors.length) {
      const v = neighbors[top.next++];
      visited.add(v);
      order.push(v);
      treeEdges.push([top.node, v]);
      stack.push({ node: v, next: 0 });   // PUSH = go deeper
      record(`From ${top.node} go deeper to unvisited neighbour ${v}: push ${v} onto the stack.`, v, [top.node, v]);
    } else {
      stack.pop();                         // POP = backtrack
      finished.add(top.node);
      const back = stack.length > 0 ? stack[stack.length - 1].node : null;
      record(
        back
          ? `${top.node} has no unvisited neighbours left: pop it and backtrack to ${back}.`
          : `${top.node} has no unvisited neighbours left: pop it. The stack is empty.`,
        back, null);
    }
  }

  record(`DFS finished. Visit order: ${order.join(" → ")}.`, null, null);
  return steps;
}

/* =====================  PART B: USER INTERFACE  ===================== */

// ----- Get all HTML elements by their IDs -----
const $ = id => document.getElementById(id);
const svg = $("graphSvg");
const nodeNameInput = $("nodeName");
const edgeFrom = $("edgeFrom");
const edgeTo = $("edgeTo");
const deleteSelect = $("deleteNode");
const startSelect = $("startNode");
const speedSelect = $("speed");
const messageBox = $("message");

// ----- Traversal state -----
let steps = [];        // steps of the current run
let stepIndex = -1;    // which step is on screen (-1 = none)
let timer = null;      // animation timer
let currentAlgo = "";  // "BFS" or "DFS"

const SVG_NS = "http://www.w3.org/2000/svg";
const NODE_RADIUS = 24;

// ----- Friendly messages -----
function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = "message " + (type || "info");
}

// ----- Graph editing -----
function addNode() {
  const name = nodeNameInput.value.trim();
  if (name === "") return showMessage("Please type a node name first.", "error");
  const duplicate = Object.keys(graph).some(n => n.toLowerCase() === name.toLowerCase());
  if (duplicate) return showMessage(`Node "${name}" already exists. Node names must be unique.`, "error");

  graph[name] = new Set();
  nodeNameInput.value = "";
  nodeNameInput.focus();
  graphChanged();
  showMessage(`Node "${name}" added.`, "success");
}

function connectNodes() {
  const a = edgeFrom.value, b = edgeTo.value;
  if (!a || !b) return showMessage("Add at least two nodes before connecting them.", "error");
  if (a === b) return showMessage("A node cannot be connected to itself. Choose two different nodes.", "error");
  if (graph[a].has(b)) return showMessage(`${a} and ${b} are already connected.`, "error");

  graph[a].add(b);     // undirected graph: store the edge both ways
  graph[b].add(a);
  graphChanged();
  showMessage(`Connected ${a} and ${b}.`, "success");
}

function deleteNode() {
  const name = deleteSelect.value;
  if (!name) return showMessage("There is no node to delete.", "error");
  for (const neighbor of graph[name]) graph[neighbor].delete(name); // remove its edges
  delete graph[name];
  graphChanged();
  showMessage(`Node "${name}" and its edges were deleted.`, "success");
}

function resetGraph() {
  graph = {};
  graphChanged();
  showMessage("Graph cleared. Add new nodes to start again.", "info");
}

function loadSample() {
  graph = {};
  ["A", "B", "C", "D", "E", "F", "G"].forEach(n => (graph[n] = new Set()));
  [["A","B"],["A","C"],["B","D"],["B","E"],["C","F"],["E","F"],["F","G"]]
    .forEach(([x, y]) => { graph[x].add(y); graph[y].add(x); });
  graphChanged();
  showMessage("Sample graph loaded (it contains a cycle: A-B-E-F-C). Pick a start node and run BFS or DFS.", "success");
}

// Called after every edit: stops any traversal and refreshes the screen.
function graphChanged() {
  resetTraversal(true);
  refreshSelects();
  render();
}

// Fill the drop-down lists with the current node names.
function refreshSelects() {
  const names = Object.keys(graph);
  [edgeFrom, edgeTo, deleteSelect, startSelect].forEach(sel => {
    const old = sel.value;
    sel.innerHTML = "";
    names.forEach(n => {
      const opt = document.createElement("option");
      opt.value = n;
      opt.textContent = n;
      sel.appendChild(opt);
    });
    if (names.includes(old)) sel.value = old;
  });
  if (names.length > 1 && edgeFrom.value === edgeTo.value) {
    edgeTo.value = names.find(n => n !== edgeFrom.value);
  }
}

// ----- Traversal control -----
function startTraversal(algo) {
  const names = Object.keys(graph);
  if (names.length === 0) return showMessage("The graph is empty. Add nodes or load the sample graph first.", "error");
  const start = startSelect.value;
  if (!start) return showMessage("Please select a starting node.", "error");

  pause();
  currentAlgo = algo;
  steps = algo === "BFS" ? bfsSteps(graph, start) : dfsSteps(graph, start);
  stepIndex = 0;
  render();
  showMessage(`${algo} started from node ${start}.`, "info");
  play();
}

function play() {
  if (steps.length === 0) return showMessage("Click Run BFS or Run DFS first.", "error");
  if (stepIndex >= steps.length - 1) stepIndex = 0;   // replay from the beginning
  clearInterval(timer);
  timer = setInterval(nextStep, Number(speedSelect.value));
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function nextStep() {
  if (steps.length === 0) return showMessage("Click Run BFS or Run DFS first.", "error");
  if (stepIndex < steps.length - 1) {
    stepIndex++;
    render();
    if (stepIndex === steps.length - 1) finishTraversal();
  } else {
    pause();
  }
}

function stepButton() {
  pause();
  if (steps.length > 0 && stepIndex >= steps.length - 1) {
    return showMessage("The traversal is already finished. Press Reset Traversal or Play to run again.", "info");
  }
  nextStep();
}

// Runs when the last step is shown: also checks for a disconnected graph.
function finishTraversal() {
  pause();
  const total = Object.keys(graph).length;
  const last = steps[steps.length - 1];
  if (last.visited.length < total) {
    const missed = Object.keys(graph).filter(n => !last.visited.includes(n)).sort(compareNames);
    showMessage(`${currentAlgo} finished, but the graph is DISCONNECTED. Unreachable from the start: ${missed.join(", ")}.`, "error");
  } else {
    showMessage(`${currentAlgo} finished. All ${total} nodes were visited.`, "success");
  }
}

function resetTraversal(silent) {
  pause();
  steps = [];
  stepIndex = -1;
  currentAlgo = "";
  render();
  if (silent !== true) showMessage("Traversal reset.", "info");
}

// ----- Drawing -----
function svgEl(tag, attrs) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

// Place nodes evenly around an ellipse so they never overlap.
function nodePositions() {
  const names = Object.keys(graph);
  const pos = {};
  const cx = 400, cy = 250, rx = 320, ry = 190;
  names.forEach((n, i) => {
    if (names.length === 1) { pos[n] = { x: cx, y: cy }; return; }
    const angle = (2 * Math.PI * i) / names.length - Math.PI / 2;
    pos[n] = { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
  });
  return pos;
}

function edgeKey(a, b) { return [a, b].sort(compareNames).join("|"); }

function render() {
  const step = stepIndex >= 0 ? steps[stepIndex] : null;
  const names = Object.keys(graph);
  const pos = nodePositions();
  svg.innerHTML = "";

  // Which edges are highlighted?
  const treeSet = new Set(step ? step.treeEdges.map(e => edgeKey(e[0], e[1])) : []);
  const activeKey = step && step.edge ? edgeKey(step.edge[0], step.edge[1]) : null;

  // Draw edges first (so nodes appear on top). Each edge is drawn once.
  let edgeCount = 0;
  names.forEach(a => {
    graph[a].forEach(b => {
      if (compareNames(a, b) < 0) {
        edgeCount++;
        const key = edgeKey(a, b);
        let cls = "edge";
        if (key === activeKey) cls += " active";
        else if (treeSet.has(key)) cls += " tree";
        svg.appendChild(svgEl("line", {
          class: cls, x1: pos[a].x, y1: pos[a].y, x2: pos[b].x, y2: pos[b].y
        }));
      }
    });
  });

  // Draw nodes
  names.forEach(n => {
    let state = "unvisited";
    if (step) {
      if (step.finished.includes(n)) state = "done";
      else if (step.current === n) state = "current";
      else if (step.visited.includes(n)) state = "queued";
    }
    const g = svgEl("g", { class: "node " + state });
    g.appendChild(svgEl("circle", { cx: pos[n].x, cy: pos[n].y, r: NODE_RADIUS }));
    const label = svgEl("text", { x: pos[n].x, y: pos[n].y });
    label.textContent = n;
    g.appendChild(label);
    svg.appendChild(g);
  });

  // Statistics
  $("statNodes").textContent = names.length;
  $("statEdges").textContent = edgeCount;
  $("statVisited").textContent = step ? step.visited.length : 0;

  // Step text, order, and queue/stack
  $("stepText").textContent = step ? `Step ${stepIndex + 1} of ${steps.length}: ${step.message}` : "No traversal running.";
  fillChips($("orderBox"), step ? step.order : [], "Nothing visited yet.");

  if (currentAlgo === "DFS") {
    $("containerLabel").textContent = "Stack (top is on the left)";
    fillChips($("containerBox"), step ? [...step.container].reverse() : [], "Stack is empty.");
  } else {
    $("containerLabel").textContent = currentAlgo === "BFS" ? "Queue (front is on the left)" : "Queue / Stack";
    fillChips($("containerBox"), step ? step.container : [], "Queue is empty.");
  }
}

function fillChips(box, items, emptyText) {
  box.innerHTML = "";
  if (items.length === 0) {
    const span = document.createElement("span");
    span.className = "chip empty";
    span.textContent = emptyText;
    box.appendChild(span);
    return;
  }
  items.forEach(item => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = item;
    box.appendChild(span);
  });
}

// ----- Connect every button to its function -----
$("addNodeBtn").addEventListener("click", addNode);
nodeNameInput.addEventListener("keydown", e => { if (e.key === "Enter") addNode(); });
$("connectBtn").addEventListener("click", connectNodes);
$("deleteBtn").addEventListener("click", deleteNode);
$("sampleBtn").addEventListener("click", loadSample);
$("resetGraphBtn").addEventListener("click", resetGraph);
$("bfsBtn").addEventListener("click", () => startTraversal("BFS"));
$("dfsBtn").addEventListener("click", () => startTraversal("DFS"));
$("playBtn").addEventListener("click", play);
$("pauseBtn").addEventListener("click", pause);
$("stepBtn").addEventListener("click", stepButton);
$("resetTravBtn").addEventListener("click", () => resetTraversal());
speedSelect.addEventListener("change", () => { if (timer) play(); });

// Draw the empty screen when the page first loads.
refreshSelects();
render();