import {
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
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
import { addPaymentAPI } from "../../api/payment";

export const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    currency_quantity: 0,
    currency_type: "SR",
    conversion_rate: 0,
    currency_quantity_aed: 0,
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

  const handleAddPayment = async () => {
    setIsLoading(true);

    let newPaymentData = {};
    paymentData.currency_type !== "AED"
      ? (newPaymentData = {
          ...paymentData,
          currency_quantity_aed:
            paymentData.currency_quantity / paymentData.conversion_rate,
        })
      : (newPaymentData = {
          ...paymentData,
          currency_quantity_aed: paymentData.currency_quantity,
        });

    //adding payment
    const response = await addPaymentAPI(newPaymentData);

    //getting details of customer for updating opening balance
    const customerDetails = await getCustomerByIdAPI(paymentData.customer_id);
    const ob = parseFloat(customerDetails.data.opening_balance);
    // //updating opening balance
    // if (paymentData.currency_type === "AED") {
    //   const updateOb = await updateCustomerObAPI(
    //     parseFloat(ob - newPaymentData.currency_quantity),
    //     paymentData.customer_id
    //   );
    // } else {
    //   const updateOb = await updateCustomerObAPI(
    //     parseFloat(ob + newPaymentData.currency_quantity_aed),
    //     paymentData.customer_id
    //   );
    // }

    if (response.status === 200) {
      setIsLoading(false);
      toast({
        title: "Payment Added.",
        description: "Payment added successfully",
        status: "success",
        duration: 9000,
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
        <FormControl w="100%" ml="3">
          <FormLabel>Date</FormLabel>
          <DatePicker
            format="dd/MM/yyyy"
            value={paymentData.date}
            onChange={(date) => {
              setPaymentData({ ...paymentData, date });
            }}
          />
        </FormControl>
        <FormControl w="100%" ml="3">
          <FormLabel>Customer</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setPaymentData({ ...paymentData, customer_id: input.value })
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
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                currency_quantity: parseFloat(e.target.value),
              })
            }
          />
        </FormControl>
        {paymentData.currency_type !== "AED" && (
          <FormControl w="100%" ml="3">
            <FormLabel>Conversion rate (AED)</FormLabel>
            <Input
              variant="filled"
              w="100%"
              size="lg"
              name="total"
              onChange={(e) =>
                setPaymentData({
                  ...paymentData,
                  conversion_rate: e.target.value,
                })
              }
            />
          </FormControl>
        )}
        {paymentData.currency_type !== "AED" && (
          <FormControl w="100%" ml="3">
            <FormLabel>Total (AED)</FormLabel>
            <Input
              type="number"
              variant="filled"
              w="100%"
              size="lg"
              value={
                paymentData.currency_quantity / paymentData.conversion_rate
              }
              readOnly
            />
          </FormControl>
        )}
      </SimpleGrid>
      <Button
        colorScheme="blue"
        size="lg"
        mt="4"
        onClick={handleAddPayment}
        isLoading={isLoading}
        loadingText="Adding payment"
      >
        Add Payment
      </Button>
    </>
  );
};
