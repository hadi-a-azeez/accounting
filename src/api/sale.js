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
