import * as React from 'react';
import style from './upload-image.component.less';
import { useUploadImageStore } from './upload-image.component.store';
import { IUploadImageProps } from './upload-image.interface';
import Carousel, { Modal, ModalGateway } from 'react-images';
const isIOS = window.isAppWebView === 'iOS';
export default function UploadImageComponent(props: IUploadImageProps) {
  // const
  const {
    state,
    onFileChange,
    fileSelectorInput,
    handleClickImg,
    showActionSheet,
    showCurrentImage
  } = useUploadImageStore(props);
  const { modalIsOpen } = state;
  const { file, backImage, styleProps, imageStatus } = props;
  return (
    <div className={style.uploadContent}>
      {file ? (
        <React.Fragment>
          <img src={file} alt="" className={style.showImage} style={styleProps} onClick={showActionSheet} />
          {imageStatus == 2 && (
            <img
              className={style.imageStatus}
              src={require('~assets/image/failed.png')}
              alt=""
              onClick={showActionSheet}
            />
          )}
          {imageStatus == 1 && <img className={style.imageStatus} src={require('~assets/image/succeed.png')} alt="" />}
          <ModalGateway>
            {modalIsOpen ? (
              <Modal onClose={() => showCurrentImage()}>
                <Carousel views={[{ source: file }]} components={{ Footer: null }} />
              </Modal>
            ) : null}
          </ModalGateway>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img
            src={backImage || require('~assets/image/add-car.png')}
            style={styleProps}
            alt=""
            // onClick={handleClickImg}
            className={style.uploadImage}
          />

          {!isIOS && !!window.isAppWebView ? (
            <div style={styleProps} className={style.inputImage} onClick={handleClickImg}></div>
          ) : (
            <input
              capture="camera"
              className={style.inputImage}
              type="file"
              accept="image/*"
              style={styleProps}
              onChange={onFileChange}
              ref={fileSelectorInput}
            ></input>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
