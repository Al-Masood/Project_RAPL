import '../css/Table.css'
import getColorByRating from '../components/GetColor'

const Ranktable = ({ finalRanklist, activeComponent }) => {
    if (finalRanklist.length === 0) {
        return <div>No data available</div>
    }

    const headers = ['Rank', 'Name', 'Handle', activeComponent === 'CurrentRating' ? 'Current Rating' : 'Max Rating', activeComponent === 'CurrentRating' ? 'Max Rating' : 'Current Rating'];

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {finalRanklist.map((user, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{rowIndex + 1}</td>
                            <td>{user.name}</td>
                            <td style={{ color: getColorByRating(activeComponent === 'CurrentRating' ? user.rating : user.maxRating) }}>
                                <a 
                                    href={`https://codeforces.com/profile/${user.cfHandle}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ color: getColorByRating(activeComponent === 'CurrentRating' ? user.rating : user.maxRating) }}
                                >
                                    {user.cfHandle}
                                </a>
                            </td>
                            
                            {activeComponent === 'CurrentRating' ? (
                                <>
                                    <td style={{ color: getColorByRating(user.rating) }}>{user.rating}</td>
                                    <td style={{ color: getColorByRating(user.maxRating) }}>{user.maxRating}</td>
                                </>
                            ) : (
                                <>
                                    <td style={{ color: getColorByRating(user.maxRating) }}>{user.maxRating}</td>
                                    <td style={{ color: getColorByRating(user.rating) }}>{user.rating}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranktable
