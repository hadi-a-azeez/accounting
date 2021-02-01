import { useState, useEffect } from "react";
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
import { getCustomerByIdAPI } from "../../api/customers";
import { getPurchaseHistoryAPI } from "../../api/purchase";

const CustomerHistory = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    const getCustomerData = async () => {
      const userData = await getCustomerByIdAPI(id);
      setCustomerDetails(userData.data);
      console.log(customerDetails);
    };
    const getPurchaseHistory = async () => {
      const purchseData = await getPurchaseHistoryAPI(id);
      setPurchaseHistory(purchseData.data);
    };
    getCustomerData();
    getPurchaseHistory();
    console.log(purchaseHistory);
  }, []);

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
          {customerDetails && (
            <>
              <Text fontWeight="600">
                Customer Name: {customerDetails.customer_name}
              </Text>
              <Text fontWeight="600">
                Phone Number: {customerDetails.customer_phone}
              </Text>
              <Text fontWeight="600">
                Charge: {customerDetails.customer_charge}
              </Text>
            </>
          )}
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
              <Th>Date</Th>
              <Th>Quantity</Th>
              <Th>Charge</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {purchaseHistory.length > 0 &&
              purchaseHistory.map((purchase) => (
                <Tr>
                  <Td>Purchase</Td>
                  <Td>{purchase.date}</Td>
                  <Td>{purchase.currency_quantity}</Td>
                  <Td>{purchase.currency_charge}</Td>
                  <Td>
                    {purchase.currency_quantity * purchase.currency_charge}
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Mode</Th>
              <Th>Date</Th>
              <Th>Quantity</Th>
              <Th>Charge</Th>
              <Th>Total</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* purchase table ends here */}
      {/* Sale table starts here */}
      <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
        Sale
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
