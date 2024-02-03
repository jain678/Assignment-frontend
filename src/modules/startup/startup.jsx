import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function isValidNumber(str) {
  const number = parseFloat(str);
  return !isNaN(number);
}

function isValidDate(str) {
  const timestamp = Date.parse(str);
  return !isNaN(timestamp);
}

function Startup() {
  const { startupId } = useParams();
  console.log("startupId", startupId);

  const [fileData, setFileData] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [chartDataPerMonth, setChartDataPerMonth] = useState({});

  console.log("start Date", startDate);

  const handleFilter = () => {
    const filterChartDataPerMonth = {};
    for (const key in chartDataPerMonth) {
      const value = chartDataPerMonth[key];
      const splitKey = key.split(" ");
      const year = parseInt(splitKey[0]);
      const month = parseInt(splitKey[1]);
      const currentdate = new Date(year, month, startDate.getDate());

      if (currentdate >= startDate && currentdate <= endDate) {
        filterChartDataPerMonth[key] = value;
      }
    }
    prepareChartData(filterChartDataPerMonth);
  };

  //   const chartData = [
  //     ["Month", "Sales"],
  //     ["Oct 2019", 1000],
  //     ["Nov 2019", 1170],
  //     ["Dec 2019", 660],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //     ["Jan 2020", 1030],
  //   ];

  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
    axes: {
      y: {
        0: { side: "right" },
      },
    },
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");
      const header = lines[0].split(",");
      const parsedData = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].split(",");
        const item = {};

        for (let j = 0; j < header.length; j++) {
          const key = header[j].trim();
          const value = line[j];

          item[key] = value;
        }

        parsedData.push(item);
      }
      //   console.log("parsedData", parsedData);
      setFileData(parsedData);
      setFileSelected(true);
    };

    if (file) {
      reader.readAsText(file);
      setFileSelected(true);
    }
  };

  const prepareChartData = (chartDataPerMonth) => {
    const chartData = [["Month", "Sales"]];
    for (const key in chartDataPerMonth) {
      const value = chartDataPerMonth[key];
      const splitKey = key.split(" ");
      const year = splitKey[0];
      const monthName = monthNames[parseInt(splitKey[1])];
      const monthPlusYear = monthName + " " + year;
      chartData.push([monthPlusYear, value]);
    }

    setChartData(chartData);
    console.log("chartData", chartData);
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    if (fileData) {
      let chartDataPerMonth = {};
      for (let i = 0; i < fileData.length; i++) {
        const rowData = fileData[i];
        const date = rowData["Order Date"]; // column name shoudl "Order Date"
        const sales = rowData["Sales"]; // column name should be sales
        if (!isValidDate(date) || !isValidNumber(sales)) {
          continue;
        }
        const orderDate = new Date(date);
        const salesInNumber = parseFloat(sales);
        const month = orderDate.getMonth();
        const year = orderDate.getFullYear();

        const yearPlusMonth = year + " " + month;
        if (chartDataPerMonth.hasOwnProperty(yearPlusMonth)) {
          chartDataPerMonth[yearPlusMonth] += salesInNumber;
        } else {
          chartDataPerMonth[yearPlusMonth] = salesInNumber;
        }
      }
      setChartDataPerMonth(chartDataPerMonth);
      prepareChartData(chartDataPerMonth);
    }
  }, [fileData]);

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Start Date"
        selectsStart={true}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="End Date"
        startDate={new Date(2022, 1, 1)}
      />
      <button onClick={handleFilter}>Filter</button>
      {fileData.length > 0 && (
        <Chart
          chartType="Bar"
          width="90%"
          height="600px"
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
}

export default Startup;
