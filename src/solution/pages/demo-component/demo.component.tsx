import * as React from 'react';
import style from './demo.component.less';
import {
  BackNavBarComponent,
  IScrollComponent,
  NoInfoComponent,
  InputBoxComponent,
  ImageDisplayComponent,
  UploadImageComponent
} from '~/framework/components/component.module';
import { useDemoStore } from './demo.component.store';

export default function DemoComponent() {
  const { state, videoRef } = useDemoStore();

  return (
    <div>
      <BackNavBarComponent navText="页面标题" showBack={true}></BackNavBarComponent>
      <h1>Realtime communication with WebRTC </h1>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
}
