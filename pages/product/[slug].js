/* eslint-disable @next/next/no-img-element */

import React, {useState} from 'react';
import Image from 'next/image';
import {client, urlFor} from '../../lib/client';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import {Product} from '../../components';
import { useStateContext } from '@/context/StateContext';



const ProductDetails = ({product, products}) => {
  const {image, name, details, price} = product;
  const [index, setIndex] = useState(0);
  const {qty, incQty, decQty, onAdd, setShowCart} = useStateContext();
  
  const handlebuynow = () =>{
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
          <div>
              <div className="image-container">
                  <img 
                    src={urlFor(image && image[index])}
                    className='product-detail-image'
                    alt='product-detail-image'
                    />
              </div>
              <div className="small-images-container">
                {image?.map((item,i) => (
                  <img
                    key={i}
                    src={urlFor(item)}
                    className={i === index ? 'small-image selected-image'
                        : 'small-image'}
                    alt='small-image'
                    onMouseEnter={()=> setIndex(i)}
                    />
                ))}
              </div>
          </div>

          <div className="product-detail-desc">
            <h1>{name}</h1>
            
            <div className="reviews">
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
              <p>(20)</p>
            </div>
            
            <h4>Details</h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className='minus' onClick={decQty}>
                  <AiOutlineMinus/>
                </span>
                <span className="num">
                  {qty}
                </span>
                <span className='plus' onClick={incQty}>
                 <AiOutlinePlus/>
                </span>
              </p>
            </div>

            <div className="buttons">
                <button className="add-to-cart"
                  onClick={() => {onAdd(product, qty)}}
                >
                Add to Cart
              </button>
              <button 
                className="buy-now"
                onClick={() => handlebuynow()}
                >
                Buy Now
              </button>
            </div>
            
          </div>
      </div>

      
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} 
              product={item}/>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}



export default ProductDetails



export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query)

  const paths = products.map((products) => ({
    params: {
      slug: products.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}



export const getStaticProps = async ({params: {slug}}) => {
  const query= `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  
  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: {product, products}
  }
}