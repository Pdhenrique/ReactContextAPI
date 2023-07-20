import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCartContext } from 'common/context/Cart'

function Product({
  name,
  photo,
  id,
  value,
  unit
}) {

  const { cart, addItem, removeItem } = useCartContext()

  const itensOnCart = cart.find(cartItem => cartItem.id === id)

  
  return (
    <Container>
      <div>
        <img
          src={`/assets/${photo}.png`}
          alt={`${name}`}
        />
        <p>
          {name} - R$ {value?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton color="secondary" disabled={!itensOnCart} onClick={() => removeItem(id)}>
          <RemoveIcon />
        </IconButton>
        {itensOnCart?.quantity || 0} 
        <IconButton color="primary" onClick={() => addItem({ name, photo, id, value })}>
          <AddIcon />
        </IconButton>
      </div>
    </Container >
  )
}

export default memo(Product)