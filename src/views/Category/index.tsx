import { Button, Col, Modal, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { categoryGet, categoryPost } from '../../api/course';
import { Flex, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { categoryType } from '../../types/course';
import CateForm from './components/CateForm';

const columns: TableProps<categoryType>['columns'] = [
  {
    title: '类目级别',
    dataIndex: 'parentId', //跟当前这一列要渲染的字段
    key: 'parentId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否上架',
    dataIndex: 'isshow',
    key: 'isshow',
    render: (bool: boolean) => <Switch defaultChecked={bool} />,
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" size="small">
          编辑
        </Button>
        <Button type="primary" size="small" danger>
          删除
        </Button>
      </Space>
    ),
  },
];
// 测试数据
// const data: categoryType[] = [
//   {
//     name: 'John Brown',
//     isshow: true,
//     parentId: 'xaxx',
//   },
//   {
//     name: 'John Brown',
//     isshow: true,
//     parentId: 'xsva',
//   },
// ];

type Props = {};

export default function Category({}: Props) {
  const [cateList, setCateList] = useState();
  useEffect(() => {
    categoryGet().then((res) => {
      setCateList(res.data.results);
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* 表头 */}
      <Row justify={'space-between'} align={'middle'}>
        <Col span={6}>
          课程分类管理
          {/* <Button type="primary" onClick={handleSend}>
            测试LeanCloud
          </Button> */}
        </Col>
        <Col span={6}>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            新增分类
          </Button>
        </Col>
      </Row>
      {/* 数据展示表格内容 */}
      <Table<categoryType> columns={columns} dataSource={cateList} />
      {/* 新增分类弹窗 */}
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        footer={null}
      >
        <CateForm handleCancel={handleCancel} />
      </Modal>
    </div>
  );
}
