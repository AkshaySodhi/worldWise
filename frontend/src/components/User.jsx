import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClickLogout() {
    logout();
    navigate("/");
  }

  function handleClickProfile() {
    navigate("/profile");
  }

  return (
    <div className={styles.user}>
      <img src={user.profilePic} alt={user.fullName} onClick={handleClickProfile} />
      <span>Welcome, {user.fullName}</span>
      <button onClick={handleClickLogout}>Logout</button>
    </div>
  );
}

export default User;
