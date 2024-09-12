import axios from 'axios';

export const getServicesData = async () => {
    try {
        const FETCH_SERVICES_LIST = `${process.env.REACT_APP_BEE_BASE_URL}/api/v1/services/list`;
        const response = await axios.get(FETCH_SERVICES_LIST);
        return response.data;
    } catch (error) {
        console.error('Error fetching services data', error);
        throw error;
    }
};
