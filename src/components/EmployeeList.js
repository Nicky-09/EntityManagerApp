import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import axios from "axios";
import { Modal } from "antd";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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

  const handleFinish = async (values) => {
    const newEmployee = {
      id: values.id,
      position: values.position,
      employee_details: {
        name: values.name,
        address: values.address,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/employee",
        newEmployee
      );
      const data = response.data;
      console.log("Employee successfully posted:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    setEmployeeList([...employeeList, newEmployee]);
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
  ];

  const handleEditTask = (record) => {
    setEditingTask(record);
    setIsEditModalVisible(true);
  };
  const handleCancelEdit = () => {
    setEditingTask(null);
    setIsEditModalVisible(false);
  };

  const handleFinishEdit = (editedTask) => {
    // Find the index of the edited task in the tasks array
    const taskIndex = employeeList.findIndex(
      (task) => task.id === editedTask.id
    );

    if (taskIndex !== -1) {
      // Create a new tasks array with the edited task
      const updatedTasks = [...employeeList];
      updatedTasks[taskIndex] = editedTask;

      setEmployeeList(updatedTasks);
      setIsEditModalVisible(false);

      // Perform the API call to update the task
      axios
        .put(`http://localhost:3000/employee/${editedTask.id}`, editedTask)
        .then((response) => {
          console.log("Employee successfully updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    }
  };

  const handleDeleteTask = (record) => {
    // Show a confirmation dialog before deleting the task
    Modal.confirm({
      title: "Delete Task",
      content: "Are you sure you want to delete this task?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        // Perform the delete operation
        const taskId = record.id;

        axios
          .delete(`http://localhost:3000/employee/${taskId}`)
          .then((response) => {
            console.log("Employee successfully deleted:", response.data);
            // Remove the deleted task from the tasks list
            const updatedTasks = employeeList.filter(
              (task) => task.id !== taskId
            );
            setEmployeeList(updatedTasks);
          })
          .catch((error) => {
            console.error("Error deleting task:", error);
          });
      },
    });
  };

  return (
    <div>
      <Modal
        title="Edit Task"
        open={isEditModalVisible}
        onCancel={handleCancelEdit}
        footer={null}
      >
        {/* {editingTask && (
          <TaskEditForm
            onFinish={handleFinishEdit}
            onCancel={handleCancelEdit}
            task={editingTask}
          />
        )} */}
      </Modal>
      <CustomTable
        columns={employeeColumns}
        dataSource={employeeList}
        name={"Employee"}
        tasks={employeeList}
        handleFinish={handleFinish}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default EmployeeList;
