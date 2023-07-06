import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/employee")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        setEmployeeList(data);
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  }, []);

  const handleFinish = (newEmployee) => {
    console.log(newEmployee);
    setEmployeeList([...employeeList, newEmployee]);
    setIsModalOpen(false);
  };

  const employeeColumns = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Name",
      dataIndex: ["employee_details", "name"],
      key: "name",
    },
    {
      title: "Address",
      dataIndex: ["employee_details", "address"],
      key: "address",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={() => handleUpdate(record)}>Update</a>
    //       <a onClick={() => handleDelete(record.employee_id)}>Delete</a>
    //     </Space>
    //   ),
    // },
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
        <h2>Employee List</h2>
        <Button onClick={openModal}>Add Employee</Button>
      </div>
      <Table columns={employeeColumns} dataSource={employeeList} />

      <Modal
        title="Add Employee"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <EmployeeForm onFinish={handleFinish} employee={employeeList} />
      </Modal>
    </div>
  );
};

export default EmployeeList;
