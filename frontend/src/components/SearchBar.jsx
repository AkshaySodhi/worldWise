import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

const searchKey = "ecc6f7cf3e13a5c675e687603a97340e";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${searchKey}`
      );
      if (!res.ok) throw new Error("error searching city");
      const data = await res.json();
      navigate(`form?lat=${data.coord.lat}&lng=${data.coord.lon}`);
    } catch (err) {
      console.log("error searching", err);
    } finally {
      setQuery("");
    }
  };

  return (
    <div className={styles.search}>
      <input
        placeholder="search city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button onClick={handleSearch}>Go</button>
    </div>
  );
}

export default SearchBar;
