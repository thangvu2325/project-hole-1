import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyles from "./components/GlobalStyles/index.tsx";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Roboto, sans-serif",
              fontSizeHeading1: 18,
              fontSizeHeading2: 16,
              fontSizeHeading3: 14,
              fontSizeHeading4: 12,
              fontSizeHeading5: 10,
            },
            components: {
              Layout: {
                headerBg: "#fff",
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </GlobalStyles>
    </Provider>
  </React.StrictMode>
);
