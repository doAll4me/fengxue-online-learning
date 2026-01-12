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
import { categoryGet, coursePost } from '../../api/course';
import { categoryType, CourseType } from '../../types/course';
import ImgUpload from '../../components/imgUpload';
import RichEditor from '../../components/RichEditor';

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

  const onFinish = (values: CourseType) => {
    // 对上传课程的分类数据进行处理，再提交至数据库
    values.lv1 = values.cate[0];
    values.lv2 = values.cate[1];
    // console.log(values);
    coursePost(values);
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

  // 测试数据
  const initData = {
    name: 'React_TypeScript项目实战',
    intro: 'React_TypeScript技术栈开发在线课程管理平台',
    isvip: true,
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 26 }}
      layout="horizontal"
      size={'default' as SizeType}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      initialValues={initData}
    >
      <Form.Item label="课程名称" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="课程封面" name="poster" rules={[{ required: true }]}>
        <ImgUpload />
      </Form.Item>
      <Form.Item label="归属分类" name="cate" rules={[{ required: true }]}>
        <Cascader
          options={cateList}
          fieldNames={{ label: 'name', value: 'name' }}
        />
      </Form.Item>
      <Form.Item
        label="会员课程"
        valuePropName="checked"
        name="isvip"
        rules={[{ required: true }]}
      >
        <Switch />
      </Form.Item>
      <Form.Item label="课程简介" name="intro" rules={[{ required: true }]}>
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item label="课程详情" name="detail" rules={[{ required: true }]}>
        <RichEditor />
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
