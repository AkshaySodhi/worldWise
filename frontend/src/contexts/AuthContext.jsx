import toast from "react-hot-toast";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const localUser = JSON.parse(localStorage.getItem("ww-user"));

const initialState = {
  user: localUser || null,
  isAuthenticated: localUser ? true : false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = async (userName, password) => {
    const success = handleLoginInputErrors(userName, password);
    if (!success) return;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("ww-user", JSON.stringify(data));
      dispatch({ type: "login", payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleSignupInputErrors({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("ww-user", JSON.stringify(data));
      dispatch({ type: "login", payload: data });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("ww-user");
      dispatch({ type: "logout" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateFullName = async (fullName) => {
    if (!fullName || localUser.fullName === fullName) return;

    try {
      const res = await fetch(`/api/user/fullname/${localUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("ww-user", JSON.stringify(data));
      dispatch({ type: "login", payload: data });
      toast.success("Full Name updated successfully!");
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const updateUserName = async (userName) => {
    if (!userName || localUser.userName === userName) return;

    try {
      const res = await fetch(`/api/user/username/${localUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("ww-user", JSON.stringify(data));
      dispatch({ type: "login", payload: data });
      toast.success("Username updated successfully!");
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
    const success = handleUpdatePassInputErrors(oldPassword, newPassword, confirmPassword);
    if (!success) return;

    try {
      const res = await fetch(`/api/user/password/${localUser._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("ww-user", JSON.stringify(data));
      dispatch({ type: "login", payload: data });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup, updateFullName, updateUserName, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

////////////////////////////////////////////////////////////

function handleLoginInputErrors(userName, password) {
  if (!userName || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}

function handleSignupInputErrors({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!password) {
    toast.error("Passwords don't match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }

  return true;
}

function handleUpdatePassInputErrors(oldPassword, newPassword, confirmPassword) {
  if (!oldPassword || !newPassword || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (newPassword != confirmPassword) {
    toast.error("Passwords dont match");
    return false;
  }

  if (oldPassword === newPassword) {
    toast.error("New password cant be the same as old one");
    return false;
  }

  return true;
}