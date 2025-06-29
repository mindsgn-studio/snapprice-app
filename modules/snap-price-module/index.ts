// Reexport the native module. On web, it will be resolved to SnapPriceModule.web.ts
// and on native platforms to SnapPriceModule.ts
export { default } from './src/SnapPriceModule';
export { default as SnapPriceModuleView } from './src/SnapPriceModuleView';
export * from  './src/SnapPriceModule.types';
