import axios from "axios"

let filesFound = []

export const handleFiles = ({ files }) => {
    if (files) {
        filesFound = files
        return true
    }
    return false
}

export const addProduct = async ({ title, description, category, price }) => {

    const formData = new FormData();
    filesFound.forEach((file, index) => {
        formData.append("images", file);
    });
    formData.append("title",title)
    formData.append("description",description)
    formData.append("category",category)
    formData.append("price",price)
    console.log(Object.fromEntries(formData));
    const response = await axios.post("http://localhost:4000/product/addProduct", formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
    console.log(response);
    return response
}
