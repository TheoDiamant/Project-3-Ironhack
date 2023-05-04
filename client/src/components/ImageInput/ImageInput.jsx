import "./ImageInput.css"

function ImageInput({handleImages}) {

    function handleClick(e) {
        e.preventDefault()
        const fileInput = document.getElementById("fileInput")
        fileInput.click()
    }

    return(
        <div className="imageInputDiv">
            <input multiple id="fileInput" className="hiddenImageInput" type="file" onChange={handleImages}/>
            <button onClick={handleClick}><img src="https://static.vecteezy.com/system/resources/previews/000/421/494/original/upload-icon-vector-illustration.jpg" alt="" /></button>
        </div>
    )
}

export default ImageInput