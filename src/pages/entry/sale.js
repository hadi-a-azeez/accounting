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
import { addSaleAPI } from "../../api/sale";

export const Sale = () => {
  const [saleData, setSaleData] = useState({
    currency_quantity: 0,
    currency_charge: 0,
    currency_type: "SR",
    customer_id: 0,
    date: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const searchCustomers = async (searchTerm, callBack) => {
    const customerResponse = await searchCustomersAPI(searchTerm);
    const filteredResponse = customerResponse.data.map((customer) => ({
      value: customer.id,
      label: customer.customer_name,
    }));

    callBack(filteredResponse);
  };
  const handleAddSale = async () => {
    setIsLoading(true);
    const newSale = {
      ...saleData,
      currency_total: saleData.currency_charge * saleData.currency_quantity,
    };
    const response = await addSaleAPI(newSale);
    console.log(response);
    if (response.status === 200) {
      setIsLoading(false);
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
              setSaleData({
                ...saleData,
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
            value={saleData.date}
            onChange={(date) => {
              setSaleData({ ...saleData, date });
            }}
          />
        </FormControl>
        <FormControl w="25%" ml="3">
          <FormLabel>Customer</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setSaleData({ ...saleData, customer_id: input.value })
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
              setSaleData({
                ...saleData,
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
              setSaleData({
                ...saleData,
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
            value={saleData.currency_quantity * saleData.currency_charge}
            readOnly
          />
        </FormControl>
      </Flex>
      <Button
        colorScheme="blue"
        size="lg"
        mt="4"
        onClick={handleAddSale}
        isLoading={isLoading}
        loadingText="Adding sale"
      >
        Add Sale
      </Button>
    </>
  );
};
