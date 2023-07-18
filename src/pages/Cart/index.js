import { Button, Snackbar, InputLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { Container, goBack, TotalContainer, PaymentContainer} from './styles';

function Cart() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  return (
    <Container>
      <goBack />
      <h2>
        Cart
      </h2>
      <PaymentContainer>
        <InputLabel> Payment method </InputLabel>
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