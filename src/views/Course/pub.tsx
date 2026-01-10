import React, { useEffect, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  TreeSelect,
} from 'antd';
import { categoryGet } from '../../api/course';
import { categoryType } from '../../types/course';
import ImgUpload from '../../components/imgUpload';

const { TextArea } = Input;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type SizeType = Parameters<typeof Form>[0]['size'];

const CoursePub: React.FC = () => {
  const [cateList, setCateList] = useState();

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  //获取课程类别数据
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
      // console.log(parentArr);
    });
  }, []);

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 26 }}
      layout="horizontal"
      size={'default' as SizeType}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item label="课程名称" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="课程封面" name="poster">
        <ImgUpload />
      </Form.Item>
      <Form.Item label="归属分类" name="cate">
        <Cascader
          options={cateList}
          fieldNames={{ label: 'name', value: 'name' }}
        />
      </Form.Item>
      <Form.Item label="会员课程" valuePropName="checked" name="isvip">
        <Switch />
      </Form.Item>
      <Form.Item label="课程简介" name="intro">
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item label="课程详情" name="detail">
        富文本编辑器
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CoursePub;
