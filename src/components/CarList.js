import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomTable from "./CustomTable";
import axios from "axios";

const CarList = () => {
  const [carList, setCarList] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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

  const handleFinish = async (values) => {
    const newCar = {
      id: values.id,
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
    } catch (error) {
      console.error("Error:", error);
    }
    setCarList([...carList, newCar]);
  };

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
    const taskIndex = carList.findIndex((task) => task.id === editedTask.id);

    if (taskIndex !== -1) {
      // Create a new tasks array with the edited task
      const updatedTasks = [...carList];
      updatedTasks[taskIndex] = editedTask;

      setCarList(updatedTasks);
      setIsEditModalVisible(false);

      // Perform the API call to update the task
      axios
        .put(`http://localhost:3000/cars/${editedTask.id}`, editedTask)
        .then((response) => {
          console.log("Car successfully updated:", response.data);
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
      content: "Are you sure you want to delete this car?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        // Perform the delete operation
        const taskId = record.id;

        axios
          .delete(`http://localhost:3000/cars/${taskId}`)
          .then((response) => {
            console.log("Task successfully deleted:", response.data);
            // Remove the deleted task from the tasks list
            const updatedTasks = carList.filter((task) => task.id !== taskId);
            setCarList(updatedTasks);
          })
          .catch((error) => {
            console.error("Error deleting task:", error);
          });
      },
    });
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
  ];

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
        columns={carColumns}
        dataSource={carList}
        name={"Car"}
        tasks={carList}
        handleFinish={handleFinish}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default CarList;
