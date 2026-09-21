# FreshCart — Multi-Vendor Store

FreshCart is a responsive, mobile-first product catalogue and dynamic shopping cart built for a multi-vendor e-commerce experience.

Users can add products from different stores to one cart, update product quantities, view live price calculations, and see cart items grouped by store.

## Live Demo

- **Live Website:** [View FreshCart](YOUR_VERCEL_URL)
- **GitHub Repository:** [View Source Code](https://github.com/Shwetaleena-Kundu/freshcart-multi-vendor-store)

## Features

- Mobile-first interface optimized for 360px–430px viewports
- Product catalogue rendered from the provided mock JSON data
- Support for the same product being sold by different stores
- Add, increase, decrease, and remove cart items
- Cart products grouped by store name
- Individual store totals
- Live total item count and grand total
- Persistent sticky checkout bar
- Cart bottom-sheet interface
- Cart persistence using `localStorage`
- Responsive and accessible controls

## Technologies Used

- React
- JavaScript
- Vite
- Tailwind CSS
- HTML
- localStorage

## Project Structure

```text
src/
├── components/
│   ├── CartView.jsx
│   ├── CheckoutBar.jsx
│   └── ProductCard.jsx
├── data/
│   └── products.js
├── App.jsx
├── index.css
└── main.jsx
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Shwetaleena-Kundu/freshcart-multi-vendor-store.git
```

### 2. Open the project folder

```bash
cd freshcart-multi-vendor-store
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the localhost URL displayed in the terminal.

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Data Source

This project uses the mock product data supplied in the technical assessment. No external API is required.

## Author

**Shwetaleena Kundu**

Frontend Developer