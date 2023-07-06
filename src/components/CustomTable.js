import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import CustomForm from "./CustomForm";

const CustomTable = ({
  dataSource,
  columns,
  name,
  handleFinish,
  handleDeleteTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [formTitle, setFormTitle] = useState();
  const [actionType, setActionType] = useState();
  const [resetForm, setResetForm] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResetForm(true);
  };

  const handleSubmit = (values) => {
    // closeModal();
    setIsModalOpen(false);
    handleFinish(values, actionType);
  };

  const editCallback = (record) => {
    setIsModalOpen(true);
    setFormData(record);
    setFormTitle(`Edit ${name}`);
    setActionType("Edit");
  };

  const handleAdd = () => {
    setFormData({});
    setActionType("Add");
    openModal();
    setFormTitle(`Add ${name}`);
  };

  const taskActions = [
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <Button onClick={() => editCallback(record)}>Edit</Button>
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
        <Button onClick={handleAdd}>Add {name}</Button>
      </div>
      <Modal
        title={formTitle}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {isModalOpen && (
          <CustomForm
            onFinish={handleSubmit}
            columns={columns}
            data={formData}
            resetForm={resetForm}
          />
        )}
      </Modal>
      <Table dataSource={dataSource} columns={updatedTaskColumns} />;
    </div>
  );
};

export default CustomTable;
