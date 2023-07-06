import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

const CustomForm = ({ onFinish, columns, data, resetForm }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // customData(data);
    resetForm && form.resetFields();
    form.setFieldsValue(data);
  }, [data]);
  const handleSubmit = (values) => {
    onFinish(values);
    // form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      {columns.map((col) => (
        <Form.Item
          key={col.key}
          name={col.key}
          label={col.title}
          rules={[{ required: true, message: `Please enter ${col.label}` }]}
        >
          {col.inputType === "textarea" ? <Input.TextArea /> : <Input />}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
