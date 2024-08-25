import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const searchKey = "ecc6f7cf3e13a5c675e687603a97340e";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await handleSearch();
  }

  const handleSearch = async () => {
    try {
      if(!query) return;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${searchKey}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      navigate(`form?lat=${data.coord.lat}&lng=${data.coord.lon}`);
    } catch (err) {
      // console.log("error searching", err);
      toast.error(err.message);
    } finally {
      setQuery("");
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        placeholder="search city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <button type="sumbit">Go</button>
    </form>
  );
}

export default SearchBar;
