const MENU = [
  {id:1,name:"Tea",price:10,cat:"Beverages",image:"images/Tea.jpg",desc:"A warm cup of freshly prepared tea."},
  {id:2,name:"Coffee",price:15,cat:"Beverages",image:"images/Coffee.jpg",desc:"Hot, comforting coffee for late-night study sessions."},
  {id:3,name:"Hot Chocolate",price:60,cat:"Beverages",image:"images/Hot Chocolate.jpg",desc:"Warm and creamy hot chocolate."},
  {id:4,name:"Bournvita",price:50,cat:"Beverages",image:"images/Bournvita.jpg",desc:"Classic warm Bournvita."},
  {id:5,name:"Cold Coffee",price:50,cat:"Beverages",image:"images/Cold Coffee.jpg",desc:"Chilled creamy cold coffee."},
  {id:6,name:"Cold Bournvita",price:50,cat:"Beverages",image:"images/Cold Bournvita.jpg",desc:"Refreshing cold Bournvita."},
  {id:7,name:"Lassi",price:30,cat:"Beverages",image:"images/Lassi.jpg",desc:"Cool and refreshing lassi."},
  {id:8,name:"Masala Chass",price:15,cat:"Beverages",image:"images/Masala Chass.jpg",desc:"Light, refreshing spiced buttermilk."},
  {id:9,name:"Plain Maggi",price:50,cat:"Maggi",image:"images/Plain Maggi.jpg",desc:"Classic hot Maggi noodles."},
  {id:10,name:"Masala Maggi",price:60,cat:"Maggi",image:"images/Masala Maggi.jpg",desc:"Maggi tossed with delicious masala."},
  {id:11,name:"Cheese Masala Maggi",price:70,cat:"Maggi",image:"images/Cheese Masala Maggi.jpg",desc:"Masala Maggi topped with melted cheese."},
  {id:12,name:"Egg Masala Cheese Maggi",price:80,cat:"Maggi",image:"images/Egg Masala Cheese Maggi.jpg",desc:"Masala Maggi with egg and cheese."},
  {id:13,name:"Veg Sandwich",price:40,cat:"Sandwiches",image:"images/Veg Sandwich.jpg",desc:"Fresh vegetable sandwich."},
  {id:14,name:"Veg Grill Sandwich",price:50,cat:"Sandwiches",image:"images/Veg Grill Sandwich.jpg",desc:"Grilled vegetable sandwich."},
  {id:15,name:"Veg Cheese Grill Sandwich",price:70,cat:"Sandwiches",image:"images/Veg Cheese Grill Sandwich.jpg",desc:"Grilled sandwich with vegetables and cheese."},
  {id:16,name:"Cheese Grill Sandwich",price:60,cat:"Sandwiches",image:"images/Cheese Grill Sandwich.jpg",desc:"Golden grilled sandwich loaded with cheese."},
  {id:17,name:"Chicken Grill Sandwich",price:80,cat:"Sandwiches",image:"images/Chicken Grill Sandwich.jpg",desc:"Grilled sandwich with chicken filling."},
  {id:18,name:"Chicken Cheese Grill Sandwich",price:100,cat:"Sandwiches",image:"images/Chicken Cheese Grill Sandwich.jpg",desc:"Chicken and cheese in a crispy grilled sandwich."},
  {id:19,name:"Cheese Garlic Bread",price:80,cat:"Breads",image:"images/Cheese Garlic Bread.jpg",desc:"Garlic bread topped with melted cheese."},
  {id:20,name:"Cheese Chilly Toast",price:80,cat:"Breads",image:"images/Cheese Chilly Toast.jpg",desc:"Crispy cheese toast with a spicy chilli kick."},
  {id:21,name:"Margherita Cheese Pizza",price:149,cat:"Pizzas",image:"images/Margherita Cheese Pizza.jpg",desc:"Classic Margherita cheese pizza."},
  {id:22,name:"Veg Cheese Pizza",price:179,cat:"Pizzas",image:"images/Veg Cheese Pizza.jpg",desc:"Loaded vegetable cheese pizza."},
  {id:23,name:"Chicken Cheese Pizza",price:199,cat:"Pizzas",image:"images/Chicken Cheese Pizza.jpg",desc:"Chicken and cheese pizza."},
  {id:24,name:"Plain Omelette",price:50,cat:"Eggs",image:"images/Plain Omelette.jpg",desc:"Freshly prepared plain omelette."},
  {id:25,name:"Masala Omelette",price:50,cat:"Eggs",image:"images/Masala Omelette.jpg",desc:"Omelette prepared with Indian spices."},
  {id:26,name:"Half Fry",price:50,cat:"Eggs",image:"images/Half Fry.jpg",desc:"Simple half-fried eggs."},
  {id:27,name:"Cheese Omelette",price:80,cat:"Eggs",image:"images/Cheese Omelette.jpg",desc:"Omelette filled with melted cheese."},
  {id:28,name:"Egg Bhurji",price:60,cat:"Eggs",image:"images/Egg Bhurji.jpg",desc:"Spiced scrambled egg bhurji."},
  {id:29,name:"Paneer Bhurji",price:80,cat:"Eggs",image:"images/Paneer Bhurji.jpg",desc:"Spiced paneer bhurji."},
  {id:30,name:"French Fries",price:60,cat:"Fries",image:"images/French Fries.jpg",desc:"Crispy golden French fries."},
  {id:31,name:"Peri Peri Fries",price:70,cat:"Fries",image:"images/Peri Peri Fries.jpg",desc:"Crispy fries with peri peri seasoning."}
];

