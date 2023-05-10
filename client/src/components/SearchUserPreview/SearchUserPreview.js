import "./SearchUserPreview.css"

import { Link } from "react-router-dom"


function SearchUserPreview({ user }) {


  return (


     <div className="searchPreviewDiv">
            {user.map(users => {
              return(
                <Link className="previewLink" to={`/member/${users._id}`}>
                  <div key={users._id} className="previewDiv">
                    <div className="previewImageDiv">
                      {/* <img src={product.img[0]} alt="" className="previewImage"/> */}
                    </div>
                    <div className="previewTitleDiv">
                      {users.name}
                    </div>
                    {/* <div className="previewDescriptionDiv">
                      {product.description}
                    </div> */}
                  </div>
                </Link>
              )
            })}
          </div>
        

  )
}

export default SearchUserPreview