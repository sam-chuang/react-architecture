import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext
} from "react"
import { Set, Button, Table, Pagination } from "bumbag"
import Async, { useAsync } from "react-async"
import { useTable } from "react-table"

//TODO: return table context
const DefaultPageSize = 10

const Context = createContext({})

//TODO: pageSize ?
//TODO: pageIndex from props?
export default ({
  fetchData,
  promise,
  mapItems = defaultMapItems,
  getNumberOfPages,
  columns,
  children,
  ...props
}) => {
  let async = useAsync({ promise })
  let { data, error, isPending } = async

  let table = useTable({
    columns,
    data: mapItems(data) ?? [],
    initialState: { pageIndex: 0 }
  })
  let {
    getTableProps,
    rows,
    state: { pageIndex, pageSize }
  } = table

  //TODO: pageIndex not set(nil or undefined)
  const getPage = () => pageIndex + 1

  useEffect(() => {
    //TODO: lazy variable?
    if (pageIndex >= 0) {
      fetchData({ page: getPage(), pageIndex, pageSize })
    }
  }, [fetchData, pageIndex, pageSize])

  //TODO: isPending
  return (
    <Context.Provider value={{ table, async, getPage, fetchData }}>
      <Set orientation="vertical">
        <Table {...getTableProps()} {...props}>
          {children}
        </Table>
        {getNumberOfPages && (
          <Pagination
            currentPage={getPage()}
            onChangePage={(page) => fetchData({ page, pageIndex, pageSize })}
            numberOfPages={getNumberOfPages({ data, pageSize })}
          />
        )}
      </Set>
      {isPending && <div>TODO: loading indicator</div>}
    </Context.Provider>
  )
}

const defaultMapItems = (data) => data

export const useAsyncTable = () => {
  return useContext(Context)
}

export const useIsPending = () => {
  let { async = {} } = useContext(Context)
  let { isPending = false } = async
  return isPending
}
