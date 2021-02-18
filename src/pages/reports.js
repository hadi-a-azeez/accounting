import { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
import styles from "./reports.module.css";
import { getAllPurchaseHistoryAPI } from "../api/purchase";
import { getAllSaleHistoryAPI } from "../api/sale";
import { getAllCashReceiptHistoryAPI } from "../api/cashReciept";
import { getAllPaymentHistoryAPI } from "../api/payment";
import { getAllExchangeHistoryAPI } from "../api/exchange";
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
  Spinner,
} from "@chakra-ui/react";

const Reports = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [saleHistory, setSaleHistory] = useState([]);
  const [cashReceiptHistory, setCashReceiptHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [exchangeHistory, setExchaneHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState({
    sale: 0,
    purchase: 0,
    cash_receipt: 0,
    exchange: 0,
    payment: 0,
    exchange: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const purchaseData = await getAllPurchaseHistoryAPI();
      const saleData = await getAllSaleHistoryAPI();
      const cashReceiptData = await getAllCashReceiptHistoryAPI();
      const paymentData = await getAllPaymentHistoryAPI();
      const exchangeData = await getAllExchangeHistoryAPI();

      setPurchaseHistory(purchaseData.data.purchases);
      setSaleHistory(saleData.data.sales);
      setCashReceiptHistory(cashReceiptData.data.cash_receipts);
      setPaymentHistory(paymentData.data.payments);
      setExchaneHistory(exchangeData.data.exchanges);

      setTotal({
        purchase: purchaseData.data.sum_of_purchases,
        sale: saleData.data.sum_of_sales,
        cash_receipt: cashReceiptData.data.sum_of_cash_receipts,
        payment: paymentData.data.sum_of_payments,
        exchange: exchangeData.data.sum_of_exchanges,
      });

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
          bg="gray.200"
        >
          <Text fontWeight="700" fontSize="20px">
            Total stock: {total.purchase - total.sale}
          </Text>
          <Text fontWeight="700" fontSize="20px">
            To Get: {total.sale - total.cash_receipt}
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
                {purchaseHistory.map((purchase) => (
                  <Tr key={purchase.id}>
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
            Payment
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
                {paymentHistory.map((payment) => (
                  <Tr key={payment.id}>
                    <Td>Payment</Td>
                    <Td>{payment.date}</Td>
                    <Td>{payment.currency_type}</Td>
                    <Td>{payment.currency_quantity}</Td>
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
                {saleHistory.map((sale) => (
                  <Tr key={sale.id}>
                    <Td>Sale</Td>
                    <Td>{sale.date}</Td>
                    <Td>{sale.currency_type}</Td>
                    <Td>{sale.currency_quantity}</Td>
                    <Td>{sale.currency_charge}</Td>
                    <Td>{sale.currency_total}</Td>
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
                {cashReceiptHistory.map((cashReceipt) => (
                  <Tr key={cashReceipt.id}>
                    <Td>Cash Reciept</Td>
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
            Exchange
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
