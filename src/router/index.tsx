import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import DashBoard from '../views/DashBoard';
import Category from '../views/Category';
import Course from '../views/Course';
import Role from '../views/System/Role';
import { IMenuType } from './inter';
import User from '../views/System/User';
import CoursePub from '../views/Course/pub';

export const mainRouters: IMenuType[] = [
  {
    key: '/dashboard',
    icon: <PieChartOutlined />,
    label: '数据统计',
    title: '数据统计',
    element: <DashBoard />,
  },
  {
    key: '/category',
    icon: <TeamOutlined />,
    label: '分类管理',
    title: '分类管理',
    element: <Category />,
  },
  {
    key: '/course',
    icon: <DesktopOutlined />,
    label: '课程管理',
    title: '课程管理',
    element: <Course />,
  },
  {
    key: '/course/pub',
    icon: <DesktopOutlined />,
    label: '课程发布',
    title: '课程发布',
    element: <CoursePub />,
    hide: true,
  },
  {
    key: '/system',
    icon: <UserOutlined />,
    label: '系统设置',
    title: '系统设置',
    children: [
      {
        key: '/system/role',
        label: '角色管理',
        title: '角色管理',
        element: <Role />,
      },
      {
        key: '/system/user',
        label: '用户管理',
        title: '用户管理',
        element: <User />,
      },
    ],
  },
];
