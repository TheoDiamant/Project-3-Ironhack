import "./EditProductPage.css"

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
 
const API_URL = "http://localhost:5005";

 
function EditProjectPage() {

    const { productId } = useParams();   
    const navigate = useNavigate();  
    
    const [product, setProduct] = useState({
        image: "",
        title: "",
        description: "",
        price: 0,
    })

    useEffect(() => {
        axios.get(`${API_URL}/api/products/${productId}`)
            .then((response) => {
                const oneProduct = response.data;
                setProduct(oneProduct)
            })
            .catch((error) => console.log(error));
        
    }, [productId]);

    ///////////////////////

    function handleChange(event) {
        const { name, value } = event.target
        setProduct(prevState => ({...prevState, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${API_URL}/api/products/${productId}/edit`, product)
            .then(response => {
                console.log("success")
                navigate(`/products/${productId}`)
            })
            .catch(err => console.log(err))
    }

      const deleteProduct = () => {                    //  <== ADD
        // Make a DELETE request to delete the project
        axios
          .delete(`${API_URL}/api/products/${productId}`)
          .then(() => {
            // Once the delete request is resolved successfully
            // navigate back to the list of projects.
            navigate("/products");
          })
          .catch((err) => console.log(err));
      };  
     
      ///////////////////////
    
    return (
        <>
            <div className="baseDiv">
                <form className="editProductForm" onSubmit={handleSubmit}>
                    <h3>Edit product</h3>
                    <div className="editImageFormDiv">
                        <p>Change images</p>
                        <input className="imageInput" name="image" type="file" multiple alt="" onChange={handleChange}></input>
                    </div>
                    <div className="editFormDiv">
                        <p>Title</p>
                        <input name="title" type="text" alt="" onChange={handleChange} value={product.title}></input>
                    </div>
                    <div className="editFormDiv descriptionDiv">
                        <p>Description</p>
                        <textarea name="description" type="text" alt="" onChange={handleChange} value={product.description}></textarea>
                    </div>
                    <div className="editFormDiv">
                        <p>Price</p>
                        <input name="price" type="number" alt="" onChange={handleChange} value={product.price}></input>
                    </div>
                    <button className="uploadButton" onClick={handleSubmit}>EDIT</button>
                </form>

            </div>
            {/* <button className="deleteProductButton" onClick={deleteProduct}>DELETE PRODUCT</button> */}
        </>
    );
  }
   
  export default EditProjectPage;