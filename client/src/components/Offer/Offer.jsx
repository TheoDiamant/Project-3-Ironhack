import "./Offer.css"

import { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { ChatIDsContext } from "../../context/chatIDs.context"
 
const API_URL = "http://localhost:5005";


function Offer({ productOwner }) {

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext)
    const { setChatIDs, setOffer } = useContext(ChatIDsContext)
    
    const navigate = useNavigate()
    const { productId } = useParams()

      const [offerText, setOfferText] = useState({
          price: 0,
          message: "",
          productId: productId
      })


        const handleChange = (event) => {
            const {name, value} = event.target
            setOfferText(prevState => ({...prevState, [name]: value}))
        }


        const handleSubmit = (e) => {
            e.preventDefault()

            axios.post(`${API_URL}/api/products/${productId}/offer`, offerText, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                console.log(response)
                console.log("success")
            })

            setOffer(offerText)
            setChatIDs([user._id, productOwner._id])
            navigate("/message")
            
        }

        return (
            <div className="container">
              <div className="popupContainer">
                <form className="offerForm" onSubmit={handleSubmit}>
                  <h1>Make an Offer</h1>
                  <input
                    name="price"
                    type="number"
                    alt=""
                    onChange={handleChange}
                  ></input>
                  <textarea name="message" type="text" onChange={handleChange}></textarea>
                  <button type="submit">Send offer</button>
                </form>
              </div>
            </div>
          );
        }
    

    export default Offer