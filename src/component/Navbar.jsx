import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <ButtonGroup
        variant="outlined"
        aria-label="Basic button group"
        style={{ margin: 10 }}
      >
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
        <Button onClick={() => navigate("/")}>Dashboard</Button>
      </ButtonGroup>
    </>
  );
};
export default Navbar;
