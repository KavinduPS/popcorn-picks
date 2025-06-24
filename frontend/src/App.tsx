import axios from "axios";
import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [movieName, setMovieName] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const handleRecommend = async () => {
    if (!movieName.trim()) {
      setError("Please enter a movie name.");
      setRecommendations([]);
      return;
    }
    try {
      console.log("tried");
      const response = await axios.post("http://127.0.0.1:5000/recommend", {
        movie: movieName,
      });
      console.log(response);
      setRecommendations(response.data.recommended);
      setError("");
    } catch (err: any) {
      const message = err.response?.data?.error || "Something went wrong.";
      setError(message);
      setRecommendations([]);
    }
  };

  return (
    <div className="App">
      <h1>🎬 Popcorn Picks</h1>
      <input
        type="text"
        placeholder="Enter a movie name..."
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
      />
      <button onClick={handleRecommend}>Get Recommendations</button>

      {error && <p className="error">{error}</p>}

      {recommendations.length > 0 && (
        <div className="recommendation-row">
          {recommendations.map((movie: string, index: number) => (
            <div key={index} className="movie-container">
              {movie}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
