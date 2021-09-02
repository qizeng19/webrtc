import { IDemoState } from './demo.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';

export function useDemoStore() {
  const videoRef = useRef(null);
  const { state, setStateWrap } = useStateStore(new IDemoState());
  useEffect(() => {
    const mediaStreamContrains = {
      video: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaStreamContrains)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError);
  }, []);
  function gotLocalMediaStream(mediaStream: any) {
    console.log('mediaStream===>', mediaStream);
    videoRef.current.srcObject = mediaStream;
  }

  function handleLocalMediaStreamError(error: any) {
    console.log('navigator.getUserMedia error: ', error);
  }
  return { state, videoRef };
}
