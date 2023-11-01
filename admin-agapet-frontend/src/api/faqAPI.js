import axios from "axios";

export const faqAPI= axios.create(
    {
        baseURL:'http://127.0.0.1:8000/faq/'
    }
)