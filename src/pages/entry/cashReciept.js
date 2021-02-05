import {
  Select,
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
import { addCashRecieptAPI } from "../../api/cashReciept";

export const CashReciept = () => {
  const [cashRecieptData, setCashRecieptData] = useState({
    currency_quantity: 0,
    sale_id: 3,
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
  const handleAddCashReciept = async () => {
    console.log(cashRecieptData);
    await addCashRecieptAPI(cashRecieptData);
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
              setCashRecieptData({
                ...cashRecieptData,
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
            value={cashRecieptData.date}
            onChange={(date) => {
              setCashRecieptData({ ...cashRecieptData, date });
            }}
          />
        </FormControl>
        <FormControl w="25%" ml="3">
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
      </Flex>

      <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
        <FormControl w="25%">
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="quantity"
            onChange={(e) =>
              setCashRecieptData({
                ...cashRecieptData,
                currency_quantity: parseInt(e.target.value),
              })
            }
          />
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Convertion rate</FormLabel>
          <Input type="number" variant="filled" w="100%" size="lg" />
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Third party</FormLabel>
          <AsyncSelect loadOptions={searchCustomers} />
        </FormControl>
      </Flex>
      <Button
        colorScheme="blue"
        size="lg"
        mt="4"
        onClick={handleAddCashReciept}
      >
        Add Cash Reciept
      </Button>
    </>
  );
};
