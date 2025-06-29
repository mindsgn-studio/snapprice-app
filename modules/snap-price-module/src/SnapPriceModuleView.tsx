import { requireNativeView } from 'expo';
import * as React from 'react';

import { SnapPriceModuleViewProps } from './SnapPriceModule.types';

const NativeView: React.ComponentType<SnapPriceModuleViewProps> =
  requireNativeView('SnapPriceModule');

export default function SnapPriceModuleView(props: SnapPriceModuleViewProps) {
  return <NativeView {...props} />;
}
