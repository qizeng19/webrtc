/**
 * @export state变量定义和初始化
 * @class IBackNavBarState
 */
export class IBackNavBarState {}

export interface IBackNavBarProps {
  showBack?: boolean;
  navText?: string;
  goBack?: (event: any) => void;
  handleDelete?: () => void;
  showDelete?: boolean;
  isModal?: boolean;
  cancle?: boolean;
}
