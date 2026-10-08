# X — Haber Sitesi Ana Sayfası

Genel Gündem, Siyaset, Ekonomi ve Din konularını kapsayan Türkçe bir haber sitesinin **statik ana sayfa tasarımı**.
“X” geçici bir isimdir. Bu aşama yalnızca görsel sunum ve arayüz etkileşimlerini kapsar: yönetim paneli, veritabanı, gerçek arama ve detay sayfaları yoktur.

> Bu site hâlâ yapım aşamasındadır. Sitede yer alan içerik ve görseller internet üzerinden yalnızca örnek ve tasarım amaçlı alınmıştır.

## Kullanılan teknolojiler

- **HTML5, CSS3 ve düz JavaScript (ES2020)**: framework, derleme adımı ya da paket bağımlılığı yok.
- **CSS:** Özel değişkenler (tema), Grid/Flexbox, container query (video oynatıcının yüksekliğe sığması) ve `<dialog>` (Shorts penceresi).
- **YouTube embed:** `youtube-nocookie.com` üzerinden.
- **Harici kaynaklar:** Görseller Unsplash'ten, video kapakları `i.ytimg.com`'dan doğrudan bağlantıyla yüklenir.

## Klasör yapısı

```
X/
├── index.html            Ana sayfa (tüm bölümler)
├── css/style.css         Tüm stiller; tema değişkenleri dosyanın başında
├── js/main.js            Etkileşimler ve site adı ayarı
├── js/media-config.js    Video ve Shorts listesi (YouTube kimlikleri)
├── assets/X.png          Logo (şeffaf zeminli siyah; header'da CSS ile beyaza çevrilir)
└── README.md
```

## Kurulum ve çalıştırma

Kurulum gerekmez. Ancak sayfa **bir web sunucusu üzerinden** açılmalıdır. `index.html` dosyasına çift tıklayarak (`file://`) açıldığında YouTube oynatıcıları “Error 153” hatası verebilir.

Proje klasöründe şu komutlardan birini çalıştırın:

```bash
python -m http.server 8123
```

```bash
npx serve -l 8123
```

Ardından tarayıcıda `http://localhost:8123` adresini açın.

Yayına almak için klasörün tamamını herhangi bir statik barındırma hizmetine yüklemek yeterlidir (GitHub Pages, Netlify, sıradan bir web sunucusu vb.).

## Ana sayfa bölümleri

Sıra: Header → Slider → Son Haberler → Haberler / Bugünün En Çok Okunanları → Video → Shorts → Makaleler → Bilgilendirme yazısı → Footer.

