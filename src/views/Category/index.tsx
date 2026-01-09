import { Button, Col, Modal, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { categoryGet, categoryPost, categoryPut } from '../../api/course';
import { Flex, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { categoryType } from '../../types/course';
import CateForm from './components/CateForm';

const handleChange = (checked: boolean, id: string) => {
  // console.log(checked, id);
  categoryPut(id, checked); //更新数据状态，存储到数据库的数据里了
};

const columns: TableProps<categoryType>['columns'] = [
  {
    title: '类目级别',
    dataIndex: 'parentId', //跟当前这一列要渲染的字段
    key: 'parentId',
    render: (text) => {
      return text === '0-0' ? '顶级类目' : '';
    },
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
    render: (bool: boolean, record) => (
      <Switch
        defaultChecked={bool}
        onChange={(checked) => {
          handleChange(checked, record.objectId as string);
          // xx as 某个类型 ———>ts断言
        }}
      />
    ),
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
  const [cateList, setCateList] = useState<categoryType[]>([]); //要加泛型！！！！！！！！！！
  useEffect(() => {
    categoryGet().then((res) => {
      let { results } = res.data;
      //筛选出顶级类目
      let parentArr = results.filter(
        (item: categoryType) => item.parentId === '0-0',
      );
      // 筛选出二级类目（前端
      parentArr.forEach((item: categoryType) => {
        let children = results.filter(
          (child: categoryType) => child.parentId === item.objectId,
        );
        if (children.length) {
          item.children = children; //没有子集就不给children字段
        }
      });
      setCateList(parentArr); //用处理后的数据去渲染
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 接收表单提交函数
  const updateCateList = (category: categoryType) => {
    // console.log(category);
    // 新增类目后实时更新渲染
    if (category.parentId == '0-0') {
      // cateList.push(category);
      // setCateList([...cateList]);

      setCateList([...cateList, category]); //添加新增的类目(顶级)
    } else {
      // 新增二级类目
      // 分情况:已有children的父级类目新增子集/还没有children的父级类目新增子集（要添加children字段
      // category.parentId==cateList[i].objectId  如果有 就证明第i个cate就是新增类别的父类
      let idx = cateList.findIndex(
        (item) => item.objectId == category.parentId,
      );
      if (cateList[idx].children) {
        cateList[idx].children!.push(category); //已有children的父级类目新增子集
      } else {
        cateList[idx].children = [category]; //还没有children的父级类目新增子集
      }
      setCateList(cateList);
    }
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
      <Table<categoryType>
        columns={columns}
        dataSource={cateList}
        rowKey="objectId"
      />
      {/* 新增分类弹窗 */}
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        footer={null}
      >
        <CateForm
          handleCancel={handleCancel}
          cateList={cateList}
          updateCateList={updateCateList}
        />
      </Modal>
    </div>
  );
}
