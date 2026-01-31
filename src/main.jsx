import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import {
  QueriesObserver,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
