import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      let message = 'An error occurred';

      // Handle specific status codes
      if (status === 429) {
        message = 'Rate limit exceeded. Please try again in a moment.';
      } else if (status === 404) {
        message = 'Resource not found';
      } else if (status === 403) {
        message = 'Access forbidden';
      } else if (status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (error.response.data?.message) {
        message = error.response.data.message;
      }

      const customError = {
        message,
        status,
        data: error.response.data,
      };
      return Promise.reject(customError);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: 'No response from server. Please check your connection.',
        status: 0,
      });
    } else {
      // Error in request setup
      return Promise.reject({
        message: error.message || 'Request failed',
        status: -1,
      });
    }
  }
);

export default apiClient;
