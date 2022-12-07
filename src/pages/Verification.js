import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// import UserPool from "../Utils/UserPool";
import icon from "../assets/light-bulb.png";
import regCalender from "../assets/register-calender.svg";
import { UserContext } from "../context/userContext";
import UserPool from "../Utils/UserPool";

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
export default function Verification() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);
  console.log(userData);
  const username = JSON.parse(localStorage.getItem("userData"));
  const User = new CognitoUser({
    Username: username?.user?.username || "",
    Pool: UserPool,
  });

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
      }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${regCalender})`,
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",

          backgroundColor: "#ffffff00",
          backgroundSize: "contain",
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
            Register
          </Typography>

          <Formik
            initialValues={{ code: null }}
            onSubmit={(values, action) => {
              setLoading(true);
              User.confirmRegistration(
                values.code.toString(),
                true,
                function (err, result) {
                  if (err) {
                    console.log(err);
                  } else {
                    setLoading(false);
                    navigate("/login");
                    console.log(result);
                  }
                }
              );
              action.resetForm();
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
                style={{ width: "100%" }}
                onSubmit={handleSubmit}>
                <Row>
                  <Form.Group style={{ paddingTop: "15px" }}>
                    <Form.Label
                      style={{ fontSize: "16px" }}
                      className="required">
                      Enter Verification Code
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Verification Code"
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                      // isValid={!touched.accountName}

                      onBlur={handleBlur}></Form.Control>
                  </Form.Group>
                </Row>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {loading ? "...Entering code" : "Enter code"}
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
