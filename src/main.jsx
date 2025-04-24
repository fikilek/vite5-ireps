import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import React from "react";
// import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <ErrorBoundary fallback={<div>Something went wrong</div>}>
	// <React.StrictMode>
	<App />
	// </React.StrictMode>
	// </ErrorBoundary>
);
