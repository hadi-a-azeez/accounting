import {
  Select,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  getCustomerByIdAPI,
  searchCustomersAPI,
  updateCustomerObAPI,
} from "../../api/customers";

import DatePicker from "react-date-picker";
import AsyncSelect from "react-select/async";
import { addPurchaseAPI } from "../../api/purchase";

export const Purchase = () => {
  const [purchaseData, setPurchaseData] = useState({
    currency_quantity: 0,
    currency_charge: 0,
    currency_type: "SR",
    customer_id: 0,

    date: new Date(),
  });
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
  const handleAddPurchase = async () => {
    setIsLoading(true);
    const newPurchase = {
      ...purchaseData,
      currency_total:
        purchaseData.currency_charge * purchaseData.currency_quantity,
    };

    //getting details of customer for updating opening balance
    const customerDetails = await getCustomerByIdAPI(purchaseData.customer_id);
    const ob = customerDetails.data.opening_balance;

    //updating opening balance
    const updateOb = await updateCustomerObAPI(
      parseFloat(
        ob + purchaseData.currency_charge * purchaseData.currency_quantity
      ),
      purchaseData.customer_id
    );
    console.log(updateOb);

    //adding purchase
    const response = await addPurchaseAPI(newPurchase);
    console.log(response);
    if (response.status === 200) {
      setIsLoading(false);
      toast({
        title: "Purchase Added.",
        description: "Purchase added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
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
              setPurchaseData({
                ...purchaseData,
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
            value={purchaseData.date}
            onChange={(date) => {
              setPurchaseData({ ...purchaseData, date });
            }}
          />
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Customer</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setPurchaseData({ ...purchaseData, customer_id: input.value })
            }
          />
        </FormControl>
      </Flex>

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
                currency_quantity: parseFloat(e.target.value),
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
                currency_charge: parseFloat(e.target.value),
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
            readOnly
          />
        </FormControl>
      </Flex>
      <Button
        colorScheme="blue"
        size="lg"
        mt="4"
        onClick={handleAddPurchase}
        isLoading={isLoading}
        loadingText="Adding purchase"
      >
        Add Purchase
      </Button>
    </>
  );
};
