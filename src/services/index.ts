import axiosConfig from "./axiosConfig";
import {API_BASE_URL} from "../constants";
import {createURLQueryParams} from "../utils";


export const searchCompany: any = async (queryParams: any) => {
  const queries = createURLQueryParams(queryParams);
  const response = await axiosConfig.get(`${API_BASE_URL}/${queries}`);
  return response.data.bestMatches;
};


export const companyOverview: any = async (queryParams: any) => {
  const queries = createURLQueryParams(queryParams);
  const response = await axiosConfig.get(`${API_BASE_URL}/${queries}`);
  return response.data;
};