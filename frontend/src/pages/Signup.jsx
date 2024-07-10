import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Signup.module.css";

export default function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(inputs);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.signup}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="fullName">Fullname</label>
          <input
            id="fullName"
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            value={inputs.fullName}
            placeholder="John Doe"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="userName">Username</label>
          <input
            id="userName"
            onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
            value={inputs.userName}
            placeholder="john_doe1"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            value={inputs.password}
            placeholder="********"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) =>
              setInputs({
                ...inputs,
                confirmPassword: e.target.value,
              })
            }
            value={inputs.confirmPassword}
            placeholder="********"
          />
        </div>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div>
            <label htmlFor="male" style={{ display: "flex", gap: "0.5rem" }}>
              <span>Male</span>
              <input
                id="male"
                type="checkbox"
                checked={inputs.gender === "male"}
                onChange={() => setInputs({ ...inputs, gender: "male" })}
              />
            </label>
          </div>
          <div>
            <label htmlFor="female" style={{ display: "flex", gap: "0.5rem" }}>
              <span>Female</span>
              <input
                id="female"
                type="checkbox"
                checked={inputs.gender === "female"}
                onChange={() => setInputs({ ...inputs, gender: "female" })}
              />
            </label>
          </div>
        </div>

        <Link className={styles.link} to="/login">
          Already have an account?
        </Link>

        <div>
          <Button type="primary">Signup</Button>
        </div>
      </form>
    </main>
  );
}
