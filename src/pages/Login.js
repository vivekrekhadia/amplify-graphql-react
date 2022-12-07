import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import * as React from "react";
import { Form, Row } from "react-bootstrap";
import calender from "../assets/login-back.svg";
import icon from "../assets/light-bulb.png";
import * as Yup from "yup";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../Utils/UserPool";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useDispatch } from "react-redux";
import { AuthSlice } from "../redux/Auth/AuthSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = AuthSlice;
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { authenticate, setAuthToken } = React.useContext(AuthContext);
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100%",
      }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${calender})`,
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",

          backgroundColor: "#ffffff00",
          backgroundSize: "50%",

          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            margin: "0px 50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minWidth: "0",
          }}>
          <img src={icon} alt="" width="100" height="100" />

          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {error ? (
            <div
              style={{
                border: "1px solid red",
                padding: "20px",
                width: "100%",
                marginTop: "10px",
                backgroundColor: "#ff00000d",
              }}>
              <h6 style={{ color: "red" }}>{error}</h6>
            </div>
          ) : null}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, action) => {
              setLoading(true);

              authenticate(values)
                .then((res) => {
                  console.log(res);
                  setLoading(false);
                  dispatch(actions.setAuthToken(true));
                })
                .catch((err) => {
                  console.log(err);
                  setError(err.message);
                });

              // User.confirmRegistration(
              //   values.code.toString(),
              //   true,
              //   function (err, result) {
              //     if (err) {
              //       console.log(err);
              //     } else {
              //       navigate("/home");
              //       console.log(result);
              //     }
              //   }
              // );
            }}>
            {({
              errors,
              touched,
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              isValid,
              dirty,
              resetForm,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                style={{ width: "100%" }}>
                <Row>
                  <Form.Group style={{ paddingTop: "15px" }}>
                    <Form.Label
                      style={{ fontSize: "16px" }}
                      className="required">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email ID"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      // isValid={!touched.accountName}
                      isInvalid={!!touched.email && !!errors.email}
                      onBlur={handleBlur}></Form.Control>
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Row>
                <Row>
                  <Form.Group style={{ paddingTop: "15px" }}>
                    <Form.Label
                      style={{ fontSize: "16px" }}
                      className="required">
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      // isValid={!touched.accountName}

                      isInvalid={!!touched.password && !!errors.password}
                      onBlur={handleBlur}></Form.Control>
                  </Form.Group>
                </Row>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "100%" }}>
                  {loading ? "....Signing In" : "Sign In"}
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Form>
              // </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}
