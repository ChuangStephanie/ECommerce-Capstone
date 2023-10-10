import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { fetchSingleProduct } from '../API'
import Ghost from '../assets/ghost.png'
import { Box } from '@mui/material'

export default function Details() {
  let { id } = useParams()
  const [product, setProduct] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getSingleProduct() {
      const productData = await fetchSingleProduct(id)
      if (productData) {
        console.log('productdata', productData.product)
        setProduct(productData.product)
      } else {
        setError(console.error('No product fetched'))
      }
    }
    getSingleProduct()
  }, [id])

  return (
    <Box className="container-1">
      <Box className="productdetail" sx={{marginTop: '20px'}}>
        {product && (
          <Box>
            <img src={Ghost} alt={product.name} />
            <h2>{product.name}</h2>
            <h4>{product.price}</h4>
            <p>{product.description}</p>
          </Box>
        )}
        <form action="/create-checkout-session" method="POST">
          <button type="submit">Checkout</button>
        </form>
      </Box>
    </Box>
  )
}
