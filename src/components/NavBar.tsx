import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";

const NavBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  return (
    <div className="navBarContainer">
      <Box>
        <BottomNavigation
          className="navBar"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => {
              navigate("/all-customers");
            }}
            icon={
              <FormatListBulletedIcon
                sx={{
                  color: "green",
                  fontSize: "2rem",
                }}
              />
            }
          />
          <BottomNavigationAction
            onClick={() => {
              navigate("/add-customer");
            }}
            icon={
              <AddIcon
                sx={{
                  color: "green",
                  fontSize: "2rem",
                }}
              />
            }
          />
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default NavBar;
