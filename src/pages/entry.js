import styles from "./entry.module.css";
import { useState } from "react";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import AddCustomer from "../components/addCustomer";
import {
  Select,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";

const Entry = () => {
  const [mode, setMode] = useState("1");
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
        h="400px"
        shadow="lg"
      >
        <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
          <FormControl w="25%">
            <FormLabel>Mode</FormLabel>
            <Select
              variant="filled"
              size="lg"
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="1">Purchase</option>
              <option value="2">Money</option>
              <option value="3">Payment</option>
            </Select>
          </FormControl>
          <FormControl w="25%" ml="3">
            <FormLabel>Customer</FormLabel>
            <Input variant="filled" w="100%" size="lg" />
          </FormControl>
          <FormControl w="25%" ml="3">
            <FormLabel>Or</FormLabel>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => setIsModalVisible(!isModalVisible)}
            >
              Add New Customer
            </Button>
            {isModalVisible && <AddCustomer />}
          </FormControl>
        </Flex>
        {mode === "1" && (
          <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
            <FormControl w="25%">
              <FormLabel>Quantity</FormLabel>
              <Input variant="filled" w="100%" size="lg" />
            </FormControl>
            <FormControl w="25%" ml="3">
              <FormLabel>Charge</FormLabel>
              <Input variant="filled" w="100%" size="lg" />
            </FormControl>
            <FormControl w="25%" ml="3">
              <FormLabel>Sale Payment</FormLabel>
              <Input variant="filled" w="100%" size="lg" />
            </FormControl>
          </Flex>
        )}
        {/* AED OR SR */}
        {mode === "2" && (
          <>
            <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
              <FormControl w="25%">
                <FormLabel>AED OR SR</FormLabel>
                <Select variant="filled" size="lg">
                  <option value="1">AED</option>
                  <option value="2">SR</option>
                </Select>
              </FormControl>
              <FormControl w="25%" ml="3">
                <FormLabel>Amount</FormLabel>
                <Input variant="filled" w="100%" size="lg" />
              </FormControl>
              <FormControl w="25%" ml="3">
                <FormLabel>Conversion Rate</FormLabel>
                <Input variant="filled" w="100%" size="lg" />
              </FormControl>
            </Flex>
            <FormControl w="25%" mt="3">
              <FormLabel>Final Amount</FormLabel>
              <Input variant="filled" w="100%" size="lg" />
            </FormControl>
          </>
        )}
        {/* Payment */}
        {mode === "3" && (
          <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
            <FormControl w="25%">
              <FormLabel>Amount</FormLabel>
              <Input variant="filled" w="100%" size="lg" />
            </FormControl>
          </Flex>
        )}
        <Button colorScheme="blue" size="lg" mt="4">
          Add Entry
        </Button>
      </Box>
    </div>
  );
};

export default Entry;
