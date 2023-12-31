import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomTable from "./CustomTable";
import axios from "axios";
import { url } from "../config";

const CarList = () => {
  const [carList, setCarList] = useState([]);
  const [taskColumns, setTaskColumns] = useState([]);
  const handleFinish = (values, actionType) => {
    if (actionType === "Add") {
      callAddValues(values);
    } else if (actionType === "Edit") {
      callEditValues(values);
    }
  };

  useEffect(() => {
    fetch(`${url}/cars`)
      .then((response) => response.json())
      .then((data) => {
        setCarList(data);
        if (data.length > 0) {
          const taskKeys = Object.keys(data[0]);
          console.log(taskKeys);

          const taskColumns = taskKeys
            .map((key) => {
              if (key === "car_details") {
                return [
                  {
                    title: "Car Number",
                    dataIndex: ["car_details", "car_number"],
                    key: "car_number",
                    render: (text, record) => (
                      <span>{record.car_details?.car_number}</span>
                    ),
                  },
                  {
                    title: "Car Engine",
                    dataIndex: ["car_details", "car_engine"],
                    key: "car_engine",
                    render: (text, record) => (
                      <span>{record.car_details?.car_engine}</span>
                    ),
                  },
                  {
                    title: "Car Model",
                    dataIndex: ["car_details", "car_model"],
                    key: "car_model",
                    render: (text, record) => (
                      <span>{record.car_details?.car_model}</span>
                    ),
                  },
                ];
              }

              return {
                title: key.toUpperCase(),
                dataIndex: key,
                key,
              };
            })
            .flat();

          setTaskColumns(taskColumns);
        }
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  }, []);

  const callAddValues = async (values) => {
    const newCar = {
      id: values.id,
      car_name: values.car_name,
      car_details: {
        car_number: values.car_number,
        car_engine: values.car_engine,
        car_model: values.car_model,
      },
    };

    try {
      const response = await axios.post(`${url}/cars`, newCar);
      const data = response.data;
      console.log("Car successfully posted:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    setCarList([...carList, newCar]);
  };

  const handleEditTask = (record) => {
    // setEditingTask(record);
    // setIsEditModalVisible(true);
  };

  const callEditValues = (editedTask) => {
    const { id, car_name, car_number, car_engine, car_model } = editedTask;

    const updatedTask = {
      id,
      car_name,
      car_details: {
        car_number,
        car_engine,
        car_model,
      },
    };
    // Find the index of the edited task in the tasks array
    const taskIndex = carList.findIndex((task) => task.id === editedTask.id);

    if (taskIndex !== -1) {
      // Create a new tasks array with the edited task
      const updatedTasks = [...carList];
      updatedTasks[taskIndex] = updatedTask;

      setCarList(updatedTasks);

      // Perform the API call to update the task
      axios
        .put(`${url}/cars/${editedTask.id}`, updatedTask)
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
          .delete(`${url}/cars/${taskId}`)
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

  // const carColumns = [
  //   {
  //     title: "Car ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Car Name",
  //     dataIndex: "car_name",
  //     key: "car_name",
  //   },
  //   {
  //     title: "Car Number",
  //     dataIndex: ["car_details", "car_number"],
  //     key: "car_number",
  //   },
  //   {
  //     title: "Car Engine",
  //     dataIndex: ["car_details", "car_engine"],
  //     key: "car_engine",
  //   },
  //   {
  //     title: "Car Model",
  //     dataIndex: ["car_details", "car_model"],
  //     key: "car_model",
  //   },
  // ];

  return (
    <div>
      <CustomTable
        columns={taskColumns}
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
