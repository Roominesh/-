# द रसोई ऑन व्हील्स — Campus Night Canteen

Static exhibition prototype for GitHub Pages.

## Pages
- `index.html` — Home
- `menu.html` — Menu, search, categories, item details, Add to bag
- `cart.html` — Bag and quantity controls
- `checkout.html` — Checkout and order placement
- `orders.html` — User-specific recent orders, live preparation countdown, cancel order

## Demo behaviour
- Orders and the bag are stored in the browser using `localStorage`.
- Recent Orders only shows orders created in the same browser/user portal.
- New orders use a 10-minute demo preparation timer.
- Orders can be cancelled until they reach "Ready for pickup".
- No real payments are processed.

## GitHub Pages
Upload all files and the `images/` folder to the repository root. The site is static and needs no build command.
