import { IImageDisplayState, IImageDisplayProps } from './image-display.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ActionSheet } from 'antd-mobile';

export function useImageDisplayStore(props: IImageDisplayProps) {
  const { state, setStateWrap } = useStateStore(new IImageDisplayState());

  function showActionSheet(imageUrl: string) {
    setStateWrap({ file: imageUrl });
    const BUTTONS = ['预览', '取消'];
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        message: '',
        maskClosable: true
      },
      buttonIndex => {
        buttonIndex == 0 && showCurrentImage();
      }
    );
  }

  function showCurrentImage() {
    setStateWrap({ modalIsOpen: !state.modalIsOpen });
  }
  return { state, showActionSheet, showCurrentImage };
}
