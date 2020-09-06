import React, { useEffect, useMemo, useState, createContext } from "react"
import { css } from "@emotion/core"
import logo from "./logo.svg"
import { Table, Button } from "bumbag"
import Async, { useAsync } from "react-async"
//import { useTable } from "react-table"
import AsyncTable, { useAsyncTable } from "./table"
import "./App.css"

function App() {
  //TODO: merge with other params
  const fetchData = ([params]) => {
    console.log("fetchData", params)
    return client.listTodos()
  }

  let columns = useMemo(tableColumns)

  return (
    <div className="App">
      <Async deferFn={fetchData}>
        {({ promise, run }) => {
          return (
            <AsyncTable fetchData={run} promise={promise} columns={columns}>
              <TableContents />
            </AsyncTable>
          )
        }}
      </Async>
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

const client = {
  listTodos: () => {
    return fetch("https://api.mocki.io/v1/13f44462").then((response) =>
      response.json()
    )
  }
}

const TableContents = ({}) => {
  let { table, async } = useAsyncTable()
  let { isPending } = async
  let { headerGroups, rows, getTableBodyProps, prepareRow } = table

  return (
    <>
      <Table.Head>
        {headerGroups.map((headerGroup) => (
          <Table.Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Table.HeadCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </Table.HeadCell>
            ))}
          </Table.Row>
        ))}
      </Table.Head>
      <Table.Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <Table.Row {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </>
  )
  /*
  return (
    <>
      <Table.Head>
        {headerGroups.map((headerGroup) => (
          <Table.Row {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Table.HeadCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </Table.HeadCell>
            ))}
          </Table.Row>
        ))}
      </Table.Head>
      <Table.Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <Table.Row {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Table.Cell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </>
  )
  */
}

/*
const AsyncTable = ({ fetchData, promise, columns, children }) => {
  let { data = [], error, isPending } = useAsync({ promise })
  let table = useTable({ columns, data, initialState: { pageIndex: 0 } })

  let {
    state: { pageIndex, pageSize }
  } = table

  const getPage = () => pageIndex + 1

  return children(table)
}
*/

const tableColumns = () => [
  {
    Header: "Title",
    accessor: "title"
  },
  {
    Header: "Description",
    accessor: "description"
  }
]

export default App