Masaüstü referansı 1920×1080'dir. Header ve footer zemini tam genişliktedir. Diğer bölümler (footer içeriği dahil) ortalanır ve ekran genişliğinin **%40'ını** kullanır (1920px'te 768px). Dar ekranlarda bölümler, 16px kenar boşluğu bırakarak ekran genişliğine yayılır.

| Bölüm | Masaüstü düzeni | Mobil / dar ekran |
|---|---|---|
| **Header** | 44px yükseklik. Solda logo, ortada 8 bağlantı, sağda arama ve sosyal medya simgeleri | 1100px altında bağlantılar hamburger menüye geçer |
| **Slider** | 4 haber görseli, 16:9 oran | 4:3 oran, parmakla kaydırma |
| **Son Haberler** | 3×2 kart: görsel, kategori, başlık, özet, “Daha fazlasını gör” | Tablette 2, mobilde 1 sütun |
| **Haberler / En Çok Okunanlar** | %70 / %30. Solda 3×3 görsel ve başlık kartı, sağda numaralı 5 haber | Alt alta. Kartlar 3 sütun, 520px altında yatay liste |
| **Video** | Toplam 470px, %70 oynatıcı / %30 kaydırılabilir liste | Yükseklik içeriğe göre; oynatıcı ve liste alt alta |
| **Shorts** (“Kısaca Haberlerimiz”) | %20 başlık / %80 dört dikey kapak | Başlık üstte, kapaklar yatay kaydırılır |
| **Makalelerimiz** | Toplam 500px, açılır kapanır 5 makale | Yükseklik içeriğe göre |
| **Bilgilendirme yazısı** | Düz metin, içerik genişliğinde | Aynı |
| **Footer** | Site adı, kısa açıklama, gezinme bağlantıları, telif satırı | Tek sütun |

## Etkileşimler

- **Hamburger menü** (1100px altı): Açılıp kapanır. Esc tuşu ya da menü dışına tıklama kapatır.
- **Arama alanı:** Arama butonu header'ın altında bir alan açar ve kapatır. Gerçek arama yapılmaz. Arama alanı ile menü aynı anda açık kalmaz.
- **Slider:**
  - 5 saniyede bir otomatik ilerler (1 → 2 → 3 → 4 → 1).
  - Ok butonlarıyla iki yönde gezilir; son ve ilk görsel arasında sıçrama olmadan sonsuz döngü yapar.
  - Dokunmatik ekranda parmakla kaydırılabilir, klavyede ← ve → tuşlarıyla gezilebilir.
  - Fare üzerindeyken otomatik geçiş durur.
- **Haber kartları:** Üzerine gelindiğinde hafif gölge ve görsel yakınlaşması olur. “Haberler” kartları 1.02 ölçeğinde büyür.
- **Video bölümü:**
  - Soldaki video site içinde oynar ve otomatik başlamaz.
  - Sağdaki liste kaydırılabilir; bağlantıları YouTube'da yeni sekmede açılır.
- **Shorts:**
  - Kapağa tıklanınca video site içinde kapatılabilir bir pencerede oynar.
  - Pencere çarpı butonu, arka plana tıklama ya da Esc ile kapanır; kapanınca video durur.
  - Shorts açılınca oynayan ana video duraklatılır.
- **Makalelerimiz:**
  - Başlangıçta tümü kapalıdır ve aynı anda yalnızca bir makale açık kalır.
  - Açık başlığa tekrar tıklamak onu kapatır.
  - Klavyede Enter veya Boşluk açıp kapatır; ↑, ↓, Home ve End başlıklar arasında gezer.

## Geçici örnek içerikler

- **Metinler:** Tüm haber başlıkları, özetler, en çok okunanlar ve makaleler **sunum amaçlı örnek içeriktir**.
- **Görseller:** Unsplash'ten doğrudan bağlantıyla yüklenir (`images.unsplash.com`).
- **Videolar:** BBC News Türkçe, DW Türkçe ve KRT TV kanallarının gömülmeye izin veren gerçek YouTube videolarıdır. Başlıklar videoların kendi başlıklarıdır.
- **Bağlantılar:** Menü, kart, makale ve sosyal medya bağlantıları şimdilik `#` adresine gider.
- **Shorts bağlantısı:** “Daha fazlasını görün” şimdilik `https://www.youtube.com/shorts` adresine yönlendirir.

## Neler nereden değiştirilir?

### Site adı
- `js/main.js` dosyasının başındaki `SITE_CONFIG.name` değeri, sayfa açıldığında footer'daki adı, telif satırını, logo alternatif metnini ve sekme başlığını günceller.
- Arama motorları ve JavaScript'siz görünüm için `index.html` içindeki `<title>`, `<meta name="description">` ve `alt="X"` değerlerini de güncelleyin.

### Logo
- `assets/X.png` dosyasını aynı adla değiştirin ya da `index.html` içindeki üç `assets/X.png` yolunu (favicon, header, footer) güncelleyin.
- Logo koyu header'da `filter: invert(1)` ile beyaza çevrilir (`css/style.css` → `.logo-img`). Logo zaten açık renkliyse bu satırı kaldırın.

### Renk paleti, yazı ve ölçüler
- `css/style.css` başındaki `:root` bloğunda tanımlıdır.
- **Ana palet:** `--color-dark` (#2B2B2B), `--color-mid` (#545454), `--color-light` (#7C7C7C).
- **Nötr tonlar:** Zemin, kart ve metin renkleri (`--color-bg`, `--color-surface`, `--color-text-soft`, `--color-on-dark-*` …).
- **Yazı ölçeği:** `--fs-xs` … `--fs-xl`, satır aralıkları `--lh-tight` ve `--lh-body`.
- **İçerik genişliği:** `--content-max` (masaüstü %40), `--content-min` (dar ekran üst sınırı).
- **Boşluklar:** `--section-space`, `--gap`, `--card-gap`, `--panel-pad`, `--gutter`.
- **Köşe yuvarlaklığı:** `--radius` ve `--radius-sm`.

### Görseller ve haber metinleri
- `index.html` içinde ilgili bölümün `<img src="…">` ve metinlerinde doğrudan düzenlenir.
- Unsplash adreslerindeki `w`/`h` parametreleri kırpma boyutunu belirler. Görseller CSS'te `object-fit: cover` ile sabit oranda (16:9, mobil slider 4:3) gösterildiğinden farklı oranlı görseller esnemez, ortadan kırpılır.

### Video ve Shorts
Yalnızca `js/media-config.js` dosyası düzenlenir:

- `featuredVideo`: Video bölümünde site içinde oynatılan ana video.
- `videoList`: Sağdaki liste (YouTube'da açılır).
- `shorts`: “Kısaca Haberlerimiz” kapakları.
- `shortsMoreUrl`: “Daha fazlasını görün” bağlantısının hedefi.

Her öğede `id` YouTube video kimliğidir. Örneğin `youtube.com/watch?v=H2HyIJ9YQyI` veya `youtube.com/shorts/1epiTTFXHvY` adresindeki son parça. Seçilen videoların sahibi gömülü oynatmaya izin vermiş olmalıdır.

### Geçici bağlantılar
`index.html` içindeki `href="#"` değerleri gerçek sayfa adresleriyle değiştirilir. Makaleler bölümünde ilgili yerler bir yorum satırıyla işaretlidir.

## Bilinen sınırlamalar

- Gerçek arama, haber ve makale detay sayfaları, yönetim paneli ve veri altyapısı yoktur.
- Görseller ve videolar harici kaynaklardan yüklenir; kaynak kaldırılırsa yerine yenisi konmalıdır.
- Makaleler bölümü masaüstünde sabit 500px yüksekliktedir. Bu alan bir makale açıkken sığacak şekilde ayarlandığı için, tümü kapalıyken altta boşluk kalır.
- Örnek Shorts içeriklerinin bir kısmı siyasi gündem içeriklidir; yayından önce sitenin kendi içerikleriyle değiştirilmesi önerilir.
