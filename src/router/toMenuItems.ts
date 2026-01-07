import type { MenuProps } from 'antd';
import type { IMenuType } from './inter';

type AntdMenuItem = Required<MenuProps>['items'][number];

export function toMenuItems(routes: IMenuType[]): MenuProps['items'] {
  const mapOne = (r: IMenuType): AntdMenuItem => ({
    key: r.key,
    icon: r.icon,
    label: r.label,
    children: r.children?.map(mapOne),
  });

  return routes.map(mapOne);
}
