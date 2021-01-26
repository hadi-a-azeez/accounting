import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./customers.module.css";
import SideBar from "../components/sideBar";
import TopBar from "../components/topBar";
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const Customers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const history = useHistory();

  return (
    <div className={styles.container}>
      <SideBar />
      <TopBar label="Customers" />
      <Button
        size="lg"
        colorScheme="blue"
        onClick={() => setIsOpen(true)}
        mt="70px"
        alignSelf="flex-start"
        ml="140px" ////////////
      >
        Add New Customer
      </Button>
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
              <FormLabel>Charge</FormLabel>
              <Input size="lg" variant="filled" w="100%" placeholder="charge" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue">Add Customer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Add new customer modal ends here */}
      {/* Update customer modal starts here */}
      <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
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
      {/* customer details table starts here */}
      <Box w="80%" boxShadow="lg" mt="3" borderRadius="8px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Charge</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Link onClick={() => history.push("/customer_history")}>
                  Rafeeq
                </Link>
              </Td>
              <Td>999878655</Td>
              <Td>25.4</Td>
              <Td>
                <IconButton
                  borderRadius="30px"
                  icon={<EditIcon />}
                  onClick={() => setIsUpdateOpen(true)}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Ambu</Td>
              <Td>999878655</Td>
              <Td>25.4</Td>
              <Td>
                <IconButton
                  borderRadius="30px"
                  icon={<EditIcon />}
                  onClick={() => setIsUpdateOpen(true)}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Shafi</Td>
              <Td>999878655</Td>
              <Td>25.4</Td>
              <Td>
                <IconButton
                  borderRadius="30px"
                  icon={<EditIcon />}
                  onClick={() => setIsUpdateOpen(true)}
                />
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Charge</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      {/* customer details table ends here */}
    </div>
  );
};

export default Customers;
