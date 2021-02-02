import axios from "axios";
import { apiRoot } from "../config";

export const addPaymentAPI = async (payment) => {
  try {
    return await axios.post(`${apiRoot}/payment`, payment);
  } catch (error) {}
};
<<<<<<< HEAD

//get payment history of a user
export const getPaymentHistoryAPI = async (customer_id) => {
  try {
    return await axios.get(`${apiRoot}/payment/${customer_id}`);
  } catch (error) {}
};
=======
>>>>>>> f762bd6be5a9364523064e57806b206efdc6702d
