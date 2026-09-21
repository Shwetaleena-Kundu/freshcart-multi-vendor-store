# FreshCart — Multi-Vendor Store

FreshCart is a responsive, mobile-first product catalogue and dynamic shopping cart built for a multi-vendor e-commerce experience.

Users can add products from different stores to one cart, update product quantities, view live price calculations, and see cart items grouped by store.

## Features

- Mobile-first interface optimized for 360px–430px viewports
- Product catalogue rendered from mock JSON data
- Support for the same product being sold by different stores
- Add, increase, decrease, and remove cart items
- Cart products grouped by store name
- Individual store totals
- Live total item count and grand total
- Persistent sticky checkout bar
- Cart bottom-sheet interface
- Cart persistence using localStorage
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