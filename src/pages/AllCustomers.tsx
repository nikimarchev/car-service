import React, { useState } from "react";
import { Box, Input } from "@mui/material";
import "./pagesStyles.css";
import CustomerList from "../components/CustomerList.tsx";

const AllCustomers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [usersData, setUsersData] = useState([
    {
      name: "Мария Иванова",
      phone: "0987654321",
      vehicles: {
        "Audi A4 - 112233445566": [
          ["Смяна масло и филтри", true],
          ["Предни спирачни дискове", false],
          ["Задни амортисьори", true],
        ],
        "Volkswagen Golf - 334455667788": [
          ["Смяна масло и филтри", true],
          ["Съединител", false],
        ],
      },
    },
    {
      name: "Георги Петров",
      phone: "0882642723",
      vehicles: {
        "Mercedes-Benz C-Class - 556677889900": [
          ["Смяна масло и филтри", true],
          ["Предни спирачни накладки", false],
          ["Водно помпа", true],
        ],
      },
    },
    {
      name: "Иван Димитров",
      phone: "0887654321",
      vehicles: {
        "Toyota Corolla - 998877665544": [
          ["Смяна масло и филтри", true],
          ["Алтернатор", false],
          ["Предни амортисьори", true],
        ],
        "Mazda 3 - 443322110099": [
          ["Смяна масло и филтри", true],
          ["Радиатор", false],
        ],
      },
    },
    {
      name: "Стефан Стоянов",
      phone: "0872325234",
      vehicles: {
        "Ford Focus - 112255779900": [
          ["Смяна масло и филтри", true],
          ["Предни накладки", false],
          ["Турбина", true],
        ],
      },
    },
    {
      name: "Петър Василев",
      phone: "0882264824",
      vehicles: {
        "Honda Civic - 778899001122": [
          ["Смяна масло и филтри", true],
          ["Съединител", false],
          ["Задни амортисьори", true],
        ],
      },
    },
    {
      name: "Александра Георгиева",
      phone: "0887654321",
      vehicles: {
        "Renault Megane - 112299337788": [
          ["Смяна масло и филтри", true],
          ["Ремъчна система", false],
          ["Кормилна уредба", true],
        ],
        "Peugeot 307 - 667788990044": [
          ["Смяна масло и филтри", true],
          ["Каре", false],
        ],
      },
    },
    {
      name: "Димитър Николов",
      phone: "0887654321",
      vehicles: {
        "Subaru Impreza - 556677889944": [
          ["Смяна масло и филтри", true],
          ["Предни спирачни накладки", false],
          ["Задна броня", true],
        ],
        "Chevrolet Cruze - 443322110022": [
          ["Смяна масло и филтри", true],
          ["Водно помпа", false],
        ],
      },
    },
    {
      name: "Елена Маринова",
      phone: "0887654321",
      vehicles: {
        "Kia Sportage - 667788990088": [
          ["Смяна масло и филтри", true],
          ["Задни накладки", false],
          ["Задни амортисьори", true],
        ],
        "Suzuki Swift - 998877665577": [
          ["Смяна масло и филтри", true],
          ["Алтернатор", false],
        ],
      },
    },
    {
      name: "Николай Стефанов",
      phone: "0887654321",
      vehicles: {
        "BMW X5 - 889900112233": [
          ["Смяна масло и филтри", true],
          ["Турбина", false],
          ["Предни амортисьори", true],
        ],
        "Skoda Octavia - 112233445577": [
          ["Смяна масло и филтри", true],
          ["Ремъчна система", false],
        ],
      },
    },
    {
      name: "Красимир Иванов",
      phone: "0887762742",
      vehicles: {
        "Lexus RX - 998877665588": [
          ["Смяна масло и филтри", true],
          ["Каре", false],
          ["Задни накладки", true],
        ],
        "Mitsubishi Lancer - 223344556677": [
          ["Смяна масло и филтри", true],
          ["Генератор", false],
        ],
      },
    },
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filterUsers = (users: any, searchValue: string) => {
    return users.filter((user: any) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <Box className="listBox">
      <h1 className="sectionHeader">ВСИЧКИ КЛИЕНТИ</h1>
      <Input
        className="searchInput"
        placeholder="Въведете име"
        value={searchValue}
        onChange={handleInputChange}
      />
      <CustomerList userData={filterUsers(usersData, searchValue)} />
    </Box>
  );
};

export default AllCustomers;
