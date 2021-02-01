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

const UpdateCustomer = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {/* Update customer modal starts here */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Customer</ModalHeader>
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
              <FormLabel>Charge</FormLabel>
              <Input size="lg" variant="filled" w="100%" placeholder="charge" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" colorScheme="red" mr="2">
              Delete Customer
            </Button>
            <Button colorScheme="blue">Update Customer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Update customer modal ends here */}
    </>
  );
};

export default UpdateCustomer;
