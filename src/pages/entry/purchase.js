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
import { addPurchaseAPI } from "../../api/purchase";

export const Purchase = () => {
  const [purchaseData, setPurchaseData] = useState({
    currency_quantity: 0,
    currency_charge: 0,
    currency_type: "",
    customer_id: 0,
    total: 0,
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
  const handleAddPurchase = async () => {
    console.log(purchaseData);
    await addPurchaseAPI(purchaseData);
  };

  return (
    <>
      <FormControl w="25%" ml="15%" alignSelf="flex-start">
        <FormLabel>Currency</FormLabel>
        <Select
          variant="filled"
          size="lg"
          onChange={(e) =>
            setPurchaseData({ ...purchaseData, currency_type: e.target.value })
          }
        >
          <option value="SR">SR</option>
          <option value="AED">AED</option>
          <option value="INR">INR</option>
        </Select>
      </FormControl>
      <FormControl w="25%" ml="15%" mt="3" alignSelf="flex-start">
        <FormLabel>Date</FormLabel>
        <DatePicker
          format="dd/MM/yyyy"
          value={purchaseData.date}
          onChange={(date) => {
            setPurchaseData({ ...purchaseData, date });
          }}
        />
      </FormControl>
      <FormControl w="25%" ml="15%" alignSelf="flex-start">
        <FormLabel>Customer</FormLabel>
        <AsyncSelect
          loadOptions={searchCustomers}
          onChange={(input) =>
            setPurchaseData({ ...purchaseData, customer_id: input.value })
          }
        />
      </FormControl>

      <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
        <FormControl w="25%">
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="quantity"
            onChange={(e) =>
              setPurchaseData({
                ...purchaseData,
                currency_quantity: parseInt(e.target.value),
              })
            }
          />
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Charge</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="charge"
            onChange={(e) =>
              setPurchaseData({
                ...purchaseData,
                currency_charge: parseInt(e.target.value),
              })
            }
          />
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Total</FormLabel>
          <Input
            variant="filled"
            w="100%"
            size="lg"
            name="total"
            value={
              purchaseData.currency_quantity * purchaseData.currency_charge
            }
            onChange={(e) =>
              setPurchaseData({ ...purchaseData, total: e.target.value })
            }
            readOnly
          />
        </FormControl>
      </Flex>
      <Button colorScheme="blue" size="lg" mt="4" onClick={handleAddPurchase}>
        Add Purchase
      </Button>
    </>
  );
};
