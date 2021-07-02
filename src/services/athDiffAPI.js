// Node modules.
import axios from "axios";

class ATHDiffAPI {
  constructor() {
    this.baseURL = this.deriveBaseURL();
  }

  deriveBaseURL() {
    return "http://localhost:3001";
  }

  getCryptos = async (options = {}) => {
    const response = await axios.get(`${this.baseURL}/api/cryptos`, {
      params: options,
    });

    return response?.data;
  };
}

export default ATHDiffAPI;