const STORAGE = {
  cart: "rasoi_cart_v3",
  orders: "rasoi_orders_v3",
  user: "rasoi_user_v1"
};

const PREP_MINUTES = 10;
const $ = (id) => document.getElementById(id);
const money = (n) => `₹${n}`;

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getCart() { return readJSON(STORAGE.cart, []); }
function setCart(cart) { saveJSON(STORAGE.cart, cart); }
function getOrders() { return readJSON(STORAGE.orders, []); }
function setOrders(orders) { saveJSON(STORAGE.orders, orders); }
function cartCount(cart = getCart()) { return cart.reduce((sum, item) => sum + item.qty, 0); }
function cartTotal(cart = getCart()) { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
function getUser() { return readJSON(STORAGE.user, null); }
function ensureUser() {
  let user = getUser();
  if (!user || !user.id) {
    user = { id: `user-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`}`, name: "" };
    saveJSON(STORAGE.user, user);
  }
  return user;
}
function setUserName(name) {
  const user = ensureUser();
  user.name = name;
  saveJSON(STORAGE.user, user);
  return user;
}
function userOrders() {
  const user = getUser();
  if (!user?.id) return [];
  return getOrders().filter(order => order.userId === user.id);
}
function pageName() {
  const file = location.pathname.split("/").pop() || "index.html";
  return file.replace(".html", "") || "index";
}
function escapeHTML(text = "") {
  return String(text).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));
}

function navMarkup(active) {
  return `<header class="topbar">
    <a class="brand" href="index.html" aria-label="द रसोई ऑन व्हील्स home">
      <img class="brand-elephant brand-elephant-left" src="images/Elephant Left.png" alt="">
      <span class="brand-copy"><strong>द रसोई ऑन व्हील्स</strong><small>What We Eat, We Serve!</small></span>
      <img class="brand-elephant brand-elephant-right" src="images/Elephant right.png" alt="">
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a data-page="index" href="index.html">Home</a>
      <a data-page="menu" href="menu.html">Menu</a>
      <a data-page="orders" href="orders.html">Recent Orders</a>
    </nav>
    <div class="top-actions">
      <span class="open-pill"><i></i> Open tonight</span>
      <a class="cart-button" href="cart.html" aria-label="Open bag"><span>Bag</span><b id="cartCount">0</b></a>
    </div>
  </header>`;
}
function mountHeader() {
  const target = $("siteHeader");
  if (target) target.innerHTML = navMarkup(pageName());
  updateHeader();
}
function updateHeader() {
  const count = $("cartCount");
  const nextCount = cartCount(getCart());
  if (count) {
    count.textContent = nextCount;
    if (window.__lastCartCount !== undefined && window.__lastCartCount !== nextCount) {
      count.classList.remove("badge-pop");
      void count.offsetWidth;
      count.classList.add("badge-pop");
    }
  }
  window.__lastCartCount = nextCount;
  document.querySelectorAll("[data-page]").forEach(link => link.classList.toggle("active", link.dataset.page === pageName()));
}

function showToast(title, detail = "", linkText = "View bag", linkHref = "cart.html") {
  const el = $("toast");
  if (!el) return;
  el.innerHTML = `<span class="toast-icon">✓</span><span class="toast-copy"><b>${escapeHTML(title)}</b>${detail ? `<small>${escapeHTML(detail)}</small>` : ""}</span>${linkText ? `<a href="${linkHref}" class="toast-link">${escapeHTML(linkText)}</a>` : ""}`;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 3600);
}

function renderCategories(active = "All") {
  const el = $("categories");
  if (!el) return;
  const cats = ["All", ...new Set(MENU.map(item => item.cat))];
  el.innerHTML = cats.map(c => `<button class="category ${active === c ? "active" : ""}" data-cat="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");
}
function filteredMenu(state) {
  const search = (state.search || "").trim().toLowerCase();
  return MENU.filter(item => (state.category === "All" || item.cat === state.category) && (!search || `${item.name} ${item.cat}`.toLowerCase().includes(search)));
}
function renderFeatured() {
  const el = $("featuredStrip");
  if (!el) return;
  const picks = ["Masala Maggi", "Chicken Cheese Pizza", "Peri Peri Fries"].map(name => MENU.find(x => x.name === name));
  el.innerHTML = picks.map(item => `<a class="feature-card" href="menu.html?item=${item.id}">
    <img src="${item.image}" alt="${escapeHTML(item.name)}">
    <span><b>${escapeHTML(item.name)}</b><small>${money(item.price)} · Popular tonight</small></span>
  </a>`).join("");
}
function foodCard(item) {
  return `<article class="food-card">
    <button class="food-visual" data-item="${item.id}" aria-label="View ${escapeHTML(item.name)}">
      <img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy">
      <span class="food-tag">${escapeHTML(item.cat)}</span>
      <span class="food-hover">View item</span>
    </button>
    <div class="food-info">
      <h3>${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(item.desc)}</p>
      <div class="food-bottom"><span class="price">${money(item.price)}</span><button class="add-small" data-add="${item.id}">Add +</button></div>
    </div>
  </article>`;
}
function renderMenuPage() {
  const params = new URLSearchParams(location.search);
  const state = { category: params.get("cat") || "All", search: params.get("q") || "" };
  const searchInput = $("searchInput");
  if (searchInput) searchInput.value = state.search;

  const paint = () => {
    const items = filteredMenu(state);
    renderCategories(state.category);
    $("resultTitle").textContent = state.category === "All" ? "All items" : state.category;
    $("resultCount").textContent = ` · ${items.length} ${items.length === 1 ? "item" : "items"}`;
    const grid = $("foodGrid");
    grid.classList.remove("is-filtering");
    void grid.offsetWidth;
    grid.innerHTML = items.length ? items.map(foodCard).join("") : `<div class="empty-state wide"><div class="empty-icon">Search</div><h3>No dishes found</h3><p>Try another search or clear your filters.</p><button class="btn btn-secondary" id="clearMenuFilters">Clear filters</button></div>`;
    grid.classList.add("is-filtering");
  };
  if (searchInput) searchInput.addEventListener("input", e => { state.search = e.target.value; paint(); });
  document.addEventListener("click", e => {
    const cat = e.target.closest("[data-cat]");
    if (cat) { state.category = cat.dataset.cat; paint(); return; }
    if (e.target.closest("#clearMenuFilters")) { state.category = "All"; state.search = ""; if (searchInput) searchInput.value = ""; paint(); return; }
    const add = e.target.closest("[data-add]");
    if (add) addItem(Number(add.dataset.add), 1, add);
    const item = e.target.closest("[data-item]");
    if (item) openItemModal(Number(item.dataset.item));
  });
  const clear = $("clearFilters");
  if (clear) clear.addEventListener("click", () => { state.category = "All"; state.search = ""; if (searchInput) searchInput.value = ""; paint(); });
  const popular = $("popularPicksBtn");
  if (popular) popular.addEventListener("click", () => { state.category = "Maggi"; state.search = ""; if (searchInput) searchInput.value = ""; paint(); window.scrollTo({top:0,behavior:"smooth"}); });
  paint();
  const itemParam = params.get("item");
  if (itemParam) setTimeout(() => openItemModal(Number(itemParam)), 100);
}

function addItem(id, qty = 1, sourceButton = null) {
  const item = MENU.find(x => x.id === id);
  if (!item) return;
  const cart = getCart();
  const found = cart.find(x => x.id === id);
  if (found) found.qty += qty; else cart.push({...item, qty});
  setCart(cart);
  updateHeader();
  if (sourceButton) {
    sourceButton.dataset.defaultLabel = sourceButton.dataset.defaultLabel || sourceButton.innerHTML;
    sourceButton.innerHTML = "Added";
    sourceButton.classList.add("added");
    clearTimeout(sourceButton.__addedTimer);
    sourceButton.__addedTimer = setTimeout(() => {
      sourceButton.innerHTML = sourceButton.dataset.defaultLabel;
      sourceButton.classList.remove("added");
    }, 900);
  }
  showToast("Added to bag", `${item.name}${qty > 1 ? ` × ${qty}` : ""} is ready for checkout.`);
}
function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  setCart(item.qty > 0 ? cart : cart.filter(x => x.id !== id));
  updateHeader();
  renderCartPage();
  renderCheckoutPage();
}
function removeItem(id) {
  setCart(getCart().filter(x => x.id !== id));
  updateHeader();
  renderCartPage();
  renderCheckoutPage();
  showToast("Item removed", "Your bag has been updated.", "Go to menu", "menu.html");
}

