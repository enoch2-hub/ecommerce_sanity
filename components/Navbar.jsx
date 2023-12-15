import React from 'react';
import {AiOutlineShopping} from 'react-icons/ai';
import {MdOutlineShoppingCart} from 'react-icons/md';
import Link from 'next/link';
import Cart from './Cart';
import { useStateContext } from '@/context/StateContext';

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <MdOutlineShoppingCart fontSize={60} color='red'/>
          Flippy Shop
        </Link>
      </p>

      
      <button type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping fontSize={60}/>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar