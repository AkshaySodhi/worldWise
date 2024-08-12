import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import SearchBar from "../components/SearchBar";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <div className={styles.topbar}>
        <SearchBar />
        <User />
      </div>
    </div>
  );
}

export default AppLayout;
