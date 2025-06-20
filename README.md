# Proyek Pemrograman Web: Aplikasi Mitra Service

> Website mitra service elektronik dengan autentikasi pengguna dan backend CMS berbasis Sanity.

---

## 👥 **Tim Pengembang** 

- [Dunhill William Putra](https://github.com/williamu04)
- [Fathoni Nur Habibi](https://github.com/Fathoni1509)
- [Ivan Wahyu Nugroho](https://github.com/ifwhy)

---

## **Fitur Utama**

* 🔒 Autentikasi dengan Clerk
* 📚 Menampilkan daftar pesanan service
* 🔍 Pemesanan service elektronik
* 📝 Halaman detail pesanan
* 🧾 Dashboard user

---

## **Tech Stack**
### 🧱 Teknologi

#### Frontend
- [Next.js](https://nextjs.org/)
- [Clerk Auth](https://clerk.dev/)
- [Sanity Client](https://www.sanity.io/docs/js-client)

#### Backend
- [Sanity CMS](https://www.sanity.io/)

## **Struktur Proyek**

**Frontend (NextJs)**:

```
📦 frontend/
├── app/
│   ├── (root)/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── dashboard/
│   │   ├── orders/[id]
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── layout.tsx
│   │
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── loading.tsx
│
├── components/
│   └── BookCard.tsx
│
├── sanity/
│   └── client.ts
│
├── public/
└── .env.local
```

**Backend (Sanity)**:

```
📦 backend/
├── schemasTypes/
│   ├── objects/
│   │   ├── note.ts
│   │   ├── repairImages.ts
│   │   ├── repairServices.ts
│   │   ├── timelineEvent.ts
│   │   ├── warranty.ts
│   │   └── pricing.ts 
│   │
│   ├── customer.ts
│   ├── repair.ts
│   ├── review.ts
│   ├── technician.ts
│   └── index.ts
│   
├── sanity.config.ts
└── .env
```

---

## **Cara Menjalankan (Local Development)**

**Untuk Frontend**:

```bash
# 1. Clone repo
git clone https://github.com/ifwhy/mitra-service-front-end-web.git
cd mitra-service-front-end-web

# 2. Install dependency
npm install

# 3. Buat file .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_TOKEN=

# 4. Jalankan
npm run dev
```

**Untuk Backend (Sanity CMS)**:

```bash
# 1. Clone repo
git clone https://github.com/williamu04/mitra-service-backend.git
cd mitra-service-backend

# 2. Install sanity CLI jika belum
npm install -g sanity

# 3. Install dependency
npm install

# 4. Jalankan studio (opsional)
sanity dev

# 5. Deploy ke Sanity
sanity deploy
```

---

## **Catatan Pengembangan**

* Penjelasan skema di `schemasTypes/`
* Koneksi antara frontend dan Sanity menggunakan `sanityClient` dari `@sanity/client`
* Menggunakan GROQ query untuk fetching data

---

## 📂 **Organisasi Multi-Repo**

- 🔗 Bagian Frontend tersedia di: [repo-frontend](https://github.com/username/frontend-proyek)
- 🔗 Bagian Backend tersedia di: [repo-backend](https://github.com/username/backend-proyek)
