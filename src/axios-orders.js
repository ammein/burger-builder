import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-my-burger-d597e.firebaseio.com/"
})

export default instance;