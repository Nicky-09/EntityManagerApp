import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Space } from "antd";
import CarForm from "./CarForm";

const CarList = () => {
  const [carList, setCarList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCarList(data);
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  }, []);

  const handleFinish = (newCar) => {
    console.log(newCar);
    setCarList([...carList, newCar]);
    setIsModalOpen(false);
  };

  const carColumns = [
    {
      title: "Car ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Car Name",
      dataIndex: "car_name",
      key: "car_name",
    },
    {
      title: "Car Number",
      dataIndex: ["car_details", "car_number"],
      key: "car_number",
    },
    {
      title: "Car Engine",
      dataIndex: ["car_details", "car_engine"],
      key: "car_engine",
    },
    {
      title: "Car Model",
      dataIndex: ["car_details", "car_model"],
      key: "car_model",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="task-header">
        <h2>Car List</h2>
        <Button onClick={openModal}>Add Car</Button>
      </div>
      <Table columns={carColumns} dataSource={carList} />

      <Modal
        title="Add Car"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <CarForm onFinish={handleFinish} cars={carList} />
      </Modal>
    </div>
  );
};

export default CarList;
