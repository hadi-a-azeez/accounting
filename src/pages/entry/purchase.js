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
import { addPurchaseAPI } from "../../api/purchase";

export const Purchase = () => {
  const [purchaseData, setPurchaseData] = useState({
    currency_quantity: 0,
    currency_charge: 0,
    commission: 0,
    currency_type: "AED",
    customer_id: 0,
    date: new Date(),
  });
  const [conversionRate, setConversionRate] = useState({
    sr: 0,
    aed: 0,
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
    let newPurchase = {
      ...purchaseData,
      currency_to_give:
        purchaseData.currency_charge * purchaseData.currency_quantity,
      currency_got:
        purchaseData.currency_quantity * purchaseData.currency_charge -
        purchaseData.currency_quantity * purchaseData.commission,
    };
    // purchaseData.currency_type !== "AED"
    //   ? (newPurchase = {
    //       ...purchaseData,
    //       currency_total:
    //         (purchaseData.currency_charge * purchaseData.currency_quantity) /
    //         conversionRate.aed,
    //     })
    //   : (newPurchase = {
    //       ...purchaseData,
    //       currency_total:
    //         purchaseData.currency_charge * purchaseData.currency_quantity,
    //     });

    //adding purchase
    const responsePurchase = await addPurchaseAPI(newPurchase);
    console.log(responsePurchase);

    //getting details of customer for updating opening balance
    const customerDetails = await getCustomerByIdAPI(purchaseData.customer_id);
    const ob = parseFloat(customerDetails.data.opening_balance);
    //updating opening balance
    const updateOb = await updateCustomerObAPI(
      parseFloat(ob + newPurchase.currency_to_give),
      purchaseData.customer_id
    );
    console.log(updateOb);

    if (responsePurchase.status === 200) {
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
      <SimpleGrid columns={3} spacing={3} w="70%" justifyContent="center">
        <FormControl w="100%">
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
            <option value="AED">AED</option>
            <option value="SR">SR</option>
            <option value="INR">INR</option>
          </Select>
        </FormControl>
        <FormControl w="100%" ml="3">
          <FormLabel>Date</FormLabel>
          <DatePicker
            format="dd/MM/yyyy"
            value={purchaseData.date}
            onChange={(date) => {
              setPurchaseData({ ...purchaseData, date });
            }}
          />
        </FormControl>
        <FormControl w="100%" ml="3">
          <FormLabel>Customer</FormLabel>
          <AsyncSelect
            loadOptions={searchCustomers}
            onChange={(input) =>
              setPurchaseData({ ...purchaseData, customer_id: input.value })
            }
          />
        </FormControl>

        <FormControl w="100%">
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
        <FormControl w="100%" ml="3">
          <FormLabel>Charge</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            name="currency_charge"
            onChange={(e) =>
              setPurchaseData({
                ...purchaseData,
                [e.target.name]: parseFloat(e.target.value),
              })
            }
          />
        </FormControl>

        <FormControl w="100%" ml="3">
          <FormLabel>Commission</FormLabel>
          <Input
            variant="filled"
            w="100%"
            size="lg"
            name="commission"
            onChange={(e) =>
              setPurchaseData({
                ...purchaseData,
                [e.target.name]: parseFloat(e.target.value),
              })
            }
          />
        </FormControl>

        <FormControl w="100%">
          <FormLabel>Total To Give</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            value={
              purchaseData.currency_quantity * purchaseData.currency_charge
            }
            readOnly
          />
        </FormControl>
        <FormControl w="100%" ml="3">
          <FormLabel>Total Got</FormLabel>
          <Input
            type="number"
            variant="filled"
            w="100%"
            size="lg"
            value={
              purchaseData.currency_quantity * purchaseData.currency_charge -
              purchaseData.currency_quantity * purchaseData.commission
            }
            readOnly
          />
        </FormControl>
      </SimpleGrid>
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
