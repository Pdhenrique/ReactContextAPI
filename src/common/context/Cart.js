import { createContext, useContext, useEffect, useState } from 'react'
import { usePaymentContext } from './payMethod'
import { userContext } from './User'


export const CartContext = createContext()

CartContext.displayName = 'Cart'

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [quantityItems, setQuantityItems] = useState(0)
    const [totalValue, setTotalValue] = useState(0)

    return (
        <CartContext.Provider value={
            {
                cart,
                setCart,
                quantityItems,
                setQuantityItems,
                totalValue,
                setTotalValue
            }
        }>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const { 
        cart, 
        setCart, 
        quantityItems, 
        setQuantityItems, 
        totalValue,
        setTotalValue
    } = useContext(CartContext)

    const { paymentMethod } =  usePaymentContext()
    const { setBalance } = useContext(userContext)

    function changeQuantity(id, quantity) {
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
        if (lastItem) {
            return setCart(lastCart => lastCart.filter(cartItem => cartItem.id !== id))
        }
        setCart(changeQuantity(id, -1))
    }

    function makePurchase() {
        setCart([])
        setBalance((atualBalance) => atualBalance - totalValue )
    }

    useEffect(() => {
        const { newQuantity, newTotal } = cart.reduce((counter, item) => ({
            newQuantity: counter.newQuantity + item.quantity,
            newTotal: counter.newTotal + (item.value * item.quantity)

        }), { newQuantity: 0, newTotal: 0 })
        setQuantityItems(newQuantity)
        setTotalValue(newTotal * paymentMethod.fees)
    }, [cart, setQuantityItems, setTotalValue, paymentMethod])

    return {
        cart, 
        setCart, 
        addItem, 
        removeItem, 
        quantityItems, 
        setQuantityItems, 
        totalValue, 
        makePurchase
    }
}