function openItemModal(id) {
  const item = MENU.find(x => x.id === id);
  if (!item || !$("itemModal")) return;
  $("modalVisual").innerHTML = `<img src="${item.image}" alt="${escapeHTML(item.name)}">`;
  $("modalCategory").textContent = item.cat;
  $("modalName").textContent = item.name;
  $("modalDescription").textContent = item.desc;
  $("modalPrice").textContent = money(item.price);
  $("modalQty").textContent = "1";
  $("itemModal").dataset.itemId = id;
  $("itemModal").classList.add("show");
}
function closeModals() { document.querySelectorAll(".modal").forEach(m => m.classList.remove("show")); }

function renderCartPage() {
  const el = $("cartPageItems");
  if (!el) return;
  const cart = getCart();
  const count = cartCount(cart);
  $("cartPageCount").textContent = `${count} ${count === 1 ? "item" : "items"}`;
  $("cartPageTotal").textContent = money(cartTotal(cart));
  el.innerHTML = cart.length ? cart.map(item => `<div class="cart-page-line">
      <div class="cart-thumb"><img src="${item.image}" alt="${escapeHTML(item.name)}"></div>
      <div><h3>${escapeHTML(item.name)}</h3><p>${money(item.price)} each</p><div class="line-actions"><button data-dec="${item.id}" aria-label="Decrease quantity">−</button><b>${item.qty}</b><button data-inc="${item.id}" aria-label="Increase quantity">+</button><button class="remove-btn" data-remove="${item.id}">Remove</button></div></div>
      <strong>${money(item.price * item.qty)}</strong>
    </div>`).join("") : `<div class="empty-state"><div class="empty-icon">Bag</div><h3>Your bag is empty</h3><p>Add something from the menu to start your order.</p><a class="btn btn-primary" href="menu.html">Browse menu</a></div>`;
  const proceed = $("proceedCheckout");
  if (proceed) proceed.disabled = cart.length === 0;
}

