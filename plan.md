# PLAN.MD - Competitive Analysis Website
## Lembaga Study & Work Abroad + GMAT & IELTS Program
### Versi: 1.0 | Bahasa: Indonesia | Tema: Black & Gold Liquid Glass (macOS Apple Aesthetic)

---

## DAFTAR ISI

1. [Gambaran Umum Proyek](#1-gambaran-umum-proyek)
2. [Struktur Folder](#2-struktur-folder)
3. [Arsitektur Teknis](#3-arsitektur-teknis)
4. [Desain Sistem (Design System)](#4-desain-sistem-design-system)
5. [Peta Halaman & Konten](#5-peta-halaman--konten)
6. [Komponen UI](#6-komponen-ui)
7. [Spesifikasi Chart & Visualisasi Data](#7-spesifikasi-chart--visualisasi-data)
8. [Data Layer (Seluruh Data Asli)](#8-data-layer-seluruh-data-asli)
9. [Spesifikasi Animasi](#9-spesifikasi-animasi)
10. [Rencana Pengembangan (Sprint Plan)](#10-rencana-pengembangan-sprint-plan)
11. [Checklist Kualitas Final](#11-checklist-kualitas-final)

---

## 1. GAMBARAN UMUM PROYEK

### 1.1 Latar Belakang & Tujuan Bisnis

Indonesia menghadapi lonjakan permintaan layanan persiapan studi dan kerja luar negeri. Riset menunjukkan lebih dari 7,2 juta WNI bekerja di luar negeri (BPS, 2024), sementara jumlah mahasiswa Indonesia yang berkuliah di luar negeri terus meningkat pasca pandemi. Namun, ekosistem lembaga yang ada masih terfragmentasi: ada yang fokus hanya bahasa, ada yang murni konsultan, ada yang khusus visa, dan tidak ada satu pemain pun yang menyentuh keempat segmen secara bersamaan dalam satu atap.

**Titik Nyeri Konsumen (Consumer Pain Points):**

Saat ini, calon mahasiswa atau pekerja yang ingin berkarir di luar negeri harus melewati proses yang mahal, ribet, dan penuh ketidakpastian:

1. **Fragmentasi Journey:** Seorang lulusan SMA yang ingin kuliah S1 di luar negeri harus membayar terpisah ke 3-4 lembaga berbeda: tempat kursus IELTS (Rp 5-15 Jt), agen konsultan universitas (Rp 3-10 Jt), jasa penerjemah dokumen, dan kadang agen visa terpisah. Total biaya bisa mencapai Rp 20-40 Jt hanya untuk *persiapan*, belum termasuk biaya kuliah.
2. **Harga Tidak Transparan:** Dari 31 kompetitor yang kami riset, mayoritas tidak menampilkan harga di website mereka. Calon pelanggan harus "konsultasi dulu" (alias datang ke kantor untuk di-closing). Ini menciptakan informasi asimetris yang merugikan konsumen.
3. **Tidak Ada Inovasi Teknologi:** Tidak ada satu pun dari 31 kompetitor yang menerapkan pendekatan AI-first. Semua masih mengandalkan model kelas konvensional (tatap muka/Zoom) dengan jadwal tetap. Tidak ada personalisasi kurikulum, tidak ada AI-matching universitas, tidak ada chatbot konsultasi 24/7.
4. **Tidak Ada Garansi Hasil:** Hanya segelintir lembaga yang berani memberikan garansi skor (score guarantee). Mayoritas mengambil uang pelanggan tanpa jaminan output yang terukur.

**Peluang yang kami kejar:**

Perusahaan baru kami dirancang untuk menjadi SATU-SATUNYA lembaga di Indonesia yang menggabungkan:
- Persiapan bahasa Inggris akademik (IELTS, GMAT, TOEFL)
- Bimbingan aplikasi studi luar negeri (S1, S2, S3)
- Program persiapan kerja luar negeri (WHV, Ausbildung, Global Talent)
- Pelatihan English korporat untuk karyawan multinasional

**Target Audiens (4 Segmen Utama):**

| Segmen | Profil | Kebutuhan Inti |
|--------|--------|----------------|
| A - Lulusan SMA | 17-19 tahun, ingin S1 di luar negeri | IELTS/SAT + konsultasi universitas + beasiswa |
| B - Fresh Graduate | 21-25 tahun, ingin kerja luar negeri | Bahasa kerja + CV/portofolio + visa WHV/Ausbildung |
| C - Profesional Imigrasi | 25-40 tahun, ingin pindah permanen | IELTS + Global Talent Visa + network settling |
| D - Karyawan Multinasional | 25-45 tahun, butuh upgrade bahasa | Business English + komunikasi lintas budaya |

### 1.2 Tujuan Website Ini

Website ini adalah **pitching deck interaktif berbasis web** untuk:
1. Mempresentasikan landscape kompetitor secara visual kepada tim internal
2. Mengidentifikasi celah pasar (whitespace) yang belum diisi kompetitor
3. Membangun argumen strategis mengapa perusahaan baru ini layak diluncurkan
4. Menjadi referensi penetapan harga & positioning produk

### 1.3 Model Bisnis & Revenue Streams

Ayoabroad! dirancang dengan arsitektur pendapatan 3 pilar yang secara matematis diselaraskan dengan proyeksi *Financial Modelling* (Target 15-Tahun):

#### Pilar 1: B2C Premium & Bundling (Stream 1 & 2)
Melayani Segmen A, B, dan C dengan model monetisasi yang disesuaikan dengan sensitivitas harga dan profil pembeli. Memiliki target **Gross Revenue Year 5 sebesar Rp 8,8 Miliar**.

| Produk | Target | Estimasi Harga | Model Pembayaran | Kontribusi Finansial |
|--------|--------|----------------|------------------|----------------------|
| Bundel Study/Immigration | Segmen A & C | Diskon 15% dari total | Cicilan / Cash | *Upselling strategy* untuk meningkatkan LTV (Customer Lifetime Value) |
| Stream 1: English Academy | Segmen A, B, C | Rp 2 - 2,5 Jt / kelas | Bayar langsung / Cicilan | Akuisisi volume (IELTS, TOEFL, Foundation). |
| Stream 2: Admission Tests | Segmen A, C | Rp 2,5 - 3,5 Jt / kelas | Bayar langsung | Margin tinggi karena spesialisasi (SAT, GRE, GMAT). |

**Strategi Kunci:** Bundling all-in-one yang menggabungkan kursus bahasa + konsultasi (Stream 1 + Stream 2). Memberikan fasilitas cicilan/BNPL sangat vital untuk Segmen A dan B guna memastikan konversi *Lead-to-Sales*.

#### Pilar 2: B2B Corporate English (High Margin)
Model bisnis khusus untuk melayani Segmen D (Karyawan Multinasional) dengan produk andalan **Business Speaking Intensive**.

| Produk | Target | Kapasitas | Estimasi Margin Kotor |
|--------|--------|-----------|-----------------------|
| Business Speaking Intensive | Eksekutif & B2B | Max 8 Siswa / Cohort | **~73% - 75%** |

**Strategi Kunci:** Menawarkan kelas intensif dengan jumlah siswa lebih sedikit (8 siswa vs 12 siswa reguler) dengan harga premium. Model ini menghasilkan *recurring revenue* B2B dengan proyeksi pertumbuhan jumlah Tutor dari 8 (Tahun 1) menjadi 29 (Tahun 15).

#### Pilar 3: AI-First & Lean OPEX Control (Margin Booster)
Efisiensi operasional berbasis AI untuk mencapai target **Net Profit Margin stabil di 35% - 41%**.

| Area Optimalisasi | Strategi "Lean" | Penghematan Finansial |
|-------------------|-----------------|-----------------------|
| Gaji Staf Admin/CS | Menggunakan AI Chatbot (Otomatisasi) | Menurunkan proyeksi staf awal dari 7 menjadi 3-4 orang. |
| Re-alokasi Budget | Mengalihkan sisa gaji staf ke akuisisi user | Budget Marketing tetap stabil di Rp 50 Jt/bulan tanpa *burn rate* tenaga manusia. |
| Utilisasi Kelas | Fleksibilitas jadwal (Pagi, Sore, Malam) | Menahan laju beban Sewa Kantor tetap di ~Rp 30 Jt/bulan meskipun kelas (cohort) bertambah dari 8 ke 29. |

**Total estimasi penghematan:** Model ini memastikan laba bersih dapat menembus **Rp 3,6 Miliar pada Tahun ke-5** dengan struktur biaya OPEX yang sangat terkontrol.

---

## 2. STRUKTUR FOLDER

```
/competitive-analysis/
│
├── index.html                    # Entry point utama (Single Page App)
│
├── assets/
│   ├── css/
│   │   ├── tailwind.min.css      # Tailwind CSS (CDN atau build local)
│   │   ├── main.css              # Custom CSS: liquid glass, gold variables, animasi
│   │   └── charts.css            # Overrides styling untuk Chart.js
│   │
│   ├── js/
│   │   ├── main.js               # Inisialisasi app, scroll behavior, nav
│   │   ├── data.js               # Semua data kompetitor (SUMBER KEBENARAN TUNGGAL)
│   │   ├── charts.js             # Semua konfigurasi & render Chart.js
│   │   ├── filters.js            # Logic filtering tabel & kategori
│   │   ├── animations.js         # GSAP / CSS animation triggers
│   │   └── utils.js              # Helper functions (format rupiah, dll)
│   │
│   └── fonts/
│       ├── Cormorant-Bold.woff2  # Display font: premium, elegant
│       └── GeneralSans.woff2     # Body font: clean, modern
│
├── components/
│   ├── nav.html                  # Navigation bar (liquid glass sticky)
│   ├── hero.html                 # Hero section dengan tagline
│   ├── overview.html             # Executive summary + market size
│   ├── segment-gmat.html         # Tabel + analisis segmen GMAT
│   ├── segment-ielts.html        # Tabel + analisis segmen IELTS
│   ├── segment-kampung.html      # Tabel + analisis Kampung Inggris
│   ├── segment-studyabroad.html  # Tabel + analisis Study Abroad
│   ├── segment-workabroad.html   # Tabel + analisis Work Abroad
│   ├── charts-section.html       # Dashboard visualisasi semua chart
│   ├── whitespace.html           # Celah pasar & peluang masuk
│   ├── positioning.html          # Peta posisi kompetitif kita
│   └── footer.html               # CTA + branding
│
├── data/
│   └── competitors.json          # JSON terstruktur semua data kompetitor
│
└── README.md                     # Panduan menjalankan proyek
```

---

## 3. ARSITEKTUR TEKNIS

### 3.1 Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Markup | HTML5 Semantic | SEO + aksesibilitas |
| Styling | Tailwind CSS v3 (CDN) + Custom CSS | Kecepatan + presisi desain |
| Scripting | Vanilla JavaScript ES6+ | Zero dependency overhead |
| Charting | Chart.js v4 (CDN) | Performa ringan, kustomisasi tinggi |
| Animasi | GSAP ScrollTrigger (CDN) | Animasi scroll premium |
| Font | Google Fonts: Cormorant Garamond + DM Sans | Premium & readable |
| Icons | Lucide Icons (CDN) | Konsisten, SVG-based |

### 3.2 Strategi Rendering

- **Single Page Application (SPA)** dengan navigasi anchor scroll
- Semua data dimuat dari `data/competitors.json` via `fetch()`
- Tabel dirender dinamis via JavaScript (bukan hardcoded HTML)
- Chart diinisialisasi setelah data dimuat (promise chain)
- Lazy loading untuk section yang belum di-viewport

### 3.3 Struktur `competitors.json`

```json
{
  "metadata": {
    "last_updated": "2025-07",
    "total_competitors": 31,
    "segments": 5,
    "currency": "IDR"
  },
  "segments": [
    {
      "id": "gmat",
      "label": "Persiapan GMAT",
      "color": "#D4AF37",
      "competitors": [
        {
          "id": "manhattan-review",
          "name": "Manhattan Review",
          "program": "GMAT Classic Course & Private Tutoring",
          "price_min": 15840000,
          "price_max": 25440000,
          "price_label": "Rp 15.840.000 - Rp 25.440.000",
          "price_mode": "online-offline",
          "benefits": ["Kurikulum dirancang profesor bisnis", "Tes simulasi komputasional", "Ulasan analitis mendalam"],
          "pros": ["Reputasi alumni Harvard, Oxford, LBS", "Pemahaman sangat konseptual"],
          "cons": ["Patokan USD membuat harga sangat mahal lokal"],
          "location": ["Jakarta (Kuningan/Sudirman)", "Online"],
          "target_segment": ["profesional", "MBA"],
          "score_guarantee": false,
          "online_available": true,
          "offline_available": true
        }
        // ... dst untuk semua 31 kompetitor
      ]
    }
  ]
}
```

---

## 4. DESAIN SISTEM (DESIGN SYSTEM)

### 4.1 Palet Warna

```css
:root {
  /* Warna Dasar - Deep Black */
  --color-bg-primary:     #050505;    /* Background utama */
  --color-bg-secondary:   #0D0D0D;    /* Card background */
  --color-bg-glass:       rgba(255, 255, 255, 0.04); /* Liquid glass base */
  --color-bg-glass-hover: rgba(255, 255, 255, 0.08);

  /* Gold Palette */
  --color-gold-100:  #FFF8E7;    /* Teks terang */
  --color-gold-300:  #F5D784;    /* Aksen ringan */
  --color-gold-500:  #D4AF37;    /* Gold utama (brand) */
  --color-gold-700:  #9A7B1C;    /* Gold gelap */
  --color-gold-900:  #3D2F05;    /* Gold sangat gelap */

  /* Teks */
  --color-text-primary:   #F5F0E8;   /* Body text */
  --color-text-secondary: #A89B7A;   /* Subtext */
  --color-text-muted:     #5C5347;   /* Disabled / placeholder */

  /* Semantic */
  --color-success:  #2ECC71;
  --color-warning:  #F39C12;
  --color-danger:   #E74C3C;
  --color-info:     #3498DB;

  /* Glassmorphism */
  --glass-border:   rgba(212, 175, 55, 0.15);
  --glass-shadow:   0 8px 32px rgba(0, 0, 0, 0.6);
  --glass-blur:     blur(20px) saturate(180%);

  /* Gradients */
  --gradient-gold:  linear-gradient(135deg, #D4AF37 0%, #F5D784 50%, #9A7B1C 100%);
  --gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
}
```

### 4.2 Tipografi

```css
/* Display Font - Untuk judul utama, angka besar */
@import url('Cormorant Garamond: weights 400, 600, 700');
.font-display { font-family: 'Cormorant Garamond', Georgia, serif; }

/* Body Font - Untuk teks, label, UI */
@import url('DM Sans: weights 300, 400, 500, 600');
.font-body { font-family: 'DM Sans', system-ui, sans-serif; }

/* Skala Tipografi */
--text-hero:    clamp(3rem, 8vw, 7rem);    /* Hero headline */
--text-h1:      clamp(2rem, 5vw, 4rem);    /* Section title */
--text-h2:      clamp(1.5rem, 3vw, 2.5rem);
--text-h3:      clamp(1.2rem, 2vw, 1.75rem);
--text-body:    1rem;
--text-small:   0.875rem;
--text-label:   0.75rem;
```

### 4.3 Efek Liquid Glass (Komponen Inti)

```css
/* Base Glass Card */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

/* Gold shimmer overlay effect (pseudo-element) */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold-500), transparent);
  opacity: 0.6;
}

/* Liquid shine hover effect */
.glass-card::after {
  content: '';
  position: absolute;
  top: -50%; left: -75%;
  width: 50%; height: 200%;
  background: linear-gradient(to right, transparent, rgba(212,175,55,0.06), transparent);
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}
.glass-card:hover::after { left: 125%; }
```

### 4.4 Komponen Utama yang Harus Dibangun

| Komponen | File | Deskripsi |
|----------|------|-----------|
| `GlassCard` | main.css | Container glassmorphism utama |
| `GoldBadge` | main.css | Label kategori / tag segment |
| `PriceRange` | main.css | Visualisasi bar harga min-max |
| `ProConPill` | main.css | Chip pro (hijau) dan kontra (merah) |
| `StickyNav` | nav component | Navigation liquid glass sticky |
| `SectionHeader` | main.css | Judul section dengan gold underline |
| `FilterBar` | filters.js | Toggle filter segment & mode |
| `DataTable` | charts.js | Tabel responsif dengan sort |
| `HeroOrb` | animations.js | Orb animasi di hero section |
| `ScrollProgress` | main.js | Bar progress scroll di atas |

---

## 5. PETA HALAMAN & KONTEN

### SECTION 1: HERO

**Konten:**
- Tag line: "Peta Perang Kompetitor Industri Study & Work Abroad Indonesia"
- Sub-headline: Nama perusahaan + konteks analisis
- Angka kunci animasi: 31 Kompetitor | 5 Kategori | Rp 400rb - Rp 90 Jt Range Harga
- CTA: Scroll untuk memulai analisis
- Background: Animated orb gold + particle effect

**Animasi:**
- Angka counter auto-animate saat halaman load
- Teks reveal letter by letter (stagger)
- Orb breathing + rotate slow

### SECTION 2: EXECUTIVE SUMMARY (Market Overview)

**Konten:**
- Konteks pasar: Mengapa sekarang? (data BPS TKI, data Dikti mahasiswa LN)
- 4 kartu segmen audiens target (A, B, C, D)
- Pain point yang belum terjawab kompetitor

**Komponen:**
- 4 glass cards horizontal (target segmen)
- 1 infographic: Timeline "Journey" tiap segmen
- Insight box: "Tidak ada satu pemain pun yang cover keempat segmen ini"

### SECTION 3-7: ANALISIS PER SEGMEN (5 Segmen)

Setiap segmen memiliki struktur identik:

```
[Section Header + Deskripsi Segmen]
      |
[Filter Bar: Online / Luring / Keduanya | Harga Asc/Desc]
      |
[Tabel Kompetitor - Responsif, Sortable]
      |
[Insight Cards: Temuan Kunci Segmen]
      |
[Chart Mini: Distribusi Harga Segmen Ini]
```

**Segmen yang dicakup:**

**3A. Lembaga Persiapan GMAT** (5 kompetitor)
- Manhattan Review, Manhattan Elite Prep, Prep Zone Academy, Kaplan Edupac, Lister
- Insight kunci: Range harga Rp 3,5 Jt hingga Rp 29,6 Jt - sangat premium, semua online atau tentatif
- Celah: Tidak ada yang punya kelas luring permanen di luar Sudirman/Kuningan

**3B. IELTS & General English** (7 kompetitor)
- British Council, IALF, Wall Street English, EF, TBI, LIA, Hitaclass
- Insight kunci: WSE paling mahal (Rp 60 Jt) tapi tidak spesifik IELTS; LIA paling murah (Rp 1,3 Jt) tapi tidak fokus imigrasi
- Celah: Tidak ada yang gabungkan IELTS + konsultasi beasiswa dalam satu paket

**3C. Kampung Inggris & Asrama Intensif** (7 kompetitor)
- Titik Nol, LKP Webster, Global English, Kampung Inggris LC, Mr. BOB, Flip English, The Benefit
- Insight kunci: Harga sangat destruktif (Rp 400rb - Rp 6,5 Jt) tapi semua terpusat di Pare, Kediri
- Celah: Tidak ada yang buka cabang intensif di kota-kota besar dengan model camp mini

**3D. Konsultan Study Abroad** (8 kompetitor)
- Schoters, Kobi Education, SUN Education, IDP, ICAN, Vista Education, Euro Management, AECC Global
- Insight kunci: Mayoritas gratis konsultasi tapi dapat komisi dari universitas (conflict of interest)
- Celah: Tidak ada yang benar-benar fee-based dan netral 100%

**3E. Bimbingan Work Abroad** (7 kompetitor)
- EduBridge, Lister, WorkAbroad.id, Australia Study, TenHal, GoAbroad.id, Bright Education
- Insight kunci: Bright Education all-in Rp 39,9 Jt tapi wajib asrama 6 bulan
- Celah: Tidak ada produk fleksibel yang bisa dikerjakan sambil tetap bekerja

### SECTION 8: DASHBOARD CHART ANALISIS

(Lihat detail di Section 7 dokumen ini)

### SECTION 9: WHITESPACE ANALYSIS (Peluang Pasar)

**Konten:**
- Matrix 2x2: Kemudahan Masuk vs Nilai Pasar
- Tabel celah pasar yang belum diisi
- Argumen positioning: "Mengapa kami beda"
- Unique Selling Proposition (USP) calon perusahaan

**Celah yang Diidentifikasi:**

| Celah | Kompetitor yang Gagal Mengisi | Nilai Pasar |
|-------|------------------------------|-------------|
| Paket bundling IELTS + visa konsultasi + job placement | Semua | Sangat Tinggi |
| Program online semi-intensif (bukan full camp) untuk pekerja aktif | Semua | Tinggi |
| GMAT + MBA Application konsultasi dalam 1 atap | Semua | Medium-Tinggi |
| Kelas English korporat B2B untuk perusahaan multinasional | EF (hanya parsial) | Sangat Tinggi |
| Metode cicilan/BNPL untuk paket premium | WorkAbroad.id (parsial) | Tinggi |

### SECTION 10: PETA POSISI KOMPETITIF

**Konten:**
- Positioning map interaktif (scatter plot): Harga vs Kelengkapan Layanan
- Tabel perbandingan fitur head-to-head
- "Di mana perusahaan kami akan berdiri"

### SECTION 11: FOOTER

- Disclaimer data
- Tanggal update data
- Informasi tim

---

## 6. KOMPONEN UI - SPESIFIKASI DETAIL

### 6.1 Navigation Bar

```
[Logo] [GMAT] [IELTS] [Kampung Inggris] [Study Abroad] [Work Abroad] [Charts] [Whitespace]
```

- Sticky top, liquid glass background
- Active state: gold underline + text gold
- Mobile: hamburger menu dengan slide drawer
- Scroll progress bar di posisi paling atas (thin gold line)

### 6.2 Tabel Kompetitor

Kolom tabel standar untuk semua segmen:

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| Nama Lembaga | Text + logo placeholder | Bold, gold on hover |
| Program | Text | Truncate dengan expand |
| Harga | Range bar visual + angka | Sortable |
| Benefit | Accordion expand | Max 3 bullets tampil |
| Kelebihan | Chip hijau | Max 2 tampil |
| Kekurangan | Chip merah | Max 2 tampil |
| Lokasi | Badge (Online/Luring/Keduanya) | Filter-able |
| Aksi | Tombol "Detail" | Buka modal |

**Interaksi Tabel:**
- Hover row: background glass terang subtle
- Sort by column header click
- Filter by lokasi: Online | Luring | Keduanya
- Filter by price range: slider double-thumb
- Search bar: real-time filter nama lembaga
- Klik nama: expand inline dengan info lengkap

### 6.3 Modal Detail Kompetitor

Saat klik "Detail" pada tabel:
- Overlay gelap dengan glass card di tengah
- Header: nama lembaga + badge segment
- Body: semua info lengkap termasuk benefit, pros, cons, lokasi
- Visual: bar harga dibandingkan rata-rata segment
- Footer: tutup modal

### 6.4 Insight Cards

Setiap segmen memiliki 3 insight card:
- Card 1: Kompetitor paling terjangkau + pros/cons
- Card 2: Kompetitor paling mahal + apa yang mereka tawarkan
- Card 3: Celah utama yang ditemukan

Style: Glass card dengan border gold tipis, icon Lucide di kiri, body text DM Sans

### 6.5 Price Range Visual

```
Rp 400 rb ████████████████░░░░░░░░ Rp 90 Jt
           [====[MIN|MAX]====]
           Rp 1,5 Jt   Rp 5,6 Jt
```

Visual bar dengan gradient gold untuk range harga tiap lembaga

---

## 7. SPESIFIKASI CHART & VISUALISASI DATA

Semua chart menggunakan Chart.js v4 dengan tema custom black & gold.

### Chart Global Config (Shared)

```javascript
Chart.defaults.color = '#A89B7A';
Chart.defaults.borderColor = 'rgba(212, 175, 55, 0.1)';
Chart.defaults.font.family = 'DM Sans';
Chart.defaults.plugins.legend.labels.color = '#F5F0E8';
```

### CHART 1: Distribusi Harga per Segmen (Grouped Bar Chart)

**Lokasi:** Section Charts Dashboard
**Data:** Harga minimum dan maksimum tiap segmen
**Tipe:** Horizontal Grouped Bar Chart
**Dimensi:** Full width, height 400px

```
Dataset:
- Bar 1 (Hitam): Harga Minimum
- Bar 2 (Gold): Harga Maksimum

Segmen (Y-axis):
- GMAT Preparation
- IELTS & General English
- Kampung Inggris / Asrama
- Konsultan Study Abroad
- Bimbingan Work Abroad

Insight yang ditampilkan di bawah chart:
"Wall Street English memiliki tarif tertinggi (Rp 60 Juta), sementara The Benefit English Course
menawarkan entry point terendah (Rp 400.000). Range ini mencerminkan fragmentasi pasar yang ekstrem."
```

### CHART 2: Radar / Spider Chart - Profil Kemampuan Kompetitor Pilihan

**Lokasi:** Section Charts Dashboard
**Tipe:** Radar Chart
**Dimensi:** 500x500px centered

```
Sumbu (6 dimensi):
1. Keterjangkauan Harga (1-10, semakin tinggi = semakin murah)
2. Kelengkapan Program (1-10)
3. Ketersediaan Online (1-10)
4. Ketersediaan Luring (1-10)
5. Garansi Skor / Hasil (1-10)
6. Transparansi Harga (1-10)

Kompetitor yang diplot (6 representatif):
- British Council (merah)
- LIA (biru)
- Schoters (hijau)
- Bright Education (ungu)
- EF Indonesia (oranye)
- Lister (gold)

Toggle button untuk switch kompetitor yang ditampilkan.
```

### CHART 3: Scatter Plot Positioning Map - Harga vs Kelengkapan

**Lokasi:** Section Whitespace / Positioning
**Tipe:** Bubble Chart (Scatter Plot)
**Dimensi:** Full width, height 500px

```
X-axis: Harga rata-rata (Rp, log scale)
Y-axis: Skor Kelengkapan Layanan (0-100)
Bubble size: Estimasi jumlah cabang / jangkauan
Warna bubble: per segmen

Label yang menonjol (annotasi):
- "Zona Premium Sempit" (kanan atas) - WSE, British Council
- "Zona Murah Tapi Terbatas" (kiri bawah) - Kampung Inggris
- "CELAH TERBUKA" (tengah-atas) - titik merah berkedip = posisi target kita
- "Zona Agen Gratis" (kiri tengah) - SUN, IDP, ICAN

Interaktif: Hover bubble = tooltip nama kompetitor + harga + skor.
Klik bubble = highlight di tabel.
```

### CHART 4: Donut Chart - Distribusi Lokasi (Online vs Luring vs Hybrid)

**Lokasi:** Section Charts Dashboard
**Tipe:** Donut Chart + legend
**Dimensi:** 350x350px

```
Data (dari total 31 kompetitor):
- Online Only: 8 lembaga (25.8%)
- Luring Only: 6 lembaga (19.4%)
- Online + Luring (Hybrid): 17 lembaga (54.8%)

Insight: Mayoritas sudah hybrid, tapi kualitas online sangat bervariasi.
```

### CHART 5: Bar Chart - Ketersediaan Garansi & Transparansi Harga

**Lokasi:** Section Charts Dashboard
**Tipe:** Stacked Horizontal Bar Chart
**Dimensi:** Full width, height 300px

```
Kategori per segmen:
- Ada Garansi Skor
- Harga Transparan (by Request vs published)
- Ada Cicilan / BNPL

Data per 31 kompetitor dikategorikan Yes/No/Partial.
```

### CHART 6: Line Chart Timeline - Estimasi Biaya Total Journey per Segmen

**Lokasi:** Section Executive Summary
**Tipe:** Line Chart (step)
**Dimensi:** Full width, height 350px

```
Timeline: 0 bulan hingga 24 bulan
4 line (satu per segmen target):
- Segmen A (Lulusan SMA): IELTS prep + konsultan + beasiswa = estimasi Rp 15-30 Jt
- Segmen B (Fresh Graduate WHV): Bahasa + dokumen + asuransi = estimasi Rp 8-25 Jt
- Segmen C (Imigrasi Permanen): IELTS + GTV + legal = estimasi Rp 25-50 Jt
- Segmen D (Korporat): Business English per bulan = estimasi Rp 2-5 Jt/bulan

Tooltip: Klik titik = breakdown biaya apa yang sudah masuk.
```

### CHART 7: Heatmap - Kompetitor vs Fitur

**Lokasi:** Section Charts Dashboard
**Tipe:** Heatmap grid (dirender sebagai div grid dengan CSS)
**Dimensi:** Full width, auto height

```
Baris: Nama 31 Kompetitor (dikelompokkan per segmen)
Kolom (12 fitur yang dicek):
1. IELTS Prep
2. GMAT Prep
3. TOEFL Prep
4. Study Abroad Konsultasi
5. WHV Support
6. Ausbildung Support
7. Global Talent Visa
8. Corporate English (B2B)
9. Kelas Luring
10. Garansi Skor
11. Cicilan / BNPL
12. Native Speaker

Skala warna sel:
- Merah gelap: Tidak ada
- Kuning: Ada tapi terbatas
- Gold terang: Ada lengkap

Ini adalah VISUAL PALING PENTING untuk membuktikan celah pasar kita.
```

### CHART 8: Box Plot / Distribution Chart - Range Harga per Kategori

**Lokasi:** Section Charts Dashboard
**Tipe:** Violin / Range Distribution (via custom Canvas)
**Dimensi:** Full width, height 300px

```
Menunjukkan distribusi harga di dalam tiap segmen:
Median, Q1, Q3, outlier (WSE 60 Jt jadi outlier jelas).

Tujuan: Visual argument bahwa pasar sangat tidak merata harganya.
```

---

## 8. DATA LAYER (SELURUH DATA ASLI)

### 8.1 Master Data Kompetitor (`/data/competitors.json`)

Data berikut adalah SUMBER KEBENARAN TUNGGAL yang akan dipakai semua chart dan tabel.

#### SEGMEN 1: GMAT (5 Kompetitor)

```json
{
  "id": "gmat",
  "label": "Persiapan GMAT",
  "competitors": [
    {
      "name": "Manhattan Review",
      "program": "GMAT Classic Course & Private Tutoring",
      "price_min": 15840000,
      "price_max": 25440000,
      "benefits": ["Kurikulum desain profesor bisnis", "Tes simulasi komputasional", "Ulasan analitis mendalam"],
      "pros": ["Alumni Harvard/Oxford/LBS", "Sangat konseptual"],
      "cons": ["Harga patokan USD, sangat mahal untuk pasar lokal"],
      "location_type": "hybrid",
      "locations": ["Jakarta - Kuningan/Sudirman", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": true, "ielts": false, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Manhattan Elite Prep",
      "program": "GMAT Long Course, Intensive & Crash Course",
      "price_min": 13584000,
      "price_max": 24800000,
      "benefits": ["Fleksibilitas kelas crash hingga 8 minggu", "Perpustakaan digital ekstensif"],
      "pros": ["Opsi Elite Tutor dengan rekam jejak Ivy League", "Kelas akhir pekan tersedia"],
      "cons": ["Sangat mahal", "Kelas luring di ruang meeting hotel (tidak permanen)"],
      "location_type": "hybrid",
      "locations": ["Jakarta - Venue Tentatif", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": true, "ielts": false, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Prep Zone Academy",
      "program": "GMAT Unlimited Live Online Group Course",
      "price_min": 0,
      "price_max": 0,
      "price_label": "By Request",
      "benefits": ["Akses ulang modul 1-2 tahun", "Evaluasi diagnostik", "Buku panduan resmi gratis"],
      "pros": ["Bebas ulang modul tanpa biaya tambahan"],
      "cons": ["Harga tidak transparan", "Tidak ada kantor di Indonesia (berbasis SG/India)"],
      "location_type": "online",
      "locations": ["Online (Singapura/India)"],
      "transparency": "by_request",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": true, "ielts": false, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Kaplan Edupac",
      "program": "GMAT Preparation Class (Online, Private, Group)",
      "price_min": 0,
      "price_max": 0,
      "price_label": "By Request",
      "benefits": ["Simulasi tes komputerisasi", "Bebas biaya aplikasi universitas afiliasi", "Pembekalan strategi"],
      "pros": ["75 tahun pengalaman", "Ekosistem end-to-end (les hingga visa)"],
      "cons": ["Asimetri informasi: wajib konseling untuk dapat harga"],
      "location_type": "hybrid",
      "locations": ["Jakarta", "Surabaya", "BSD", "Online"],
      "transparency": "by_request",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": true, "ielts": true, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Lister",
      "program": "GMAT Course (Private & Semi Private)",
      "price_min": 3527647,
      "price_max": 29643529,
      "benefits": ["Silabus dikustomisasi", "Jadwal mandiri fleksibel", "Garansi skor (syarat berlaku)"],
      "pros": ["Paling customizable untuk pekerja kantoran", "Jadwal reschedule bebas"],
      "cons": ["Murni online via Zoom, tidak ada luring"],
      "location_type": "online",
      "locations": ["Online"],
      "transparency": "published",
      "score_guarantee": true,
      "installment": false,
      "features": {"gmat": true, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    }
  ]
}
```

#### SEGMEN 2: IELTS & GENERAL ENGLISH (7 Kompetitor)

```json
{
  "id": "ielts",
  "label": "IELTS & General English",
  "competitors": [
    {
      "name": "British Council",
      "program": "IELTS Coach (1-4 Skill Packages)",
      "price_min": 4050000,
      "price_max": 15800000,
      "benefits": ["72 jam bimbingan ahli", "IELTS Ready Premium 40 latihan tes", "Garansi retensi belajar"],
      "pros": ["Garansi skor minimal 6.5 (kelas gratis jika tidak tercapai)"],
      "cons": ["Syarat masuk ketat (wajib B1)", "Biaya elitis di muka"],
      "location_type": "hybrid",
      "locations": ["Jakarta - Sudirman/Cibubur", "Online"],
      "transparency": "published",
      "score_guarantee": true,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": true, "corporate": true}
    },
    {
      "name": "IALF Indonesia",
      "program": "IELTS Full Prep, IELTS for WHV, English Z",
      "price_min": 1490000,
      "price_max": 5590000,
      "benefits": ["Instruktur native speaker", "Modul khusus WHV Australia", "One Skill Retake"],
      "pros": ["Program khusus WHV Australia yang komprehensif", "Kelas singkat padat"],
      "cons": ["Harga relatif tinggi untuk kelas daring"],
      "location_type": "hybrid",
      "locations": ["Jakarta", "Surabaya", "Bali", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": true, "corporate": false}
    },
    {
      "name": "Wall Street English",
      "program": "WSE Deluxe, VIP, Professional",
      "price_min": 20000000,
      "price_max": 60000000,
      "benefits": ["Total English Environment", "Komunitas eksekutif", "Aplikasi pembelajaran daring"],
      "pros": ["Garansi uang kembali", "Jejaring bisnis eksekutif (networking)"],
      "cons": ["Kontrak jangka panjang 9-24 bulan", "Biaya terkunci sangat besar"],
      "location_type": "hybrid",
      "locations": ["Jakarta", "Bandung", "Surabaya"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": true, "corporate": true}
    },
    {
      "name": "EF (English First)",
      "program": "EF Adults, IELTS Prep, Study Abroad Prep",
      "price_min": 10000000,
      "price_max": 25000000,
      "benefits": ["Kelas per level dewasa/remaja", "Guru native banyak", "Infrastruktur lounge mewah"],
      "pros": ["Kredibilitas cabang merata", "Mudah diakses luring"],
      "cons": ["Sangat premium", "Tidak spesifik GMAT/beasiswa"],
      "location_type": "hybrid",
      "locations": ["Seluruh Indonesia", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": true, "work_abroad": false, "native_speaker": true, "corporate": true}
    },
    {
      "name": "TBI (The British Institute)",
      "program": "Digital Learning, IELTS Prep, Business English",
      "price_min": 500000,
      "price_max": 3550000,
      "benefits": ["Task-based approach bisnis", "Bimbingan surel & negosiasi korporat"],
      "pros": ["Instruktur 100% bersertifikasi CELTA Cambridge"],
      "cons": ["Model blended memerlukan kedisiplinan tinggi dari siswa"],
      "location_type": "hybrid",
      "locations": ["Jabodetabek", "Bandung", "Bali", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": true, "corporate": true}
    },
    {
      "name": "LIA",
      "program": "TOEFL/IELTS Prep, General English Dewasa",
      "price_min": 1311000,
      "price_max": 2223000,
      "benefits": ["Modul berjenjang rapi", "Tutor berpengalaman", "Harga sangat terjangkau"],
      "pros": ["Cabang luring sangat masif di seluruh Indonesia", "Harga terjangkau"],
      "cons": ["Atmosfer lembaga tua", "Kurang fokus pada imigrasi spesifik"],
      "location_type": "hybrid",
      "locations": ["Ratusan Cabang Indonesia"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Hitaclass",
      "program": "Kursus Reguler, Intensif, Privat IELTS",
      "price_min": 1500000,
      "price_max": 4000000,
      "benefits": ["Jadwal fleksibel", "Privat 1-on-1 mulai Rp 75.000/sesi", "Sertifikat penyelesaian modul"],
      "pros": ["Layanan daring 1-on-1 paling terjangkau"],
      "cons": ["Murni EdTech daring", "Tidak ada pendampingan birokrasi study abroad"],
      "location_type": "online",
      "locations": ["Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    }
  ]
}
```

#### SEGMEN 3: KAMPUNG INGGRIS & ASRAMA INTENSIF (7 Kompetitor)

```json
{
  "id": "kampung",
  "label": "Kampung Inggris & Asrama Intensif",
  "competitors": [
    {
      "name": "Titik Nol English Course",
      "program": "IELTS General Training for WHV Australia",
      "price_min": 1950000,
      "price_max": 1950000,
      "benefits": ["48 pertemuan", "Simulasi wawancara WHV", "Medical check-up guide", "Panduan buka rekening Australia"],
      "pros": ["Harga sangat terjangkau", "Fasilitas visa WHV Australia terlengkap"],
      "cons": ["Kapasitas padat hingga 25 siswa per sesi"],
      "location_type": "hybrid",
      "locations": ["Pare", "Jogja", "Makassar", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "LKP Webster",
      "program": "Kursus IELTS Offline 3 Bulan & Pre-IELTS",
      "price_min": 1500000,
      "price_max": 3500000,
      "benefits": ["All-In termasuk asrama 24 jam", "5 sesi per hari", "Sertifikat DIKNAS"],
      "pros": ["Rasio kelas ideal max 12 peserta luring"],
      "cons": ["Harga belum termasuk pangan & laundry"],
      "location_type": "offline",
      "locations": ["Pare, Kediri"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Global English (GE)",
      "program": "IELTS Super Camp & English Booster",
      "price_min": 1529000,
      "price_max": 4099000,
      "benefits": ["Hingga 6 kelas per hari", "Tutor tersertifikasi", "Tes penempatan & diskon 50% ujian IELTS"],
      "pros": ["Intensitas super agresif"],
      "cons": ["Membutuhkan energi fisik tinggi (7 jam/hari)"],
      "location_type": "offline",
      "locations": ["Pare, Kediri"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Kampung Inggris LC",
      "program": "Intensive 1-Bulan, IELTS Prep",
      "price_min": 1600000,
      "price_max": 2900000,
      "benefits": ["Area English Camp terpadu", "Lingkungan kompetitif", "Pembedahan silabus ujian"],
      "pros": ["Pengawalan naik kelas dari dasar jika pre-test rendah"],
      "cons": ["Siswa target kilat dipaksa modul dasar jika pre-test kurang"],
      "location_type": "offline",
      "locations": ["Pare, Kediri", "Bogor"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Mr. BOB Academia",
      "program": "IELTS / 6-Up Camp / 7-Up Camp",
      "price_min": 750000,
      "price_max": 6240000,
      "benefits": ["Modul Super Seru", "Doubt solving tak terbatas", "Fokus menghancurkan rasa takut verbal"],
      "pros": ["Tutor berenergi, efektif untuk pemula pemalu"],
      "cons": ["Kurikulum fun kurang ketat untuk akademis kaku (S3)"],
      "location_type": "offline",
      "locations": ["Pare, Kediri"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Flip English School",
      "program": "Program English Untuk WHV Australia",
      "price_min": 1100000,
      "price_max": 2100000,
      "benefits": ["Bahasa terapan hospitality/agriculture", "Konsultasi perpanjangan WHV", "Trik kerja Australia"],
      "pros": ["Cabang luas (Pare, Jogja, Makassar)"],
      "cons": ["Tidak untuk akademisi penelitian, murni vokasi kerja"],
      "location_type": "hybrid",
      "locations": ["Pare", "Jogja", "Makassar", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "The Benefit English Course",
      "program": "Paket Kursus Plus Camp",
      "price_min": 400000,
      "price_max": 6500000,
      "benefits": ["Durasi paling elastis (1 minggu hingga 6 bulan)"],
      "pros": ["Entry-level paling kompetitif di asrama luring Pare"],
      "cons": ["Reputasi aplikasi beasiswa internasional kurang tenar"],
      "location_type": "offline",
      "locations": ["Pare, Kediri"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": false, "native_speaker": false, "corporate": false}
    }
  ]
}
```

#### SEGMEN 4: KONSULTAN STUDY ABROAD (8 Kompetitor)

```json
{
  "id": "study_abroad",
  "label": "Konsultan Study Abroad",
  "competitors": [
    {
      "name": "Schoters",
      "program": "Study Abroad Academy (SAA) S1/S2/S3",
      "price_min": 7190000,
      "price_max": 15490000,
      "benefits": ["10-30 jam 1-on-1 mentor", "1000+ database beasiswa", "Ulasan esai + buddy"],
      "pros": ["Mentor adalah alumni/mahasiswa kampus papan atas", "Reputasi LPDP sangat kuat"],
      "cons": ["Sistem Token membatasi jumlah evaluasi esai"],
      "location_type": "hybrid",
      "locations": ["Jakarta", "Bandung", "Malang", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": true, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Kobi Education",
      "program": "Mentoring S1 (Triple Bundle) & S2",
      "price_min": 599000,
      "price_max": 19990000,
      "benefits": ["IELTS + SAT + konsultasi beasiswa digabung", "Mock interview", "Revisi dokumen tersumpah"],
      "pros": ["Bundling menurunkan harga drastis vs beli eceran"],
      "cons": ["Vendor Lock-in: semua terpusat satu vendor"],
      "location_type": "online",
      "locations": ["Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "SUN Education",
      "program": "University Placement, Pengurusan Visa & Akomodasi",
      "price_min": 0,
      "price_max": 0,
      "price_label": "Gratis Konsultasi",
      "benefits": ["Layanan end-to-end birokrasi", "Penanganan housing & pendaftaran beasiswa kampus"],
      "pros": ["Cabang terbesar (27 kota)", "Eliminasi biaya bimbingan"],
      "cons": ["Model agen afiliasi: cenderung mengarahkan ke universitas mitra"],
      "location_type": "hybrid",
      "locations": ["27 Cabang Seluruh Indonesia"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "IDP Education",
      "program": "Study Abroad Consulting, IELTS Official",
      "price_min": 0,
      "price_max": 0,
      "price_label": "Gratis Konsultasi",
      "benefits": ["Asistensi formulir pendaftaran", "Bimbingan Student Visa Australia/UK"],
      "pros": ["Ko-kreator IELTS; integrasi sertifikasi ke aplikasi kampus sangat mulus"],
      "cons": ["Rute ideal hanya berlaku pada jaringan universitas IDP"],
      "location_type": "hybrid",
      "locations": ["15+ Cabang (Jakarta, Jatim, Sulawesi)"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "ICAN Education Consultant",
      "program": "Konsultasi Studi Luar Negeri (UK, Aus, EU)",
      "price_min": 0,
      "price_max": 7000000,
      "price_label": "Gratis Konsultasi + IELTS Rp 3,5-7 Jt",
      "benefits": ["Airport pickup", "Pencarian tempat tinggal", "Asistensi birokrasi imigrasi"],
      "pros": ["Jaringan 500+ universitas dunia", "Pendaftaran sangat cepat"],
      "cons": ["Non-komisi mengharuskan siswa taat portofolio kemitraan"],
      "location_type": "hybrid",
      "locations": ["Jabodetabek", "Bandung", "Medan"],
      "transparency": "partial",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Vista Education",
      "program": "Bimbingan Kuliah & Pelatihan Akademik",
      "price_min": 0,
      "price_max": 0,
      "price_label": "Gratis Pendaftaran Kampus (ada diskon BCA)",
      "benefits": ["Tes diagnostik minat & bakat", "Pre-departure briefing", "Cicilan 24 bulan via Danacita"],
      "pros": ["Fleksibilitas arus kas tertinggi (angsuran 24 bulan)"],
      "cons": ["Konsultasi beasiswa kampus non-rekanan tidak masuk layanan utama"],
      "location_type": "hybrid",
      "locations": ["Jakarta", "Bandung", "Surabaya", "Malang", "Bali"],
      "transparency": "partial",
      "score_guarantee": false,
      "installment": true,
      "features": {"gmat": false, "ielts": false, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Euro Management Indonesia",
      "program": "College Preparation EU/UK/US",
      "price_min": 1900000,
      "price_max": 6900000,
      "benefits": ["Pengawalan PTN Eropa", "Bimbingan zero-tuition Jerman/Prancis"],
      "pros": ["Pakar birokrasi kuliah zero-tuition di daratan Eropa"],
      "cons": ["Kurang relevan untuk beasiswa penuh di UK/Australia"],
      "location_type": "hybrid",
      "locations": ["Jakarta - Menteng", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    },
    {
      "name": "AECC Global / NIEC Indo",
      "program": "Konsultan, Aplikasi Kampus, Study Tour",
      "price_min": 0,
      "price_max": 89000000,
      "price_label": "Gratis Konsultasi; Study Tour Rp 8,8-89 Jt",
      "benefits": ["Pengurusan visa UK/Aus/Irlandia", "Summer camp kampus UK/Swiss"],
      "pros": ["Application Week sering gratiskan administrasi masuk kampus luar"],
      "cons": ["Summer Camp premium hingga 90 juta Rupiah per anak"],
      "location_type": "hybrid",
      "locations": ["Surabaya", "Bali", "Jakarta"],
      "transparency": "partial",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": false, "study_abroad": true, "work_abroad": false, "native_speaker": false, "corporate": false}
    }
  ]
}
```

#### SEGMEN 5: BIMBINGAN WORK ABROAD (7 Kompetitor)

```json
{
  "id": "work_abroad",
  "label": "Bimbingan Work Abroad",
  "competitors": [
    {
      "name": "EduBridge",
      "program": "Global Talent Visa (GTV) UK Consulting",
      "price_min": 23500000,
      "price_max": 23500000,
      "price_label": "By Request + biaya visa & NHS £1.175 (~Rp 23,5 Jt)",
      "benefits": ["Asistensi Endorsement imigrasi UK 5 tahun", "Fast-track ke Permanent Resident"],
      "pros": ["Membuka rute PR Eropa bagi WNI kaliber tinggi tanpa sponsor employer"],
      "cons": ["Hanya untuk pakar IT, AI, Direktur, Artis (sangat eksklusif)"],
      "location_type": "hybrid",
      "locations": ["Jakarta", "Bali", "Pontianak", "Online"],
      "transparency": "by_request",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Lister",
      "program": "Bimbingan Dokumen & Kelas Bahasa WHV Australia",
      "price_min": 6045000,
      "price_max": 19713824,
      "benefits": ["Bedah dokumen subclass 462", "Simulasi cari kerja Australia", "Bahasa Inggris intensif"],
      "pros": ["Bimbingan online eksekutif dengan atensi privat 1-on-1 paling intim"],
      "cons": ["19 juta untuk materi WHV dinilai sangat mahal dibanding camp luring"],
      "location_type": "online",
      "locations": ["Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "WorkAbroad.id (Schoters)",
      "program": "Kelas Bahasa Inggris Kerja / Ausbildung Jerman",
      "price_min": 5000000,
      "price_max": 17899000,
      "benefits": ["Pendampingan CV/Motivation Letter", "Simulasi wawancara industri Eropa", "Akses 1000+ loker"],
      "pros": ["Cicilan 3x", "Relasi langsung ke korporasi Eropa"],
      "cons": ["Uang hangus jika gagal sertifikasi bahasa B1/B2"],
      "location_type": "hybrid",
      "locations": ["50+ Cabang", "Online"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": true,
      "features": {"gmat": false, "ielts": true, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Australia Study",
      "program": "Paket Bantuan Penataan WHV (Handling Package)",
      "price_min": 1260000,
      "price_max": 20100000,
      "benefits": ["Tax File Number", "Resume format Australia", "SIM card", "Asuransi kesehatan 12 bulan"],
      "pros": ["Landing-pad aman bagi WNI tanpa relasi di Australia"],
      "cons": ["Bukan pemberi visa, hanya fasilitator administrasi pendaratan"],
      "location_type": "online",
      "locations": ["Online / Australia"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": false, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "TenHal Bekerja Bersama",
      "program": "Penempatan Magang/Kerja Eropa",
      "price_min": 10400000,
      "price_max": 10400000,
      "price_label": "Est. $650 USD (~Rp 10,4 Jt) untuk program Turki/Eropa Timur",
      "benefits": ["Bantuan penempatan spesifik (Perhotelan, Konstruksi Las)", "Pelatihan P3MI resmi"],
      "pros": ["Memecahkan kebutuhan penempatan kerja fisik luar negeri dengan cepat"],
      "cons": ["Mayoritas peluang blue-collar, butuh ketangguhan fisik tinggi"],
      "location_type": "online",
      "locations": ["Online"],
      "transparency": "by_request",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": false, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "GoAbroad.id",
      "program": "Penempatan Formal Asia Timur & Eropa / Bimbingan WHV",
      "price_min": 0,
      "price_max": 0,
      "price_label": "By Request (Konsultasi Gratis)",
      "benefits": ["Matching 10+ perusahaan rekanan", "Bimbingan dari bahasa hingga tiket berangkat"],
      "pros": ["Jaringan Ausbildung + penyaluran mandiri ke Eropa/Australia"],
      "cons": ["Biaya potong gaji (jika ada) harus diinspeksi manual via sales"],
      "location_type": "online",
      "locations": ["Online"],
      "transparency": "by_request",
      "score_guarantee": false,
      "installment": false,
      "features": {"gmat": false, "ielts": false, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    },
    {
      "name": "Bright Education",
      "program": "Program Ausbildung Jerman (Sekolah & Magang)",
      "price_min": 39900000,
      "price_max": 39900000,
      "benefits": ["Pengurusan visa + Apostille", "Kursus asrama A1-B1", "Pengawalan kontrak RS/restoran Jerman"],
      "pros": ["Jaminan gaji magang EUR 650-1000/bulan di Jerman (bisa tutupi biaya kursus)"],
      "cons": ["Wajib relokasi asrama penuh ~6 bulan untuk kejar B1"],
      "location_type": "hybrid",
      "locations": ["Bandung (Pusat)", "Jakarta (7 Kota)"],
      "transparency": "published",
      "score_guarantee": false,
      "installment": true,
      "features": {"gmat": false, "ielts": false, "study_abroad": false, "work_abroad": true, "native_speaker": false, "corporate": false}
    }
  ]
}
```

---

## 9. SPESIFIKASI ANIMASI

### 9.1 Animasi Halaman Load (Hero)

```javascript
// Sequence:
// 1. Background fade in (0ms - 300ms)
// 2. Orb gold mulai bergerak (200ms - 800ms)
// 3. Tag line reveal letter by letter (500ms - 1200ms)
// 4. Counter angka (31 kompetitor, 5 segmen) count up (900ms - 1500ms)
// 5. CTA button fade in + subtle bounce (1400ms - 1700ms)

gsap.timeline()
  .from('.hero-bg', { opacity: 0, duration: 0.3 })
  .from('.hero-orb', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out' }, 0.2)
  .from('.hero-title span', { opacity: 0, y: 20, stagger: 0.03 }, 0.5)
  .from('.hero-counter', { textContent: 0, duration: 1, snap: { textContent: 1 } }, 0.9)
  .from('.hero-cta', { opacity: 0, y: 10, duration: 0.3 }, 1.4);
```

### 9.2 Scroll-Triggered Animations (Semua Section)

```javascript
// Setiap section masuk viewport:
gsap.from('.section-header', {
  scrollTrigger: { trigger: '.section-header', start: 'top 80%' },
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: 'power2.out'
});

// Glass cards stagger masuk:
gsap.from('.glass-card', {
  scrollTrigger: { trigger: '.cards-grid', start: 'top 75%' },
  opacity: 0,
  y: 40,
  stagger: 0.1,
  duration: 0.5,
  ease: 'power2.out'
});

// Tabel row masuk satu per satu:
gsap.from('tbody tr', {
  scrollTrigger: { trigger: 'table', start: 'top 80%' },
  opacity: 0,
  x: -20,
  stagger: 0.05,
  duration: 0.3
});
```

### 9.3 Hover Effects (CSS)

```css
/* Tabel row hover */
tbody tr {
  transition: background 0.2s, transform 0.15s;
}
tbody tr:hover {
  background: rgba(212, 175, 55, 0.05);
  transform: translateX(4px);
}

/* Glass card hover lift */
.glass-card {
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
}
.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.35);
}

/* Gold button hover */
.btn-gold {
  transition: all 0.25s;
  background: var(--gradient-gold);
}
.btn-gold:hover {
  filter: brightness(1.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
}
```

### 9.4 Chart Animations

```javascript
// Chart.js animation config (semua chart):
{
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
    delay: (context) => context.dataIndex * 50
  }
}
```

### 9.5 Micro-interactions

- **Navigation active state**: Gold underline slides dengan `transition: width 0.3s`
- **Filter button toggle**: Scale 0.95 saat diklik, bounce kembali
- **Modal open**: Scale dari 0.95 ke 1.0 + fade, backdrop blur animasi
- **Price bar fill**: Animate width dari 0 ke nilai sebenarnya saat masuk viewport
- **Number formatting**: Angka Rupiah diformat dengan `toLocaleString('id-ID')`

---

## 10. RENCANA PENGEMBANGAN (SPRINT PLAN)

### Sprint 0: Setup & Fondasi (Estimasi: 1 hari)

**Tasks:**
- [ ] Buat struktur folder lengkap sesuai Section 2
- [ ] Setup `index.html` dengan semua CDN links (Tailwind, Chart.js, GSAP, Lucide, Google Fonts)
- [ ] Buat `main.css` dengan semua CSS variables dan glass card base styles
- [ ] Buat `competitors.json` dengan data lengkap 31 kompetitor (TIDAK ADA DATA DUMMY)
- [ ] Buat `utils.js` dengan helper: `formatRupiah()`, `formatDate()`, `scoreCompetitor()`
- [ ] Test load data dari JSON berhasil

**Output:** Halaman kosong dengan CSS variable sudah berfungsi, data bisa diakses.

### Sprint 1: Layout & Navigation (Estimasi: 0.5 hari)

**Tasks:**
- [ ] Buat sticky navigation liquid glass
- [ ] Buat scroll progress bar (gold thin line di atas)
- [ ] Buat footer
- [ ] Test responsive: desktop, tablet, mobile
- [ ] Implementasi smooth scroll behavior

**Output:** Shell halaman lengkap, navigasi berfungsi.

### Sprint 2: Hero & Executive Summary (Estimasi: 1 hari)

**Tasks:**
- [ ] Buat hero section dengan animasi orb dan counter
- [ ] Implementasi GSAP timeline hero load animation
- [ ] Buat 4 target segment cards (A, B, C, D)
- [ ] Buat infographic mini journey per segmen
- [ ] Buat insight box "celah pasar"

**Output:** Hero dan overview berfungsi dengan animasi.

### Sprint 3: Tabel Kompetitor per Segmen (Estimasi: 2 hari)

**Tasks:**
- [ ] Buat komponen tabel reusable (dirender dari JSON)
- [ ] Implementasi filter: Online/Luring/Hybrid, Sort by price
- [ ] Implementasi search real-time
- [ ] Buat modal detail kompetitor
- [ ] Implementasi price range visual bar
- [ ] Buat insight cards 3 per segmen
- [ ] Test semua 5 segmen tabel berfungsi
- [ ] Scroll-triggered animations untuk semua tabel

**Output:** 5 section tabel lengkap dengan interaksi.

### Sprint 4: Dashboard Charts (Estimasi: 1.5 hari)

**Tasks:**
- [ ] Chart 1: Grouped Bar distribusi harga per segmen
- [ ] Chart 2: Radar profil kemampuan kompetitor
- [ ] Chart 3: Bubble chart positioning map (interaktif)
- [ ] Chart 4: Donut distribusi lokasi
- [ ] Chart 5: Stacked bar garansi & transparansi
- [ ] Chart 6: Line chart biaya journey per segmen
- [ ] Chart 7: Heatmap kompetitor vs fitur (CSS grid)
- [ ] Chart 8: Distribution range harga per kategori
- [ ] Test semua chart responsive

**Output:** Dashboard charts penuh berfungsi.

### Sprint 5: Whitespace Analysis & Positioning (Estimasi: 1 hari)

**Tasks:**
- [ ] Buat Matrix 2x2 celah pasar (SVG custom)
- [ ] Buat tabel whitespace opportunity
- [ ] Buat positioning map interaktif (scatter plot)
- [ ] Buat comparison table head-to-head vs positioning baru

**Output:** Section analisis strategic berfungsi.

### Sprint 6: Polish & QA (Estimasi: 1 hari)

**Tasks:**
- [ ] Review semua animasi, timing, easing
- [ ] Test semua filter dan interaksi
- [ ] Pastikan data 100% akurat vs sumber
- [ ] Review tipografi dan spacing
- [ ] Test cross-browser (Chrome, Firefox, Safari)
- [ ] Test responsive mobile
- [ ] Optimize performance (lazy load chart saat scroll)
- [ ] Tambah loading state untuk fetch JSON
- [ ] Final proofread semua teks Indonesia

**Output:** Website siap presentasi.

**Total Estimasi: 7 hari kerja**

---

## 11. CHECKLIST KUALITAS FINAL

### Data Integrity
- [ ] Semua 31 kompetitor tercantum dalam JSON
- [ ] Semua harga sesuai sumber asli (tidak ada perubahan)
- [ ] Tidak ada data dummy atau data yang difabrikasi
- [ ] Semua kelebihan dan kekurangan tercantum sesuai sumber
- [ ] Lokasi semua kompetitor akurat

### Visual & UX
- [ ] Tema Black & Gold konsisten di seluruh halaman
- [ ] Liquid glass effect berfungsi di semua card dan nav
- [ ] Semua animasi scroll berfungsi
- [ ] Hero counter animation berjalan
- [ ] Tidak ada emdash (--) di seluruh konten
- [ ] Tipografi Cormorant Garamond + DM Sans termuat

### Interaktivitas
- [ ] Navigation sticky dan smooth scroll
- [ ] Filter tabel berfungsi (Online/Luring/Hybrid)
- [ ] Sort by price berfungsi ascending/descending
- [ ] Search real-time nama lembaga berfungsi
- [ ] Modal detail berfungsi (buka + tutup)
- [ ] Chart radar toggle kompetitor berfungsi
- [ ] Bubble chart tooltip berfungsi saat hover

### Charts
- [ ] Semua 8 chart ter-render dengan benar
- [ ] Chart menggunakan data asli dari JSON
- [ ] Chart responsif di mobile
- [ ] Label sumbu menggunakan format Rupiah Indonesia
- [ ] Warna chart konsisten dengan design system (gold palette)

### Responsif
- [ ] Desktop (1440px): Layout full
- [ ] Laptop (1024px): Layout adaptatif
- [ ] Tablet (768px): Tabel bisa scroll horizontal
- [ ] Mobile (375px): Tabel tereduksi ke card view

### Performa
- [ ] Semua chart di-lazy load saat scroll ke section charts
- [ ] JSON dimuat sekali dan di-cache dalam memori
- [ ] Animasi menggunakan CSS transform (bukan top/left)
- [ ] Font dimuat dengan `font-display: swap`

### Konten
- [ ] Semua teks dalam Bahasa Indonesia
- [ ] Tidak ada emdash (dilarang sesuai rules)
- [ ] Semua angka diformat dengan pemisah ribuan Indonesia (titik)
- [ ] Semua insight ditulis berdasarkan data nyata
- [ ] Executive summary mencerminkan celah pasar yang valid

---

*Dokumen ini adalah panduan pengembangan lengkap untuk website competitive analysis. Semua data bersumber dari riset pasar aktual tanpa interpolasi atau fabrikasi. Terakhir diperbarui: Juli 2025.*
