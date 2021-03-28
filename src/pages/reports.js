import { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import styles from "./reports.module.css";
import { getAllPurchaseHistoryAPI } from "../api/purchase";
import { getAllSaleHistoryAPI } from "../api/sale";
import { getAllCashReceiptHistoryAPI } from "../api/cashReciept";
import { getAllPaymentHistoryAPI } from "../api/payment";
import { getAllExchangeHistoryAPI } from "../api/exchange";
import { getSumOfObdAPI } from "../api/customers";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Flex,
  Spinner,
  useStyles,
} from "@chakra-ui/react";
import { getCapital } from "../api/report";

const Reports = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [saleHistory, setSaleHistory] = useState([]);
  const [cashReceiptHistory, setCashReceiptHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [exchangeHistory, setExchaneHistory] = useState([]);
  const [sumOfOb, setSumOfOb] = useState({});
  const [capital, setCapital] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState({
    sale: 0,
    purchase: 0,
    cash_receipt: 0,
    exchange: 0,
    payment: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const purchaseData = await getAllPurchaseHistoryAPI();
      const saleData = await getAllSaleHistoryAPI();
      const cashReceiptData = await getAllCashReceiptHistoryAPI();
      const paymentData = await getAllPaymentHistoryAPI();
      const exchangeData = await getAllExchangeHistoryAPI();
      const sumOfObData = await getSumOfObdAPI();
      const capitalData = await getCapital();

      setPurchaseHistory(purchaseData.data.purchases);
      setSaleHistory(saleData.data.sales);
      setCashReceiptHistory(cashReceiptData.data.cash_receipts);
      setPaymentHistory(paymentData.data.payments);
      setExchaneHistory(exchangeData.data.exchanges);
      setSumOfOb(sumOfObData.data);
      setCapital(capitalData.data);

      setTotal({
        purchase: purchaseData.data.sum_of_purchases,
        sale: saleData.data.sum_of_sales,
        cash_receipt: cashReceiptData.data.sum_of_cash_receipts,
        payment: paymentData.data.sum_of_payments,
        exchange: exchangeData.data.sum_of_exchanges,
      });
      console.log(capitalData);

      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <SideBar />
      <TopBar label="Reports" />
      <Flex direction="row" w="90%" ml="140px" mt="70px" alignSelf="flex-start">
        {/* debit and credit */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="20%"
          h="auto"
          p={4}
          bg="white"
        >
          <Text fontWeight="700" fontSize="20px">
            Capital: {capital.balance}
          </Text>
        </Box>
      </Flex>
      {/*purchases starts here */}
      {isLoading && (
        <Flex justifyContent="center" alignItems="center" w="100%" h="80vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mt="10"
          />
        </Flex>
      )}
      {purchaseHistory.length > 0 && (
        <>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px">
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
                  <Th>Customer</Th>
                  <Th>Quantity</Th>
                  <Th>Charge</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {purchaseHistory.map((purchase) => (
                  <Tr key={purchase.id}>
                    <Td>Purchase</Td>
                    <Td>{purchase.date}</Td>
                    <Td>{purchase.customer.customer_name}</Td>
                    <Td>{purchase.currency_quantity}</Td>
                    <Td>{purchase.currency_charge}</Td>
                    <Td>
                      {purchase.currency_quantity * purchase.currency_charge}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Purchase: {total.purchase}
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
                  <Th>Customer</Th>
                  <Th>Currency type</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paymentHistory.map((payment) => (
                  <Tr key={payment.id}>
                    <Td>Payment</Td>
                    <Td>{payment.date}</Td>
                    <Td>{payment.customer.customer_name}</Td>
                    <Td>{payment.currency_type}</Td>
                    <Td>{payment.currency_quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Payment: {total.payment}
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
                  <Th>Customer</Th>
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
            Total Sales: {total.sale}
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
                  <Th>Customer</Th>
                  <Th>Currency type</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cashReceiptHistory.map((cashReceipt) => (
                  <Tr key={cashReceipt.id}>
                    <Td>Cash Reciept</Td>
                    <Td>{cashReceipt.date}</Td>
                    <Td>{cashReceipt.customer.customer_name}</Td>
                    <Td>{cashReceipt.currency_type}</Td>
                    <Td>{cashReceipt.currency_quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Text fontWeight="600" alignSelf="flex-start" ml="140px" mt="3">
            Total Cash Receipt: {total.cash_receipt}
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
                  <Th>Customer</Th>
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
                    <Td>{exchange.customer.customer_name}</Td>
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
            Total Exchange: {total.exchange}
          </Text>
        </>
      )}
      {/* exchange table ends here */}
    </div>
  );
};

export default Reports;
