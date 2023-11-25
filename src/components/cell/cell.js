import './cell.scss'

const Cell = ({ date, count, check, handleClick }) => {
    const colors = ['#EDEDED', '#ACD5F2', '#7FA8C9', '#527BA0', '#254E77'];
    const getColor = (count) => {
        if (count === 0) return colors[0];
        if (count >= 1 && count <= 9) return colors[1];
        if (count >= 10 && count <= 19) return colors[2];
        if (count >= 20 && count <= 29) return colors[3];
        return colors[4];
    };

    return (
        <div onClick={handleClick}
            style={{
                backgroundColor: getColor(count),
            }}
            className='cell'>
            {check &&

                <>

                    <div className='cell-alert'>
                        <div>
                            {count} contributions
                        </div>
                        <span>
                            {date}
                        </span>
                        <svg className='cell-triangle' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                            <path d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z" fill="black" />
                        </svg>
                    </div>
                </>

            }
        </div>
    )
}

export default Cell