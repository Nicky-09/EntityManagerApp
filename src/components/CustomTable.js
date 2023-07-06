import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import CustomForm from "./CustomForm";
import moment from "moment";

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
  const [updatedData, setUpdatedData] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResetForm(true);
  };

  const modifiedData = (data) => {
    console.log({ data });

    if (name === "Employee") {
      const tmpModifiedData = {
        id: data.id,
        position: data.position,
        name: data.employee_details.name,
        address: data.employee_details.address,
      };
      setUpdatedData(tmpModifiedData);
    } else if (name === "Task") {
      const tmpModifiedData = {
        id: data.id,
        title: data.title,
        description: data.description,
        start_date: data.extra.start_date, // Convert start_date to moment object
        end_date: data.extra.end_date,
      };
      console.log({ tmpModifiedData });
      setUpdatedData(tmpModifiedData);
    } else if (name === "Car") {
      const tmpModifiedData = {
        id: data.id,
        car_name: data.car_name,
        car_number: data.car_details.car_number,
        car_engine: data.car_details.car_engine,
        car_model: data.car_details.car_model,
      };
      setUpdatedData(tmpModifiedData);
    }
  };

  const handleSubmit = (values) => {
    // closeModal();
    setIsModalOpen(false);
    handleFinish(values, actionType);
  };

  const editCallback = (record) => {
    setIsModalOpen(true);
    setFormData(record);
    modifiedData(record);
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
            data={actionType === "Edit" ? updatedData : formData}
            resetForm={resetForm}
          />
        )}
      </Modal>
      <Table dataSource={dataSource} columns={updatedTaskColumns} />;
    </div>
  );
};

export default CustomTable;
