import axios from "axios";
import { apiRoot } from "../config";

//get purchase history of a user
export const getUserReportAPI = async (customer_id) => {
  try {
    return await axios.get(`${apiRoot}/report/customer/${customer_id}`);
  } catch (error) {}
};
