import axios from 'axios';

export const post = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Axios POST Error:', error);
    return { success: false, error: error.message };
  }
}; 

export const get = async (url) => {
  try {
    const response = await axios.get(url);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Axios GET Error:', error);
    return { success: false, error: error.message };
  }
};

export const getById = async (url) => {
  try {
    const response = await axios.get(url);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Axios GET by ID Error:', error);
    return { success: false, error: error.message };
  }
};

export const put = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Axios PUT Error:', error);
    return { success: false, error: error.message };
  }
};

export const remove = async (url) => {
  try {
    const response = await axios.delete(url);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Axios DELETE Error:', error);
    return { success: false, error: error.message };
  }
};