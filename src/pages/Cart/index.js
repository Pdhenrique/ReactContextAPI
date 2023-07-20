import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Container, GoBack, TotalContainer, PaymentContainer} from './styles';

import { useCartContext } from 'common/context/Cart';
import { PaymentContext, usePaymentContext } from 'common/context/payMethod';

import Product from 'components/Product';


function Cart() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart } = useCartContext()
  const { payMethods, paymentMethod, changePayMethod} = usePaymentContext(PaymentContext)
  const history = useHistory()

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
            <h2>Total in Cart: </h2>
            <span>R$ </span>
          </div>
          <div>
            <h2> Balance: </h2>
            <span> R$ </span>
          </div>
          <div>
            <h2> Total balance: </h2>
            <span> R$ </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
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