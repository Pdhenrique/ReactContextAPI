import {
  Container,
  Header,
  List,
} from './styles';
import fair from './fair.json';
import Produto from 'components/Product';
import NavBar from './NavBar';
import {  useContext } from 'react';
import { userContext } from 'common/context/User';


function Fair() {

  const { name, balance } = useContext(userContext)



  return (
    <Container>
      <NavBar />
      <Header>
        <div>
          <h2> Hello {name}!</h2>
          <h3> Balance: R${balance} </h3>
        </div>
        <p>Find the best organic products!</p>
      </Header>
      <List>
        <h2>
          Products:
        </h2>
        {fair.map(produto => (<Produto {...produto} key={produto.id} />))}
      </List>
    </Container>
  )
}

export default Fair;