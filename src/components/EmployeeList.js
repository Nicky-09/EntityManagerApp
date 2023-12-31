import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import axios from "axios";
import { Modal } from "antd";
import { url } from "../config";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeColumns, setEmployeeColumns] = useState([]);

  useEffect(() => {
    fetch(`${url}/employee`)
      .then((response) => response.json())
      .then((data) => {
        setEmployeeList(data);
        if (data.length > 0) {
          const taskKeys = Object.keys(data[0]);
          console.log(taskKeys);

          const taskColumns = taskKeys
            .map((key) => {
              if (key === "employee_details") {
                return [
                  {
                    title: "Name",
                    dataIndex: ["employee_details", "name"],
                    key: "name",
                    render: (text, record) => (
                      <span>{record.employee_details?.name}</span>
                    ),
                  },
                  {
                    title: "Address",
                    dataIndex: ["employee_details", "address"],
                    key: "address",
                    render: (text, record) => (
                      <span>{record.employee_details?.address}</span>
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

          setEmployeeColumns(taskColumns);
        }
      })
      .catch((error) => {
        console.error("Error fetching task list:", error);
      });
  }, []);

  const handleFinish = (values, actionType) => {
    if (actionType === "Add") {
      callAddValues(values);
    } else if (actionType === "Edit") {
      callEditValues(values);
    }
  };

  const callAddValues = async (values) => {
    const newEmployee = {
      id: values.id,
      position: values.position,
      employee_details: {
        name: values.name,
        address: values.address,
      },
    };

    try {
      const response = await axios.post(`${url}/employee`, newEmployee);
      const data = response.data;
      console.log("Employee successfully posted:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    setEmployeeList([...employeeList, newEmployee]);
  };

  // const employeeColumns = [
  //   {
  //     title: "Employee ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Position",
  //     dataIndex: "position",
  //     key: "position",
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: ["employee_details", "name"],
  //     key: "name",
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: ["employee_details", "address"],
  //     key: "address",
  //   },
  // ];

  const handleEditTask = (record) => {
    // setEditingTask(record);
    // setIsEditModalVisible(true);
  };
  // const handleCancelEdit = () => {
  //   setEditingTask(null);
  //   setIsEditModalVisible(false);
  // };

  const callEditValues = (editedTask) => {
    const { id, position, name, address } = editedTask;

    const updatedTask = {
      id,
      position,
      employee_details: {
        name,
        address,
      },
    };
    // Find the index of the edited task in the tasks array
    const taskIndex = employeeList.findIndex(
      (task) => task.id === editedTask.id
    );

    if (taskIndex !== -1) {
      // Create a new tasks array with the edited task
      const updatedTasks = [...employeeList];
      updatedTasks[taskIndex] = updatedTask;

      setEmployeeList(updatedTasks);

      // Perform the API call to update the task
      axios
        .put(`${url}/employee/${editedTask.id}`, updatedTask)
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
          .delete(`${url}/employee/${taskId}`)
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
