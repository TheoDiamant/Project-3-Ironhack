import "./SearchPreview.css"

function SearchPreview({ products }) {
  return (
    <div className="searchPreviewDiv">
      {products.map(product => {
        return(
          <div className="previewDiv">{product.title}</div>
        )
      })}
    </div>
  )
}

export default SearchPreview