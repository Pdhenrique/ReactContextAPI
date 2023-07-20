import Cart from 'pages/Cart'
import Fair from 'pages/Fair'
import Login from 'pages/Login'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { UserProvider } from 'common/context/User'
import { CartProvider } from 'common/context/Cart'

function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <UserProvider>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <CartProvider>
                        <Route path="/Fair">
                            <Fair />
                        </Route>
                    </CartProvider>
                </UserProvider>
                <Route path="/Cart">
                    <Cart />
                </Route>
            </Switch>
        </BrowserRouter>

    )
}

export default Router