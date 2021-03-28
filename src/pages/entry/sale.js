import {
  Select,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
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
import { addSaleAPI } from "../../api/sale";

export const Sale = () => {
  const [saleData, setSaleData] = useState({
    currency_quantity: 0,
    currency_charge: 0,
    convertion_rate: 0,
    currency_type: "AED",
    customer_id: 0,
    from_customer: 0,
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
  const handleAddSale = async () => {
    setIsLoading(true);

    let newSale = {
      ...saleData,
      convertion_rate: saleData.convertion_rate,
      currency_total: saleData.currency_quantity * saleData.currency_charge,
      currency_total_aed:
        (saleData.currency_charge * saleData.currency_quantity) /
        saleData.convertion_rate,
    };
    console.log(newSale);
    //adding sale
    const response = await addSaleAPI(newSale);
    //getting details of customer for updating opening balance
    const customerDetails = await getCustomerByIdAPI(saleData.customer_id);
    const ob = parseFloat(customerDetails.data.opening_balance);
    // //updating opening balance
    // const updateOb = await updateCustomerObAPI(
    //   parseFloat(ob - newSale.currency_total),
    //   saleData.customer_id
    // );
    // console.log(updateOb);

    if (response.status === 200) {
      setIsLoading(false);
      toast({
        title: "Sale Added",
        description: "Sale added successfully",
        status: "success",
        duration: 2000,
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
            onChange={(e) =>
              setSaleData({
                ...saleData,
                currency_type: e.target.value,
              })
            }
          >
            <option value="AED">AED</option>
            <option value="SR">SR</option>
            <option value="INR">INR</option>
          </Select>
        </FormControl>
        <FormControl w="100%" ml="3">
          <FormLabel>Date</FormLabel>
          <DatePicker
            format="dd/MM/yyyy"
            value={saleData.date}
            onChange={(date) => {
              setSaleData({ ...saleData, date });
            }}
          />
        </FormControl>
        <FormControl w="100%" ml="3">
          <FormLabel>Customer</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setSaleData({ ...saleData, customer_id: input.value })
            }
          />
        </FormControl>
        <FormControl w="100%">
          <FormLabel>From</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setSaleData({ ...saleData, from_customer: input.value })
            }
          />
        </FormControl>

        <FormControl w="100%" ml="3">
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
        <FormControl w="100%" ml="3">
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

        <FormControl w="100%">
          <FormLabel>Conversion rate (AED)</FormLabel>
          <Input
            variant="filled"
            w="100%"
            size="lg"
            name="total"
            onChange={(e) =>
              setSaleData({
                ...saleData,
                convertion_rate: parseFloat(e.target.value),
              })
            }
          />
        </FormControl>

        <FormControl w="100%" ml="3">
          <FormLabel>Total</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            value={saleData.currency_quantity * saleData.currency_charge}
            readOnly
          />
        </FormControl>

        <FormControl w="100%" ml="3">
          <FormLabel>Total (AED)</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            value={
              (saleData.currency_quantity * saleData.currency_charge) /
              saleData.convertion_rate
            }
            readOnly
          />
        </FormControl>
      </SimpleGrid>
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
