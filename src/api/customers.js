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

export const getCustomerByIdAPI = async (id) => {
  try {
    return await axios.get(`${apiRoot}/customer/${id}`);
  } catch (error) {}
};

export const getSumOfObdAPI = async () => {
  try {
    return await axios.get(`${apiRoot}/customer/sum_of_ob`);
  } catch (error) {}
};

//update customer opening balance
export const updateCustomerObAPI = async (ob, id) => {
  try {
    return await axios.put(`${apiRoot}/customer/update_ob`, {
      opening_balance: ob,
      id,
    });
  } catch (error) {
    return error;
  }
};
