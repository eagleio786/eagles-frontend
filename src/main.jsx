import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WagmiProvider } from "wagmi";
import { config } from "./Config/config.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter, queryClient, projectId } from "./Config/config.js";
import { mainnet } from "@reown/appkit/networks";

// const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
