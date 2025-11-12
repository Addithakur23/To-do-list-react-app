import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todosString=localStorage.getItem("todos")
    console.log(todosString)
    if(todosString){
      let todos=JSON.parse(localStorage.getItem("todos"))
        settodos(todos)
    }
  }, [])
  
 
    const SaveToLS=() => {
      localStorage.setItem("todos",JSON.stringify(todos))

    }
    
  const handleEdit=(e,id)=>{
     let index=todos.findIndex(item=>{
      return item.id===id
    })
    
    settodo(todos[index].todo)
      let t=todos.filter(item=>{
     return item.id!==id
    })
    settodos(t)
   SaveToLS()

  }
  

    const handleAdd=()=>{
      console.log(`the todo is ${todo}`)
     settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    console.log(todos)
    settodo("")
    SaveToLS()
     
    
  }

     const handleDelete=(e,id)=>{
     let newtodos=todos.filter(item=>{
     return item.id!==id
    })
    settodos(newtodos)
    SaveToLS()
   
  
  }

     const handleChange=(e)=>{
    settodo(e.target.value)
     console.log(todo)
  }

    const handleCheckbox=(e)=>{
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos)
   SaveToLS()

   
  }
  
  const toggleFinished=(e)=>{
   setshowFinished(!showFinished)


  }
  return (
    <>
    <Navbar/>
    
       <div className="bg-violet-200 p-5 py-5 rounded-xl  md:mx-auto md:container min-h-[80vh] md:w-[38%]  w-full">
       <h1 className='font-bold text-3xl text-center mb-3'>iTask - Manage your todos at one place</h1>
          <h2 className='text-2xl font-bold mb-2'>Add a todo</h2>
          
                <div className="text flex  items-center">
                  <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full py-1 px-3' />

                <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-700 hover:bg-violet-900 p-4 py-2 mx-2 rounded-full text-white font-bold text-sm disabled:bg-violet-600 my-2  cursor-pointer'>
                  Save
                </button>
                </div>
                <input type="checkbox" name="Show Finished" id="Show Finished" checked={showFinished} onChange={toggleFinished} className='mr-1' />Show Finished
                <div className='h-[1px] bg-black opacity-15 my-2 w-[85%] mx-auto'></div>
            
            <h2 className='text-2xl font-bold mt-2'>
            Your Todos
            </h2>
            <div className='todos my-4'>    
              {todos.length===0 && <div className='mx-4'>No todos to display</div>
              }        
            {todos.map(item=>{
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-5  w-full mb-3">
          
                <input type="checkbox" name={item.id} id="checkbox" onChange={handleCheckbox} checked={item.isCompleted} className='' />
              <div className="flex justify-between [overflow-wrap:anywhere;] w-full ">
                <div className={item.isCompleted?"line-through":""} >  {item.todo}</div>
                <div className="buttons flex items-center justify-end ">
                  <button onClick={(e)=>{{handleEdit(e,item.id)}}} className='bg-violet-700  hover:bg-violet-900 p-3 py-1 mx-1 rounded-md text-white font-bold text-sm'><FaEdit /></button>
                <button onClick={(e)=>{{handleDelete(e,item.id)}}} className='bg-violet-700 hover:bg-violet-900 p-3 py-1 mx-1 rounded-md text-white font-bold text-sm'><AiFillDelete /></button>
                </div>
                </div>
                
           </div>           
                })}
             </div>              
              </div>
            
    </>
  )
}

export default App

