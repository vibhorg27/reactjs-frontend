import { post, get, getById, put, remove} from './AxiosService';

const BASE_URL = 'http://localhost:8080/employee'

export const addEmployee = async (employeeData) => {
  try {
    const response = await post(`${BASE_URL}/create`, employeeData);
    if (response.success) {
      console.log('Employee saved to API:', response.data);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to save employee:', response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error('Error in addEmployee:', error);
    return { success: false, error: error.message };
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await get(`${BASE_URL}/get`);
    if (response.success) {
      console.log('Employees fetched:', response.data);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to fetch employees:', response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error('Error in getAllEmployees:', error);
    return { success: false, error: error.message };
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await getById(`${BASE_URL}/get/${id}`);
    if (response.success) {
      console.log('Employee fetched:', response.data);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to fetch employee:', response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error('Error in getEmployeeById:', error);
    return { success: false, error: error.message };
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await put(`${BASE_URL}/update/${id}`, employeeData);
    if (response.success) {
      console.log('Employee updated:', response.data);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to update employee:', response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error('Error in updateEmployee:', error);
    return { success: false, error: error.message };
  }
};


export const deleteEmployee = async (id) => {
  try {
    const response = await remove(`${BASE_URL}/delete/${id}`);
    if (response.success) {
      console.log('Employee deleted:', id);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to delete employee:', response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error('Error in deleteEmployee:', error);
    return { success: false, error: error.message };
  }
};