import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Container, GoBack, TotalContainer, PaymentContainer} from './styles';

import { userContext } from 'common/context/User';
import { useCartContext } from 'common/context/Cart';
import { PaymentContext, usePaymentContext } from 'common/context/payMethod';

import Product from 'components/Product';


function Cart() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart, totalValue, makePurchase } = useCartContext()
  const { balance = 0 } = useContext(userContext)
  const { payMethods, paymentMethod, changePayMethod} = usePaymentContext(PaymentContext)
  const history = useHistory()
  const total = useMemo(() => balance - totalValue, [balance, totalValue])

  return (
    <Container>
      <GoBack onClick={() => history.goBack()} />
      <h2>
        Cart
      </h2>
      {cart.map(item => (
        <Product
          {...item}
          key={item.id}
        />
      ))}
      <PaymentContainer>
        <InputLabel> Payment method </InputLabel>
        <Select
          value={paymentMethod.id}
          onChange={(event) => changePayMethod(event.target.value) }
        >
          {payMethods.map(payment => (
            <MenuItem key={payment.id} value={payment.id}>
              {payment.name}
            </MenuItem>

          ))}
        </Select>
      </PaymentContainer>
      <TotalContainer>
          <div>
            <h2>Total in Cart:</h2>
            <span>R$ {totalValue.toFixed(2)} </span>
          </div>
          <div>
            <h2> Balance: </h2>
            <span> R$ {Number(balance).toFixed(2)} </span>
          </div>
          <div>
            <h2> Total balance: </h2>
            <span> R$ {total.toFixed(2)} </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          makePurchase()
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={total < 0 || cart.length === 0}
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Purchase made successfully!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Cart;