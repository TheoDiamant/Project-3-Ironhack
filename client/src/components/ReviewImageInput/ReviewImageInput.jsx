import { useEffect, useRef, useState } from "react"
import "./ReviewImageInput.css"

function ReviewImageInput({imagesLoading, handleImages, imageURLs, setImageURLs}) {

    const deleteButtons = [...document.getElementsByClassName("removeImageButton")]
 
    const canvasRefs = useRef([null, null, null, null])
    const [imageURLsCopy, setImageURLsCopy] = useState([])
    const [triggered, setTriggered] = useState(false)

    useEffect(() => {
        loadCanvases()
        setImageURLsCopy(imageURLs)
    }, [imagesLoading])

    function loadCanvases() {
        imageURLs.forEach((url, index) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
                const canvas = canvasRefs.current[index]
                const button = deleteButtons[index]
                
                const ctx = canvas.getContext("2d")
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                canvas.classList.add("fade-in")
                canvas.classList.remove("loading")
                button.style.display = "inline-block"
            }
        })
    }

    function handleFileInput(event) {
        if(triggered === true) {
            deleteButtons.forEach(button => {
                button.style.display = "none"
            })
            canvasRefs.current.forEach(canvas => {
                canvas.classList.remove("fade-in")
                const ctx = canvas.getContext("2d")
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            })
        }
        else {
            setTriggered(true)
        }

        let files = [...event.target.files]
        
        if(files.length > 4) {
            files = files.slice(0, 4)
        }
        
        handleImages(files)
        for (let i = 0; i < files.length; i++) {
            canvasRefs.current[i].classList.add("loading")
        }
    }

    function handleClick(e) {
        e.preventDefault()
        const fileInput = document.getElementById("fileInput")
        fileInput.click()
    }

    function handleDelete(index, e) {
        e.preventDefault()

        const newURLs = imageURLs.filter(element => element !== imageURLsCopy[index])
        
        setImageURLs(newURLs)

        const canvas = canvasRefs.current[index]
        const button = deleteButtons[index]
        const ctx = canvas.getContext("2d")

        canvas.classList.remove("fade-in")
        button.style.display = "none"
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    return(
        <div className="imageInputDiv">
            <div className="imageInputHalfDiv">
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[0] = element}></canvas>
                    <button onClick={(e) => handleDelete(0, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[1] = element}></canvas>
                    <button onClick={(e) => handleDelete(1, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="imageInputHalfDiv">
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[2] = element}></canvas>
                    <button onClick={(e) => handleDelete(2, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
                <div className="canvasDiv">
                    <canvas className="imageInputCanvas" ref={element => canvasRefs.current[3] = element}></canvas>
                    <button onClick={(e) => handleDelete(3, e)} className="removeImageButton">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="100" height="100" fill="#D70040" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="20" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="20" />
                        </svg>
                    </button>
                </div>
            </div>
            <input multiple id="fileInput" className="hiddenImageInput" type="file" onChange={handleFileInput}/>
            <button className="fileInputButton" onClick={handleClick}>
                <svg className="uploadIcon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.22 20.75H5.78C5.43322 20.7359 5.09262 20.6535 4.77771 20.5075C4.4628 20.3616 4.17975 20.155 3.94476 19.8996C3.70977 19.6442 3.52745 19.3449 3.40824 19.019C3.28903 18.693 3.23525 18.3468 3.25 18V15C3.25 14.8011 3.32902 14.6103 3.46967 14.4697C3.61033 14.329 3.80109 14.25 4 14.25C4.19892 14.25 4.38968 14.329 4.53033 14.4697C4.67099 14.6103 4.75 14.8011 4.75 15V18C4.72419 18.2969 4.81365 18.5924 4.99984 18.8251C5.18602 19.0579 5.45465 19.21 5.75 19.25H18.22C18.5154 19.21 18.784 19.0579 18.9702 18.8251C19.1564 18.5924 19.2458 18.2969 19.22 18V15C19.22 14.8011 19.299 14.6103 19.4397 14.4697C19.5803 14.329 19.7711 14.25 19.97 14.25C20.1689 14.25 20.3597 14.329 20.5003 14.4697C20.641 14.6103 20.72 14.8011 20.72 15V18C20.75 18.6954 20.5041 19.3744 20.0359 19.8894C19.5677 20.4045 18.9151 20.7137 18.22 20.75Z" fill="#000000"/>
                    <path d="M16 8.74995C15.9015 8.75042 15.8038 8.7312 15.7128 8.69342C15.6218 8.65564 15.5392 8.60006 15.47 8.52995L12 5.05995L8.53 8.52995C8.38782 8.66243 8.19978 8.73455 8.00548 8.73113C7.81118 8.7277 7.62579 8.64898 7.48838 8.51157C7.35096 8.37416 7.27225 8.18877 7.26882 7.99447C7.2654 7.80017 7.33752 7.61213 7.47 7.46995L11.47 3.46995C11.6106 3.3295 11.8012 3.25061 12 3.25061C12.1987 3.25061 12.3894 3.3295 12.53 3.46995L16.53 7.46995C16.6705 7.61058 16.7493 7.8012 16.7493 7.99995C16.7493 8.1987 16.6705 8.38932 16.53 8.52995C16.4608 8.60006 16.3782 8.65564 16.2872 8.69342C16.1962 8.7312 16.0985 8.75042 16 8.74995Z" fill="#000000"/>
                    <path d="M12 15.75C11.8019 15.7474 11.6126 15.6676 11.4725 15.5275C11.3324 15.3874 11.2526 15.1981 11.25 15V4C11.25 3.80109 11.329 3.61032 11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5303 3.46967C12.671 3.61032 12.75 3.80109 12.75 4V15C12.7474 15.1981 12.6676 15.3874 12.5275 15.5275C12.3874 15.6676 12.1981 15.7474 12 15.75Z" fill="#000000"/>
                </svg>
            </button>
        </div>
    )
}

export default ReviewImageInput