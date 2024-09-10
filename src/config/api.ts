import 'dotenv/config';

export const ApiConfig = {
  exchangeApi:`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGES_API_KEY}/latest/EUR`,
}