import EntryIcon from "../assets/entry.png";
import Customers from "../assets/customers.png";
import Report from "../assets/report.png";
import Home from "../assets/home.png";
import { Text, IconButton } from "@chakra-ui/react";
import styles from "./sideBar.module.css";
import { useHistory } from "react-router-dom";

const SideBar = () => {
  const history = useHistory();
  return (
    <div className={styles.sideContainer}>
      <IconButton
        borderRadius="30px"
        width="48px"
        height="48px"
        size="lg"
        mt="70px"
        icon={
          <img
            src={Home}
            alt="icon"
            className={styles.icon}
            onClick={() => history.push("/")}
          />
        }
      />
      <Text>Home</Text>
      <IconButton
        borderRadius="30px"
        width="48px"
        height="48px"
        size="lg"
        mt="6"
        icon={
          <img
            src={EntryIcon}
            alt="icon"
            className={styles.icon}
            onClick={() => history.push("/entry")}
          />
        }
      />
      <Text>Entry</Text>
      <IconButton
        borderRadius="30px"
        width="48px"
        height="48px"
        size="lg"
        mt="6"
        icon={
          <img
            src={Customers}
            alt="icon"
            className={styles.icon}
            onClick={() => history.push("/customers")}
          />
        }
      />
      <Text>Customers</Text>
      <IconButton
        borderRadius="30px"
        width="48px"
        height="48px"
        size="lg"
        mt="6"
        icon={<img src={Report} alt="icon" className={styles.icon} />}
        onClick={() => history.push("/reports")}
      />
      <Text>Report</Text>
    </div>
  );
};

export default SideBar;
