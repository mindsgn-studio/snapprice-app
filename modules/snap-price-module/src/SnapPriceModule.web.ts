import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './SnapPriceModule.types';

type SnapPriceModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class SnapPriceModule extends NativeModule<SnapPriceModuleEvents> {
  getData() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(SnapPriceModule, 'SnapPriceModule');
