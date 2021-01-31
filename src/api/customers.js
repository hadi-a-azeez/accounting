import axios from "axios";
import { apiRoot } from "../config";

export const addCustomerAPI = async (customer) => {
  try {
    return await axios.post(`${apiRoot}/customer`, customer);
  } catch (error) {}
};

export const getCustomerAPI = async () => {
  try {
    return await axios.get(`${apiRoot}/customer`);
  } catch (error) {
    console.log(error);
  }
};

export const searchCustomersAPI = async (searchTerm) => {
  try {
    return await axios.get(`${apiRoot}/customer/search/${searchTerm}`);
  } catch (error) {}
};
