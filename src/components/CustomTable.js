import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import CustomForm from "./CustomForm";

const CustomTable = ({
  dataSource,
  columns,
  name,
  handleFinish,
  tasks,
  handleEditTask,
  handleDeleteTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values) => {
    closeModal();
    handleFinish(values);
  };

  const taskActions = [
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <Button onClick={() => handleEditTask(record)}>Edit</Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Button onClick={() => handleDeleteTask(record)}>Delete</Button>
      ),
    },
  ];

  const updatedTaskColumns = [...columns, ...taskActions];

  return (
    <div>
      <div className="task-header">
        <h2>{name} List</h2>
        <Button onClick={openModal}>Add {name}</Button>
      </div>
      <Modal
        title={`Add ${name}`}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <CustomForm onFinish={handleSubmit} tasks={tasks} columns={columns} />
      </Modal>
      <Table dataSource={dataSource} columns={updatedTaskColumns} />;
    </div>
  );
};

export default CustomTable;
