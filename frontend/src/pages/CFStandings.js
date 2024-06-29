import { useState, useEffect } from 'react';
import Ranktable from "../components/Ranktable";

const CodeforcesStandings = () => {
    const [contests, setContests] = useState([]);
    const [selectedContestId, setSelectedContestId] = useState(null);
    const [ranklist, setRanklist] = useState([]);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch('https://codeforces.com/api/contest.list?gym=false');
                const data = await response.json();
                if (data.status === 'OK') {
                    const recentContests = data.result.slice(0, 10);
                    setContests(recentContests);
                }
            } catch (error) {
                console.error("Error fetching contests:", error);
            }
        };

        fetchContests();
    }, []);

    useEffect(() => {
        const fetchStandings = async () => {
            if (selectedContestId) {
                try {
                    const response = await fetch(`https://codeforces.com/api/contest.standings?contestId=${selectedContestId}&from=1&count=10`);
                    const data = await response.json();
                    if (data.status === 'OK') {
                        setRanklist(data.result.rows);
                    }
                } catch (error) {
                    console.error("Error fetching standings:", error);
                }
            }
        };

        fetchStandings();
    }, [selectedContestId]);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
                <h2>Last 10 Contests</h2>
                <ul>
                    {contests.map(contest => (
                        <li key={contest.id} onClick={() => setSelectedContestId(contest.id)}>
                            {contest.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ width: '70%' }}>
                <Ranktable finalRanklist={ranklist} />
            </div>
        </div>
    );
};

export default CodeforcesStandings;
