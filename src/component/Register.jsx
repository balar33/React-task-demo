import React, { useMemo, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import countryList from "react-select-country-list";
import { useSelector, useDispatch } from "react-redux";
import { addNewUser } from "../redux/reducers/user";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid First Name")
    .min(2, "First Name Must be 2 characters or more")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid Last Name")
    .min(2, "Last Name Must be 2 characters or more")
    .required("Last Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter valid email"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone Must be 10 characters")
    .max(10, "Phone Must be 10 characters")
    .required("Phone is required"),
  password: Yup.string()
    .min(8, "Password Must be 8 characters or more")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Register = () => {
  const defaultTheme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const countryOptions = useMemo(() => countryList().getData(), []);

  const users = useSelector((state) => state.user.users);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      country: "",
      gender: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addNewUser([...users, values]));
      navigate("/login");
      navigate("/login", {
        state: "User Register has been successfully",
      });
    },
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    fullWidth
                    label="First Name"
                    helperText={
                      formik.touched.firstName &&
                      formik.errors.firstName && (
                        <span style={{ color: "red" }}>
                          {formik.errors?.firstName}
                        </span>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    helperText={
                      formik.touched.lastName &&
                      formik.errors.lastName && (
                        <span style={{ color: "red" }}>
                          {formik.errors?.lastName}
                        </span>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    fullWidth
                    label="Email"
                    helperText={
                      formik.touched.email &&
                      formik.errors.email && (
                        <span style={{ color: "red" }}>
                          {formik.errors?.email}
                        </span>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    helperText={
                      formik.touched.phone &&
                      formik.errors.phone && (
                        <span style={{ color: "red" }}>
                          {formik.errors?.phone}
                        </span>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="country"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.country}
                      label="Country"
                    >
                      {countryOptions.map((con, inx) => (
                        <MenuItem key={inx} value={con.value}>
                          {con.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                    {formik.touched.gender && formik.errors.gender && (
                      <span style={{ color: "red", fontSize: 13 }}>
                        {formik.errors?.gender}
                      </span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={3}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    helperText={
                      formik.touched.address &&
                      formik.errors.address && (
                        <span style={{ color: "red" }}>
                          {formik.errors?.address}
                        </span>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="filled-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="filled-adornment-password"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <span
                        style={{ color: "red", fontSize: 13, paddingLeft: 12 }}
                      >
                        {formik.errors?.password}
                      </span>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="filled-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="filled-adornment-password"
                      name="confirmPassword"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowConfirmPassword((show) => !show)
                            }
                            onMouseDown={(event) => {
                              event.preventDefault();
                            }}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <span
                          style={{
                            color: "red",
                            fontSize: 13,
                            paddingLeft: 12,
                          }}
                        >
                          {formik.errors?.confirmPassword}
                        </span>
                      )}
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <span
                    variant="body2"
                    onClick={() => navigate("/login")}
                    style={{
                      color: "#3E87D9",
                      cursor: "pointer",
                      fontSize: 13,
                      textDecoration: "underline #3E87D9",
                    }}
                  >
                    Already have an account? Sign in
                  </span>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Register;
