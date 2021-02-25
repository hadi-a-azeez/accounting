import axios from "axios";
import { apiRoot } from "../config";

export const addSaleAPI = async (sale) => {
  try {
    return await axios.post(`${apiRoot}/sale`, sale);
  } catch (error) {}
};

//get sale of a user
export const getSaleHistoryAPI = async (customer_id) => {
  try {
    return await axios.get(`${apiRoot}/sale/${customer_id}`);
  } catch (error) {}
};

//get sales of a from_customer
export const getFromSaleHistoryAPI = async (customer_id) => {
  try {
    return await axios.get(`${apiRoot}/sale/from/${customer_id}`);
  } catch (error) {}
};

//get all sale history
export const getAllSaleHistoryAPI = async () => {
  try {
    return await axios.get(`${apiRoot}/sale`);
  } catch (error) {}
};
