import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ heading, type, cityName }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getContent = async () => {
      try {
        if (!cityName) return;
        const res = await fetch(`/api/cities/${type}/${cityName}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setContent(data);
      } catch (err) {
        if (err.name !== "AbortError")
          console.log("error getting content", err);
      }
    };

    getContent();

    return () => controller.abort();
  }, [type, cityName]);

  return (
    <div>
      <div className={styles.heading}>
        <h6>{heading}</h6>
        <button onClick={() => setOpen((o) => !o)}>{open ? "-" : "+"}</button>
      </div>
      {open && (
        <div className={styles.content}>
          {content != "" &&
            content.split("#").map((c, i) => <p key={i}>{c}</p>)}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
