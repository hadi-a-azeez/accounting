import axios from "axios";
import { apiRoot } from "../config";

export const addExchangeAPI = async (exchange) => {
  try {
    return await axios.post(`${apiRoot}/exchange`, exchange);
  } catch (error) {}
};

//get exchange history of a user
export const getExchangeHistoryAPI = async (customer_id) => {
  try {
    return await axios.get(`${apiRoot}/exchange/${customer_id}`);
  } catch (error) {}
};
//get all exchange history
export const getAllExchangeHistoryAPI = async () => {
  try {
    return await axios.get(`${apiRoot}/exchange`);
  } catch (error) {}
};
