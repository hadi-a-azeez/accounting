import styles from "./topBar.module.css";
import { Text } from "@chakra-ui/react";

const TopBar = ({ label }) => {
  return (
    <div className={styles.topBar}>
      <Text ml="100px" fontWeight="500" fontSize="22px">
        {label}
      </Text>
    </div>
  );
};

export default TopBar;
