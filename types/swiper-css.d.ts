// Swiper ships side-effect CSS at these subpaths but no .d.ts for them,
// so TS reports ts(2307) on `import 'swiper/css'`. Declare them as modules.
declare module 'swiper/css'
declare module 'swiper/css/*'
