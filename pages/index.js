import React from 'react';

import {client} from '../lib/client'


import HeroBanner from '@/components/HeroBanner';
import Product from '@/components/Product';
import { FooterBanner } from '@/components';
// import {Product, FooterBanner, HeroBanner} from '../components/index'


export const getServerSideProps = async () => {
  const productQuery= '*[_type == "product"]';
  const productData = await client.fetch(productQuery);

  const bannerQuery= '*[_type == "banner"]';
  const bannerData= await client.fetch(bannerQuery)

  return {
    props: {productData, bannerData}
  }
}

const Home = ({productData, bannerData}) => {

  return (
    <>
     
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
        {console.log(productData)}
        <div className="products-heading">
          <h2>Best </h2>
          <p>Speakers of many variational factors</p>
        </div>


        <div className="products-container">
          {productData?.map((productDatum) => 
            <Product key={productDatum.id} product={productDatum}/>            
            )}


            
          {/* create a useEffect and  */}

        </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
  
}




export default Home