import * as React from 'react';
import style from './i-scroll.component.less';
import { useIScrollStore } from './i-scroll.component.store';
import { IIScrollProps } from './i-scroll.interface';

export default function IScrollComponent(props: IIScrollProps) {
  const { isPullingDown = true, isPullUpLoad, notHaveMore, height = '100vh' } = props;
  const { state, scrollRef } = useIScrollStore(props);
  const { isPullUpLoadLoading, isPullingDownLoading, isPullingDownLoadingStatus } = state;
  return (
    <div
      className={style.pulldownBswrapperMain}
      style={{ height: height ? height : `calc(${window.innerHeight}px - 1.2rem` }}
    >
      <div ref={scrollRef} className={style.pulldownBswrapper}>
        <div>
          {isPullingDown && (
            <div className={style.pullupWrapperPullingDown}>
              {isPullingDownLoading ? (
                <div>
                  <span>下拉加载更多</span>
                </div>
              ) : (
                <div>
                  {isPullingDownLoadingStatus ? (
                    <div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div>
                      <span>加载成功</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div>
            {props.children}
            {isPullUpLoad && (
              <div className={style.pullupWrapper}>
                {/* <div>
                  {notHaveMore ? (
                    <span>~没有更多啦~</span>
                  ) : (
                    <span>{!isPullUpLoadLoading ? '下拉加载更多' : notHaveMore ? '~没有更多啦~' : 'Loading...'}</span>
                  )}
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
