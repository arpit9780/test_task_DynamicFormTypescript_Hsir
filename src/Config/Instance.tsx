import axios from "axios";

console.log(44,process.env.REACT_APP_API)
const Instance = axios.create({
    baseURL : process.env.REACT_APP_API
}
)

export default Instance;