import React, { useEffect, useState } from "react";

import { Modal } from "antd";
import "./list.css";
import axios from "axios";
import CustomTable from "./CustomTable";
import moment from "moment";
import { url } from "../config";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskColumns, setTaskColumns] = useState([]);

  const handleFinish = (values, actionType) => {
    if (actionType === "Add") {
      callAddValues(values);
    } else if (actionType === "Edit") {
      callEditValues(values);
    }
  };

  const callAddValues = (values) => {
    const newTask = {
      id: values.id,
      title: values.title,
      description: values.description,
      extra: {
        start_date: values.start_date,
        end_date: values.end_date,
      },
    };

    fetch(`${url}/task`, {
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

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/task`);
      const data = response.data;
      // const formattedTasks = data.map((task) => {
      //   return {
      //     ...task,
      //     extra: {
      //       start_date: task.extra.start_date, // Convert start_date to moment object
      //       end_date: task.extra.end_date, // Convert end_date to moment object
      //     },
      //   };
      // });
      setTasks(data);

      if (data.length > 0) {
        const taskKeys = Object.keys(data[0]);
        console.log(taskKeys);

        const taskColumns = taskKeys
          .map((key) => {
            if (key === "extra") {
              return [
                {
                  title: "Start Date",
                  dataIndex: ["extra", "start_date"],
                  key: "start_date",
                  render: (text, record) => (
                    <span>{record.extra?.start_date}</span>
                  ),
                },
                {
                  title: "End Date",
                  dataIndex: ["extra", "end_date"],
                  key: "end_date",
                  render: (text, record) => (
                    <span>{record.extra?.end_date}</span>
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
    } catch (error) {
      console.error("Error fetching task list:", error);
    }
  };

  const callEditValues = (editedTask) => {
    // Find the index of the edited tas in the tasks array
    const { id, title, description, start_date, end_date } = editedTask;

    const updatedTask = {
      id,
      title,
      description,
      extra: {
        start_date, // Convert start_date to formatted string
        end_date, // Convert end_date to formatted string
      },
    };
    const taskIndex = tasks.findIndex((task) => task.id === editedTask.id);
    if (taskIndex !== -1) {
      // Create a new tasks array with the edited task
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = updatedTask;

      setTasks(updatedTasks);
      // setIsEditModalVisible(false);

      // Perform the API call to update the task
      axios
        .put(`${url}/task/${editedTask.id}`, updatedTask)
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
          .delete(`${url}/task/${taskId}`)
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

  // const taskColumns = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "Title",
  //     dataIndex: "title",
  //     key: "title",
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "Start Date",
  //     dataIndex: ["extra", "start_date"],
  //     key: "start_date",
  //     // render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""), // Check if text is available before formatting

  //     inputType: "date",
  //   },
  //   {
  //     title: "End Date",
  //     dataIndex: ["extra", "end_date"],
  //     key: "end_date",
  //     inputType: "date",
  //     // render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""), // Check if text is available before formatting
  //   },
  // ];

  return (
    <div>
      <CustomTable
        dataSource={tasks}
        columns={taskColumns}
        name={"Task"}
        tasks={tasks}
        handleFinish={handleFinish}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskList;
