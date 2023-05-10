import { Link } from "react-router-dom"
import "./SearchPreview.css"

function SearchPreview({ products }) {
  
  return (


    <div className="searchPreviewDiv">
      {products.map(product => {
        return(
          <Link className="previewLink" to={`/product/${product._id}`}>
            <div key={product._id} className="previewDiv">
              <div className="previewImageDiv">
                <img src={product.img[0]} alt="" className="previewImage"/>
              </div>
              <div className="previewTitleDiv">
                {product.title}
              </div>
              <div className="previewDescriptionDiv">
                {product.description}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SearchPreview