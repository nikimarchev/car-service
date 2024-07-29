import React from "react";
import { Box, Button } from "@mui/material";

interface PopupProps {
  openPopup: boolean;
  message: string;
  onClose: () => void;
  closePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({
  openPopup,
  message,
  onClose,
  closePopup,
}) => {
  return (
    <>
      {openPopup && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 999,
            }}
          />
          <Box
            sx={{
              position: "fixed",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "5px",
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <h4>{message}</h4>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Button variant="text" color="success" onClick={closePopup}>
                Затвори
              </Button>
              <Button variant="text" color="error" onClick={onClose}>
                Изтрий
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Popup;
