import React from "react";
import { Form, Input, DatePicker, Button } from "antd";

const TaskForm = ({ onFinish, tasks }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const newTask = {
      id: tasks.length + 1,
      title: values.title,
      description: values.description,
      extra: {
        start_date: values.start_date.format("DD-MM-YYYY"),
        end_date: values.end_date.format("DD-MM-YYYY"),
      },
    };

    fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task successfully posted:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    onFinish(newTask);
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
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
