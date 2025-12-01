export default {
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx}',
    './public/**/*.html',
    './dist/**/*.html'
  ],
  css: [
    './src/assets/css/main.css',
    './src/assets/css/safari-fix.css',
    './src/assets/css/map-fix.css',
    './src/assets/css/spacing.css',
    './src/assets/css/service-cards.css',
    './src/assets/css/meanmenu.min.css'
  ],
  safelist: [
    // Dynamic classes
    'info-open',
    'overlay-open',
    'offcanvas-opened',
    'opened',
    'sticky',
    'show',
    'active-progress',
    'tp-currency-list-open',
    'tp-setting-list-open',
    'body-overlay',
    'dropdown-opened',
    'meanmenu-reveal',
    'mean-container',
    'mean-bar',
    'mean-nav',
    'mean-expand',
    'mean-clicked',
    'mean-push',
    'mean-remove',
    'meanclose',
    'mean-last',
    'hidden',
    // Swiper classes - comprehensive list
    /^swiper-/,
    'swiper-slide',
    'swiper-slide-active',
    'swiper-slide-next',
    'swiper-slide-prev',
    'swiper-slide-duplicate',
    'swiper-slide-visible',
    'swiper-button-next',
    'swiper-button-prev',
    'swiper-pagination',
    'swiper-pagination-bullet',
    'swiper-pagination-bullet-active',
    'swiper-pagination-bullets',
    'swiper-pagination-horizontal',
    'swiper-wrapper',
    'swiper-container',
    // Slider specific classes
    /^service-slider/,
    /^project-slider/,
    /^service-active/,
    /^project-active/,
    'service-slider-area',
    'project-slider-area',
    'service-slider-section',
    'project-slider-section',
    'service_1_navigation__wrapprer',
    'project_1_navigation__wrapprer',
    'service-1-button-next',
    'service-1-button-prev',
    'project-1-button-next',
    'project-1-button-prev',
    // AOS classes
    /^aos-/,
    'aos-init',
    'aos-animate',
    // Animate.css classes
    /^animated/,
    /^wow/,
    /^fade/,
    // Map classes
    'embedded-map',
    'custom-popup',
    // Bootstrap classes that might be used dynamically
    /^col-/,
    /^row/,
    /^container/,
    /^btn-/,
    /^modal-/,
    /^dropdown-/,
    // Font Awesome classes (icons are used via classes)
    /^fa-/,
    /^fas/,
    /^far/,
    /^fab/,
    // Common utility classes
    'active',
    'disabled',
    'loading',
    'error',
    'success',
    // Media query related classes (to preserve responsive styles)
    /^@media/,
    // Preserve all classes with responsive prefixes
    /^service-/,
    /^project-/,
    /^cta-/,
    /^banner-/,
    /^choose-/,
    /^testimonial-/,
    /^breadcrumb-/
  ],
  defaultExtractor: (content) => {
    // Enhanced extractor to catch more patterns including CSS selectors
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    // Extract CSS class names from style attributes and class attributes
    const classMatches = content.match(/class[=:]["']([^"']+)["']/g) || [];
    const styleMatches = content.match(/class=["']([^"']+)["']/g) || [];
    // Extract from CSS selectors in style tags
    const cssSelectorMatches = content.match(/\.[\w-]+/g) || [];
    // Extract media query selectors
    const mediaMatches = content.match(/@media[^{]*\{[^}]*\}/g) || [];
    
    return [
      ...broadMatches,
      ...innerMatches,
      ...classMatches,
      ...styleMatches,
      ...cssSelectorMatches,
      ...mediaMatches
    ];
  },
  output: './src/assets/css/purged/',
  // Skip font files and other assets
  fontFace: true,
  keyframes: true,
  variables: true
};