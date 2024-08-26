import styles from "./Profile.module.css";
import { useAuth } from "../contexts/AuthContext";

import Editable from "../components/Editable";

function Profile() {
    const { user, updateUserName, updateFullName, updatePassword } = useAuth();

    async function handleUpdatePassword(e) {
        e.preventDefault();
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;
        await updatePassword(oldPassword, newPassword, confirmPassword);
        e.target.oldPassword.value = "";
        e.target.newPassword.value = "";
        e.target.confirmPassword.value = "";
    }

    async function handleUpdateFullname(fullName) {
        await updateFullName(fullName);
    }

    async function handleUpdateUserName(userName) {
        await updateUserName(userName);
    }

    return (
        <div className={styles.profile}>
            <div className={styles.overview}>
                <img src={user.profilePic} alt={user.fullName} />
                <h1>{user.fullName}</h1>
                <p>Username: {user.userName}</p>
            </div>
            <div className={styles.infoArea}>
                <h1>User Info</h1>
                <hr></hr>
                <Editable title={"Full Name"} val={user.fullName} onUpdate={handleUpdateFullname} />
                <Editable title={"Username"} val={user.userName} onUpdate={handleUpdateUserName} />

                <h1>Change Password</h1>
                <hr></hr>
                <form className={styles.passwordForm} onSubmit={handleUpdatePassword}>
                    <div className={styles.row}>
                        <label>Old Password</label>
                        <input type="password" name="oldPassword" placeholder="******"></input>
                    </div>
                    <div className={styles.row}>
                        <label>New Password</label>
                        <input type="password" name="newPassword" placeholder="******"></input>
                    </div>
                    <div className={styles.row}>
                        <label>New Password (Again)</label>
                        <input type="password" name="confirmPassword" placeholder="******"></input>
                    </div>
                    <button type="submit">Change</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;
