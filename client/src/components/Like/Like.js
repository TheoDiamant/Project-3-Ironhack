import "./Like.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const API_URL = "http://localhost:5005";

function Like() {

    const storedToken = localStorage.getItem("authToken");

    const { productId } = useParams()

    const [isLike, setIsLike] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${API_URL}/api/products/${productId}/like`, {}, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            console.log("success")
        })
        
    }


  return (


    <div>

    <form>
        <button onClick={handleSubmit}>Like</button>
    </form>

    </div>


  )

}

export default Like