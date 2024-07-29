import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./pagesStyles.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

type Inputs = {
  name: string;
  phone: string;
  vehicle: string;
  vin: string;
  tasks: string;
};

const AddCustomer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const vehicle = data.vehicle + " - " + data.vin;
    const dataForServer = {
      name: data.name,
      phone: data.phone,
      vehicles: {
        [vehicle]: data.tasks
          ? data.tasks.split(",").map((task: string) => ({
              task: task.trim(),
              completed: false,
            }))
          : [],
      },
    };
    console.log(dataForServer);

    try {
      const docRef = await addDoc(collection(db, "customers"), {
        customer: dataForServer,
      });
      console.log("Document written with ID: ", docRef.id);
      navigate("/all-customers");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Box className="listBox">
      <h1 className="sectionHeader">ДОБАВИ КЛИЕНТ</h1>
      <form className="addCustomerForm" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ marginTop: "40px" }}>
          <TextField
            InputProps={{
              style: { marginRight: "10px" },
            }}
            className="formInput"
            label="Имена"
            variant="filled"
            color="success"
            {...register("name", { required: true })}
          />
          <TextField
            className="formInput"
            label="Телефон"
            variant="filled"
            color="success"
            {...register("phone")}
          />
        </Box>
        <Box>
          <TextField
            InputProps={{
              style: { marginRight: "10px" },
            }}
            className="formInput"
            label="Превозно средство"
            variant="filled"
            color="success"
            {...register("vehicle", { required: true })}
          />
          <TextField
            className="formInput"
            label="VIN номер"
            variant="filled"
            color="success"
            {...register("vin")}
          />
        </Box>
        <TextField
          className="formInput"
          label="Належащи ремонти"
          variant="filled"
          color="success"
          {...register("tasks")}
        />
        <Box className="errorMessages">
          {(errors.name && !errors.vehicle && (
            <span style={{ color: "red" }}>Добавете имената на клиента.</span>
          )) ||
            (errors.vehicle && !errors.name && (
              <span style={{ color: "red" }}>Добавете колата на клиента.</span>
            ))}
          {errors.name && errors.vehicle && (
            <span style={{ color: "red" }}>
              Добавете имената и колата на клиента.
            </span>
          )}
        </Box>
        <Button
          className="submitButton"
          type="submit"
          color="success"
          variant="contained"
        >
          ДОБАВИ
        </Button>
      </form>
    </Box>
  );
};

export default AddCustomer;
