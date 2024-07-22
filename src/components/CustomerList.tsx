import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import "./componentsStyles.css";

const CustomerList = ({ userData }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="accordionContainer">
      {userData.map((user, index) => (
        <Accordion
          key={index}
          className="accordionContent"
          expanded={expanded === index}
          onChange={handleChange(index)}
          sx={{
            ...(expanded === index && { borderRadius: "5px" }),
            ...(expanded !== false && expanded !== index
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
              {user.name} - {user.phone}
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="customerVehicles">
              {Object.entries(user.vehicles).map(
                ([vehicle, services], index) => (
                  <li
                    key={index}
                    className={index !== 0 ? "vehicle" : undefined}
                  >
                    <p className="vehicleHeader">
                      <DirectionsCarFilledOutlinedIcon />
                      {vehicle}
                    </p>
                    <ul className="vehicleRepairs">
                      {services.map(([service, done], index) => (
                        <li key={index}>
                          <Checkbox color="success" checked={done} />
                          {service}
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
