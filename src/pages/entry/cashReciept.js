import {
  Select,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";

export const CashReciept = () => {
  return (
    <Flex dir="row" w="90%" mt="3" d="flex" justifyContent="center">
      <FormControl w="25%">
        <FormLabel>Quantity</FormLabel>
        <Input variant="filled" w="100%" size="lg" />
      </FormControl>
      <FormControl w="25%" ml="3">
        <FormLabel>Charge</FormLabel>
        <Input variant="filled" w="100%" size="lg" />
      </FormControl>
      <FormControl w="25%" ml="3">
        <FormLabel>Sale Payment</FormLabel>
        <Input variant="filled" w="100%" size="lg" />
      </FormControl>
    </Flex>
  );
};
