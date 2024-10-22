import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef(null)
 
 
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "?=^@#$&*%!~"
  
  
for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setPassword(pass)
}, [length, charAllowed, numberAllowed, setPassword])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 8);
    window.navigator.clipboard.writeText(password)
  },[password])
   useEffect(() => {
    passwordGenerator()
  } ,[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div className='container-sm  shadow-sm p-3 mb-5  rounded px-4 my-8 text-primary bg-success'>
         <h1 className='text-white text-center '>Password Generator</h1>

      <div className='d-flex shadow-sm rounded mb-4 overflow-hidden'>
        <input
            type='text'
            value={password}
            className='outline-none w-100 py-2 px-3'
            placeholder='password'
            readOnly
            ref={ passwordRef} />
        <button onClick={ copyPasswordToClipboard} className='outline-none border-0 bg-primary text-white px-3 py-1'>Copy</button>
      </div>
        <div  className='d-flex fs-6 text gap-3'>
        <div className='d-flex center gap-2'>
          <input
          type='range' 
          min={8}
          max={100}
          value={length}
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <label className='text-warning'>Length : {length}</label>
        </div>
        <div className='d-flex center gap-1'>
<input
type='checkbox'
defaultChecked={numberAllowed}
id="numberInput"
onChange={()=>{
  setNumberAllowed((prev)=> !prev);
}}/>
<label htmlFor='numberInput' className='text-warning'>Numbers</label>

        </div>

  <div className='d-flex center gap-1'>
<input
type='checkbox'
defaultChecked={charAllowed}
id="charInput"
onChange={()=>{
  setCharAllowed((prev)=> !prev);
}}/>
<label htmlFor='charInput' className='text-warning'>Charachters</label>

        </div>      
      </div>
    </div>
     
    </>
  )
}

export default App
