# Rencana Implementasi Fitur Search & Filter Blog

Dokumen ini menjelaskan rencana implementasi, tingkat kesulitan, serta rancangan UI/UX (termasuk wireframe) untuk menambahkan fitur pencarian (Search) dan penyaringan berdasarkan tag (Filter) pada halaman blog **Gading's Hideout**.

---

## 1. Analisis Tingkat Kesulitan

* **Tingkat Kesulitan**: **Mudah - Sedang (Easy to Medium)**
* **Estimasi Waktu Pengerjaan**: **1 - 2 Jam**
* **Mengapa Mudah?**
  * Proyek menggunakan file Markdown/MDX lokal (`src/contents/posts/...`). Semua data postingan sudah di-parsing secara statis di [content-parser.ts](file:///Users/gadingnst/Workspace/private/gading.dev/src/modules/Content/services/content-parser.ts).
  * Kita tidak memerlukan backend server, database runtime, atau service eksternal (seperti Algolia). Kita cukup mengirimkan array metadata ringan dari semua postingan ke klien (Client-side Search & Filter) sehingga pencarian terasa sangat cepat dan responsif (real-time).

---

## 2. Rancangan UI/UX & Wireframe

Untuk mempertahankan estetika modern, minimalis, dan *glassmorphism* (*liquid glass*) pada desain situs Anda saat ini, elemen Search dan Filter dirancang sebagai berikut:

### Konsep Penempatan:
1. **Search Bar**: Kita tumpuk secara *overlap* di bagian bawah Banner Blog dengan margin negatif (`-mt-8` atau `-mt-10`). Ini akan menyatukan Banner dengan daftar artikel secara mulus.
2. **Tag Filter Pills**: Ditempatkan tepat di bawah Search Bar untuk memudahkan filter sekali-klik sebelum melihat daftar artikel.
3. **Card Listing**: Daftar artikel akan bergeser ke bawah sedikit dan memperbarui daftar kartu secara dinamis dengan animasi transisi yang halus.

### ASCII Wireframe Layout:

```text
+-------------------------------------------------------------------+
|                         GADING'S HIDEOUT                          |
+-------------------------------------------------------------------+
|                                                                   |
|                            [ BANNER ]                             |
|                                                                   |
|                              Blog                                 |
|          "Kode, pekerjaan, kehidupan, dan apapun..."             |
|                                                                   |
+-------------------------------------------------------------------+
|                                                                   |
|         +-----------------------------------------------+         |
|     - - |  [🔍] Cari artikel berdasarkan judul/desk...  | - - -   | <-- Overlapping Glassmorphic Search
|         +-----------------------------------------------+         |     (Glow Border & Liquid Glass Effect)
|                                                                   |
|         +-----------------------------------------------+         |
|         |  All   #database   #caching   #react   #vps   |         | <-- Horizontal Scrollable Tag Pills
|         +-----------------------------------------------+         |     (Active: Glow, Inactive: Muted Glass)
|                                                                   |
|   +-----------------------------+ +-----------------------------+  |
|   | KARTU ARTIKEL 1             | | KARTU ARTIKEL 2             |  |
|   |                             | |                             |  |
|   | [database] [postgresql]     | | [ai] [graphrag]             |  |
|   +-----------------------------+ +-----------------------------+  |
|                                                                   |
|                          [ PAGINATION ]                           |
|                                                                   |
+-------------------------------------------------------------------+
```

### Detail Elemen UI/UX:
* **Search Input**:
  * Menggunakan input bergaya DaisyUI (`input input-bordered`) yang dibungkus dengan kelas `liquid-glass`.
  * Memiliki icon Search (`lucide-react`'s `<Search />`) di sisi kiri.
  * Dilengkapi tombol "clear" (silang) kecil di sisi kanan jika input terisi, agar user bisa reset pencarian dengan sekali klik.
* **Tag Pills**:
  * Berupa tombol-tombol kecil (*pills*) horizontal yang dapat di-scroll di mobile jika tag-nya banyak.
  * Ketika salah satu tag dipilih, tag tersebut akan menyala (misal menggunakan kelas `.btn-primary` atau border glow) dan menyaring artikel secara real-time.
* **Empty State**:
  * Jika pencarian/filter menghasilkan 0 artikel, tampilkan ilustrasi kecil atau teks informatif: *"Artikel tidak ditemukan. Coba gunakan kata kunci lain"* disertai tombol untuk me-reset pencarian.

---

## 3. Arsitektur Teknis

Karena Next.js menggunakan static HTML export (`IS_STATIC=true`), semua pencarian akan dijalankan di sisi klien (Client-side) menggunakan React state.

### Aliran Data (Data Flow):
* **Build Time**: `getAllBlogMeta` dijalankan saat build untuk mengumpulkan metadata semua artikel.
* **Server Component**: `BlogListPage` mempassing array metadata ringan ini ke `BlogSearchFilter` (Client Component).
* **Client Component**: `BlogSearchFilter` melakukan filter berdasarkan string pencarian dan tag yang aktif secara real-time, lalu memecah hasilnya ke halaman-halaman (pagination) di browser.
* **Keamanan Payload**: Kita hanya mengirimkan **metadata** (judul, slug, tags, deskripsi, tanggal) ke client, bukan keseluruhan isi artikel. Payload total untuk ~50 artikel hanya berkisar **~15KB**, sangat ringan untuk di-load langsung.

---

## 4. Langkah-Langkah Implementasi

### Langkah 1: Buat Endpoint Data Baru di Server (Opsional tapi Direkomendasikan)
Jika ingin memisahkan logika, kita bisa membuat fungsi pembantu di [content-parser.ts](file:///Users/gadingnst/Workspace/private/gading.dev/src/modules/Content/services/content-parser.ts) untuk mengumpulkan semua metadata artikel beserta daftar unik dari seluruh tag yang ada.

```typescript
// Mengambil semua meta post dan daftar unik dari semua tag
export async function getBlogSearchData(language: string) {
  const allBlogs = await getAllBlogMeta(language);
  const blogsData = allBlogs.map(({ meta }) => meta);
  
  // Ambil semua tag unik
  const tagsSet = new Set<string>();
  blogsData.forEach(blog => {
    if (blog.tags) {
      blog.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  
  return {
    blogs: blogsData,
    tags: Array.from(tagsSet)
  };
}
```

### Langkah 2: Buat Client Component `BlogSearchFilter.tsx`
Buat komponen baru di `src/modules/Blog/components/BlogSearchFilter.tsx`. Komponen ini akan memiliki:
* State `searchQuery` (string)
* State `selectedTag` (string | null)
* State `currentPage` (number)

Logika filter di client-side:
```typescript
const filteredBlogs = blogs.filter(blog => {
  const matchesSearch = 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    
  const matchesTag = selectedTag ? blog.tags?.includes(selectedTag) : true;
  
  return matchesSearch && matchesTag;
});
```

### Langkah 3: Integrasikan ke Halaman Blog Utama
Ganti pemanggilan langsung daftar artikel statis di [PageList.tsx](file:///Users/gadingnst/Workspace/private/gading.dev/src/modules/Blog/components/PageList.tsx) dengan komponen `BlogSearchFilter` yang baru, lalu oper seluruh metadata artikel ke dalamnya.

---

## 5. Kesimpulan

Implementasi ini **sangat tidak sulit** dan tidak membebani performa server karena dikerjakan 100% secara client-side, yang sekaligus menjamin kompatibilitas penuh dengan target **static HTML export** Anda. 

Desain UI dengan memanfaatkan margin negatif untuk menempatkan Search Bar secara *overlapping* di atas layout banner saat ini akan memberikan kesan modern dan menyatu.