function renderCheckoutPage() {
  const summary = $("checkoutSummary");
  if (!summary) return;
  const cart = getCart();
  const total = cartTotal(cart);
  $("checkoutTotal").textContent = money(total);
  summary.innerHTML = cart.length ? cart.map(item => `<div class="summary-row"><span>${escapeHTML(item.name)} × ${item.qty}</span><b>${money(item.price * item.qty)}</b></div>`).join("") + `<div class="summary-row summary-total"><span>Total</span><b>${money(total)}</b></div>` : `<div class="empty-state compact"><h3>Your bag is empty</h3><p>Go back to the menu to add items.</p><a href="menu.html" class="btn btn-secondary">Back to menu</a></div>`;
  const form = $("checkoutForm");
  if (form) $("placeOrderBtn").disabled = cart.length === 0;
  const user = getUser();
  if (user?.name && $("customerName") && !$("customerName").value) $("customerName").value = user.name;
}

function createOrder(name, pickup, payment) {
  const cart = getCart();
  const user = setUserName(name);
  const id = `RW${Math.floor(1000 + Math.random() * 9000)}`;
  const createdAt = Date.now();
  const order = {
    id,
    userId: user.id,
    customerName: name,
    pickup,
    payment,
    items: cart.map(({id,name,price,qty,image}) => ({id,name,price,qty,image})),
    total: cartTotal(cart),
    createdAt,
    etaMinutes: PREP_MINUTES,
    status: "received"
  };
  setOrders([order, ...getOrders().filter(x => x.id !== order.id)].slice(0, 20));
  setCart([]);
  updateHeader();
  return order;
}

