# MAC Paving - Versión Móvil

Esta es la versión exclusivamente móvil del sitio web de MAC Paving and Sealcoating.

## Características

- **Diseño 100% móvil**: Todos los estilos, breakpoints y configuraciones están optimizados exclusivamente para dispositivos móviles
- **Video móvil**: Utiliza el video 1080x1080 (aspect ratio 1:1) optimizado para móviles
- **CSS móvil**: Los estilos móviles se aplican como base, sin media queries de desktop
- **Bootstrap móvil**: Configurado para funcionar solo en dispositivos móviles

## Diferencias con la versión principal

1. **Videos**: Solo muestra el video móvil (1080x1080), no el video de escritorio
2. **CSS**: Los estilos móviles son los estilos base, eliminando todos los media queries de desktop
3. **Clases**: `.desktop-only` está oculto por defecto, `.mobile-only` está visible por defecto
4. **Layout**: Todos los componentes están optimizados para pantallas móviles

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estructura

La estructura es idéntica a la versión principal, pero con modificaciones en:
- `src/pages/index.astro` - Solo muestra contenido móvil
- `src/assets/css/main.css` - Estilos móviles como base
- `src/components/CSSbase.astro` - Configuración móvil

