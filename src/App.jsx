
import { useSelector } from 'react-redux'
import './App.css'
import PostProduct from './Components/PostProduct/PostProduct'
import ProductsViewFromRTKd from './RTK/ProductsView/ProductsViewFromRTK'
import ProductsView from './Components/ProductsView/ProductsView'
import PostProductRKT from './RTK/PostProductRKT/PostProductRKT'


function App() {
  //  let {products}=useSelector(state=> state.products)

  return (
    <>

      {/* <h1> total product:{products}</h1> */}
      <div>
       
        {/* <PostProduct /> */}
        {/* <ProductsView /> */}
      </div>
      <h2>Using RTK Query</h2>
      {/* use RTK query  */}
      <PostProductRKT/>
      <ProductsViewFromRTKd />

    </>
  )
}

export default App
