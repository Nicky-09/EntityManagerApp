import { Button, DatePicker, Form, Input } from "antd";
import React, { useEffect } from "react";

const CustomForm = ({ onFinish, columns, data, resetForm }) => {
  const [form] = Form.useForm();
  console.log({ data });
  useEffect(() => {
    // customData(data);
    resetForm && form.resetFields();
    form.setFieldsValue(data);
  }, [data]);
  const handleSubmit = (values) => {
    onFinish(values);
    // form.resetFields();
  };

  // const renderField = (col) => {
  //   if (col.inputType === "textarea") {
  //     return <Input.TextArea />;
  //   } else if (col.inputType === "date") {
  //     return <DatePicker />;
  //   } else {
  //     return <Input />;
  //   }
  // };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      {columns.map((col) => (
        <Form.Item
          key={col.key}
          name={col.key}
          label={col.title}
          rules={[{ required: true, message: `Please enter ${col.label}` }]}
        >
          {/* {renderField(col)} */}
          <Input disabled={col.key === "id"} />
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