function getProgress(order) {
  if (order.status === "cancelled") return {elapsed:0,duration:order.etaMinutes * 60000,progress:0,stage:"cancelled",remainingMs:0};
  const elapsed = Math.max(0, Date.now() - order.createdAt);
  const duration = order.etaMinutes * 60 * 1000;
  if (["ready","completed"].includes(order.status)) return {elapsed,duration,progress:100,stage:"ready",remainingMs:0};
  const progress = Math.min(100, (elapsed / duration) * 100);
  let stage = "received";
  if (progress >= 100) stage = "ready";
  else if (progress >= 72) stage = "ready-soon";
  else if (progress >= 18) stage = "preparing";
  const remainingMs = Math.max(0, duration - elapsed);
  return {elapsed,duration,progress,stage,remainingMs};
}
function formatRemaining(ms) {
  const sec = Math.max(0, Math.ceil(ms / 1000));
  const min = Math.floor(sec / 60).toString().padStart(2,"0");
  const s = (sec % 60).toString().padStart(2,"0");
  return `${min}:${s}`;
}
function stageLabel(stage) {
  return ({received:"Order received", preparing:"Preparing your food", "ready-soon":"Almost ready", ready:"Ready for pickup", cancelled:"Order cancelled"})[stage];
}
function renderTracker(order, target) {
  if (!target) return getProgress(order);
  const p = getProgress(order);
  if (p.stage === "cancelled") {
    target.innerHTML = `<div class="cancelled-state"><span class="status-mark">×</span><div><span class="section-kicker">ORDER CANCELLED</span><h3>This order was cancelled</h3><p>No further preparation will take place.</p></div></div>`;
    return p;
  }
  const statuses = [
    {title:"Order received", desc:"We have your order."},
    {title:"Preparing", desc:"The kitchen is making it fresh."},
    {title:"Finishing up", desc:"Packaging and final checks."},
    {title:"Ready for pickup", desc:"Collect it at the selected pickup point."}
  ];
  const rank = {received:0,preparing:1,"ready-soon":2,ready:3};
  const currentRank = rank[p.stage];
  const eta = p.stage === "ready" ? `<b>Ready now</b><span>available for pickup</span>` : `<b>${formatRemaining(p.remainingMs)}</b><span>estimated remaining</span>`;
  target.innerHTML = `<div class="tracker-head"><div><span class="section-kicker">LIVE ORDER TRACKER</span><h3>${stageLabel(p.stage)}</h3></div><div class="eta-badge">${eta}</div></div>
    <div class="progress-wrap"><div class="progress-bar"><span style="width:${p.progress}%"></span></div><div class="progress-caption"><span>Placed</span><span>${p.stage === "ready" ? "Ready" : `~${order.etaMinutes} min total`}</span></div></div>
    <div class="tracking">${statuses.map((s,index) => `<div class="track ${currentRank >= index ? "done" : ""} ${currentRank === index ? "current" : ""}"><span>${index + 1}</span><div><b>${s.title}</b><small>${s.desc}</small></div></div>`).join("")}</div>`;
  return p;
}

