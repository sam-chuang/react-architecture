import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider as BumbagProvider } from "bumbag"
import App from "./App"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <BumbagProvider>
        <App />
      </BumbagProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
