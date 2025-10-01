# Ad Banner Examples

This file contains ready-to-use examples for different ad networks and custom banner implementations.

## Table of Contents

1. [Google AdSense](#google-adsense)
2. [Custom Image Ads](#custom-image-ads)
3. [Text-Based Ads](#text-based-ads)
4. [Animated Banner](#animated-banner)
5. [Video Ads](#video-ads)
6. [Affiliate Banners](#affiliate-banners)
7. [Multi-Language Ads](#multi-language-ads)

---

## Google AdSense

### Responsive Display Ad

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Fixed Size Banner (728x90)

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="1234567890"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

---

## Custom Image Ads

### Simple Image Ad

```html
<div class="custom-ad-wrapper" style="text-align: center; padding: 20px;">
  <a href="https://yoursite.com/product" target="_blank" rel="noopener">
    <img src="https://yoursite.com/banner-728x90.jpg" 
         alt="Special Offer" 
         style="max-width: 100%; height: auto; border-radius: 8px;">
  </a>
</div>
```

### Image Ad with Description

```html
<div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
  <h3 style="margin: 0 0 10px 0; font-size: 20px;">Special Offer!</h3>
  <a href="https://yoursite.com/offer" target="_blank" rel="noopener">
    <img src="https://yoursite.com/product-image.jpg" 
         alt="Product" 
         style="max-width: 300px; height: auto; border-radius: 8px; margin: 10px 0;">
  </a>
  <p style="margin: 10px 0; font-size: 16px;">Save 50% on Premium Plans</p>
  <a href="https://yoursite.com/offer" 
     style="display: inline-block; padding: 12px 30px; background: white; color: #667eea; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;"
     target="_blank" rel="noopener">
    Learn More
  </a>
</div>
```

---

## Text-Based Ads

### Simple Text Ad

```html
<div style="padding: 20px; background: #f8f9fa; border-left: 4px solid #007bff; border-radius: 4px;">
  <h4 style="margin: 0 0 10px 0; color: #333;">🚀 Boost Your Business</h4>
  <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
    Get 30% off our premium services. Limited time offer for new customers.
  </p>
  <a href="https://yoursite.com/offer" 
     style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-weight: 600;"
     target="_blank" rel="noopener">
    Claim Your Discount
  </a>
</div>
```

### Minimalist Text Ad

```html
<div style="text-align: center; padding: 15px; background: #ffffff; border: 2px solid #e9ecef; border-radius: 8px;">
  <p style="margin: 0; color: #495057; font-size: 15px;">
    💡 <strong>Pro Tip:</strong> Upgrade to Premium and unlock advanced features. 
    <a href="https://yoursite.com/upgrade" style="color: #007bff; font-weight: 600; text-decoration: none;">Learn More →</a>
  </p>
</div>
```

---

## Animated Banner

### CSS Animation Banner

```html
<style>
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animated-ad {
    animation: pulse 3s ease-in-out infinite;
  }
</style>

<div style="text-align: center; padding: 30px; background: linear-gradient(45deg, #ff6b6b, #feca57); border-radius: 12px;">
  <a href="https://yoursite.com/flash-sale" target="_blank" rel="noopener">
    <div class="animated-ad" style="display: inline-block;">
      <h2 style="margin: 0; color: white; font-size: 32px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
        🔥 FLASH SALE
      </h2>
      <p style="margin: 10px 0 0 0; color: white; font-size: 18px;">
        Up to 70% OFF - Today Only!
      </p>
    </div>
  </a>
</div>
```

---

## Video Ads

### YouTube Video Ad

```html
<div style="text-align: center; padding: 20px; background: #000; border-radius: 8px;">
  <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
          title="Video Advertisement" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="max-width: 100%; border-radius: 4px;">
  </iframe>
</div>
```

### HTML5 Video Ad

```html
<div style="text-align: center; padding: 20px;">
  <video width="100%" 
         style="max-width: 640px; border-radius: 8px;" 
         controls 
         poster="https://yoursite.com/video-poster.jpg">
    <source src="https://yoursite.com/ad-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p style="margin: 10px 0 0 0; color: #666;">
    <a href="https://yoursite.com/product" style="color: #007bff; font-weight: 600;">Learn More About Our Product</a>
  </p>
</div>
```

---

## Affiliate Banners

### Amazon Affiliate

```html
<div style="text-align: center; padding: 20px; background: #f3f3f3; border-radius: 8px;">
  <a href="https://www.amazon.com/dp/PRODUCT_ID?tag=your-tag-20" target="_blank" rel="noopener nofollow sponsored">
    <img src="https://m.media-amazon.com/images/I/PRODUCT_IMAGE.jpg" 
         alt="Product Name" 
         style="max-width: 200px; height: auto;">
  </a>
  <div style="margin-top: 15px;">
    <a href="https://www.amazon.com/dp/PRODUCT_ID?tag=your-tag-20" 
       style="display: inline-block; padding: 10px 25px; background: #ff9900; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;"
       target="_blank" rel="noopener nofollow sponsored">
      View on Amazon
    </a>
  </div>
</div>
```

### Generic Affiliate Banner

```html
<div style="display: flex; align-items: center; padding: 20px; background: white; border: 2px solid #e0e0e0; border-radius: 10px;">
  <img src="https://yourpartner.com/product-thumb.jpg" 
       alt="Product" 
       style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; margin-right: 20px;">
  <div style="flex: 1;">
    <h4 style="margin: 0 0 8px 0; color: #333; font-size: 18px;">Premium Product Name</h4>
    <p style="margin: 0 0 12px 0; color: #666; font-size: 14px; line-height: 1.5;">
      High-quality product description that highlights key benefits and features.
    </p>
    <a href="https://affiliate-link.com?ref=your-id" 
       style="display: inline-block; padding: 8px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 600;"
       target="_blank" rel="noopener nofollow sponsored">
      Check It Out
    </a>
  </div>
</div>
```

---

## Multi-Language Ads

### English/German Ad (Auto-Detect)

```html
<script>
  const userLang = navigator.language || navigator.userLanguage;
  const isGerman = userLang.startsWith('de');
  
  const content = isGerman ? {
    title: '🎉 Sonderangebot!',
    description: 'Sparen Sie 40% auf alle Premium-Funktionen',
    button: 'Jetzt upgraden'
  } : {
    title: '🎉 Special Offer!',
    description: 'Save 40% on all Premium features',
    button: 'Upgrade Now'
  };
  
  document.write(`
    <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
      <h3 style="margin: 0 0 10px 0; font-size: 24px;">${content.title}</h3>
      <p style="margin: 0 0 15px 0; font-size: 16px;">${content.description}</p>
      <a href="https://yoursite.com/upgrade" 
         style="display: inline-block; padding: 12px 30px; background: white; color: #667eea; text-decoration: none; border-radius: 6px; font-weight: bold;"
         target="_blank" rel="noopener">
        ${content.button}
      </a>
    </div>
  `);
</script>
```

---

## Seasonal/Holiday Ads

### Christmas Theme

```html
<div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #c94b4b 0%, #4b134f 100%); color: white; border-radius: 12px; position: relative; overflow: hidden;">
  <div style="position: absolute; top: 10px; left: 10px; font-size: 30px;">🎄</div>
  <div style="position: absolute; top: 10px; right: 10px; font-size: 30px;">🎅</div>
  <h3 style="margin: 0 0 15px 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
    ✨ Holiday Sale ✨
  </h3>
  <p style="margin: 0 0 20px 0; font-size: 18px;">
    Special Christmas Discount - Save Up To 50%!
  </p>
  <a href="https://yoursite.com/christmas-sale" 
     style="display: inline-block; padding: 15px 40px; background: white; color: #c94b4b; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;"
     target="_blank" rel="noopener">
    🎁 Shop Now
  </a>
</div>
```

---

## Tips for Creating Effective Ads

1. **Keep it Simple**: Clean design performs better
2. **Clear Call-to-Action**: Make it obvious what users should do
3. **Mobile-First**: Test on mobile devices
4. **Fast Loading**: Optimize images and minimize scripts
5. **A/B Testing**: Try different versions to see what works
6. **Relevance**: Match ads to your audience's interests
7. **Non-Intrusive**: Don't overwhelm users with ads
8. **Accessibility**: Use alt text and proper contrast

---

## Testing Your Ads

Before going live, test your ad code:

1. Use a simple HTML file locally
2. Check on different browsers
3. Test mobile responsiveness
4. Verify all links work
5. Check loading speed
6. Ensure proper tracking (if applicable)

---

For more examples and inspiration, visit the [README.md](README.md) file.



