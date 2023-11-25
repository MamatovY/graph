import './month.scss'

const Month = () => {
    const currentDate = new Date();
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
    return (
        <div className="month">
            {allMonths.map((item, i) => <div key={i}>{item}</div>)}
        </div>
    )
}

export default Month