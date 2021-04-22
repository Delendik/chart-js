import React from "react";
import './App.css';
import { Line } from "react-chartjs-2";
import dataSet from "./data/data";


function App() {
  Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  };

  const takeData = (data) => {
    // достаём название метрики
    const name = data.metric_name;
    // вычисляем номер недели для данного числа
    const dateWeek = data.dates_array.map(item=>(new Date(item).getWeek()));
    // достаём значения для каждой даты
    const values = data.values_array;
    // Вычисляем суммарное значение для каждой недели
    var resultSum = dateWeek.reduce(function(acc, current, index) {
      acc[current] = (acc[current] || 0) + values[index];
      return (acc);
    }, {});
    // Вычисляем количество значений для каждой недели
    var resultQty = dateWeek.reduce(function(acc, current) {
      acc[current] = (acc[current] || 0) + 1;
      return (acc);
    }, {});

    // console.log(Object.values(resultQty))
    // console.log(object1.hasOwnProperty('property1'));

    let result = {};
    // Вычисляем среднее значение для каждой недели
    for (const property in resultSum) {
      for (const property2 in resultQty) {
        if(property===property2){
          result[property] = (resultSum[property]/resultQty[property2]).toFixed (2);
        };
      };
    };

    return [name, result]
  };

  const dataForCharts = dataSet.map((item) => takeData(item));

  const data = {
    labels: Object.keys(dataForCharts[0][1]),
    datasets: [
      {
        label: dataForCharts[0][0],
        data: Object.values(dataForCharts[0][1]),
        backgroundColor: ["transparent"],
        borderColor: ["#5C39DB"],
        pointBorderColor: "#E786D7",
        pointBackgroundColor: "#E786D7",
      },
      {
        label: dataForCharts[1][0],
        data: Object.values(dataForCharts[1][1]),
        backgroundColor: ["transparent"],
        borderColor: ["#1cdb3c"],
        pointBorderColor: "#addbb5",
        pointBackgroundColor: "#addbb5",
      },
      {
        label: dataForCharts[2][0],
        data: Object.values(dataForCharts[2][1]),
        backgroundColor: ["transparent"],
        borderColor: ["#dfd10c"],
        pointBorderColor: "#df9c0c",
        pointBackgroundColor: "#df9c0c",
      },
      {
        label: dataForCharts[3][0],
        data: Object.values(dataForCharts[3][1]),
        backgroundColor: ["transparent"],
        borderColor: ["#dd2a2a"],
        pointBorderColor: "#cf8e8e",
        pointBackgroundColor: "#cf8e8e",
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: "#24252E",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 1,
            max: 3,
            stepSize: 0.1,
            fontColor: "#24252E",
          },
        },

      ],
    },
    title: {
      display: true,
      text: "FeeLBack",
    },
    tooltips: {
      enable: true,
      backgroundColor: "#5C39DB",
      titleAlign: "left",
      position: "nearest",
      titleFontStyle: "normal",
      bodyAlign: "center",
      cornerRadius: 8,
      yPadding: 8,
      callbacks: {
        title: function (data) {
          return "Неделя:"+data[0].label;
        },
        labelTextColor: function () {
          return "#FFFFFF";
        },
      },
    },
  };

  return (
    <div className="App">
      <Line data={data} options={options}></Line>
    </div>
  );
}

export default App;
