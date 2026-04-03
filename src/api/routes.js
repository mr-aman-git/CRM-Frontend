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
    const response = await axiosInstance.post(
      "/users/register-admin",
      credentials,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ------------  DASHBOARD STATS  -----------------------------
export const getDashboardStats = async () => {
  try {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailedReport = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/detailed-report");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSystemAudit = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/system-audit");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDuplicateLeads = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/duplicates");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ------------  STAFF ROUTES  -----------------------------

export const StaffRegister = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      "/users/create-staff",
      credentials,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const StaffVerify = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      "/users/verify-staff",
      credentials,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllStaff = async () => {
  try {
    const response = await axiosInstance.get("/users/staff");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffLeads = async () => {
  try {
    const response = await axiosInstance.get("/leads/my-leads");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remarkLeads = async (id, credentials) => {
  try {
    const response = await axiosInstance.put(
      `/leads/update-status/${id}`,
      credentials,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffStats = async (staffId, filter = "all") => {
  try {
    const response = await axiosInstance.get(
      `/staff/stats/${staffId}?filter=${filter}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ------------  LEADS UPLOAD  -----------------------------

export const leadsUpload = async (credentials) => {
  try {
    const response = await axiosInstance.post("/leads/upload", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignLeads = async (credentials) => {
  try {
    const response = await axiosInstance.put("/leads/assign", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const autoAssignLeads = async (credentials) => {
  try {
    const response = await axiosInstance.put("/leads/auto-assign", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllLeads = async () => {
  try {
    const response = await axiosInstance.get("/leads");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bulkLeadsDelete = async (data) => {
  try {
    const response = await axiosInstance.post("/leads/bulk-delete", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
