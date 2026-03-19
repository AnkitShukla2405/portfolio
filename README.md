<div align="center">

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/GraphQL-Yoga-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
<img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
<img src="https://img.shields.io/badge/AWS-S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />

# 🛍️ Zynora — Full-Stack Multi-Vendor Marketplace

> A production-grade, full-stack e-commerce marketplace built with **Next.js 15**, **GraphQL**, **MongoDB**, and **TypeScript** — handling everything from secure OTP authentication to real-time stock reservation, dual payment gateways, and a complete vendor portal.

</div>

---

## 📌 Table of Contents

- [Why Zynora?](#-why-zynora)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Core Features](#-core-features)
  - [Authentication & Security](#-1-authentication--security)
  - [Product Catalog & Search](#-2-product-catalog--search)
  - [Shopping Cart & Checkout](#-3-shopping-cart--checkout)
  - [Payment Processing](#-4-payment-processing)
  - [Seller / Vendor Portal](#-5-seller--vendor-portal)
  - [File Uploads & Media](#-6-file-uploads--media)
  - [Caching & Performance](#-7-caching--performance)
- [Database Design](#-database-design)
- [GraphQL API Design](#-graphql-api-design)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)

---

## 🚀 Why Zynora?

Zynora is not a tutorial project. It is a **production-ready marketplace** that solves real-world engineering challenges:

| Challenge | How Zynora Solves It |
|---|---|
| Secure sessions without passwords | OTP-based login with rotating JWT tokens in `httpOnly` cookies |
| Race conditions on inventory | Atomic stock reservation service during checkout |
| Session persistence across tabs | Apollo Client `ErrorLink` intercepts 401s and silently refreshes tokens |
| Multi-vendor onboarding | Lifecycle-managed seller and product registration approval flows |
| Scalable media storage | AWS S3 pre-signed URLs for direct client-side uploads |
| Fraud prevention | FingerprintJS device tracking on every session |
| Fast product search | MongoDB full-text indexes on name, brand, category, and specs |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) + React 19 |
| **Language** | TypeScript (strict mode) |
| **API** | GraphQL Yoga (single `/api/graphql` endpoint) |
| **ORM / Database** | Mongoose + MongoDB |
| **Client State** | Apollo Client (GraphQL cache) |
| **Forms** | React Hook Form + Zod validation |
| **Styling** | Tailwind CSS v4 + Framer Motion + Radix UI |
| **Auth** | Custom JWT (Argon2 hashing) + OTP via Nodemailer |
| **Payments** | Stripe + Razorpay (dual gateway) |
| **Storage** | AWS S3 + Cloudinary |
| **Caching** | Redis |
| **Security** | FingerprintJS, `httpOnly` cookies, `sameSite: strict` |

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["🌐 Client (Browser)"]
        A[Next.js App Router Pages] --> B[Apollo Client]
        A --> C[React Hook Form + Zod]
    end

    subgraph API ["⚙️ API Layer (Next.js Server)"]
        B -->|Single Endpoint| D[GraphQL Yoga /api/graphql]
        D --> E[Context Builder\nJWT Verify → User Attach]
        E --> F[Modular Resolvers]
    end

    subgraph Services ["🔧 Services"]
        F --> G[OTP Service]
        F --> H[Stock Reservation Service]
        F --> I[Payment Service\nStripe & Razorpay]
        F --> J[File Upload Service\nS3 Pre-signed URLs]
    end

    subgraph Data ["🗄️ Data Layer"]
        H --> K[(MongoDB)]
        G --> L[(Redis Cache)]
        F --> K
    end

    subgraph External ["🔗 External Services"]
        I --> M[Stripe]
        I --> N[Razorpay]
        J --> O[AWS S3]
        G --> P[Nodemailer]
    end
```

---

## ✨ Core Features

### 🔐 1. Authentication & Security

Zynora uses a **passwordless, OTP-based authentication system** with enterprise-grade session management.

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as GraphQL API
    participant DB as MongoDB
    participant R as Redis
    participant E as Email/SMS

    U->>FE: Enter email or phone
    FE->>API: requestOTP mutation
    API->>R: Store OTP (TTL: 5 min)
    API->>E: Send OTP via Nodemailer
    U->>FE: Submit OTP
    FE->>API: verifyOTP mutation
    API->>R: Validate OTP
    API->>DB: Create/Update User
    API->>FE: Set httpOnly Cookies\n(accessToken 15m + refreshToken 30d)
    FE->>U: Logged In ✅
```

**Security Layers:**

- 🔑 **JWT Token Rotation** — Every session refresh invalidates the old refresh token and issues a new pair, preventing token reuse attacks.
- 🛡️ **Argon2 Hashing** — Industry-standard memory-hard hashing for all tokens stored in the database.
- 🍪 **httpOnly + SameSite Strict Cookies** — Tokens are invisible to JavaScript, preventing XSS attacks entirely.
- 📱 **FingerprintJS** — Device fingerprinting on every session to detect anomalous logins.
- 🚫 **Global Logout** — A `tokenVersion` field on the User model instantly invalidates **all** active sessions across all devices.
- 🔄 **Silent Token Refresh** — Apollo Client's `ErrorLink` intercepts `UNAUTHENTICATED` errors and automatically calls `/api/auth/refresh` before retrying the original query — seamlessly, without any user interruption.

---

### 🔍 2. Product Catalog & Search

```mermaid
flowchart LR
    A[User Types in Search Bar] --> B[GraphQL Search Query]
    B --> C{MongoDB\nFull-Text Index}
    C --> D[name, brand,\ncategory, specs]
    D --> E[Scored Results]
    E --> F[Apply Filters\nPrice · Brand · Stock · Rating]
    F --> G[Paginated Product Cards]
    G --> H[Search Suggestions\nAutocomplete]
```

- **Full-Text Search** on `name`, `brand`, `category`, and nested `specifications.value` using MongoDB text indexes.
- **Smart Filtering** — Users can filter by price range, brand, stock availability, ratings, and category simultaneously.
- **Autocomplete Suggestions** — A dedicated `search suggestions` resolver returns fast partial matches.
- **Product Variants** — Each product supports multiple `(color, size)` combinations, each with its own SKU, stock count, price, and image gallery.
- **Dynamic Pricing** — Pre-save Mongoose hooks auto-calculate `discountPercentage` and enforce that selling price is always ≤ MRP.
- **Home Page Aggregations** — A dedicated `home` resolver aggregates curated sections: Trending, Fashion, Electronics, and more — all in a single GraphQL query.

---

### 🛒 3. Shopping Cart & Checkout

```mermaid
stateDiagram-v2
    [*] --> BrowsingProducts
    BrowsingProducts --> CartUpdated : Add to Cart
    CartUpdated --> StockReserved : Begin Checkout
    StockReserved --> PaymentInitiated : Confirm Order
    PaymentInitiated --> OrderConfirmed : Payment Success
    PaymentInitiated --> StockReleased : Payment Failure / Timeout
    OrderConfirmed --> [*]
    StockReleased --> BrowsingProducts
```

- **Guest & Authenticated Carts** — Cart persists for both guests (via `guestId` cookie) and logged-in users, and merges upon login.
- **Stock Reservation** — Before any payment is initiated, the `StockReservationService` atomically locks the requested quantities in MongoDB, preventing overselling even under high concurrency.
- **Automatic Release** — If payment fails or times out, the reservation is automatically released, restoring stock availability.
- **Quantity Management** — The cart resolver handles increment, decrement, and removal with real-time stock validation.

---

### 💳 4. Payment Processing

Zynora supports **two payment gateways** — Stripe and Razorpay — giving users payment flexibility across geographies.

```mermaid
flowchart TD
    A[User Selects Payment] --> B{Gateway Choice}
    B -->|International| C[Stripe Payment Intent]
    B -->|India| D[Razorpay Order]
    C --> E[Client-Side Confirmation\nStripe.js]
    D --> F[Client-Side Confirmation\nRazorpay Checkout]
    E --> G[Stripe Webhook]
    F --> H[Razorpay Webhook]
    G --> I[Verify Signature]
    H --> I
    I --> J[Update Order Status]
    J --> K[Clear Cart]
    J --> L[Reduce Stock\nin MongoDB]
    J --> M[Send Confirmation Email]
```

- **Webhook-Driven** — Order fulfillment (stock deduction, cart clearing, email confirmation) happens **only after webhook verification**, never on client-side confirmation alone — preventing fraud.
- **Idempotent Handlers** — Webhook handlers are idempotent, safely handling duplicate events from payment providers.

---

### 🏪 5. Seller / Vendor Portal

Zynora is a true **multi-vendor marketplace** with a complete seller onboarding and management portal.

```mermaid
flowchart LR
    subgraph Onboarding
        A[Seller Applies] --> B[SellerRegistration\nLifecycle Model]
        B --> C{Admin Review}
        C -->|Approve| D[Role: SELLER granted]
        C -->|Reject| E[Notified via Email]
    end

    subgraph SellerDashboard
        D --> F[Product Registration\nMulti-Step Form]
        F --> G[Variant Management\nColor · Size · SKU · Stock]
        G --> H[Image Upload\nAWS S3]
        H --> I[Submit for Approval]
        I --> J{Admin Approves}
        J -->|Yes| K[Product Goes Live]
    end
```

- **Role-Based Access Control (RBAC)** — Three roles: `USER`, `SELLER`, `ADMIN`. GraphQL resolvers enforce role checks at the context level.
- **Multi-Step Product Registration** — A wizard-style form with full validation (React Hook Form + Zod) covering basic info, variants, pricing, images, and a final review screen.
- **Draft Persistence** — Seller drafts are auto-saved using localStorage so no data is lost on accidental navigation.
- **Approval Workflow** — New products enter a pending state and require admin approval before going live, maintaining marketplace quality.

---

### 📁 6. File Uploads & Media

- **AWS S3 Pre-Signed URLs** — The server generates time-limited pre-signed upload URLs. The client uploads files **directly to S3**, bypassing the Next.js server entirely, keeping the API lightweight and scalable.
- **Cloudinary Integration** — Used for image transformations and CDN delivery of processed images.
- **Variant Image Galleries** — Each product color variant has its own image gallery, enabling rich product presentations.

---

### ⚡ 7. Caching & Performance

- **Redis** — Used for OTP storage with automatic TTL expiration (no manual cleanup required) and general-purpose caching for hot data.
- **Apollo Client Normalized Cache** — All GraphQL responses are cached client-side in a normalized, entity-based store, minimizing redundant network requests.
- **MongoDB Text Indexes** — Enable fast, relevance-scored full-text search directly in the database without a separate search engine.
- **Next.js App Router** — Leverages React Server Components for fast initial page loads and streaming.

---

## 🗄️ Database Design

```mermaid
erDiagram
    USER {
        ObjectId _id
        string email
        string phone
        enum role
        enum status
        int tokenVersion
    }
    PRODUCT {
        ObjectId _id
        string name
        string brand
        string category
        number mrp
        number sellingPrice
        number discountPercentage
        array variants
        array specifications
        array highlights
    }
    PRODUCT_VARIANT {
        string colorName
        string colorCode
        string size
        string sku
        number stock
        array variantImages
    }
    ORDER {
        ObjectId _id
        ObjectId userId
        array items
        enum status
        string paymentIntent
    }
    REFRESH_TOKEN {
        ObjectId _id
        ObjectId userId
        string hashedToken
        Date expiresAt
    }
    SELLER_REGISTRATION {
        ObjectId _id
        ObjectId userId
        enum status
        object businessDetails
    }

    USER ||--o{ ORDER : "places"
    USER ||--o{ REFRESH_TOKEN : "has"
    USER ||--o| SELLER_REGISTRATION : "applies as"
    PRODUCT ||--o{ PRODUCT_VARIANT : "has"
    ORDER }o--o{ PRODUCT : "contains"
```

---

## 📡 GraphQL API Design

The entire API is served from a **single endpoint** (`/api/graphql`) using a modular schema architecture powered by `@graphql-tools/merge`.

| Module | Key Operations |
|---|---|
| **Auth** | `requestOTP`, `verifyOTP`, `logout`, `refreshToken` |
| **Products** | `searchProducts`, `getProductById`, `getHomePageData`, `searchSuggestions` |
| **Cart** | `addToCart`, `updateCartItem`, `removeFromCart`, `getCart` |
| **Checkout** | `initiateCheckout`, `reserveStock` |
| **Payments** | `createStripePaymentIntent`, `createRazorpayOrder`, webhooks |
| **Sellers** | `registerSeller`, `sellerLogin`, `submitProductForApproval` |
| **Uploads** | `getS3PresignedUrl`, `uploadProductImage` |
| **Addresses** | `addAddress`, `updateAddress`, `deleteAddress`, `getAddresses` |

---

## 📁 Project Structure

```
src/
├── apollo/          # Apollo Client setup & token refresh ErrorLink
├── app/             # Next.js App Router (pages, layouts, /api/graphql)
│   ├── (auth)/      # login, signup
│   ├── product/     # Product Detail Page (PDP)
│   ├── search/      # Search Results Page (SRP)
│   ├── cart/        # Cart page
│   ├── checkout/    # Checkout flow
│   └── seller/      # Seller dashboard & registration
├── components/      # Reusable UI components
├── graphql/
│   ├── schema/      # Modular GraphQL type definitions
│   └── resolvers/   # Modular GraphQL resolvers
├── model/           # Mongoose schemas & models
├── services/        # Business logic (OTP, Stock Reservation, Payments)
├── lib/             # External connections (MongoDB, Redis)
├── providers/       # React Context providers (Apollo, Stripe)
├── middleware/      # Next.js route protection middleware
├── schemas/         # Zod validation schemas
├── types/           # TypeScript interfaces & types
└── utils/           # Utility functions (token generation, client IP)
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/zynora.git
cd zynora

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your MongoDB URI, Redis URL, JWT secrets,
# Stripe/Razorpay keys, AWS credentials, etc.

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

<div align="center">

**Built with ❤️ by Ankit Shukla**

*Zynora — Where modern engineering meets seamless commerce.*

</div>
