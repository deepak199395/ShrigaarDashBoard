import axios from "axios";

const BASE_URL = "https://api.shrigaar.com/api/v1/shringar/staff";

export const fetchStaffAPI = async () => {
  const response = await axios.get(`${BASE_URL}/list/api87`);
  return response.data.staff;
};

export const addStaffAPI = async (staffData) => {
  const response = await axios.post(
    `${BASE_URL}/create/api86`,
    staffData
  );

  return response.data;
};

export const updateStaffAPI = async ({ id, updatedData }) => {
  const response = await axios.put(
    `${BASE_URL}/update/api89/${id}`,
    updatedData
  );

  return response.data.updatedStaff;
};

export const deleteStaffAPI = async (id) => {
  await axios.delete(`${BASE_URL}/delete/api90/${id}`);

  return id;
};