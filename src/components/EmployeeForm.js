import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const EmployeeForm = ({ onFinish, employee }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const newEmployee = {
      id: employee.length + 1,
      car_name: values.position,
      employee_details: {
        name: values.name,
        address: values.address,
      },
    };
    console.log(newEmployee);

    try {
      const response = await axios.post(
        "http://localhost:3000/cars",
        newEmployee
      );
      const data = response.data;
      console.log("Car successfully posted:", data);
      onFinish(newEmployee);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      {/* <Form.Item
        name="employee_id"
        label="Employee ID"
        rules={[{ required: true, message: "Please enter the employee ID" }]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item
        name="position"
        label="Position"
        rules={[{ required: true, message: "Please enter the position" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter the address" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
