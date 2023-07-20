import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment
} from '@material-ui/core';

import { useHistory } from 'react-router-dom'
import { userContext } from 'common/context/User'
import { useContext } from 'react';

function Login() {

  const history = useHistory()
  const { name, setName, balance, setBalance } = useContext(userContext)
  return (
    <Container>
      <Titulo>
      Enter your name
      </Titulo>
      <InputContainer>
        <InputLabel>
          Name
        </InputLabel>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Balance
        </InputLabel>
        <Input
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          type="number"
          startAdornment={
            <InputAdornment position="start">
              R$
            </InputAdornment>
          }
        />
      </InputContainer>
      <Button
        onClick={() => history.push('/fair')}
        disabled={name.length < 4}
        variant="contained"
        color="primary"
      >
        Go forward
      </Button>
    </Container>
  )
};

export default Login;