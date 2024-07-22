import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

import {
  QueryClientProvider,
} from '@tanstack/react-query'

import {queryClient} from '../queries/client'

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  );
});