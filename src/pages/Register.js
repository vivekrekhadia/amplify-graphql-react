import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Formik } from "formik";

import { useContext, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone";
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
// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const registerSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  phoneNumber: Yup.string().phone().required(),
  email: Yup.string().email(),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});
export default function Register() {
  const navigate = useNavigate();
  const [first, setFirst] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);
  const initialValue = {
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
  };
  let attributeList = [];

  console.log(first);

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
            validationSchema={registerSchema}
            initialValues={initialValue}
            onSubmit={(values, action) => {
              setLoading(true);
              const attributeUserPhone = new CognitoUserAttribute({
                Name: "phone_number",
                Value: values.phoneNumber,
              });
              const attributeName = new CognitoUserAttribute({
                Name: "name",
                Value: values.username,
              });
              attributeList.push(attributeUserPhone);
              attributeList.push(attributeName);

              UserPool.signUp(
                values.email,
                values.password,
                attributeList,
                null,
                (err, data) => {
                  if (err) {
                    action.setErrors(err);
                  } else {
                    localStorage.setItem("userData", JSON.stringify(data));
                    setLoading(false);
                    setFirst(true);
                    navigate("/verification");
                  }
                }
              );
              //   action.setSubmitting(false);
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
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Form.Group style={{ paddingTop: "15px" }} as={Col}>
                    <Form.Label className="required">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="User Name"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      // isValid={!touched.accountName}

                      isInvalid={!!touched.username && !!errors.username}
                      onBlur={handleBlur}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group style={{ paddingTop: "15px" }} as={Col}>
                    <Form.Label className="required">Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      // isValid={!touched.accountName}

                      isInvalid={!!touched.phoneNumber && !!errors.phoneNumber}
                      onBlur={handleBlur}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group style={{ paddingTop: "15px" }}>
                    <Form.Label
                      style={{ fontSize: "16px" }}
                      className="required">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      // isValid={!touched.accountName}

                      isInvalid={!!touched.email && !!errors.email}
                      onBlur={handleBlur}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
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
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleSubmit()}
                  disabled={
                    !values.email ||
                    !values.username ||
                    !values.email ||
                    !values.password ||
                    !isValid
                  }>
                  {loading ? "Signing Up" : " Sign Up"}
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}
