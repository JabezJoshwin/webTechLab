import { useState } from 'react'
import './App.css'

function App() {
  const [height, setHeight] = useState(0.0)
  const [weight, setWeight] = useState(0.0)

  const [bmi, setBmi] = useState(null)

  const [remarks, setRemarks] = useState(null)
  const [color, setColor] = useState()

  const calc = () => {
      let bmicalc = parseFloat(weight) / (parseFloat(height) / 100) ** 2
      setBmi(bmicalc.toFixed(2))

      if (bmicalc < 18.5){
        setRemarks("You're Underweight!")
        setColor("cornflowerblue")
      } else if (bmicalc < 25) {
        setRemarks("You're Normal!")
        setColor("green")
      } else {
        setRemarks("You're Overweight!")
        setColor("crimson")
      }
  }

  return (
    <div className='container w-50 m-auto mt-5 p-5'>
      <div className="card p-5 ">
        <div className="card-body">
          <h2 className=' text-center text-primary'>BMI Calulator</h2>
        </div>
        <div className='mb-3'>
          <label htmlFor="height" className='form-label'>Enter your Height: </label>
          <input type="number" name="height" id="height" className='form-control' placeholder='In centimteres (cm)' value={height} onChange={(e) => setHeight(e.target.value)} min={10} required/>
        </div>
        <div className='mb-3'>
          <label htmlFor="height" className='form-label'>Enter your Weight: </label>
          <input type="number" name="weight" id="weight" className='form-control' placeholder='In Kilograms (Kg)' value={weight} onChange={(e) => setWeight(e.target.value)} min={10} required/>
        </div>
        <div className="mb-3 text-center">
          <button className='btn btn-primary' onClick={calc}>Calculate BMI</button>
        </div>
        <hr />
        <div className="row fw-bold">
          <div className="col-6">BMI</div>
          <div className="col-6 text-end">{bmi != null && <span> {bmi} </span> }</div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h4 style={{color: color}}>{remarks}</h4>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default App
