import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const AddCustomer = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {/* Add new customer modal starts here */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Customer Name</FormLabel>
              <Input
                size="lg"
                variant="filled"
                w="100%"
                placeholder="customer name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                size="lg"
                variant="filled"
                w="100%"
                placeholder="phone no"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Rate</FormLabel>
              <Input size="lg" variant="filled" w="100%" placeholder="charge" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue">Add Customer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Add new customer modal ends here */}
    </>
  );
};

export default AddCustomer;
