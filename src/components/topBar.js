import styles from "./topBar.module.css";
import { Text } from "@chakra-ui/react";

const TopBar = ({ label }) => {
  return (
    <div className={styles.topBar}>
      <Text ml="5" fontWeight="500" fontSize="18px">
        {label}
      </Text>
    </div>
  );
};

export default TopBar;
