import axios from 'axios';

export const getQuickQuotes = async (id: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `api/quick-quote/${id}`,
    });
    return response.data;
  } catch (error) {
    console.log('Error: ', error);
  }
};
