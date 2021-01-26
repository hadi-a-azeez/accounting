import React from "react";
import styles from "./home.module.css";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";

const Home = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <TopBar label="Home" />
    </div>
  );
};

export default Home;
