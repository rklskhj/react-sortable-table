import tableData_1 from "./data/tableData1.json";
import tableData_2 from "./data/tableData2.json";

import "./App.css";
import DataTable from "./components/DataTable";
import React, { useState, useEffect } from "react";

import { UserTableData, CourseTableData, Column } from "./types";

function App() {
  const [userTableData, setUserTableData] = useState<UserTableData[]>([]);
  const [courseTableData, setCourseTableData] = useState<CourseTableData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 fetching Promise.all을 곁들인 비동기 처리..
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const [response1, response2] = await Promise.all([fetch('/data/tableData1.json'), fetch('/data/tableData2.json')]);
  //       if (!response1.ok || !response2.ok) {
  //         throw new Error('Failed to fetch table data');
  //       }
  //       const data1 = await response1.json();
  //       const data2 = await response2.json();
  //       setuserTableData(data1);
  //       setTableData2(data2);
  //     } catch (error) {
  //       console.error('Error fetching table data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [])

  // 정적으로 import 해서 데이터 가져오기
  useEffect(() => {
    setIsLoading(true);
    setUserTableData(tableData_1);
    setCourseTableData(tableData_2);
    setIsLoading(false);
  }, []);

  const table1Columns: Column[] = [
    {
      key: "full_name",
      label: "Full Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "gender",
      label: "Gender",
    },
    {
      key: "age",
      label: "Age",
    },
    {
      key: "start_date",
      label: "Start Date",
    },
  ];

  const table2Columns: Column[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "country",
      label: "Country",
    },
    {
      key: "github_username",
      label: "Github Username",
    },
    {
      key: "money",
      label: "Course Price",
    },
  ];

  return (
    <div className="app">
      <h1>Reusable sortable table with React</h1>
      <div className="container">
        <DataTable<UserTableData>
          columns={table1Columns}
          data={userTableData}
          title="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
          disabledColumns={["email"]}
          isLoading={isLoading}
        />
        <DataTable<CourseTableData>
          columns={table2Columns}
          data={courseTableData}
          title="List of developers with an affordable course (has no default sorting)."
          isLoading={isLoading}
          disabledColumns={[]}
        />
      </div>
    </div>
  );
}

export default App;
