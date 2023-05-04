import "./AddProduct.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ImageInput from "../../components/ImageInput/ImageInput";
 
const API_URL = "http://localhost:5005";

function AddProduct() {

    const navigate = useNavigate()

    const storedToken = localStorage.getItem("authToken");

    const [newProduct, setNewProduct] = useState({
        img: [""],
        title: "",
        description: "",
        price: 0,
    })

    function handleChange(event) {
        const { name, value } = event.target
        setNewProduct(prevState => ({...prevState, [name]: value}))
        console.log(newProduct)
    }

    function handleImages(event) {
        const files = event.target.files
        const imageData = new FormData()

        for (let i = 0; i < files.length; i++) {
            imageData.append("image", files[i])
        }
        
        console.log(imageData)
        axios.post(`${API_URL}/api/uploadmany`, imageData)
            .then(response => setNewProduct(prevState => ({...prevState, img: response.data})))
            .catch(err => console.log(err))
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${API_URL}/api/products`, newProduct, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                navigate(`/products/${response.data._id}`)
            })
    }

    return (
        <div className="baseDiv">
            <form className="addProductForm" onSubmit={handleSubmit}>
                <h3>Add a product</h3>
                <div className="imageFormDiv">
                    <p>Add up to 5 images</p>
                    <ImageInput handleImages={handleImages}/>
                </div>
                <div className="formDiv">
                    <p>Title</p>
                    <input name="title" type="text" alt="" onChange={handleChange}></input>
                </div>
                <div className="formDiv descriptionDiv">
                    <p>Description</p>
                    <textarea name="description" type="text" alt="" onChange={handleChange}></textarea>
                </div>
                <div className="formDiv">
                    <p>Price</p>
                    <input name="price" type="number" alt="" onChange={handleChange}></input>
                </div>
                <button className="uploadButton">Upload</button>
            </form>
        </div>
    )
}

export default AddProduct