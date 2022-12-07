import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { createContext, useState } from "react";
import useLocalStorage from "../Utils/use-local-storage";
import UserPool from "../Utils/UserPool";

const AuthContext = createContext();

const Auth = ({ children }) => {
  const [authToken, setAuthToken] = useState(false);
  const [status, setStatus] = useState(false);
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      console.log("log", user);
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            console.log("error", err);
            reject(err);
          } else {
            setStatus(true);
            console.log("session validity: " + session.isValid());
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (values) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: values.email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: values.email,
        Password: values.password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log(data, "success");

          resolve(data);
        },
        onFailure: (data) => {
          console.log(data, "Failure");
          reject(data);
        },
        newPasswordRequired: (data) => {
          console.log(data, "password re");
          resolve(data);
        },
      });
    });
  };

  const logOut = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        getSession,
        logOut,
        authToken,
        setAuthToken,
        status,
        setStatus,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { Auth, AuthContext };
