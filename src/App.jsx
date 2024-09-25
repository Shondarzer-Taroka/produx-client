
import { useSelector } from 'react-redux'
import './App.css'
import PostProduct from './Components/PostProduct/PostProduct'
import ProductsView from './Components/ProductsView/ProductsView'


function App() {
//  let {products}=useSelector(state=> state.products)

  return (
    <>
   
    {/* <h1> total product:{products}</h1> */}
     <PostProduct/>
     <ProductsView/>
    </>
  )
}

export default App
