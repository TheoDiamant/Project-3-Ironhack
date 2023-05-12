function getCart() {
    const items = localStorage.getItem("cart")
    if(items) {
        return JSON.parse(items)
    }
    return []
}

function addToCart(productId) {
    const items = getCart()
    items.push(productId)
    localStorage.setItem("cart", JSON.stringify(items))
}

function removeFromCart(productId) {
    let items = getCart()
    items = items.filter(id => id !== productId)
    localStorage.setItem("cart", JSON.stringify(items))
}

const cart = {
    getCart,
    addToCart,
    removeFromCart,
}

export default cart