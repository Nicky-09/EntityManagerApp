import React, { useEffect, useState } from "react";

import { Modal } from "antd";
import "./list.css";
import axios from "axios";
import CustomTable from "./CustomTable";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const handleFinish = (values, actionType) => {
    console.log("aaya");
    if (actionType === "Add") {
      callAddValues(values);
    } else if (actionType === "Edit") {
      callEditValues(values);
    }
  };

  const callAddValues = (values) => {
    console.log({ values });
    const newTask = {
      id: values.id,
      title: values.title,
      description: values.description,
      extra: {
        start_date: values.start_date,
        end_date: values.end_date,
      },
    };

    fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task successfully posted:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (record) => {
    // setEditingTask(record);
    // setIsEditModalVisible(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/task");
      const data = response.data;

      setTasks(data);

      // if (data.length > 0) {
      //   const taskKeys = Object.keys(data[0]);

      //   const taskColumns = taskKeys
      //     .map((key) => {
      //       if (key === "extra") {
      //         return [
      //           {
      //             title: "Start Date",
      //             dataIndex: ["extra", "start_date"],
      //             key: "start_date",
      //             render: (text, record) => (
      //               <span>{record.extra?.start_date}</span>
      //             ),
      //           },
      //           {
      //             title: "End Date",
      //             dataIndex: ["extra", "end_date"],
      //             key: "end_date",
      //             render: (text, record) => (
      //               <span>{record.extra?.end_date}</span>
      //             ),
      //           },
      //         ];
      //       }

      //       return {
      //         title: key.toUpperCase(),
      //         dataIndex: key,
      //         key,
      //       };
      //     })
      //     .flat();

      //   setTaskColumns(taskColumns);
      // }
    } catch (error) {
      console.error("Error fetching task list:", error);
    }
  };

  // const handleFinish = (newTask) => {
  //   setTasks([...tasks, newTask]);
  //   setIsModalVisible(false);
  // };

  // const handleCancelEdit = () => {
  //   setEditingTask(null);
  //   setIsEditModalVisible(false);
  // };

  const callEditValues = (editedTask) => {
    // Find the index of the edited task in the tasks array
    const taskIndex = tasks.findIndex((task) => task.id === editedTask.id);
    console.log({ taskIndex });
    if (taskIndex !== -1) {
      // Create a new tasks array with the edited task
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = editedTask;

      setTasks(updatedTasks);
      // setIsEditModalVisible(false);

      // Perform the API call to update the task
      axios
        .put(`http://localhost:3000/task/${editedTask.id}`, editedTask)
        .then((response) => {
          console.log("Task successfully updated:", response.data);
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
          .delete(`http://localhost:3000/task/${taskId}`)
          .then((response) => {
            console.log("Task successfully deleted:", response.data);
            // Remove the deleted task from the tasks list
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
          })
          .catch((error) => {
            console.error("Error deleting task:", error);
          });
      },
    });
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
  ];

  return (
    <div>
      {/* <Modal
        title="Edit Task"
        open={isEditModalVisible}
        onCancel={handleCancelEdit}
        footer={null}
      >
        {editingTask && <CustomForm />}
      </Modal> */}
      <CustomTable
        dataSource={tasks}
        columns={taskColumns}
        name={"Task"}
        tasks={tasks}
        handleFinish={handleFinish}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskList;
