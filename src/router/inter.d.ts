import type { ReactNode } from 'react';

export interface IMenuType {
  key: string;
  label: string;
  title: string;
  icon?: ReactNode;
  element?: ReactNode;
  children?: IMenuType[]; //可选（子菜单、二级菜单
  hide?: boolean;
}
