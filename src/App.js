import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=a9f428fc";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async title => {
        const fetchMovies = await fetch(`${API_URL}&s=${title}`);
        const data = await fetchMovies.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies("batman");
    }, []);

    return (
        <div className="app">
            <h1>Movie Planet</h1>;
            <div className="search">
                <input
                    placeholder="Find something..."
                    value={searchTerm.trim()}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map(movie => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App;
