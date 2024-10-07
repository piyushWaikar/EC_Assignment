import axios from "axios";

const apiRequest = axios.create({
    baseURL:"https://intern-task-api.bravo68web.workers.dev/",
});

export default apiRequest;