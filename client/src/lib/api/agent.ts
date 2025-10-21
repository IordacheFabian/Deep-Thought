import axios from "axios";

// const sleep = (delay: number) => {
//     return new Promise(resolve => {
//         setTimeout(resolve, delay);
//     })
// };

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5101/api",
});


export default agent;