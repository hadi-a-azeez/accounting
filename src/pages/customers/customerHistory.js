import { useState } from "react";
import TopBar from "../../components/topBar";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Stack,
  Flex,
  Stat,
  IconButton,
} from "@chakra-ui/react";
import styles from "./css/customerHistory.module.css";
import SideBar from "../../components/sideBar";
import UpdateCustomer from "../../components/updateCustomer";

const CustomerHistory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className={styles.container}>
      <SideBar />
      <TopBar label="Customer History" />
      <Flex direction="row" w="90%" ml="140px" mt="70px" alignSelf="flex-start">
        {/* customer details card starts here */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="30%"
          h="auto"
          p={4}
          bg="gray.200"
        >
          <Text fontWeight="600">Customer Name: Rafeeq</Text>
          <Text fontWeight="600">Phone Number: 996744233</Text>
          <Text fontWeight="600">Charge: 45</Text>
          <Stack direction="row" mt="2">
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => setIsModalVisible(!isModalVisible)}
            >
              Update Customer
            </Button>
            {isModalVisible && <UpdateCustomer />}
            <Button colorScheme="red" size="sm">
              Delete Customer
            </Button>
          </Stack>
        </Box>
        {/* custmer details card ends here */}

        {/* debit and credit */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="20%"
          h="auto"
          p={4}
          bg="gray.200"
          ml="3"
        >
          <Text fontWeight="700" fontSize="20px">
            CREDIT: 6700
          </Text>
          <Text fontWeight="700" fontSize="20px">
            DEBIT: 4700
          </Text>
        </Box>
      </Flex>
      {/* starts here */}
      <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
        Purchase
      </Text>
      <Box w="80%" boxShadow="lg" mt="3" borderRadius="8px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Mode</Th>
              <Th>Quantity</Th>
              <Th>Charge</Th>
              <Th>Sale Payment</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Purchase</Td>
              <Td>12</Td>
              <Td>25.4</Td>
              <Td>25.4</Td>
            </Tr>
            <Tr>
              <Td>Purchase</Td>
              <Td>12</Td>
              <Td>30.48</Td>
              <Td>30.48</Td>
            </Tr>
            <Tr>
              <Td>Purchase</Td>
              <Td>32</Td>
              <Td>0.91444</Td>
              <Td>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Mode</Th>
              <Th>Quantity</Th>
              <Th>Charge</Th>
              <Th>Sale Payment</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* purchase table ends here */}
      {/* Money table starts here */}
      <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
        Money
      </Text>
      <Box w="80%" boxShadow="lg" mt="3" borderRadius="8px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Mode</Th>
              <Th>AED or SR</Th>
              <Th>Amount</Th>
              <Th>Conversion Rate</Th>
              <Th>Final Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Money</Td>
              <Td>SR</Td>
              <Td>25.4</Td>
              <Td>25.4</Td>
              <Td>25.4</Td>
            </Tr>
            <Tr>
              <Td>Money</Td>
              <Td>AED</Td>
              <Td>30.48</Td>
              <Td>30.48</Td>
              <Td>30.48</Td>
            </Tr>
            <Tr>
              <Td>Money</Td>
              <Td>SR</Td>
              <Td>0.91444</Td>
              <Td>0.91444</Td>
              <Td>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Mode</Th>
              <Th>AED or SR</Th>
              <Th>Amount</Th>
              <Th>Conversion Rate</Th>
              <Th>Final Amount</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* Money table ends here */}
      {/* Payment table starts here */}
      <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
        Payment
      </Text>
      <Box w="80%" boxShadow="lg" mt="3" borderRadius="8px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Mode</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Payment</Td>
              <Td>25.4</Td>
            </Tr>
            <Tr>
              <Td>Payment</Td>
              <Td>30.48</Td>
            </Tr>
            <Tr>
              <Td>Payment</Td>
              <Td>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Mode</Th>
              <Th>Amount</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* Payment table ends here */}
    </div>
  );
};

export default CustomerHistory;
