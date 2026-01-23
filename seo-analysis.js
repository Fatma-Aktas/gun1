const cheerio = require('cheerio');
const fs = require('fs');

async function analyzeSEO() {
    console.log('🔍 SEO Analizi Başlıyor...\n');

    try {
        // index.html dosyasını oku
        const html = fs.readFileSync('./index.html', 'utf8');
        const $ = cheerio.load(html);

        console.log('═══════════════════════════════════════════════════════');
        console.log('📊 SEO ANALİZ RAPORU - Fatma Aktaş Portfolio');
        console.log('═══════════════════════════════════════════════════════\n');

        // BAŞLIK ANALİZİ
        console.log('📝 BAŞLIK TAGLERİ:');
        console.log('─────────────────────────────────────────────────────');

        const title = $('title').text();
        const metaDescription = $('meta[name="description"]').attr('content');
        const metaKeywords = $('meta[name="keywords"]').attr('content');
        const metaAuthor = $('meta[name="author"]').attr('content');

        console.log(`✓ Sayfa Başlığı: ${title}`);
        console.log(`  Karakter Sayısı: ${title.length} (İdeal: 50-60)`);
        if (title.length > 60) {
            console.log(`  ⚠️  Başlık çok uzun, Google'da kesilerek görünebilir`);
        } else if (title.length < 30) {
            console.log(`  ⚠️  Başlık çok kısa, daha açıklayıcı olabilir`);
        } else {
            console.log(`  ✅ Başlık uzunluğu ideal`);
        }

        if (metaDescription) {
            console.log(`\n✓ Meta Açıklama: ${metaDescription}`);
            console.log(`  Karakter Sayısı: ${metaDescription.length} (İdeal: 150-160)`);
            if (metaDescription.length > 160) {
                console.log(`  ⚠️  Açıklama çok uzun, Google'da kesilerek görünebilir`);
            } else if (metaDescription.length < 120) {
                console.log(`  ⚠️  Açıklama çok kısa, daha detaylı olabilir`);
            } else {
                console.log(`  ✅ Açıklama uzunluğu ideal`);
            }
        } else {
            console.log(`\n⚠️  Meta Açıklama: EKSİK`);
        }

        if (metaKeywords) {
            const keywords = metaKeywords.split(',').map(k => k.trim());
            console.log(`\n✓ Meta Keywords: ${keywords.length} adet`);
            console.log(`  ${keywords.slice(0, 5).join(', ')}...`);
        }

        if (metaAuthor) {
            console.log(`\n✓ Meta Author: ${metaAuthor}`);
        }

        // BAŞLIK HİYERARŞİSİ
        console.log('\n\n📑 BAŞLIK HİYERARŞİSİ:');
        console.log('─────────────────────────────────────────────────────');

        const h1s = $('h1');
        const h2s = $('h2');
        const h3s = $('h3');
        const h4s = $('h4');

        console.log(`H1 Sayısı: ${h1s.length} ${h1s.length === 1 ? '✅' : '⚠️'}`);
        if (h1s.length === 0) {
            console.log(`  ⚠️  H1 başlığı bulunamadı - her sayfada bir H1 olmalı`);
        } else if (h1s.length > 1) {
            console.log(`  ⚠️  Birden fazla H1 var - sadece bir tane olmalı`);
        } else {
            console.log(`  ✅ Tek H1 başlığı var (SEO best practice)`);
        }

        h1s.each((i, el) => {
            const text = $(el).text().trim().substring(0, 100);
            console.log(`  ${i + 1}. "${text}"`);
        });

        console.log(`\nH2 Sayısı: ${h2s.length}`);
        console.log(`H3 Sayısı: ${h3s.length}`);
        console.log(`H4 Sayısı: ${h4s.length}`);

        // GÖRSEL ANALİZİ
        console.log('\n\n🖼️  GÖRSEL ANALİZİ:');
        console.log('─────────────────────────────────────────────────────');

        const images = $('img');
        let imagesWithoutAlt = 0;
        const missingAltImages = [];

        images.each((i, el) => {
            const alt = $(el).attr('alt');
            const src = $(el).attr('src');
            if (!alt || alt.trim() === '') {
                imagesWithoutAlt++;
                missingAltImages.push(src);
            }
        });

        console.log(`Toplam Görsel: ${images.length}`);
        console.log(`Alt Tag ile: ${images.length - imagesWithoutAlt} ✅`);
        console.log(`Alt Tag eksik: ${imagesWithoutAlt} ${imagesWithoutAlt === 0 ? '✅' : '⚠️'}`);

        if (imagesWithoutAlt > 0) {
            console.log(`\n⚠️  Alt tag eksik görseller:`);
            missingAltImages.slice(0, 5).forEach((src, i) => {
                console.log(`  ${i + 1}. ${src}`);
            });
            if (missingAltImages.length > 5) {
                console.log(`  ... ve ${missingAltImages.length - 5} görseller daha`);
            }
        }

        // LINK ANALİZİ
        console.log('\n\n🔗 LINK ANALİZİ:');
        console.log('─────────────────────────────────────────────────────');

        const links = $('a');
        let internalLinks = 0;
        let externalLinks = 0;
        let nofollow = 0;
        let brokenLinks = 0;

        links.each((i, el) => {
            const href = $(el).attr('href');
            const rel = $(el).attr('rel');

            if (!href || href === '#') {
                return;
            }

            if (href.startsWith('#') || href.startsWith('/')) {
                internalLinks++;
            } else if (href.startsWith('http')) {
                externalLinks++;
            }

            if (rel && rel.includes('nofollow')) {
                nofollow++;
            }
        });

        console.log(`Toplam Link: ${links.length}`);
        console.log(`İç Linkler: ${internalLinks}`);
        console.log(`Dış Linkler: ${externalLinks}`);
        console.log(`Nofollow Linkler: ${nofollow}`);

        // OPEN GRAPH
        console.log('\n\n📱 OPEN GRAPH (SOSYAL MEDYA):');
        console.log('─────────────────────────────────────────────────────');

        const ogTitle = $('meta[property="og:title"]').attr('content');
        const ogDescription = $('meta[property="og:description"]').attr('content');
        const ogType = $('meta[property="og:type"]').attr('content');
        const ogUrl = $('meta[property="og:url"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');

        console.log(`${ogTitle ? '✅' : '⚠️ '} OG Title: ${ogTitle || 'Eksik'}`);
        console.log(`${ogDescription ? '✅' : '⚠️ '} OG Description: ${ogDescription || 'Eksik'}`);
        console.log(`${ogType ? '✅' : '⚠️ '} OG Type: ${ogType || 'Eksik'}`);
        console.log(`${ogUrl ? '✅' : '⚠️ '} OG URL: ${ogUrl || 'Eksik'}`);
        console.log(`${ogImage ? '✅' : '⚠️ '} OG Image: ${ogImage || 'Eksik - Sosyal medya paylaşımları için önemli!'}`);

        // TWITTER CARDS
        console.log('\n\n🐦 TWITTER CARDS:');
        console.log('─────────────────────────────────────────────────────');

        const twitterCard = $('meta[name="twitter:card"]').attr('content');
        const twitterTitle = $('meta[name="twitter:title"]').attr('content');
        const twitterDescription = $('meta[name="twitter:description"]').attr('content');
        const twitterImage = $('meta[name="twitter:image"]').attr('content');

        if (twitterCard) {
            console.log(`✅ Twitter Card Type: ${twitterCard}`);
            console.log(`${twitterTitle ? '✅' : '⚠️ '} Twitter Title: ${twitterTitle || 'Eksik'}`);
            console.log(`${twitterDescription ? '✅' : '⚠️ '} Twitter Description: ${twitterDescription || 'Eksik'}`);
            console.log(`${twitterImage ? '✅' : '⚠️ '} Twitter Image: ${twitterImage || 'Eksik'}`);
        } else {
            console.log(`⚠️  Twitter Cards tagları bulunamadı`);
        }

        // TEKNİK SEO
        console.log('\n\n⚙️  TEKNİK SEO:');
        console.log('─────────────────────────────────────────────────────');

        const lang = $('html').attr('lang');
        const charset = $('meta[charset]').attr('charset');
        const viewport = $('meta[name="viewport"]').attr('content');
        const canonical = $('link[rel="canonical"]').attr('href');
        const robots = $('meta[name="robots"]').attr('content');

        console.log(`${lang ? '✅' : '⚠️ '} HTML Lang: ${lang || 'Eksik'}`);
        console.log(`${charset ? '✅' : '⚠️ '} Charset: ${charset || 'Eksik'}`);
        console.log(`${viewport ? '✅' : '⚠️ '} Viewport: ${viewport ? 'Var' : 'Eksik'}`);
        console.log(`${canonical ? '✅' : '⚠️ '} Canonical URL: ${canonical || 'Eksik'}`);
        console.log(`${robots ? '✅' : 'ℹ️ '} Robots Meta: ${robots || 'Yok (varsayılan: index, follow)'}`);

        // Structured Data
        const jsonLd = $('script[type="application/ld+json"]');
        console.log(`${jsonLd.length > 0 ? '✅' : '⚠️ '} Structured Data (JSON-LD): ${jsonLd.length > 0 ? 'Var' : 'Eksik'}`);

        // PERFORMANS İPUÇLARI
        console.log('\n\n⚡ PERFORMANS İPUÇLARI:');
        console.log('─────────────────────────────────────────────────────');

        const preconnect = $('link[rel="preconnect"]').length;
        const preload = $('link[rel="preload"]').length;
        const async = $('script[async]').length;
        const defer = $('script[defer]').length;

        console.log(`Preconnect Linkleri: ${preconnect} ${preconnect > 0 ? '✅' : ''}`);
        console.log(`Preload Linkleri: ${preload} ${preload > 0 ? '✅' : ''}`);
        console.log(`Async Script'ler: ${async} ${async > 0 ? '✅' : ''}`);
        console.log(`Defer Script'ler: ${defer} ${defer > 0 ? '✅' : ''}`);

        // GENEL DEĞERLENDİRME
        console.log('\n\n📈 GENEL DEĞERLENDİRME:');
        console.log('─────────────────────────────────────────────────────');

        const strengths = [];
        const warnings = [];
        const critical = [];

        // Güçlü yönler
        if (title.length >= 30 && title.length <= 60) {
            strengths.push('Başlık uzunluğu ideal aralıkta');
        }
        if (metaDescription && metaDescription.length >= 120 && metaDescription.length <= 160) {
            strengths.push('Meta açıklama uzunluğu ideal aralıkta');
        }
        if (h1s.length === 1) {
            strengths.push('Tek H1 başlığı kullanılmış (SEO best practice)');
        }
        if (ogTitle && ogDescription && ogUrl) {
            strengths.push('Open Graph tagları mevcut');
        }
        if (lang) {
            strengths.push('HTML lang attribute tanımlanmış');
        }
        if (viewport) {
            strengths.push('Viewport meta tag mevcut (mobil uyumlu)');
        }
        if (imagesWithoutAlt === 0 && images.length > 0) {
            strengths.push('Tüm görsellerde alt tag var');
        }
        if (preconnect > 0) {
            strengths.push('Preconnect kullanılmış (performans optimizasyonu)');
        }

        // Uyarılar
        if (title.length > 60) {
            warnings.push('Başlık çok uzun (60+ karakter) - Google\'da kesilerek görünebilir');
        }
        if (metaDescription && metaDescription.length > 160) {
            warnings.push('Meta açıklama çok uzun (160+ karakter)');
        }
        if (h1s.length > 1) {
            warnings.push(`Birden fazla H1 başlığı var (${h1s.length} adet)`);
        }
        if (imagesWithoutAlt > 0) {
            warnings.push(`${imagesWithoutAlt} görselin alt tag'i eksik`);
        }
        if (!ogImage) {
            warnings.push('Open Graph image eksik (sosyal medya paylaşımları için önemli)');
        }
        if (!canonical) {
            warnings.push('Canonical URL eksik');
        }
        if (jsonLd.length === 0) {
            warnings.push('Structured Data (JSON-LD) eksik (zengin snippet\'ler için önemli)');
        }

        // Kritik sorunlar
        if (!title) {
            critical.push('Sayfa başlığı eksik - ACELE!');
        }
        if (!metaDescription) {
            critical.push('Meta açıklama eksik - Google arama sonuçlarında görünmeyebilir');
        }
        if (h1s.length === 0) {
            critical.push('H1 başlığı eksik - Her sayfada bir H1 olmalı');
        }
        if (!lang) {
            critical.push('HTML lang attribute eksik');
        }
        if (!viewport) {
            critical.push('Viewport meta tag eksik - Mobil uyumluluk sorunu');
        }

        if (strengths.length > 0) {
            console.log('\n✅ Güçlü Yönler:');
            strengths.forEach(strength => console.log(`   ✓ ${strength}`));
        }

        if (warnings.length > 0) {
            console.log('\n⚠️  İyileştirme Önerileri:');
            warnings.forEach(warning => console.log(`   ⚡ ${warning}`));
        }

        if (critical.length > 0) {
            console.log('\n❌ KRİTİK SORUNLAR:');
            critical.forEach(issue => console.log(`   ✗ ${issue}`));
        }

        // SKOR HESAPLAMA
        let score = 100;

        // Kritik sorunlar için büyük ceza
        score -= critical.length * 15;

        // Uyarılar için orta ceza
        score -= warnings.length * 5;

        // Alt tag eksiklikleri
        score -= Math.min(imagesWithoutAlt * 2, 20);

        // Minimum 0
        score = Math.max(0, score);

        console.log('\n═══════════════════════════════════════════════════════');
        console.log(`🎯 SEO SKORU: ${score}/100`);

        let scoreEmoji = '';
        let scoreMessage = '';

        if (score >= 90) {
            scoreEmoji = '🏆';
            scoreMessage = 'Mükemmel! Siteniz SEO açısından harika durumda!';
        } else if (score >= 80) {
            scoreEmoji = '🎉';
            scoreMessage = 'Harika! Siteniz SEO açısından iyi durumda.';
        } else if (score >= 70) {
            scoreEmoji = '👍';
            scoreMessage = 'İyi, ancak bazı iyileştirmeler yapılabilir.';
        } else if (score >= 60) {
            scoreEmoji = '😐';
            scoreMessage = 'Orta seviye. Daha fazla iyileştirme gerekiyor.';
        } else {
            scoreEmoji = '⚠️';
            scoreMessage = 'Dikkat! Önemli SEO iyileştirmelerine ihtiyaç var.';
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n${scoreEmoji} ${scoreMessage}\n`);

        // ÖNERİLER
        console.log('💡 ÖNCELİKLİ YAPILACAKLAR:');
        console.log('─────────────────────────────────────────────────────');

        const todos = [];

        if (critical.length > 0) {
            todos.push('1. KRİTİK: Yukarıdaki kritik sorunları çözün');
        }
        if (!ogImage) {
            todos.push('2. Open Graph image ekleyin (1200x630px önerilen boyut)');
        }
        if (!canonical) {
            todos.push('3. Canonical URL ekleyin');
        }
        if (jsonLd.length === 0) {
            todos.push('4. Structured Data (JSON-LD) ekleyin (Schema.org)');
        }
        if (imagesWithoutAlt > 0) {
            todos.push(`5. ${imagesWithoutAlt} görsele alt tag ekleyin`);
        }
        if (!twitterCard) {
            todos.push('6. Twitter Cards meta tagları ekleyin');
        }

        if (todos.length > 0) {
            todos.forEach(todo => console.log(`   ${todo}`));
        } else {
            console.log('   Tebrikler! Yapılması gereken acil bir şey yok. 🎉');
        }

        console.log('\n✨ Analiz tamamlandı!\n');

        // Raporu dosyaya kaydet
        const reportDate = new Date().toLocaleString('tr-TR');
        const report = `
SEO ANALİZ RAPORU
═══════════════════════════════════════════════════════
Tarih: ${reportDate}
Site: Fatma Aktaş Portfolio
URL: https://fatma-aktas.github.io/gun1/
═══════════════════════════════════════════════════════

SKOR: ${score}/100

BAŞLIK TAGLERİ:
- Sayfa Başlığı: ${title} (${title.length} karakter)
- Meta Açıklama: ${metaDescription || 'EKSİK'} ${metaDescription ? `(${metaDescription.length} karakter)` : ''}

BAŞLIK HİYERARŞİSİ:
- H1: ${h1s.length}
- H2: ${h2s.length}
- H3: ${h3s.length}
- H4: ${h4s.length}

GÖRSEL ANALİZİ:
- Toplam Görsel: ${images.length}
- Alt Tag ile: ${images.length - imagesWithoutAlt}
- Alt Tag eksik: ${imagesWithoutAlt}

LINK ANALİZİ:
- Toplam Link: ${links.length}
- İç Linkler: ${internalLinks}
- Dış Linkler: ${externalLinks}

GÜÇLÜ YÖNLER:
${strengths.map(s => `- ${s}`).join('\n')}

İYİLEŞTİRME ÖNERİLERİ:
${warnings.map(w => `- ${w}`).join('\n')}

${critical.length > 0 ? `KRİTİK SORUNLAR:\n${critical.map(c => `- ${c}`).join('\n')}` : ''}
`;

        fs.writeFileSync('./seo-report.txt', report);
        console.log('📄 Detaylı rapor "seo-report.txt" dosyasına kaydedildi.\n');

    } catch (error) {
        console.error('❌ Analiz sırasında hata oluştu:', error.message);
        process.exit(1);
    }
}

analyzeSEO();
