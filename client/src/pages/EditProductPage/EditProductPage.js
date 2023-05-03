 
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 

import axios from "axios";
 
const API_URL = "http://localhost:5005";

 
function EditProjectPage(props) {

    const { productId } = useParams();   
    const navigate = useNavigate();  

    const [product, setProduct] = useState({
        image: "",
        title: "",
        description: "",
        price: 0,
    })

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
    }

    useEffect(() => {
        axios
          .get(`${API_URL}/api/products/${productId}`)
          .then((response) => {
            const oneProduct = response.data;
            setProduct(oneProduct)
          })
          .catch((error) => console.log(error));
        
      }, [productId]);
      

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
     

    
    return (

        <div className="baseDiv">
        <form className="addProductForm" onSubmit={handleSubmit}>
            <h3>Edit product</h3>
            <div className="imageFormDiv">
                <p>Change images</p>
                <input name="image" type="file" multiple alt="" onChange={handleChange}></input>
            </div>
            <div className="formDiv">
                <p>Title</p>
                <input name="title" type="text" alt="" onChange={handleChange} value={product.title}></input>
            </div>
            <div className="formDiv">
                <p>Description</p>
                <input name="description" type="text" alt="" onChange={handleChange} value={product.description}></input>
            </div>
            <div className="formDiv">
                <p>Price</p>
                <input name="price" type="number" alt="" onChange={handleChange} value={product.price}></input>
            </div>
            <button type="submit">Upload</button>
        </form>

        <button onClick={deleteProduct}>Delete Product</button>
    </div>

    );
  }
   
  export default EditProjectPage;