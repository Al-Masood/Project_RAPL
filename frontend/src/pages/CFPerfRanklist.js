import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import CFSelector from '../components/CFSelector.js';
import Ranktable from '../components/Ranktable.js';

const CFPerfRanklist = () => {
    const { query } = useParams();
    const [ranklist, setRanklist] = useState([]);
    const navigate = useNavigate();

    const generateRanklist = useCallback(async (year, month, bestof) => {
        const response = await fetch('http://localhost:4000/api/cfranklist', {
            method: 'POST',
            body: JSON.stringify([year, month, bestof]),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const ranklist = await response.json();
        setRanklist(ranklist);
    }, []);

    const parseQueryParams = (query) => {
        if (query) {
            const [year, month, bestof] = query.split('-').map(Number);
            return { year, month, bestof };
        }
        return { year: 2024, month: 1, bestof: 0 };
    };

    useEffect(() => {
        const initialParams = parseQueryParams(query);
        if (query) {
            const { year, month, bestof } = initialParams;
            generateRanklist(year, month, bestof);
        }
    }, [query, generateRanklist]);

    const updateURL = (year, month, bestof) => {
        const newQuery = `${year}-${month}-${bestof}`;
        navigate(`/cfperformance/${newQuery}`);
        generateRanklist(year, month, bestof);
    };

    const initialParams = parseQueryParams(query);

    return (
        <div className="cfperf">
            <CFSelector updateURL={updateURL} initial={initialParams} />
            <Ranktable finalRanklist={ranklist} />
        </div>
    );
}

export default CFPerfRanklist;