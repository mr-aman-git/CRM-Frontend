import axiosInstance from "./axiosInstance";

export const adminStaffLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const adminRegister = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/register-admin", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const StaffRegister = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/create-staff", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const StaffVerify = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/verify-staff", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllStaff = async () => {
  try {
    const response = await axiosInstance.get(
      "/users/staff",
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ------------  LEADS UPLOAD  -----------------------------

export const leadsUpload = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      "/leads/upload",
      credentials,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignLeads = async (credentials) => {
  try {
    const response = await axiosInstance.put(
      "/leads/assign",
      credentials,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllLeads = async () => {
  try {
    const response = await axiosInstance.get(
      "/leads",
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

