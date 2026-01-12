// 侧边栏
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { mainRouters } from '../../router';
import { useNavigate } from 'react-router-dom';
import { toMenuItems } from '../../router/toMenuItems';
import { useLocation } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';
import { IMenuType } from '../../router/inter';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {};
// 根据mainRouters中的hide，剔除不需要渲染的菜单，实现菜单隐藏
function filterRoutes() {
  // 深拷贝原始路由的数据包
  // lodash深拷贝
  let routes = cloneDeep(mainRouters); //深拷贝，避免影响原始数据
  // 递归函数
  function loop(arr: IMenuType[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].hide) {
        arr.splice(i, 1); //删掉有hide字段的routes
      }
      if (arr[i] && arr[i].children) {
        loop(arr[i].children!);
      }
    }
  }
  loop(routes);
  return routes;
}

let realRoutes = filterRoutes();

export default function SideMenu({}: Props) {
  const navigate = useNavigate(); //跳转网页的hook函数
  const location = useLocation(); //获取当前路由路径的hook函数
  function handleMenu({ key }: { key: string }) {
    // console.log(key);
    navigate(key);
  }
  return (
    <div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={toMenuItems(realRoutes)} //realRoutes是做过菜单隐藏后的route
        onClick={handleMenu}
        selectedKeys={[location.pathname]}
      />
    </div>
  );
}
