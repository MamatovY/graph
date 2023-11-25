import './week.scss'

const Week = () => {
    const weeks = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    const currentDate = new Date();
    const allDaysOfWeek = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(currentDate);
        day.setDate(currentDate.getDate() - i);
        const weekDay = day.getDay()
        allDaysOfWeek.unshift(weeks[weekDay]);
    }


    const WeekComponent = allDaysOfWeek.map((item, i) => {
        if (i % 2 !== 0) {
            return (
                <div key={i}>
                    {item}
                </div>
            );
        }
        return (
            <div></div>
        )
    })
    return (
        <div className="week">
            {WeekComponent}
        </div>
    )
}

export default Week