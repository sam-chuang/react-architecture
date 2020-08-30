import React, { useState } from "react"
import { css } from "@emotion/core"
import logo from "./logo.svg"
import { Button } from "bumbag"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button
          css={css`
            background: pink;
          `}
        >
          Hello
        </Button>
      </header>
    </div>
  )
}

export default App
