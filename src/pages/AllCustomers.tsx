import React, { useEffect, useState } from "react";
import { Box, Input } from "@mui/material";
import "./pagesStyles.css";
import CustomerList from "../components/CustomerList";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const AllCustomers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [usersData, setUsersData] = useState<any>([]);

  const fetchPost = () => {
    const unsubscribe = onSnapshot(
      collection(db, "customers"),
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsersData(newData);
      }
    );

    return () => unsubscribe();
  };

  useEffect(() => {
    const unsubscribe = fetchPost();
    return () => unsubscribe();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filterUsers = (users: any, searchValue: string) => {
    return users.filter((user: any) =>
      user.customer.name.toLowerCase().includes(searchValue.toLowerCase())
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
      {usersData && (
        <CustomerList userData={filterUsers(usersData, searchValue)} />
      )}
    </Box>
  );
};

export default AllCustomers;
