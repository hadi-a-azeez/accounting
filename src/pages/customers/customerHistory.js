import { useState, useEffect } from "react";
import TopBar from "../../components/topBar";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Stack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import styles from "./css/customerHistory.module.css";
import SideBar from "../../components/sideBar";
import UpdateCustomer from "../../components/updateCustomer";
import { getCustomerByIdAPI } from "../../api/customers";
import { getPurchaseHistoryAPI } from "../../api/purchase";
import { getSaleHistoryAPI, getFromSaleHistoryAPI } from "../../api/sale";
import { getCashReceiptHistoryAPI } from "../../api/cashReciept";
import { getPaymentHistoryAPI } from "../../api/payment";
import { getExchangeHistoryAPI } from "../../api/exchange";
import { getUserReportAPI } from "../../api/report";

const CustomerHistory = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [saleHistory, setSaleHistory] = useState([]);
  const [fromSaleHistory, setFromSaleHistory] = useState([]);
  const [cashReceiptHistory, setCashReceiptHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [exchangeHistory, setExchaneHistory] = useState([]);
  // const [total, setTotal] = useState({
  //   sale: 0,
  //   from_sale: 0,
  //   purchase: 0,
  //   cash_receipt: 0,
  //   exchange: 0,
  //   payment: 0,
  //   exchange: 0,
  // });
  const [customerTotal, setCustomerTotal] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const userData = await getCustomerByIdAPI(id);
      const purchaseData = await getPurchaseHistoryAPI(id);
      const saleData = await getSaleHistoryAPI(id);
      const fromSaleData = await getFromSaleHistoryAPI(id);
      const cashReceiptData = await getCashReceiptHistoryAPI(id);
      const paymentData = await getPaymentHistoryAPI(id);
      const exchangeData = await getExchangeHistoryAPI(id);
      const customerReport = await getUserReportAPI(id);

      setCustomerTotal(customerReport.data);
      setCustomerDetails(userData.data);
      setPurchaseHistory(purchaseData.data.purchases);
      setSaleHistory(saleData.data.sales);
      setFromSaleHistory(fromSaleData.data.sales);
      setCashReceiptHistory(cashReceiptData.data.cash_receipts);
      setPaymentHistory(paymentData.data.payments);
      setExchaneHistory(exchangeData.data.exchanges);

      // setTotal({
      //   purchase: purchaseData.data.sum_of_purchases,
      //   sale: saleData.data.sum_of_sales,
      //   from_sale: fromSaleData.data.sum_of_sales,
      //   cash_receipt: cashReceiptData.data.sum_of_cash_receipts,
      //   payment: paymentData.data.sum_of_payments,
      //   exchange: exchangeData.data.sum_of_exchanges,
      // });
      // console.log(fromSaleHistory);

      setIsLoading(false);
    };

    getData();
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
          bg="white"
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
            <Button colorScheme="blue" size="sm">
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
          bg="white"
          ml="3"
        >
          {/* <Text fontWeight="700" fontSize="17px">
            Purchase: {customerTotal.purchase}
          </Text>
          <Text fontWeight="700" fontSize="17px">
            Sale: {customerTotal.sale}
          </Text> */}
          <Text fontWeight="700" fontSize="17px">
            Payment: {customerTotal.payment}
          </Text>
          <Text fontWeight="700" fontSize="17px">
            Cash Receipt: {customerTotal.cash_receipt}
          </Text>
          <Text fontWeight="700" fontSize="17px">
            Exchange:
          </Text>
          <Text fontWeight="700" fontSize="17px">
            Balance: {customerTotal.opening_balance}
          </Text>
        </Box>
      </Flex>
      {/*purchases starts here */}
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt="10"
        />
      )}
      {purchaseHistory.length > 0 && (
        <>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
            PURCHASE
          </Text>
          <Box
            w="80%"
            mt="3"
            borderRadius="3px"
            background="white"
            borderWidth="1px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Mode</Th>
                  <Th>Date</Th>
                  <Th>Quantity</Th>
                  <Th>Charge</Th>
                  <Th>Commission</Th>
                  <Th>Total To Give</Th>
                  <Th>Total Got</Th>
                </Tr>
              </Thead>
              <Tbody>
                {purchaseHistory.map((purchase) => (
                  <Tr key={purchase.id}>
                    <Td>Purchase</Td>
                    <Td>{purchase.date}</Td>
                    <Td>{purchase.currency_quantity}</Td>
                    <Td>{purchase.currency_charge}</Td>
                    <Td>{purchase.commission}</Td>
                    <Td>{purchase.currency_to_give}</Td>
                    <Td>{purchase.currency_got}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Purchase:
          </Text>
        </>
      )}
      {/* purchase table ends here */}
      {/* payment table starts here */}
      {paymentHistory.length > 0 && (
        <>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
            PAYMENT
          </Text>
          <Box
            w="80%"
            mt="3"
            borderRadius="3px"
            background="white"
            borderWidth="1px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Mode</Th>
                  <Th>Date</Th>
                  <Th>Currency type</Th>
                  <Th>Amount</Th>
                  <Th>Amount(AED)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paymentHistory.map((payment) => (
                  <Tr key={payment.id}>
                    <Td>Payment</Td>
                    <Td>{payment.date}</Td>
                    <Td>{payment.currency_type}</Td>
                    <Td>{payment.currency_quantity}</Td>
                    <Td>{payment.currency_quantity_aed}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Payment:
          </Text>
        </>
      )}
      {/* payment table ends here */}
      {/* Sale table starts here */}
      {saleHistory.length > 0 && (
        <>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
            SALE
          </Text>
          <Box
            w="80%"
            mt="3"
            borderRadius="3px"
            background="white"
            borderWidth="1px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Mode</Th>
                  <Th>Date</Th>
                  <Th>From</Th>
                  <Th>Currency type</Th>
                  <Th>Amount</Th>
                  <Th>Charge</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {saleHistory.map((sale) => (
                  <Tr key={sale.id}>
                    <Td>Sale</Td>
                    <Td>{sale.date}</Td>
                    <Td>{sale.from_customer_customer.customer_name}</Td>
                    <Td>{sale.currency_type}</Td>
                    <Td>{sale.currency_quantity}</Td>
                    <Td>{sale.currency_charge}</Td>
                    <Td>{sale.currency_total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Sales:
          </Text>
        </>
      )}
      {/* sale table ends here */}
      {/* cash receipt table starts here */}
      {cashReceiptHistory.length > 0 && (
        <>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
            CASH RECEIPT
          </Text>
          <Box
            w="80%"
            mt="3"
            borderRadius="3px"
            background="white"
            borderWidth="1px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Mode</Th>
                  <Th>Date</Th>
                  <Th>Currency type</Th>
                  <Th>Amount(SR)</Th>
                  <Th>Amount(AED)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cashReceiptHistory.map((cashReceipt) => (
                  <Tr key={cashReceipt.id}>
                    <Td>Cash Reciept</Td>
                    <Td>{cashReceipt.date}</Td>
                    <Td>{cashReceipt.currency_type}</Td>
                    <Td>{cashReceipt.currency_quantity}</Td>
                    <Td>{cashReceipt.currency_quantity_aed}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Cash Receipt:
          </Text>
        </>
      )}
      {/* cash receipt table ends here */}
      {/* exchange table starts here */}
      {exchangeHistory.length > 0 && (
        <>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
            EXCHANGE
          </Text>
          <Box
            w="80%"
            mt="3"
            borderRadius="3px"
            background="white"
            borderWidth="1px"
          >
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
                {exchangeHistory.map((exchange) => (
                  <Tr key={exchange.id}>
                    <Td>Exchange</Td>
                    <Td>{exchange.date}</Td>
                    <Td>{exchange.currency_type}</Td>
                    <Td>{exchange.currency_quantity}</Td>
                    <Td>{exchange.currency_charge}</Td>
                    <Td>{exchange.currency_total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Exchange:
          </Text>
        </>
      )}
      {/* exchange table ends here */}
      {/* Sale to table starts here */}
      {fromSaleHistory.length > 0 && (
        <>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="4">
            SALE TO
          </Text>
          <Box
            w="80%"
            mt="3"
            borderRadius="3px"
            background="white"
            borderWidth="1px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Mode</Th>
                  <Th>Date</Th>
                  <Th>Customer</Th>
                  <Th>Currency type</Th>
                  <Th>Amount</Th>
                  <Th>Charge</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {fromSaleHistory.map((sale) => (
                  <Tr key={sale.id}>
                    <Td>Sale</Td>
                    <Td>{sale.date}</Td>
                    <Td>{sale.customer.customer_name}</Td>
                    <Td>{sale.currency_type}</Td>
                    <Td>{sale.currency_quantity}</Td>
                    <Td>{sale.currency_charge}</Td>
                    <Td>{sale.currency_total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Sales:
          </Text>
        </>
      )}
      {/* Sale to table ends here */}
    </div>
  );
};

export default CustomerHistory;
