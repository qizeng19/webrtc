import { IIScrollState, IIScrollProps } from './i-scroll.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';
import { useEffect, useRef } from 'react';
import ObserveDOM from '@better-scroll/observe-dom';
BScroll.use(PullDown);
BScroll.use(Pullup);
BScroll.use(ObserveDOM);
export function useIScrollStore(props: IIScrollProps) {
  const { state, setStateWrap } = useStateStore(new IIScrollState());
  const { pullingDownHandle, isPullingDown = true, isPullUpLoad = false, pullUpLoadHandle } = props;
  const scrollRef = useRef(null);
  const bs = useRef(null);
  useEffect(() => {
    initBScroll();
  }, []);

  // useEffect(() => {
  //   props.dataLoading &&
  //     setTimeout(() => {
  //       bs.current.refresh();
  //     }, 600);
  // }, [props.dataLoading]);

  function initBScroll() {
    bs.current = new BScroll(scrollRef.current, {
      scrollY: true,
      useTransition: false,
      pullDownRefresh: isPullingDown,
      pullUpLoad: isPullUpLoad,
      click: true,
      observeDOM: true
    });

    isPullingDown && bs.current.on('pullingDown', () => getPullingDownHandle());
    isPullUpLoad && bs.current.on('pullingUp', () => getPullUpLoadHandle());
  }

  function getPullingDownHandle() {
    setStateWrap({
      isPullingDownLoading: false,
      isPullingDownLoadingStatus: true
    });
    pullingDownHandle(() => {
      setStateWrap({
        isPullingDownLoadingStatus: false
      });
      finishPullDown();
    });
  }

  // 为了加载时候有一定停留效果
  async function finishPullDown() {
    const stopTime = 600;
    await new Promise(resolve => {
      setTimeout(() => {
        bs.current.finishPullDown();
        resolve();
      }, stopTime);
    });
    setTimeout(() => {
      setStateWrap({
        isPullingDownLoading: true
      });
      bs.current.refresh();
    }, 600);
  }

  async function getPullUpLoadHandle() {
    setStateWrap({
      isPullUpLoadLoading: true
    });
    pullUpLoadHandle(() => {
      setStateWrap({
        isPullUpLoadLoading: false
      });
      setTimeout(() => {
        bs.current.finishPullUp();
        bs.current.refresh();
      }, 600);
    });
  }

  return { state, scrollRef };
}
