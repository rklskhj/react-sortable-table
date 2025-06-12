import tableData_1 from './data/tableData1.json'
import tableData_2 from './data/tableData2.json'

import './App.css'
import DataTable from './components/DataTable'
import { useState, useEffect } from 'react'

function App() {
  const [tableData1, setTableData1] = useState(null);
  const [tableData2, setTableData2] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 fetching Promise.all을 곁들인 비동기 처리..
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [response1, response2] = await Promise.all([fetch('/data/tableData1.json'), fetch('/data/tableData2.json')]);
  //       if (!response1.ok || !response2.ok) {
  //         throw new Error('Failed to fetch table data');
  //       }
  //       const data1 = await response1.json();
  //       const data2 = await response2.json();
  //       setTableData1(data1);
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
    setTableData1(tableData_1);
    setTableData2(tableData_2);
    setIsLoading(false);
  }, [])


  const table1Columns = [
    {
      key: 'full_name', label: 'Full Name'
    },
    {
      key: 'email', label: 'Email'
    },
    {
      key: 'gender', label: 'Gender'
    },
    {
      key: 'age', label: 'Age'
    },
    {
      key: 'start_date', label: 'Start Date'
    },
  ]

  const table2Columns = [
    {
      key: 'name', label: 'Name'
    },
    {
      key: 'country', label: 'Country'
    },
    {
      key: 'github_username', label: 'Github Username'
    },
    {
      key: 'money', label: 'Course Price'
    },
  ]


  return (
    <div className='app'>
      <h1>Reusable sortable table with React</h1>
      <div className='container'>
        <DataTable
          columns={table1Columns}
          data={tableData1}
          title="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
          disabledColumns={['email']}
          isLoading={isLoading}
        />
        <DataTable
          columns={table2Columns}
          data={tableData2}
          title="List of developers with an affordable course (has no default sorting)."
          isLoading={isLoading}
          disabledColumns={[]}
        />
      </div>
    </div>
  )
}

export default App
