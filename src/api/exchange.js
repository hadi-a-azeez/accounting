import axios from "axios";
import { apiRoot } from "../config";

export const addExchangeAPI = async (exchange) => {
  try {
    return await axios.post(`${apiRoot}/exchange`, exchange);
  } catch (error) {}
};
