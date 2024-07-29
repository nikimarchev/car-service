import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./componentsStyles.css";

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
  const [localUserData, setLocalUserData] = useState<Customer[]>([]);

  useEffect(() => {
    setLocalUserData(userData || []);
  }, [userData]);

  const handleOpenAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
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
        const updatedUsers = [...localUserData];
        updatedUsers[userIndex] = updatedUserData;
        setLocalUserData(updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div className="accordionContainer">
      {localUserData &&
        localUserData.map((user, index) => (
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
                          <li key={taskIndex}>
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
                        ))}
                      </ul>
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
