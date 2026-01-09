// 弹窗表单
import React from 'react';
import { Button, Form, Input, Select, Space, Switch } from 'antd';
import { categoryType } from '../../../types/course';
import { categoryPost } from '../../../api/course';
import { Option } from 'antd/es/mentions';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

type IProps = {
  handleCancel: () => void; //接收父组件传递来的函数props
  cateList: categoryType[]; //接收父组件传递来的参数 目录列表+格式
  updateCateList: (arg: categoryType) => void; //传递函数时 参数的类型也要写上
};

const CateForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();

  const onFinish = async (values: categoryType) => {
    // console.log(values); //提交表单，数据中没有objectId，因为objectId是后端统一下发的
    let res = await categoryPost(values); //上传数据（这一步既是“提交数据values”，也是“接收后端返回数据res”
    // 前端 ──(POST 请求，带 values)──▶ 后端
    // 前端 ◀─(响应 response，带 objectId 等数据)── 后端
    let { objectId } = res.data; //后端下发的数据中有objectId
    props.updateCateList({ ...values, objectId }); //补充完整数据，提交给父级组件，以便后续渲染
    props.handleCancel(); //提交就关闭弹窗
    //提交后刷新页面（新增数据
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
        <Select allowClear placeholder="请选择一个父级类目">
          <Select.Option value="0-0">顶级父类</Select.Option>
          {props.cateList.map((item) => {
            return (
              <Select.Option value={item.objectId} key={item.objectId}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
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
