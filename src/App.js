


import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { get } from 'lodash';

import Table from './table/Table';
import './App.scss';

const getData = async () => {
  const csvData = await fetch('/assets/cities.csv');
  const reader = csvData.body.getReader()
  const result = await reader.read() // raw array
  const decoder = new TextDecoder('utf-8')
  const csv = decoder.decode(result.value) // the csv text
  const data = Papa.parse(csv, { header: true });
  return data;
}

function App() {
  const [ dataTable, setDataTable ] = useState({});
  const [ sortByValue, setSortByValue ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setDataTable(data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('sortBy') && !!params.get('sortBy')) {
      setSortByValue(params.get('sortBy'));
    }
  }, []);

  const sortBy = sortByValue ? sortByValue.charAt(0).toUpperCase() + sortByValue.slice(1) : '#';
  const headers = get(dataTable, 'meta.fields', []);
  let rows = get(dataTable, 'data', []).concat([]);

  // Gets the column names that can be considered and treated as numbers
  const numericColumnsNames = headers.filter((header) => {
    const hasNonNumericColums = rows.some(row => !/^[\d,]+$/.test(row[header]));
    return !hasNonNumericColums;
  });
  // Normalizes data changing type of number-like columns to numbers (instead of string)
  rows = rows.map((row) => {
    numericColumnsNames.forEach(column => {
      const value = row[column];
      if (typeof value === 'string') {
        row[column] = +value.replace(/,/g, '')
      }
    })

    return row;
  })

  // Sorts
  if (sortBy) {
    rows = rows.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return 1;
      } else if (a[sortBy] < b[sortBy]) {
        return -1;
      } else {
        return 0;
      }
    }).map((row, i) => {
      row['#'] = i + 1;
      return row
    });
  }

  return (
      <div className="App">
        {headers && rows && <Table headers={headers} rows={rows}/>}
      </div>
  );
}

export default App;

