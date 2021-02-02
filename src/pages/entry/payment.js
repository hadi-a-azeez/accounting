import {
  Select,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchCustomersAPI } from "../../api/customers";

import DatePicker from "react-date-picker";
import AsyncSelect from "react-select/async";
import { addPaymentAPI } from "../../api/payment";

export const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    currency_price: 0,
    purchase_id: 4,
    currency_type: "",
    customer_id: 0,
    date: new Date(),
  });

  const searchCustomers = async (searchTerm, callBack) => {
    const customerResponse = await searchCustomersAPI(searchTerm);
    const filteredResponse = customerResponse.data.map((customer) => ({
      value: customer.id,
      label: customer.customer_name,
    }));

    callBack(filteredResponse);
  };
  const handleAddPayment = async () => {
    console.log(paymentData);
    await addPaymentAPI(paymentData);
  };

  return (
    <>
      <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
        <FormControl w="25%">
          <FormLabel>Currency</FormLabel>
          <Select
            variant="filled"
            size="lg"
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                currency_type: e.target.value,
              })
            }
          >
            <option value="SR">SR</option>
            <option value="AED">AED</option>
            <option value="INR">INR</option>
          </Select>
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Date</FormLabel>
          <DatePicker
            format="dd/MM/yyyy"
            value={paymentData.date}
            onChange={(date) => {
              setPaymentData({ ...paymentData, date });
            }}
          />
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Customer</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setPaymentData({ ...paymentData, customer_id: input.value })
            }
          />
        </FormControl>
      </Flex>

      <Flex dir="row" w="70%" mt="3" d="flex" justifyContent="flex-start">
        <FormControl w="25%">
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="quantity"
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                currency_price: parseInt(e.target.value),
              })
            }
          />
        </FormControl>
      </Flex>
      <Button colorScheme="blue" size="lg" mt="4" onClick={handleAddPayment}>
        Add Payment
      </Button>
    </>
  );
};
