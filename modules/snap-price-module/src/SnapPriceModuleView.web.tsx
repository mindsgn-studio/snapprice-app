import * as React from 'react';

import { SnapPriceModuleViewProps } from './SnapPriceModule.types';

export default function SnapPriceModuleView(props: SnapPriceModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
