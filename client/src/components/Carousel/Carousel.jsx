import "./Carousel.css"

function Carousel({images}) {

    const images = document.getElementsByClassName("carouselImage")

    let activeIndex = 0

    function toggleImage(direction) {
        if(direction === "left") {

        }
        else {
            const nextIndex = activeIndex + 1 < images.length ? activeIndex + 1 : 0

            const currentImage = document.querySelector(``)
        }
    }

    return(
        <div className="carouselDiv">
            <button className="carouselLeft" onClick={() => toggleImage("left")}>Left</button>
            {images.map((image, index) => {
                const status = index === 0 ? "active" : "unknown"
                return(
                    <img className="carouselImage" data-index={index} data-status={status} src={image} alt="" />
                )
            })}
            <button className="carouselRight" onClick={() => toggleImage("right")}>Right</button>
        </div>
    )
}

export default Carousel