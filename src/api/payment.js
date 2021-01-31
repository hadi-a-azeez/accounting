import axios from "axios";
import { apiRoot } from "../config";

export const addPaymentAPI = async (payment) => {
  try {
    return await axios.post(`${apiRoot}/payment`, payment);
  } catch (error) {}
};
