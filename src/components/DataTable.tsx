import React, { useState, useMemo, useCallback } from "react";
import "./DataTable.css";
import { DataTableProps, SortConfig } from "../types";

export default function DataTable<
  T extends Record<string, unknown> & { id: string | number }
>({
  data,
  columns,
  title,
  disabledColumns = [],
  isLoading,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  const [searchText, setSearchText] = useState("");

  const sortData = useCallback((data: T[], config: SortConfig): T[] => {
    if (!config.key || !config.direction) return data;

    return [...data].sort((a: T, b: T) => {
      const key = config.key as keyof T;
      const valueA = a[key];
      const valueB = b[key];

      if (valueA === null && valueB === null) return 0;
      if (valueA === null) return 1;
      if (valueB === null) return -1;

      // 숫자 비교교 처리
      if (typeof valueA === "number" || !isNaN(Number(valueA))) {
        const numA = Number(valueA);
        const numB = Number(valueB);
        return config.direction === "asc" ? numA - numB : numB - numA;
      }

      // 날짜 비교 처리
      if (config.key === "start_date") {
        const dateA = new Date(valueA as string);
        const dateB = new Date(valueB as string);
        return config.direction === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // 통화 비교 처리
      if (config.key === "money") {
        const strA = String(valueA);
        const strB = String(valueB);
        if (strA.startsWith("$")) {
          const numA = Number(strA.replace("$", ""));
          const numB = Number(strB.replace("$", ""));
          return config.direction === "asc" ? numA - numB : numB - numA;
        }
        // 달러 이외의 통화가 들어갈 경우 아래에 조건 추가
      }
      // 문자열 비교 처리
      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();

      if (config.direction === "asc") {
        return strA.localeCompare(strB);
      } else {
        return strB.localeCompare(strA);
      }
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return data;

    return data.filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [data, searchText]);

  const sortedData = useMemo(() => {
    return sortData(filteredData, sortConfig);
  }, [filteredData, sortConfig, sortData]);

  const handleSort = (columnKey: string) => {
    setSortConfig((prev) => {
      let direction: "asc" | "desc" | null = "asc";
      if (prev.key === columnKey) {
        if (prev.direction === "asc") {
          direction = "desc";
        } else if (prev.direction === "desc") {
          direction = null;
        }
      }
      return {
        key: direction ? columnKey : null,
        direction: direction,
      };
    });
  };

  const displayValue = (val: unknown): string => {
    return val === null ? "——" : String(val);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        {title && <p className="table-title">{title}</p>}
        <div className="table-search-wrapper">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr className="header-row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`header-cell ${
                    disabledColumns.includes(column.key)
                      ? "disabled"
                      : "sortable"
                  }`}
                  onClick={
                    disabledColumns.includes(column.key)
                      ? undefined
                      : () => handleSort(column.key)
                  }
                >
                  <div className="header-content">
                    <span className="header-text">{column.label}</span>
                    {!disabledColumns.includes(column.key) && (
                      <div className="sort-arrows">
                        <span
                          className={`arrow arrow-up ${
                            sortConfig.key === column.key &&
                            sortConfig.direction === "asc"
                              ? "active"
                              : sortConfig.key === column.key &&
                                sortConfig.direction === "desc"
                              ? "hidden"
                              : "neutral"
                          }`}
                        ></span>
                        <span
                          className={`arrow arrow-down ${
                            sortConfig.key === column.key &&
                            sortConfig.direction === "desc"
                              ? "active"
                              : sortConfig.key === column.key &&
                                sortConfig.direction === "asc"
                              ? "hidden"
                              : "neutral"
                          }`}
                        ></span>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData && sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index === sortedData.length - 1 ? "" : "data-row"
                  } ${(index + 1) % 2 === 0 ? "even" : "odd"}`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="data-cell">
                      {displayValue(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="empty-data-cell">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
