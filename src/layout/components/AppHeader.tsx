// 头部
import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;
type Props = {};
export default function AppHeader({}: Props) {
  return (
    <div>
      <Header style={{ padding: 0, background: '#fff' }} />
    </div>
  );
}
