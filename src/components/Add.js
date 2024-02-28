import React, { useState } from "react";
import ResultCard from "./ResultCard";

const Add = () => {

    const [query, setQuery] = useState('');
    const [resuelts, setResuelts] = useState([]);

    const api_key = '81e0fc0858b7d76d4ecf0ac5ceb8c9ae'
    const onChange = e =>{
        e.preventDefault();

        setQuery(e.target.value);
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&language=en-US&page=1&query=${e.target.value}`
        ).then(res => res.json())
        .then((data) => {
            if(!data.errors) {
                setResuelts(data.results);
            } else {
                setResuelts([]);
            }
        })
    }

    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input type='text' 
                        placeholder="Search for a movie" 
                        value={query}
                        onChange={onChange}
                        />
                    </div>

                    {resuelts.length > 0 && (
                        <ul className="results">    
                            {resuelts.map(movie => (
                                <li key={movie.id}>
                                    <ResultCard movie={movie} />
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Add;