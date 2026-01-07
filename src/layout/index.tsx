import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import SideMenu from './components/SideMenu';
import AppHeader from './components/AppHeader';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../views/DashBoard';
import Category from '../views/Category';
import Course from '../views/Course';
import Role from '../views/System/Role';
import { mainRouters } from '../router';

const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
              {mainRouters.map((item) => {
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
