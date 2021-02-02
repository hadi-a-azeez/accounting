import axios from "axios";
import { apiRoot } from "../config";

export const addCashRecieptAPI = async (cashReciept) => {
  try {
    return await axios.post(`${apiRoot}/cash_receipt`, cashReciept);
  } catch (error) {}
};
<<<<<<< HEAD

//get cash receipt history of a user
export const getCashReceiptHistoryAPI = async (customer_id) => {
  try {
    return await axios.get(`${apiRoot}/cash_receipt/${customer_id}`);
  } catch (error) {}
};
=======
>>>>>>> f762bd6be5a9364523064e57806b206efdc6702d
