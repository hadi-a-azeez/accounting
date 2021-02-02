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
} from "@chakra-ui/react";
import styles from "./css/customerHistory.module.css";
import SideBar from "../../components/sideBar";
import UpdateCustomer from "../../components/updateCustomer";
import { getCustomerByIdAPI } from "../../api/customers";
import { getPurchaseHistoryAPI } from "../../api/purchase";
import { getSaleHistoryAPI } from "../../api/sale";
import { getCashReceiptHistoryAPI } from "../../api/cashReciept";
import { getPaymentHistoryAPI } from "../../api/payment";

const CustomerHistory = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [saleHistory, setSaleHistory] = useState([]);
  const [cashReceiptHistory, setCashReceiptHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
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
    const getSaleHistory = async () => {
      const saleData = await getSaleHistoryAPI(id);
      setSaleHistory(saleData.data);
    };
    const getCashReceiptHistory = async () => {
      const cashReceiptData = await getCashReceiptHistoryAPI(id);
      setCashReceiptHistory(cashReceiptData.data);
    };
    const getPaymentHistory = async () => {
      const paymentData = await getPaymentHistoryAPI(id);
      setPaymentHistory(paymentData.data);
    };
    getCustomerData();
    getPurchaseHistory();
    getSaleHistory();
    getCashReceiptHistory();
    getPaymentHistory();
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
              <Th>Date</Th>
              <Th>Currency type</Th>
              <Th>Amount</Th>
              <Th>Charge</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {saleHistory.length > 0 &&
              saleHistory.map((sale) => (
                <Tr>
                  <Td>Sale</Td>
                  <Td>{sale.date}</Td>
                  <Td>{sale.currency_type}</Td>
                  <Td>{sale.currency_price}</Td>
                  <Td>{sale.currency_charge}</Td>
                  <Td>{sale.currency_charge * sale.currency_price}</Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Mode</Th>
              <Th>Date</Th>
              <Th>Currency type</Th>
              <Th>Amount</Th>
              <Th>Charge</Th>
              <Th>Total</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* sa;e table ends here */}
      {/* cash receipt table starts here */}
      <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
        Cash receipt
      </Text>
      <Box w="80%" boxShadow="lg" mt="3" borderRadius="8px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Mode</Th>
              <Th>Date</Th>
              <Th>Currency type</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cashReceiptHistory.length > 0 &&
              cashReceiptHistory.map((cashReceipt) => (
                <Tr>
                  <Td>Sale</Td>
                  <Td>{cashReceipt.date}</Td>
                  <Td>{cashReceipt.currency_type}</Td>
                  <Td>{cashReceipt.currency_quantity}</Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Mode</Th>
              <Th>Date</Th>
              <Th>Currency type</Th>
              <Th>Amount</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* cash receipt table ends here */}
      {/* payment table starts here */}
      <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
        Payment
      </Text>
      <Box w="80%" boxShadow="lg" mt="3" mb="6" borderRadius="8px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Mode</Th>
              <Th>Date</Th>
              <Th>Currency type</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paymentHistory.length > 0 &&
              paymentHistory.map((payment) => (
                <Tr>
                  <Td>Payment</Td>
                  <Td>{payment.date}</Td>
                  <Td>{payment.currency_type}</Td>
                  <Td>{payment.currency_price}</Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Mode</Th>
              <Th>Date</Th>
              <Th>Currency type</Th>
              <Th>Amount</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* payment table ends here */}
    </div>
  );
};

export default CustomerHistory;
