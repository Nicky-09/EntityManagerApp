import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const CarForm = ({ onFinish, cars }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const newCar = {
      id: cars.length + 1,
      car_name: values.car_name,
      car_details: {
        car_number: values.car_number,
        car_engine: values.car_engine,
        car_model: values.car_model,
      },
    };
    console.log(newCar);

    try {
      const response = await axios.post("http://localhost:3000/cars", newCar);
      const data = response.data;
      console.log("Car successfully posted:", data);
      onFinish(newCar);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="car_name"
        label="Car Name"
        rules={[{ required: true, message: "Please enter the car name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="car_number"
        label="Car Number"
        rules={[{ required: true, message: "Please enter the car number" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="car_engine"
        label="Car Engine"
        rules={[{ required: true, message: "Please enter the car engine" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="car_model"
        label="Car Model"
        rules={[{ required: true, message: "Please enter the car model" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Car
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;
