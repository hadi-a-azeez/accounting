import axios from "axios";
import { apiRoot } from "../config";

export const addPurchaseAPI = async (purchase) => {
  try {
    return await axios.post(`${apiRoot}/purchase`, purchase);
  } catch (error) {}
};

//get purchase history of a user
export const getPurchaseHistoryAPI = async (customer_id) => {
  try {
    return await axios.get(`${apiRoot}/purchase/${customer_id}`);
  } catch (error) {}
};
//get all purchase history
export const getAllPurchaseHistoryAPI = async (cusomer_id) => {
  try {
    return await axios.get(`${apiRoot}/purchase`);
  } catch (error) {}
};
