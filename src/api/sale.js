import axios from "axios";
import { apiRoot } from "../config";

export const addSaleAPI = async (sale) => {
  try {
    return await axios.post(`${apiRoot}/sale`, sale);
  } catch (error) {}
};
