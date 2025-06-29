import { NativeModule, requireNativeModule } from 'expo';

import { SnapPriceModuleEvents } from './SnapPriceModule.types';

declare class SnapPriceModule extends NativeModule<SnapPriceModuleEvents> {
  getData(url: string): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<SnapPriceModule>('SnapPriceModule');
