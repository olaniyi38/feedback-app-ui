import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Providers from "./store/Providers";

import 'react-loading-skeleton/dist/skeleton.css'
import "./index.css";

const container = document.getElementById("root")

if (container) {
	ReactDOM.createRoot(container).render(
		<Providers>
			<App />
		</Providers>
	);

}
