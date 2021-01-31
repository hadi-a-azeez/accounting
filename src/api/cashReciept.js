import axios from "axios";
import { apiRoot } from "../config";

export const addCashRecieptAPI = async (cashReciept) => {
  try {
    return await axios.post(`${apiRoot}/cash_receipt`, cashReciept);
  } catch (error) {}
};
