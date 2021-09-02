export interface IMenu {
    path: string;
    title: string;
    icon?: string;
    children?: IMenu;
    paths?: string;
  }