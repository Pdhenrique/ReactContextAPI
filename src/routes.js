import Cart from 'pages/Cart'
import Fair from 'pages/Fair'
import Login from 'pages/Login'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { UserProvider } from 'common/context/User'
import { CartProvider } from 'common/context/Cart'
import { PaymentProvider } from 'common/context/payMethod'

function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <UserProvider>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <CartProvider>
                    <PaymentProvider>
                             <Route path="/Fair">
                                <Fair />
                            </Route>
                            <Route path="/Cart">
                                <Cart />
                            </Route>
                       </PaymentProvider>
                    </CartProvider>
                </UserProvider>
            </Switch>
        </BrowserRouter>

    )
}

export default Router