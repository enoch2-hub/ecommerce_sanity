import React from 'react';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import { IoTrashBinOutline } from "react-icons/io5";

import { useStateContext } from '@/context/StateContext';
import Link from 'next/link';
import { urlFor } from '@/lib/client';
import getStripe from '@/lib/getStripe';
import toast from 'react-hot-toast';
import axios from 'axios';

const Cart = () => {

  const {totalQuantities, setShowCart, cartItems, decQty, incQty, qty, totalPrice, toggleCartItemQuantity, onRemove} = useStateContext();

  // const handleCheckout = async () => {
    
  //   const stripe = await getStripe();

  //   const response = await fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   });

  //   if(response.statusCode === 500) return;

  //   const data = await response.json();

  //   toast.loading('Redirecting...');

  //   stripe.redirectToCheckout({sessionId: data.id});

  // }


const handleCheckout = async () => {
  const stripe = await getStripe();

  try {
    const response = await axios.post('/api/stripe', cartItems, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 500) return;

    const data = response.data;

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.error(error);
  }
}





  // const handle_checkout = async () => {
  //   const stripe = await getStripe();

  //   const response = fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   })

  //   if(response.statusCode === 500) return;

  //   const data = await response.json();

  //   toast.loading('Redirecting...');

  //   stripe.redirectToCheckout({sessionId: data.id});
  // }

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button 
          type='button' 
          className='cart-heading'
          onClick={() => setShowCart(false)}
          >
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (

          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>Your Cart is empty</h3>
            <Link href="/">
              <button
                className='btn'
                onClick={() => setShowCart(false)}
                >
                  Continue Shopping
              </button> 
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map ((item, index) => (
            <div className="product" key={index._id}>
              <img src={urlFor(item?.image[0])}
                className='cart-product-image'
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                          <AiOutlineMinus/>
                        </span>
                        <span className="num">
                          {item.quantity}
                        </span>
                        <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                          <AiOutlinePlus/>
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item)}
                      className='remove-item'
                    >
                      <IoTrashBinOutline/>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-bottom">
          <div className="total">
            <h3>Subtotal:</h3>
            <h3>{totalPrice}</h3>
          </div>
          <div className="btn-container">
            <button type='button' className='btn' onClick={()=> handleCheckout()}>
              Pay with stripe
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart