import React from 'react'
import styled from 'styled-components'
import { PageHero} from '../components'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/user_context'
import { useCartContext } from '../context/cart_context'
// extra imports
// import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const {myUser} = useUserContext();
  let n = ''
  if(myUser){
    const {name,nickname} = myUser;
    if(name){
      n = name;
    }
    if(nickname){
      n = nickname;
    }
  }
  const {clearCart} = useCartContext();
  
  

  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        <div className='section-center section'>
          <h2>Thanks For Shopping {`${myUser ? n : ''}`}</h2>
          <hr/>
          <br/>
          
          <Link to='/products' className='btn' onClick={clearCart}>
            Clear Cart ? 
          </Link>
        </div>
        
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div``
export default CheckoutPage
