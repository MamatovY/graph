import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cell from './components/cell';
import Month from './components/month';
import Week from './components/week';

const App = () => {
  // Состояние для хранения данных контрибуций
  const [contributionData, setContributionData] = useState([]);
  const [activeCell, setActiveCell] = useState(null)
  // Цвета для различных уровней контрибуций

  const handleChangeCell = index => {
    setActiveCell(index)
  }


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

  // Получение текущей даты
  const currentDate = new Date();

  // Получение всех дней за последние 51 неделю (7 дней * 51 неделя)
  const allDays = [];
  for (let i = 0; i < 7 * 51; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() - i);

    allDays.unshift(day.toISOString().split('T')[0]);
  }

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
      <div className="contribution">
        <Month />
        <div className="contribution-graph">
          <Week />
          {graphData.map((row, rowIndex) => (
            <div key={rowIndex} className="contribution-row">
              {row.map(({ date, count }, columnIndex) => (
                <Cell key={columnIndex} handleClick={() => handleChangeCell(date)} check={activeCell === date} columnIndex={columnIndex} date={date} count={count} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
