import React, { useEffect } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import moment from "moment";

const TaskEditForm = ({ onFinish, onCancel, task }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      // Prefill the form fields with the task data
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        start_date: moment(task.extra.start_date, "DD-MM-YYYY"),
        end_date: moment(task.extra.end_date, "DD-MM-YYYY"),
      });
    }
  }, [form, task]);

  const handleFinish = (values) => {
    const editedTask = {
      ...task,
      title: values.title,
      description: values.description,
      extra: {
        start_date: values.start_date.format("DD-MM-YYYY"),
        end_date: values.end_date.format("DD-MM-YYYY"),
      },
    };

    // Perform the API call to update the task
    // ...

    onFinish(editedTask);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter the task title" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please enter the task description" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="start_date"
        label="Start Date"
        rules={[{ required: true, message: "Please select the start date" }]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item
        name="end_date"
        label="End Date"
        rules={[{ required: true, message: "Please select the end date" }]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default TaskEditForm;
