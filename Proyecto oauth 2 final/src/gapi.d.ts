// gapi.d.ts
export {};

declare global {
  interface Window {
    google: any;  // Declara `google` como `any` para evitar errores
  }
}
