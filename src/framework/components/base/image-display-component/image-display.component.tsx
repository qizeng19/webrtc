import * as React from 'react';
import style from './image-display.component.less';
import { IImageDisplayProps } from './image-display.interface';
import { useImageDisplayStore } from './image-display.component.store';
import Carousel, { Modal, ModalGateway } from 'react-images';

export default function ImageDisplayComponent(props: IImageDisplayProps) {
  const { state, showActionSheet, showCurrentImage } = useImageDisplayStore(props);
  const { modalIsOpen, file } = state;

  const { imageDisplayTitle = '展示图片标题', showAttentionIcon, showRemark = false, fileInfoList } = props;

  function aPicList(item: any, i: any) {
    return (
      <div className={style.aPicList} key={item.index}>
        <div className={style.onePic}>
          <img
            src={item.imageUrl}
            alt=""
            onClick={() => {
              showActionSheet(item.imageUrl);
            }}
          />
          <ModalGateway>
            {modalIsOpen ? (
              <Modal onClose={() => showCurrentImage()}>
                <Carousel views={[{ source: file }]} components={{ Footer: null }} />
              </Modal>
            ) : null}
          </ModalGateway>
          {/* 错误图片 */}
          {item.status == '2' && <img className={style.imageErr} src={require('~assets/image/image-err.png')} alt="" />}
        </div>
        <div className={style.picInfo}>
          <div className={`${style.onePicDis} ${item.status == '2' && style.errText}`}>{item.title}</div>
          {showRemark && item.remark && <div className={style.remark}>审核意见：{item.remark}</div>}
        </div>
      </div>
    );
  }
  return (
    <div className={style.imageDisplay}>
      <div className={style.title}>
        {imageDisplayTitle}
        {showAttentionIcon ? <img src={require('~assets/image/attention-icon.png')} alt="" /> : ''}
      </div>
      {fileInfoList && <div className={style.picList}>{fileInfoList.map((item, i) => aPicList(item, i))}</div>}
    </div>
  );
}
