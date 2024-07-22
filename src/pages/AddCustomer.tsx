import React from "react";
import { Box, Button, TextField } from "@mui/material";
import "./pagesStyles.css";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  phone: string;
  vehicle: string;
  tasks: string;
};

const AddCustomer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dataForServer = {
      name: data.name,
      phone: data.phone,
      vehicles: {
        [data.vehicle]: data.tasks
          .split(",")
          .map((task: string) => [task.trim(), false]),
      },
    };
    console.log(dataForServer);
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
            label="Належащи ремонти"
            variant="filled"
            color="success"
            {...register("tasks")}
          />
        </Box>
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
