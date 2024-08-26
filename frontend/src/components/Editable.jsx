import { useState } from "react";
import styles from "./Editable.module.css";

function Editable({ title, val, onUpdate }) {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInput = e.target.userInput.value;
        console.log(userInput);
        await onUpdate(userInput);
    }

    return (
        <div>
            <label>{title}</label>
            {open ?
                <form className={styles.open} onSubmit={handleSubmit}>
                    <input name="userInput" defaultValue={val}></input>
                    <button type="submit">Change</button>
                    <button type="button" onClick={() => setOpen(false)}>Cancel</button>
                </form>
                :
                <div className={styles.close}>
                    <p>{val}</p>
                    <button onClick={() => setOpen(true)}>Edit</button>
                </div>}
        </div>
    )
}

export default Editable;
