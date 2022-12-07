import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./scss/custom.scss";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./components/Theme";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { Auth } from "./context/authContext";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={Theme}>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <Auth>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </Auth>
            </UserProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
