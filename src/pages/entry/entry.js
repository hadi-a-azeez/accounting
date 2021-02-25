import styles from "./css/entry.module.css";
import { useState } from "react";
import SideBar from "../../components/sideBar";
import TopBar from "../../components/topBar";

import {
  Select,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import { CashReciept } from "./cashReciept";
import { Payment } from "./payment";
import { Purchase } from "./purchase";
import { Sale } from "./sale";

const Entry = () => {
  const [mode, setMode] = useState("purchase");
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={styles.container}>
      <SideBar />
      <TopBar label="Entry" />
      <Box
        d="flex"
        borderRadius="6px"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        w="70%"
        bg="white"
        paddingBottom="10"
        minH="500px"
        borderWidth="1px"
      >
        <Flex
          dir="row"
          w="90%"
          mt="3"
          d="flex"
          justifyContent="flex-start"
          w="70%"
        >
          <FormControl w="25%">
            <FormLabel>Mode</FormLabel>
            <Select
              variant="filled"
              size="lg"
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="purchase">Purchase</option>
              <option value="sale">Sale</option>
              <option value="payment">Payment</option>
              <option value="cash">Cash Reciept</option>
            </Select>
          </FormControl>
        </Flex>
        {mode === "purchase" && <Purchase />}
        {mode === "sale" && <Sale />}
        {mode === "payment" && <Payment />}
        {mode === "cash" && <CashReciept />}
      </Box>
    </div>
  );
};

export default Entry;
