import { StylesProvider } from "@material-ui/core/styles";
import { AuthProvider } from "Context/authContext";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "./styles/globalClasses.module.css";
import "./styles/tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 15 },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      {/* https://material-ui.com/guides/interoperability/#controlling-priority-4 */}
      <StylesProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </QueryClientProvider>
      </StylesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
