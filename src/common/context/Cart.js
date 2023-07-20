import { createContext, useContext, useEffect, useState } from 'react'


export const CartContext = createContext()

CartContext.displayName = 'Cart'

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [ quantityItems, setQuantityItems] = useState(0)

    return (
        <CartContext.Provider value={{ cart, setCart, quantityItems, setQuantityItems }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const { cart, setCart, quantityItems, setQuantityItems } = useContext(CartContext)

    function changeQuantity(id, quantity){
        return cart.map(cartItem => {
            if (cartItem.id === id) cartItem.quantity += quantity
            return cartItem
        })
}

    function addItem(newItem) {
        const haveThisItem = cart.some(cartItem => cartItem.id === newItem.id)
        if (!haveThisItem) {
            newItem.quantity = 1
            return setCart(lastCart => [...lastCart, newItem])
        }
        setCart(changeQuantity(newItem.id, 1))

    }

    function removeItem(id) {
        const item = cart.find(cartItem => cartItem.id === id)
        const lastItem = item.quantity === 1
        if(lastItem){
            return setCart(lastCart => lastCart.filter(cartItem => cartItem.id !== id))
        }
        setCart(changeQuantity(id, -1))
    }

    useEffect(() => {
        const newQuantity = cart.reduce((counter, item) => counter + item.quantity, 0)
        setQuantityItems(newQuantity)
    }, [cart, setQuantityItems])

    return {
        cart, setCart, addItem, removeItem, quantityItems, setQuantityItems
    }
}
