import { useForm } from "react-hook-form";
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

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <form>
      <Input name="firstName" ref={register} placeholder="First name" />

      <input name="lastName" ref={register} placeholder="Last name" />

      <select name="category" ref={register}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <Button onClick={handleSubmit(onSubmit)}>Add</Button>
    </form>
  );
}
