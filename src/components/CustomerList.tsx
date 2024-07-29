import React, { useState } from "react";
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
}

interface CustomerListProps {
  userData: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ userData }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="accordionContainer">
      {userData &&
        userData.map((user, index) => (
          <Accordion
            key={index}
            className="accordionContent"
            expanded={expanded === index.toString()}
            onChange={handleChange(index.toString())}
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
