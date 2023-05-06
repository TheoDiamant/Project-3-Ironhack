import "./ProductsTab.css"

import ProfileProductCard from "../ProfileProductCard/ProfileProductCard.jsx"

function ProductsTab({products}) {

    return(
        <>
                {products
                
                ? 
                
                <div className="productsTabDiv">
                    {products.map(product => {
                        return(
                            <ProfileProductCard product={product}/>
                        )
                    })}
                </div>

                :

                <div className="noProductsDiv">
                    <img src="https://cdn-icons-png.flaticon.com/512/864/864605.png" alt="" />
                    <p>This member has no products for sale</p>
                </div>    
                    
                }
        </>
    )
}

export default ProductsTab