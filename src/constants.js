import axios from "axios"

export const handleFileUpload = async (payload) => {
    try {
        const response = await axios.post("http://localhost:8081/uploadLogFiles", payload)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const handleSearch = async (payload) => {
    try {
        const response = await axios.post("http://localhost:8082/logs/search", payload)
        return response
    } catch (error) {
        console.log(error)
    }
}