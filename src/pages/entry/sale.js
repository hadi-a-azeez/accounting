import {
  Select,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  useToast,
  Alert,
  AlertIcon,
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
import { useHistory } from "react-router-dom";

export const Sale = () => {
  const [isValidationError, setIsValidationError] = useState(false);

  const [saleData, setSaleData] = useState({
    currency_quantity: 0,
    currency_charge: 0,
    convertion_rate: 0,
    currency_type: "AED",
    customer_id: 0,
    date: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const validate = (callBack) => {
    setIsValidationError(false);
    if (
      saleData.currency_quantity > 0 &&
      saleData.currency_charge > 0 &&
      saleData.convertion_rate > 0 &&
      saleData.customer_id > 0
    )
      return callBack();
    setIsValidationError(true);
  };

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

    if (response.status === 200) {
      setIsLoading(false);
      toast({
        title: "Sale Added",
        description: "Sale added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      history.go(0);
    }
  };

  return (
    <>
      {isValidationError && (
        <Alert status="error" mt="10px" mb="10px">
          <AlertIcon />
          Please Fill All Fields!
        </Alert>
      )}
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
          <FormLabel>Rate</FormLabel>
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

        <FormControl w="100%" ml="3">
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
        onClick={() => validate(handleAddSale)}
        isLoading={isLoading}
        loadingText="Adding sale"
      >
        Add Sale
      </Button>
    </>
  );
};
