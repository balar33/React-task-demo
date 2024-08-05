import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
  InputAdornment,
  OutlinedInput,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import ResponseHandler from "../Helper/ResponseHandler";
import { saveLogedUser } from "../redux/reducers/user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter valid email"),
  password: Yup.string().required("Password is required"),
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
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(undefined);

  const users = useSelector((state) => state.user.users);

  const getToastMessage = useCallback(() => {
    if (location?.state) {
      setMessage({
        message: location?.state,
        flag: true,
      });
      navigate(location.pathname, { replace: true });
    }
  }, []);

  useEffect(() => {
    getToastMessage();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const matchData = users.filter(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (matchData && matchData?.length > 0) {
        dispatch(saveLogedUser(matchData));
        navigate("/", {
          state: "Login has been successfully",
        });
      } else {
        dispatch(saveLogedUser({}));
        setMessage({
          message: "something went wrong",
          flag: false,
        });
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {message && <ResponseHandler data={message} />}
      <Container component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 5 }}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={
                  formik.touched.email &&
                  formik.errors.email && (
                    <span style={{ color: "red" }}>{formik.errors?.email}</span>
                  )
                }
                style={{ marginBottom: 15 }}
              />
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
                        onClick={handleClickShowPassword}
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
                  <span style={{ color: "red", fontSize: 13, paddingLeft: 12 }}>
                    {formik.errors?.password}
                  </span>
                )}
              </FormControl>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!formik.values?.email || !formik.values?.password}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <span
                    variant="body2"
                    style={{
                      color: "#3E87D9",
                      cursor: "pointer",
                      fontSize: 13,
                      textDecoration: "underline #3E87D9",
                    }}
                  >
                    Forgot password?
                  </span>
                </Grid>
                <Grid item>
                  <span
                    variant="body2"
                    onClick={() => navigate("/register")}
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};
export default Login;
