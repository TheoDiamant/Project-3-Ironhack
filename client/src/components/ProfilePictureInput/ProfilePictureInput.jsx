import { useEffect, useState, useRef } from "react";
import "./ProfilePictureInput.css"

import axios from "axios"

const API_URL = "http://localhost:5005";


function ProfilePictureInput({currentPFP, setUser}) {

    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const [imageURL, setImageURL] = useState(null)
    const [triggered, setTriggered] = useState(false)

    useEffect(() => {
        loadCanvas()
    }, [imageURL])

    function loadCanvas() {
        const img = new Image()
        img.src = imageURL
        img.onload = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
    
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            canvas.classList.remove("loading")
            canvas.classList.add("rotate")
        }
    }

    function handleClick(e) {
        e.preventDefault()
        const fileInput = document.getElementById("fileInput")
        fileInput.click()
    }

    function handleFileInput(e) {
        if(triggered === true) {
            const canvas = canvasRef.current
            canvas.classList.remove("rotate")
            const ctx = canvas.getContext("2d")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        else {
            setTriggered(true)
        }
        
        imageRef.current.style.display = "none"
        canvasRef.current.classList.add("loading")
        const imageData = new FormData()
        imageData.append("image", e.target.files[0])

        axios.post(`${API_URL}/api/upload`, imageData)
            .then(response => {
                setUser(prevState => ({...prevState, profilePicture: response.data}))
                setImageURL(response.data)
            })
            .catch(err => console.log(err))

    }

    return(
        <div className="profilePictureInputDiv">
                <canvas className="profilePictureCanvas" ref={element => canvasRef.current = element}></canvas>
                <img ref={element => imageRef.current = element} className="currentPFP" src={currentPFP} alt="" />
                <button className="editPFPButton" onClick={handleClick}></button>
                <input id="fileInput" className="hiddenImageInput" type="file" onChange={handleFileInput}/>
        </div>
    )
}

export default ProfilePictureInput