function renderOrdersPage() {
  const list = $("ordersList");
  if (!list) return;
  const orders = userOrders().sort((a,b) => b.createdAt - a.createdAt);
  const user = getUser();
  if (!orders.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">Orders</div><h3>No recent orders yet</h3><p>${user?.name ? `Hi ${escapeHTML(user.name)}, your orders will appear here after you place one.` : "Place your first order and you will see its preparation tracker here."}</p><a class="btn btn-primary" href="menu.html">Browse menu</a></div>`;
    return;
  }
  list.innerHTML = orders.map(order => {
    const totalItems = order.items.reduce((sum,item) => sum + item.qty, 0);
    const preview = order.items.slice(0,2).map(i => i.name).join(", ");
    const progress = getProgress(order);
    const canCancel = !["ready","cancelled"].includes(progress.stage);
    return `<article class="order-card ${progress.stage === "cancelled" ? "cancelled-order" : progress.stage !== "ready" ? "active-order" : "complete-order"}">
      <div class="order-top"><div><span class="section-kicker">ORDER #${escapeHTML(order.id)}</span><h3>${escapeHTML(preview)}${order.items.length > 2 ? ` + ${order.items.length - 2} more` : ""}</h3><p>${new Date(order.createdAt).toLocaleString([], {day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})} · ${totalItems} ${totalItems === 1 ? "item" : "items"}</p></div><strong>${money(order.total)}</strong></div>
      <div class="order-meta"><span><b>Pickup</b>${escapeHTML(order.pickup)}</span><span><b>Payment</b>${escapeHTML(order.payment)}</span></div>
      <div class="tracker-box" id="tracker-${escapeHTML(order.id)}"></div>
      <div class="order-actions">${progress.stage === "ready" ? `<span class="ready-note">Ready to collect</span>` : progress.stage === "cancelled" ? `<span class="cancelled-note">Cancelled</span>` : `<span class="eta-note">Keep this page open to watch the countdown.</span>`}<div class="order-buttons"><a class="btn btn-secondary" href="menu.html">Order again</a>${canCancel ? `<button class="text-button cancel-order-btn" data-cancel="${escapeHTML(order.id)}">Cancel order</button>` : ""}</div></div>
    </article>`;
  }).join("");
  orders.forEach(order => renderTracker(order, $(`tracker-${order.id}`)));
}
function tickOrders() {
  if (!$("ordersList")) return;
  renderOrdersPage();
  clearTimeout(window.__orderTick);
  window.__orderTick = setTimeout(tickOrders, 1000);
}

