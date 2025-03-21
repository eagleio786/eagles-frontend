import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WagmiProvider } from "wagmi";
import { config } from "./Config/config.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";



const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
        })} modalSize="compact" 
    //     appInfo={{
    // disclaimer: () => (
    //   <div style={{ textAlign: "center", fontSize: "14px", paddingTop: "10px", color:"gray"}}>
    //     Got Qustions? <a href="https://your-support-url.com" target="_blank" rel="noopener noreferrer" style={{marginLeft:"2px", color: "white", fontWeight: "bold" }}>Contact Support</a>
    //   </div>
    // ),}} 
    >
  
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
