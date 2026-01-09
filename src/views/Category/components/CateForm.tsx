// 弹窗表单
import React from 'react';
import { Button, Form, Input, Select, Space, Switch } from 'antd';
import { categoryType } from '../../../types/course';
import { categoryPost } from '../../../api/course';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type IProps = {
  handleCancel: () => void; //接收父组件传递来的函数props
};

const CateForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: categoryType) => {
    console.log(values);
    await categoryPost(values); //上传数据
    props.handleCancel(); //提交就关闭弹窗
    //关闭
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" label="分类名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="parentId" label="父级类目" rules={[{ required: true }]}>
        <Select
          allowClear
          placeholder="请选择一个父级类目"
          options={[
            { label: '顶级类目', value: '0-0' },
            { label: '1级类目', value: '0-1' },
            { label: '2级类目', value: '0-2' },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="isshow"
        label="是否上架"
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Switch />
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

export default CateForm;
