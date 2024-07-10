import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.profilePic} alt={user.fullName} />
      <span>Welcome, {user.fullName}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
