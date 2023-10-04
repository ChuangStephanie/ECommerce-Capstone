import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';

const OnSale = () => {
  const [saleItems, setSaleItems] = useState([])
  const {
    products
  } = useContext(UserContext);
  useEffect(() => {
    console.log(products)
  const saleProducts = products.filter(product => product.onsale == "true")
  setSaleItems(saleProducts)
  },[])
  return (
    <div><h1>OnSale</h1>
    {saleItems.length > 0 && saleItems.map((saleItem) => (
      <div>
      <h3>
        {saleItem.name}
      </h3>
      <p>
        {saleItem.description}
      </p>
      </div>
    ))}
    </div>
  )
}

export default OnSale