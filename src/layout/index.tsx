import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import SideMenu from './components/SideMenu';
import AppHeader from './components/AppHeader';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../views/DashBoard';
import Category from '../views/Category';
import Course from '../views/Course';
import Role from '../views/System/Role';
import { mainRouters } from '../router';
import { IMenuType } from '../router/inter';

const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 对路由数据进行预处理
  const [realRoutes, setRealRoutes] = useState<Array<IMenuType>>([]);
  useEffect(() => {
    let arr: IMenuType[] = [];
    mainRouters.forEach((item) => {
      if (item.children) {
        arr = [...arr, ...item.children]; //arr要加类型约束
      } else {
        arr.push(item); //arr要加类型约束
      }
    });
    setRealRoutes(arr); //realRoutes要加类型约束
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <SideMenu />
      </Sider>
      <Layout>
        <AppHeader />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[{ title: 'User' }, { title: 'Bill' }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* 写法1：手动配置路由 */}
            {/* <Routes>
              <Route path="/dashboard" element={<DashBoard />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/course" element={<Course />}></Route>
              <Route path="/system/role" element={<Role />}></Route>
            </Routes> */}
            {/* 写法2：自动根据数据渲染路由 */}
            <Routes>
              {/* 不再使用原始数据包，因为有些item有children（二级路由），有些没有 */}
              {/* {mainRouters.map((item) => {
                return <Route path={item.key} element={item.element}></Route>;
              })} */}
              {/* 所以使用我们处理过后的realRoutes */}
              {realRoutes.map((item) => {
                return <Route path={item.key} element={item.element}></Route>;
              })}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
