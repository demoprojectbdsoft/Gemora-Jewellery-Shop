<div align="center">

# ⚡ Electro

### *Your one-stop electronics store — browse, compare, buy, track.*

**A full-stack electronics e-commerce platform with role-based dashboards.**

[![Frontend Repo](https://img.shields.io/badge/Frontend-Repository-2ea44f?style=for-the-badge)](https://github.com/nihalxofficial/Electro-Electronic-store)
[![Server Repo](https://img.shields.io/badge/Server-Repository-blue?style=for-the-badge)](https://github.com/nihalxofficial/Electro-Server)
[![Internship Project](https://img.shields.io/badge/Type-Internship%20Project-orange?style=for-the-badge)]()

</div>

---

## 📑 Table of Contents

- [About](#-about)
- [Project Overview](#-project-overview)
  - [Objective](#objective)
  - [Target Audience](#target-audience)
  - [Platforms Used](#platforms-used)
- [Key Features](#-key-features)
- [Tech Stack / npm Packages](#-npm-packages-used)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Future Roadmap](#-future-roadmap)
- [About This Project](#-about-this-project)

---

## 📖 About

Electro is a complete electronics e-commerce storefront built as a hands-on internship project — the goal was to go past a simple product-listing clone and actually build out the pieces a real electronics shop needs: dynamic, database-driven categories instead of hardcoded menus, a real cart/wishlist system, a working checkout flow with multiple payment options, order tracking, product reviews that actually affect ratings, a loyalty points system, and two fully separate dashboards for customers and admins.

Nothing in the catalog, categories, or homepage content is hardcoded — every category, subcategory, product, and homepage slide is managed from the admin dashboard and served from MongoDB, so the same codebase could be re-skinned for a completely different product niche just by changing the data.

**What makes it different from a typical storefront clone:**
- **Fully dynamic category tree** — categories and subcategories (with their own images, descriptions, and active/inactive state) are created from the admin dashboard, not hardcoded in the navbar. The mega-menu, mobile menu, and shop filters all read from the same live data.
- **Dynamic homepage hero slider** — the deal-countdown hero banner on the homepage is not static marketing copy; each slide links to a real product with a live countdown, pulled from the database.
- **Real checkout pipeline, not a mock "Place Order" button** — Cash on Delivery and mobile wallet (bKash / Rocket / Nagad) checkout with OTP verification, server-computed shipping fees, stock validation, and a full order → transaction → status-history chain created together, atomically, on the backend.
- **Self-correcting ratings** — product rating and review count are never trusted as stored values; they're recalculated from the actual review documents every time a review is added, edited, or removed.
- **Loyalty points & membership tiers** — every completed order earns the customer loyalty points, tracked against a membership tier (e.g. Silver), server-side.
- **Two real dashboards, not one generic "account page"** — Customers get orders, transactions, wishlist, reviews, analytics (with CSV export), profile and settings; Admins get full catalog management, order/transaction oversight, user role & status management, review moderation, and their own analytics.
- **Shared JWT auth between two separate codebases** — the Next.js frontend owns authentication (better-auth, email/password + Google login) and exposes a JWKS endpoint; the independent Express backend verifies every request against that same JWKS, with no shared secret and no duplicated user store.

---

## 🎯 Project Overview

### Objective
To design and build a realistic, end-to-end electronics e-commerce platform — from a fully dynamic public storefront, through authenticated cart/checkout/order flows, to complete customer and admin dashboards — while practicing production-level concerns: a database-driven content model (nothing hardcoded), layered backend architecture, stateless cross-service authentication, and server-side-trusted business logic (prices, stock, shipping fees, and loyalty points are always computed on the server, never trusted from the client).

### Target Audience
- **Shoppers** browsing and buying electronics online — TVs, gaming gear, audio, accessories, and more.
- **Store Admins** who need to manage the catalog (categories, subcategories, products, homepage slider), process orders, and oversee users and reviews.
- **Developers/Recruiters** reviewing this project as a demonstration of full-stack, role-based, multi-service application development with a decoupled Next.js client and Express API.

### Platforms Used
- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, HeroUI v3
- **Backend:** Node.js + Express.js + TypeScript (see [server repository](https://github.com/nihalxofficial/Electro-Server))
- **Database:** MongoDB Atlas (Mongoose on the backend; a separate `user` collection owned by better-auth)
- **Auth:** better-auth (JWT via a JWKS endpoint) with email/password and Google Social Login
- **Hosting:** Vercel (frontend) and Vercel Serverless Functions (backend API)
- **Image Hosting:** ImgBB (used for category, product, and profile image uploads)

---

## ✨ Key Features

> Only the features that set Electro apart are listed in depth here — standard auth/CRUD basics are covered under Tech Stack.

### Storefront (Public)
- **Dynamic homepage** — hero slider with live countdown deals, Popular Products, Trending Products, Warehouse Deals, New Arrivals, promo banners, brand marquee, and a newsletter signup — all backed by real product/category data.
- **Database-driven category mega-menu** — desktop dropdown and mobile menu both render from the same live category/subcategory data, with per-category background images.
- **Shop page** — full product grid with search, category/price filters, sorting, and pagination handled against the backend, plus a dedicated product details page per product slug.
- **Store Locator** — a dedicated page for finding physical store locations.
- **Dark / Light theme** — toggle via `next-themes`, consistent across the whole site.

### Shopping & Checkout
- **Cart & Wishlist** — persisted per user in the database (one record per user+product, quantity updated in place — not reconstructed from a local array), so a signed-in user's cart survives across devices.
- **Product reviews & ratings** — star rating + written review per product; a product's average rating and review count are recalculated from real review documents on every create/update/delete, never stored as stale numbers.
- **Guarded review eligibility** — reviews are gated by real rules, not an open comment box: only signed-in users can review; admins and the product's own owner are blocked from reviewing it; a review can only be left after the reviewer has actually purchased the product and that order has been delivered; and each user can leave only one review per product.
- **Full checkout flow** — Cash on Delivery or mobile wallet (bKash / Rocket / Nagad) with a simulated OTP verification step; shipping fee and totals are computed server-side (free shipping above a set order threshold), never trusted from the client.
- **Order creation pipeline** — placing an order atomically: validates product stock, computes subtotal/shipping/total, creates the order, creates a linked transaction record, logs the initial order-status entry, decrements product stock, clears the user's cart, and credits loyalty points to the user — all on the backend in one flow.
- **Order tracking** — a Track Order page plus a full order-status history log per order (confirmed → processing → shipped → delivered / cancelled).
- **Loyalty points & membership** — every order earns points based on amount spent, tied to the user's membership tier.

### Customer Dashboard
- Overview, Orders (with status), Transactions, Wishlist, My Reviews (click-through to the product), Analytics (with CSV export), Profile, and Settings — each a dedicated page with search/filter/sort/pagination where it has a table.

### Admin Dashboard
- **Catalog management** — create/edit categories, subcategories, and products (with multi-image upload, badges, specifications, stock).
- **Homepage control** — manage the dynamic hero slider shown on the homepage.
- **Order & transaction oversight** — platform-wide orders and transactions tables with status updates.
- **User management** — view all users with the ability to change role and account status.
- **Review moderation** — view and manage all product reviews across the platform.
- **Admin analytics** — overview dashboard with CSV export for reporting.

---

## 📦 npm Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework — App Router, SSR, Server Actions |
| `react` / `react-dom` | Core UI library |
| `@heroui/react` / `@heroui/styles` | Primary component library (HeroUI v3) — Select, Modal, Switch, Tabs, etc. |
| `tailwindcss` | Utility-first CSS framework |
| `better-auth` / `@better-auth/mongo-adapter` | Authentication — email/password, Google OAuth, JWT/JWKS plugin |
| `mongodb` | MongoDB driver (used directly by the better-auth adapter) |
| `next-themes` | Dark / Light theme switching |
| `lucide-react` / `react-icons` | Icon sets |
| `react-fast-marquee` | Brand logo marquee on the homepage |
| `react-toastify` | Toast notifications |
| `recharts` | Charts for customer/admin analytics dashboards |

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API base URL — used in both server and client contexts
NEXT_PUBLIC_API_URL=your_backend_api_base_url

# better-auth
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=your_app_url

# Shared with the backend — the backend verifies JWTs against this origin's JWKS endpoint
NEXT_PUBLIC_CLIENT_URL=your_app_url

# MongoDB (used by the better-auth adapter for the user collection)
MONGODB_URI=your_mongodb_atlas_connection_string
DATABASE=your_database_name

# Google Social Login
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Never commit `.env.local` to version control.
>
> ⚠️ `NEXT_PUBLIC_*` variables are baked into the JavaScript bundle at **build time** — rebuild after changing one.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nihalxofficial/Electro-Electronic-store.git
cd Electro-Electronic-store

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Make sure the [Electro-Server](https://github.com/nihalxofficial/Electro-Server) backend is running and `NEXT_PUBLIC_API_URL` points to it — most pages (categories, products, cart, orders, dashboards) depend on it.

---

## 🗺️ Future Roadmap

Planned/possible enhancements beyond the current scope:

- [ ] **Live delivery tracking** — a rider/courier role with real-time GPS tracking on the order map, not just a status label.
- [ ] **"Lucky Box" gamification** — a points-based mystery-box reward system customers can open using earned loyalty points.
- [ ] **Real-time settings sync** — admin settings (currently a placeholder page) wired to live, instantly-applied store configuration.
- [ ] **Live chat support** — in-app chat between customers and store support/admins.
- [ ] **Coupons & promo codes** — percentage/flat discount codes applied at checkout.
- [ ] **Real payment gateway integration** — actual Stripe/SSLCommerz/bKash API integration in place of the current simulated OTP flow.
- [ ] **Push / email notifications** — order status changes and promotional alerts.
- [ ] **Product comparison** — side-by-side spec comparison between products.

---

## 🎓 About This Project

This is an **internship project** built for learning and demonstration purposes — it is not distributed under an open-source license. Feel free to explore the code, but please reach out before reusing or redistributing it.
