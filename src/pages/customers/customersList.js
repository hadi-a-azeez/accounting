import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styles from "./css/customers.module.css";
import SideBar from "../../components/sideBar";
import TopBar from "../../components/topBar";
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
  Spinner,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { addCustomerAPI, getCustomerAPI } from "../../api/customers";

const Customers = () => {
  const [customersData, setCustomersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCustomers = async () => {
      setIsLoading(true);
      const response = await getCustomerAPI();
      console.log(response.data);
      setCustomersData(response.data);
      setIsLoading(false);
    };
    getCustomers();
  }, []);

  const { register, handleSubmit } = useForm();
  const addCustomer = async (customer) => {
    const response = await addCustomerAPI(customer);
    console.log(response);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const history = useHistory();

  const CustomerCard = ({ customer }) => {
    return (
      <Tr>
        <Td>
          <Link
            onClick={() => history.push(`/customer_history/${customer.id}`)}
          >
            {customer.customer_name}
          </Link>
        </Td>
        <Td>{customer.customer_phone}</Td>
        <Td>{customer.customer_charge}</Td>
        <Td>
          <IconButton
            borderRadius="30px"
            icon={<EditIcon />}
            onClick={() => setIsUpdateOpen(true)}
          />
        </Td>
      </Tr>
    );
  };

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
        ml="140px"
      >
        Add New Customer
      </Button>
      {/* Add new customer modal starts here */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              <FormControl>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  name="customer_name"
                  ref={register}
                  size="lg"
                  variant="filled"
                  w="100%"
                  placeholder="customer name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="number"
                  name="customer_phone"
                  ref={register({
                    valueAsNumber: true,
                  })}
                  size="lg"
                  variant="filled"
                  w="100%"
                  placeholder="phone no"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Charge</FormLabel>
                <Input
                  type="number"
                  name="customer_charge"
                  ref={register({
                    valueAsNumber: true,
                  })}
                  size="lg"
                  variant="filled"
                  w="100%"
                  placeholder="charge"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit(addCustomer)}>
                Add Customer
              </Button>
            </ModalFooter>
          </form>
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
                name="customer_name"
                size="lg"
                variant="filled"
                w="100%"
                placeholder="customer name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="customer_phone"
                size="lg"
                variant="filled"
                w="100%"
                placeholder="phone no"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Charge</FormLabel>
              <Input
                name="customer_charge"
                size="lg"
                variant="filled"
                w="100%"
                placeholder="charge"
              />
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
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt="10"
        />
      )}
      {/* customer details table starts here */}
      {!isLoading && (
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
              {customersData &&
                customersData.map((customer, i) => (
                  <CustomerCard customer={customer} key={i} />
                ))}
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
      )}
      {/* customer details table ends here */}
    </div>
  );
};

export default Customers;
