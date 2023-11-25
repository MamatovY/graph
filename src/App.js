import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // Состояние для хранения данных контрибуций
  const [contributionData, setContributionData] = useState([]);
  // Цвета для различных уровней контрибуций
  const colors = ['#EDEDED', '#ACD5F2', '#7FA8C9', '#527BA0', '#254E77'];

  // Эффект для загрузки данных контрибуций при монтировании компонента
  useEffect(() => {
    const apiUrl = 'https://dpg.gg/test/calendar.json';

    axios.get(apiUrl)
      .then(response => {
        setContributionData(response.data);
      })
      .catch(error => {
        console.error('Error fetching contribution data:', error);
      });
  }, []);

  // Функция для определения цвета в зависимости от количества контрибуций
  const getColor = (count) => {
    if (count === 0) return colors[0];
    if (count >= 1 && count <= 9) return colors[1];
    if (count >= 10 && count <= 19) return colors[2];
    if (count >= 20 && count <= 29) return colors[3];
    return colors[4];
  };

  // Получение текущей даты
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();

  // Получение всех дней за последние 51 неделю (7 дней * 51 неделя)
  const allDays = [];
  let weekDat = 2
  for (let i = 0; i < 7 * 51; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() - i);

    allDays.unshift(day.toISOString().split('T')[0]);
  }

  // Получение всех месяцев за последний год
  const allMonths = [];
  for (let i = 0; i < 12; i++) {
    const month = new Date(currentDate);
    month.setMonth(currentDate.getMonth() + i);
    allMonths.push(month.toLocaleString('default', { month: 'long' }));
  }

  // Определение позиции текущего месяца в массиве
  const currentMonthIndex = allMonths.indexOf(
    currentDate.toLocaleString('default', { month: 'long' })
  );

  // Переставляем текущий месяц в конец массива
  if (currentMonthIndex !== -1) {
    allMonths.splice(currentMonthIndex, 1);
    allMonths.push(
      currentDate.toLocaleString('default', { month: 'long' })
    );
  }

  console.log(allMonths);


  // Получение данных для графика с учетом текущей даты
  const generateGraphData = () => {
    const graphData = [];

    for (let i = 0; i < 51; i++) {
      const row = [];

      for (let j = 0; j < 7; j++) {
        const day = allDays[i * 7 + j];
        const count = contributionData[day] || 0;
        row.push({ date: day, count });
      }

      graphData.push(row);
    }

    return graphData;
  };

  const graphData = generateGraphData();


  return (
    <div className="App">
      <div className="contribution-graph">
        {graphData.map((row, rowIndex) => (

          <div key={rowIndex} className="contribution-row">
            {/* <div className="contribution-week">
              <div>понедельник</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>Среда</div>
              <div></div>
            </div> */}
            {row.map(({ date, count }, columnIndex) => (
              <div
                key={columnIndex}
                className="contribution-cell"
                style={{
                  backgroundColor: getColor(count),
                }}
              >
                {date}
                <br />
                {count}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
