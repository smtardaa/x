/* =========================================================
   Video ve Shorts ayarları
   ---------------------------------------------------------
   Videoları değiştirmek için yalnızca bu dosyayı düzenleyin.
   "id": YouTube video kimliği
     ör. https://www.youtube.com/watch?v=H2HyIJ9YQyI  → 'H2HyIJ9YQyI'
     ör. https://www.youtube.com/shorts/1epiTTFXHvY    → '1epiTTFXHvY'
   Not: Seçilen videoların sahibi gömülü oynatmaya izin vermiş olmalıdır.
   Aşağıdakiler gömülmeye izin veren örnek videolardır.
   ========================================================= */
const MEDIA_CONFIG = {
  // Video bölümünde site içinde oynatılan ana video
  featuredVideo: {
    id: 'H2HyIJ9YQyI',
    title: 'İstanbul: Binanızın depreme dayanıklı olup olmadığını nasıl anlarsınız?',
    channel: 'BBC News Türkçe',
  },

  // Sağdaki liste — bağlantılar YouTube'da yeni sekmede açılır
  videoList: [
    { id: 'i6wRX60TQVQ', title: "Türkiye'nin 'gözetleme merkezi': Kandilli", channel: 'BBC News Türkçe' },
    { id: 'UIw8XODsncc', title: "Türkiye'de hiperenflasyon riski var mı?", channel: 'DW Türkçe' },
    { id: 'IQZN4af08Aw', title: "Kahramanmaraş depremleri: Harita ve grafiklerle Türkiye'yi sarsan gün", channel: 'BBC News Türkçe' },
    { id: 'hpnC52dKnBM', title: "Türkiye ile ABD'de enflasyon aynı sebepten mi artışta?", channel: 'DW Türkçe' },
    { id: 'N9Nx79WHFRU', title: 'İklim krizi: 50 derece sıcaklıkta nasıl yaşanır?', channel: 'BBC News Türkçe' },
    { id: 'p3-20LJxzCk', title: 'Enflasyon yıl sonunda kaç olacak?', channel: 'DW Türkçe' },
    { id: 'FB-Nj7dH5rk', title: 'İklim krizi: COP26 neden önemli?', channel: 'BBC News Türkçe' },
    { id: '-7vqKRBnYHw', title: 'Yüz nakli: Bir yabancının yüzüyle yaşamak', channel: 'BBC News Türkçe' },
    { id: 'Qyq_WDAoI_Q', title: "Dünya'yı nasıl bozduk, tamir etmek için ne yapmalıyız?", channel: 'BBC News Türkçe' },
  ],

  // "Kısaca Haberlerimiz" — tıklanınca site içindeki pencerede oynatılır
  shorts: [
    { id: '1epiTTFXHvY', title: "Türkiye'de neler yaşadığını anlattı", channel: 'DW Türkçe' },
    { id: 'lBFXni-dfVg', title: 'BBC Türkçe komisyon raporuna ulaştı', channel: 'BBC News Türkçe' },
    { id: '9ZU0w_kw-hU', title: 'Filistin devletini tanıyan ve tanımayan ülkeler hangileri?', channel: 'BBC News Türkçe' },
    { id: 'FE0jrN8emP0', title: 'Ramazan Bayramı tatili 9 gün olarak açıklandı', channel: 'KRT TV' },
  ],

  // "Daha fazlasını görün" hedefi — sitenin YouTube kanalı belli olunca değiştirin
  // ör. 'https://www.youtube.com/@kanaladi/shorts'
  shortsMoreUrl: 'https://www.youtube.com/shorts',
};
