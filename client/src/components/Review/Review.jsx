import { useState } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
 
const API_URL = "http://localhost:5005";

function Review() {

    const storedToken = localStorage.getItem("authToken");

    const { productId } = useParams()

    const [review, setReview] = useState({
        img: "",
        title: "",
        message: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setReview(prevState => ({...prevState, [name]: value}))
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${API_URL}/api/products/${productId}/review`, review, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            console.log("success")
        })

        
    }
  return (

    <div>
            <form onSubmit={handleSubmit}>

                <h1>Add a Review</h1>

                     {/* DONT FORGET TO ADD AN INPUT FOR THE IMAGE */}

                    <input name="title" type="text" alt="" onChange={handleChange}></input>
                    <textarea name="message" type="text" onChange={handleChange}></textarea>

                    {/* Maybe add later as feature stars rating */}

                <button type="submit">Add review</button>
            </form>


    </div>
  )

}

export default Review