import '../css/Table.css'

const Ranktable = ({finalRanklist}) => {
    if(finalRanklist.length === 0){
        return (
            <div>
            </div>
        )
    }
    return(
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {finalRanklist[0].map((header, index) =>(
                            <th key = {index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {finalRanklist.slice(1).map((row) => (
                        <tr>
                            {row.map((cell, cellIndex) => (
                                <td key = {cellIndex}> {cell} </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranktable