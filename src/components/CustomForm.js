import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

const CustomForm = ({ onFinish, tasks, columns, data, resetForm }) => {
  const [form] = Form.useForm();
  console.log({ data });

  // useEffect(() => {
  //   if (tasks) {
  //     // Prefill the form fields with the task data
  //     form.setFieldsValue({
  //       title: tasks.title,
  //       description: tasks.description,
  //       start_date: moment(task.extra.start_date, "DD-MM-YYYY"),
  //       end_date: moment(task.extra.end_date, "DD-MM-YYYY"),
  //     });
  //   }
  // }, [form, task]);

  //column mai key map or for every columnkey value taskdata

  useEffect(() => {
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