function openCancelModal(id) {
  const order = userOrders().find(x => x.id === id);
  if (!order || !$("cancelModal")) return;
  $("cancelOrderId").textContent = `#${order.id}`;
  $("cancelModal").dataset.orderId = order.id;
  $("cancelModal").classList.add("show");
}
function cancelOrder(id) {
  const user = getUser();
  const orders = getOrders();
  const order = orders.find(x => x.id === id && x.userId === user?.id);
  if (!order) return;
  const progress = getProgress(order);
  if (["ready","completed","cancelled"].includes(progress.stage) || ["ready","completed","cancelled"].includes(order.status)) return;
  order.status = "cancelled";
  order.cancelledAt = Date.now();
  setOrders(orders);
  closeModals();
  renderOrdersPage();
  showToast("Order cancelled", `Order #${order.id} has been cancelled.`, "Browse menu", "menu.html");
}

function wireGlobal() {
  document.addEventListener("click", e => {
    if (e.target.closest("[data-close-modal]")) closeModals();
    const inc = e.target.closest("[data-inc]"); if (inc) changeQty(Number(inc.dataset.inc), 1);
    const dec = e.target.closest("[data-dec]"); if (dec) changeQty(Number(dec.dataset.dec), -1);
    const rem = e.target.closest("[data-remove]"); if (rem) removeItem(Number(rem.dataset.remove));
    const cancel = e.target.closest("[data-cancel]"); if (cancel) openCancelModal(cancel.dataset.cancel);
    const confirmCancel = e.target.closest("#confirmCancel");
    if (confirmCancel) cancelOrder($("cancelModal")?.dataset.orderId);
  });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      const search = $("searchInput");
      if (search) { e.preventDefault(); search.focus(); }
    }
    if (e.key === "Escape") closeModals();
  });
  const modalMinus = $("qtyMinus");
  const modalPlus = $("qtyPlus");
  if (modalMinus) modalMinus.addEventListener("click", () => { const el = $("modalQty"); el.textContent = Math.max(1, Number(el.textContent) - 1); });
  if (modalPlus) modalPlus.addEventListener("click", () => { const el = $("modalQty"); el.textContent = Number(el.textContent) + 1; });
  const modalAdd = $("modalAdd");
  if (modalAdd) modalAdd.addEventListener("click", () => {
    const qty = Number($("modalQty").textContent);
    addItem(Number($("itemModal").dataset.itemId), qty, modalAdd);
    setTimeout(closeModals, 650);
  });
  const updateHeaderState = () => document.querySelector(".topbar")?.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", updateHeaderState, {passive:true});
  updateHeaderState();
}
function wireCheckout() {
  const form = $("checkoutForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("customerName").value.trim();
    if (!name) { $("customerName").focus(); return; }
    const order = createOrder(name, $("pickupPoint").value, $("paymentMethod").value);
    location.href = `orders.html?new=${order.id}`;
  });
}
function wireCartPage() {
  const btn = $("proceedCheckout");
  if (btn) btn.addEventListener("click", () => { if (getCart().length) location.href = "checkout.html"; });
}
function showToastFromQuery() {
  const params = new URLSearchParams(location.search);
  if (params.get("new")) setTimeout(() => showToast("Order confirmed", `Order #${params.get("new")} is now being prepared.`, "View tracker", "orders.html"), 300);
}

mountHeader();
wireGlobal();
if (pageName() === "menu") { renderFeatured(); renderMenuPage(); }
if (pageName() === "cart") { renderCartPage(); wireCartPage(); }
if (pageName() === "checkout") { renderCheckoutPage(); wireCheckout(); }
if (pageName() === "orders") { renderOrdersPage(); showToastFromQuery(); tickOrders(); }
if (pageName() === "index") {
  renderFeatured();
  const explore = $("exploreBtn"); if (explore) explore.addEventListener("click", () => location.href = "menu.html");
  const popular = $("popularBtn"); if (popular) popular.addEventListener("click", () => location.href = "menu.html?cat=Maggi");
}
updateHeader();
