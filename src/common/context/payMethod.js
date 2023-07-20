import { createContext, useContext, useState } from "react";


export const PaymentContext = createContext()

PaymentContext.displayName = "Payment"


export const PaymentProvider = ({children}) => {
    
    const payMethods = [
        {
            name: "ticket",
            fees: 1, 
            id: 1
        },
        {
            name: 'credit card',
            fees: 1.3,
            id: 2
        },
        {
            name: 'PIX',
            fees: 1,
            id: 3
        },
        {
            name: 'installment plan',
            fees: 1.5,
            id: 4
        }
    ]
    
    const [paymentMethod, setPaymentMethod] = useState(payMethods[0])

    return(
        <PaymentContext.Provider value={{
            payMethods,
            paymentMethod,
            setPaymentMethod
        }}>
            {children}
        </PaymentContext.Provider>
    )
}

export const usePaymentContext = () => {
    const { 
        payMethods, 
        paymentMethod, 
        setPaymentMethod 
    } = useContext(PaymentContext)

    function changePayMethod(id) {
        const currentPay = payMethods.find( payment => payment.id === id)

        setPaymentMethod(currentPay)
    }

    return{
        payMethods,
        paymentMethod,
        changePayMethod
    }

}