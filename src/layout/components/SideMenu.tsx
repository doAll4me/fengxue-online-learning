// 侧边栏
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { mainRouters } from '../../router';
import { useNavigate } from 'react-router-dom';
import { toMenuItems } from '../../router/toMenuItems';
import { useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {};

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
        items={toMenuItems(mainRouters)}
        onClick={handleMenu}
        selectedKeys={[location.pathname]}
      />
    </div>
  );
}
