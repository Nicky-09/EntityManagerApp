import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { Button, Modal, Table } from "antd";
import "./list.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/task")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  }, []);

  const handleAddTask = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (newTask) => {
    console.log(newTask);
    setTasks([...tasks, newTask]);
    setIsModalVisible(false);
  };

  const taskColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: ["extra", "start_date"],
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: ["extra", "end_date"],
      key: "end_date",
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

  return (
    <div>
      <div className="task-header">
        <h2>Task List</h2>
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      <Modal
        title="Add Task"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <TaskForm onFinish={handleFinish} tasks={tasks} />
      </Modal>
      <Table dataSource={tasks} columns={taskColumns} />
    </div>
  );
};

export default TaskList;
