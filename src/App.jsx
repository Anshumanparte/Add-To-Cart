import { useState } from 'react'

import './App.css'
import axios from 'axios'

function App() {
 
  const [check, setcheck] = useState(true)
  const [allData, setAllData] = useState([])
  const [cart, setcart] = useState([])
  const [total, settotal] = useState(0)

  const  clickHandler = async()=>{
    const res = await axios.get("https://fakestoreapi.com/products")
    setAllData(res.data)
    console.log(allData);
    
  }
  
  const addcart = (i)=>{
      const copydata = [...cart,allData[i]]
    setcart(copydata)
    totalprice(copydata)
    
  }
  const remove = (i)=>{
    const newarr = [...cart]
    newarr.splice(i,1)
    setcart(newarr)
    totalprice(newarr)
  }

  const totalprice = (cart)=>{
    const tp = cart.reduce((acc,elem)=>{
      return acc+elem.price
    },0)
    settotal(tp.toFixed(2))
    
  }

  return (
    <div className='p-5'>
      <div className='flex justify-between py-2'>
        <button 
          onClick={clickHandler}
          className='border-2 border-black bg-blue-950 text-white px-8 py-3 rounded-3xl' >
            Get Data
          </button>
          <button
          onClick={()=>{
            setcheck(!check)
          }}
          className=' border-2 border-black bg-blue-950 text-white px-8 py-3 rounded-3xl' 
          >
            Cart</button>

      </div>
          
    <div className='flex relative '>
      
          
          
          <div className='bg-slate-800 flex flex-wrap '>
              {allData.map((elem,idx)=>{
                  return <>
                  <div key={idx} className="p-6 w-80 bg-white rounded-3xl mt-10 ml-10 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                    <img
                      className="h-48 w-48 object-cover mx-auto rounded-lg shadow-md"
                      src={elem.image}
                      alt={elem.category}
                    />
                    <h1 className="text-2xl font-bold mt-6 text-gray-800 text-center">
                      {elem.category}
                    </h1>
                    <p className="text-gray-600 mt-4 text-center">
                      {elem.description.length > 50 ? `${elem.description.slice(0, 50)}...` : elem.description}
                    </p>
                    <h5 className="text-lg font-semibold mt-6 text-green-600 text-center">
                      ${elem.price}
                    </h5>
                    <div className="flex justify-center mt-5">
                      <button 
                      onClick={()=>{
                        addcart(idx)
                      }}
                      className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  </>
                    
                  
              })}

            
          
          </div>

          <div className={(check)?"hidden":'w-3/4 min-h-full md:w-1/3  p-2 bg-gray-300 absolute z-10 top-0 right-0'}>
              {cart.length >0? cart.map((elem,idx)=>{
                
                return<> <div className='p-2'>
                <div className='bg-white w-full p-2 flex justify-between'>
                    <div>
                    <img className='h-24' src={elem.image} alt="" />
                      <h1>{elem.category}</h1>
                      <h1 className=' font-semibold '>${elem.price}</h1>
                    </div>
                    <div>
                      <button 
                      onClick={()=>{
                        remove(idx);
                      }}
                    className='px-5 py-2 bg-red-300 font-bold rounded-3xl'
                    
                    >Remove</button>
                    </div>
                    
                </div>
                
                
                </div></>
              }): (<h1 className='text-3xl font-semibold  text-gray-700'>No items!</h1> )}

              <div className='bg-white'>
                
                <h1 className=' font-semibold p-2 '>Total: ${total}</h1>
              </div>
          </div>


    </div>

    


    </div>
  )
}

export default App
