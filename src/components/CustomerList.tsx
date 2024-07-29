import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./componentsStyles.css";
import { Box, Button, TextField } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import Popup from "./Popup";
import { set } from "react-hook-form";
interface Task {
  task: string;
  completed: boolean;
}

interface Vehicle {
  [key: string]: Task[];
}

interface User {
  name: string;
  phone: string;
  vehicles: Vehicle;
}

interface Customer {
  customer: User;
  id: number;
}

interface CustomerListProps {
  userData: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ userData }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleOpenAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddTask = async (
    index: number,
    userIndex: number,
    vehicleIndex: number
  ) => {
    if (newTask === "") return;
    const db = getFirestore();
    const user = userData[index];
    const vehicle = Object.keys(user.customer.vehicles)[vehicleIndex];
    const newTaskToAdd = {
      task: newTask,
      completed: false,
    };
    if (!newTaskToAdd.task) return;

    const userRef = doc(db, "customers", userIndex.toString());
    const updatedUserData = {
      ...user,
      customer: {
        ...user.customer,
        vehicles: {
          ...user.customer.vehicles,
          [vehicle]: [...user.customer.vehicles[vehicle], newTaskToAdd],
        },
      },
    };

    await updateDoc(userRef, updatedUserData)
      .then(() => {
        console.log("Document successfully updated!");
        setNewTask("");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleRemoveTask = async (
    index: number,
    userIndex: number,
    vehicleIndex: number,
    taskIndex: number
  ) => {
    const db = getFirestore();
    const user = userData[index];
    const vehicle = Object.keys(user.customer.vehicles)[vehicleIndex];
    const task = user.customer.vehicles[vehicle][taskIndex];
    if (!task) return;

    const userRef = doc(db, "customers", userIndex.toString());
    const updatedUserData = {
      ...user,
      customer: {
        ...user.customer,
        vehicles: {
          ...user.customer.vehicles,
          [vehicle]: [
            ...user.customer.vehicles[vehicle].slice(0, taskIndex),
            ...user.customer.vehicles[vehicle].slice(taskIndex + 1),
          ],
        },
      },
    };

    await updateDoc(userRef, updatedUserData)
      .then(() => {
        console.log("Document successfully deleted!");
        setOpenPopup(false);
        setTaskToDelete(null);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleTaskCompletion = async (
    index: number,
    userIndex: number,
    vehicleIndex: number,
    taskIndex: number
  ) => {
    const db = getFirestore();
    const user = userData[index];
    const vehicle = Object.keys(user.customer.vehicles)[vehicleIndex];
    const task = user.customer.vehicles[vehicle][taskIndex];
    if (!task) return;
    task.completed = !task.completed;

    const userRef = doc(db, "customers", userIndex.toString());
    const updatedUserData = {
      ...user,
      customer: {
        ...user.customer,
        vehicles: {
          ...user.customer.vehicles,
          [vehicle]: [
            ...user.customer.vehicles[vehicle].slice(0, taskIndex),
            task,
            ...user.customer.vehicles[vehicle].slice(taskIndex + 1),
          ],
        },
      },
    };

    await updateDoc(userRef, updatedUserData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div className="accordionContainer">
      {userData &&
        userData.map((user, index) => (
          <Accordion
            key={index}
            className="accordionContent"
            expanded={expanded === index.toString()}
            onChange={handleOpenAccordionChange(index.toString())}
            sx={{
              ...(expanded === index.toString() && { borderRadius: "5px" }),
              ...(expanded !== false && expanded !== index.toString()
                ? {
                    filter: "blur(1px)",
                    opacity: "0.5",
                    backgroundColor: "gray",
                  }
                : { marginBottom: "5px", borderRadius: "5px" }),
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, .125)",
              }}
            >
              <p className="accordionHeaderName">
                {user.customer.name} - {user.customer.phone}
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="customerVehicles">
                {Object.entries(user.customer.vehicles).map(
                  ([vehicle, tasks], vehicleIndex) => (
                    <li
                      key={vehicleIndex}
                      className={vehicleIndex !== 0 ? "vehicle" : undefined}
                    >
                      <p className="vehicleHeader">
                        <DirectionsCarFilledOutlinedIcon />
                        {vehicle}
                      </p>
                      <ul className="vehicleRepairs">
                        {tasks.map((task, taskIndex) => (
                          <Box className="tasksBox">
                            <BlockIcon
                              className="deleteTaskIcon"
                              onClick={() => {
                                setOpenPopup(true);
                                setTaskToDelete(taskIndex);
                              }}
                            />
                            <Popup
                              openPopup={openPopup}
                              message="Желате ли да изтриете тази задача?"
                              onClose={() =>
                                handleRemoveTask(
                                  index,
                                  user.id,
                                  vehicleIndex,
                                  taskIndex
                                )
                              }
                              closePopup={() => setOpenPopup(false)}
                            />
                            <li
                              key={taskIndex}
                              style={
                                openPopup == true && taskToDelete !== taskIndex
                                  ? {
                                      opacity: "0.5",
                                    }
                                  : {}
                              }
                            >
                              <Checkbox
                                color="success"
                                checked={task.completed}
                                onChange={() =>
                                  handleTaskCompletion(
                                    index,
                                    user.id,
                                    vehicleIndex,
                                    taskIndex
                                  )
                                }
                              />
                              {task.task}
                            </li>
                          </Box>
                        ))}
                      </ul>
                      <Box className="addTaskBox">
                        <TextField
                          className="addTaskInput"
                          label="Нова задача"
                          color="success"
                          size="small"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                        />
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() =>
                            handleAddTask(index, user.id, vehicleIndex)
                          }
                        >
                          Добави
                        </Button>
                      </Box>
                    </li>
                  )
                )}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
};

export default CustomerList;
