import {
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Switch,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  getCustomerByIdAPI,
  searchCustomersAPI,
  updateCustomerObAPI,
} from "../../api/customers";

import DatePicker from "react-date-picker";
import AsyncSelect from "react-select/async";
import { addCashRecieptAPI } from "../../api/cashReciept";
import { addExchangeAPI } from "../../api/exchange";

export const CashReciept = () => {
  const [cashRecieptData, setCashRecieptData] = useState({
    currency_quantity: 0,
    conversion_rate: 0,
    currency_quantity_aed: 0,
    currency_type: "SR",
    customer_id: 0,
    date: new Date(),
  });
  const [exchangeData, setExchangeData] = useState({
    currency_quantity: 0,
    currency_charge: 0,
    currency_type: "SR",
    customer_id: 0,

    date: new Date(),
  });

  const [isOnExchange, setIsOnExchange] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const searchCustomers = async (searchTerm, callBack) => {
    const customerResponse = await searchCustomersAPI(searchTerm);
    const filteredResponse = customerResponse.data.map((customer) => ({
      value: customer.id,
      label: customer.customer_name,
    }));

    callBack(filteredResponse);
  };
  const handleAddCashReciept = async () => {
    setIsLoading(true);

    const newExchangeData = {
      ...exchangeData,
      currency_total:
        exchangeData.currency_quantity / exchangeData.currency_charge,
      currency_total_aed:
        cashRecieptData.currency_quantity / cashRecieptData.conversion_rate,
    };
    const newCashReceiptData = {
      ...cashRecieptData,
      currency_quantity_aed:
        cashRecieptData.currency_quantity / cashRecieptData.conversion_rate,
    };

    //adding cash receipt
    const responseCashReceipt = await addCashRecieptAPI(newCashReceiptData);

    //getting details of customer for updating opening balance
    const customerDetails = await getCustomerByIdAPI(
      cashRecieptData.customer_id
    );
    console.log(customerDetails);
    const ob = customerDetails.data.opening_balance;

    //adding exchange
    if (isOnExchange) {
      const responseExchange = await addExchangeAPI(newExchangeData);
      //getting details of customer for updating opening balance
      const customerDetailsTwo = await getCustomerByIdAPI(
        exchangeData.customer_id
      );
      const obTwo = parseFloat(customerDetailsTwo.data.opening_balance);
    }

    if (responseCashReceipt.status === 200) {
      setIsLoading(false);
      toast({
        title: "Cash Receipt Added.",
        description: "cash receipt added successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <SimpleGrid columns={3} spacing={3} w="70%" justifyContent="center">
        <FormControl w="100%">
          <FormLabel>Currency</FormLabel>
          <Select
            variant="filled"
            size="lg"
            onChange={(e) => {
              setCashRecieptData({
                ...cashRecieptData,
                currency_type: e.target.value,
              });
              setExchangeData({
                ...exchangeData,
                currency_type: e.target.value,
              });
            }}
          >
            <option value="SR">SR</option>
            <option value="AED">AED</option>
            <option value="INR">INR</option>
          </Select>
        </FormControl>
        <FormControl w="100%" ml="3">
          <FormLabel>Date</FormLabel>
          <DatePicker
            format="dd/MM/yyyy"
            value={cashRecieptData.date}
            onChange={(date) => {
              setCashRecieptData({ ...cashRecieptData, date });
              setExchangeData({
                ...exchangeData,
                date,
              });
            }}
          />
        </FormControl>
        <FormControl w="100%">
          <FormLabel>Customer</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setCashRecieptData({
                ...cashRecieptData,
                customer_id: input.value,
              })
            }
          />
        </FormControl>

        <FormControl w="100%">
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="quantity"
            onChange={(e) => {
              setCashRecieptData({
                ...cashRecieptData,
                currency_quantity: parseFloat(e.target.value),
              });
              setExchangeData({
                ...exchangeData,
                currency_quantity: parseFloat(e.target.value),
              });
            }}
          />
        </FormControl>
        <FormControl w="100%">
          <FormLabel>Conversion Rate(AED)</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="quantity"
            onChange={(e) => {
              setCashRecieptData({
                ...cashRecieptData,
                conversion_rate: parseFloat(e.target.value),
              });
            }}
          />
        </FormControl>
        <FormControl w="100%">
          <FormLabel>Total(AED)</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="quantity"
            value={
              cashRecieptData.currency_quantity /
              cashRecieptData.conversion_rate
            }
          />
        </FormControl>
        {cashRecieptData.currency_type === "SR" && (
          <FormControl w="100%" ml="3">
            <FormLabel>Exchange</FormLabel>
            <Switch
              mt="1"
              size="lg"
              isChecked={isOnExchange}
              onChange={() => setIsOnExchange(!isOnExchange)}
            ></Switch>
          </FormControl>
        )}
        {cashRecieptData.currency_type === "SR" && isOnExchange && (
          <>
            <FormControl w="100%">
              <FormLabel>Third party</FormLabel>
              <AsyncSelect
                loadOptions={searchCustomers}
                onChange={(input) =>
                  setExchangeData({
                    ...exchangeData,
                    customer_id: input.value,
                  })
                }
              />
            </FormControl>
            <FormControl w="100%">
              <FormLabel>Exchange rate</FormLabel>
              <Input
                type="number"
                variant="filled"
                w="100%"
                size="lg"
                onChange={(e) =>
                  setExchangeData({
                    ...exchangeData,
                    currency_charge: parseFloat(e.target.value),
                  })
                }
              />
            </FormControl>
            <FormControl w="100%">
              <FormLabel>Total</FormLabel>
              <Input
                variant="filled"
                w="100%"
                size="lg"
                name="total"
                value={
                  cashRecieptData.currency_quantity /
                    exchangeData.currency_charge || 0
                }
                readOnly
              />
            </FormControl>
          </>
        )}
      </SimpleGrid>
      <Button
        colorScheme="blue"
        size="lg"
        mt="4"
        onClick={handleAddCashReciept}
        isLoading={isLoading}
        loadingText="Adding cash receipt"
      >
        Add Cash Reciept
      </Button>
    </>
  );
};
