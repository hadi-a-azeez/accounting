import axios from "axios";
import { apiRoot } from "../config";

export const addPurchaseAPI = async (purchase) => {
  try {
    return await axios.post(`${apiRoot}/purchase`, purchase);
  } catch (error) {}
};
