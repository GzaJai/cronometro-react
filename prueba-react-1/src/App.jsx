import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import formatNumbers from './utils/clock'
import './App.css'

function App() {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(()=> {

    if (!running) return

    const secondCounter = setInterval(()=>{
      setSeconds((prev) => prev + 1)
    }, 100)
    
    return () => clearInterval(secondCounter)

  }, [running])

  useEffect(() => {
    
    if(seconds == 60) {
      setMinutes((prev) => prev + 1)
      setSeconds(0)
    }
  }, [seconds])


  return (
    <>
      <h1>Cronómetro</h1>
      <h2></h2>
      <div className="card">
        <div>
          <h1>{formatNumbers(minutes)} : {formatNumbers(seconds)}</h1>
        </div>
        <div>
          <button className='logo' onClick={()=>setRunning(true)}>
            Iniciar cronometro
          </button>
          <button className='logo stop-btn' onClick={()=>setRunning(false)}>
            Detener cronometro
          </button>
          <button className='logo reset-btn' onClick={()=>{setMinutes(0);setSeconds(0)}}>
            Reiniciar cronometro  
          </button>
          <div>
            <button className='logo reset-btn' onClick={()=>{addLap()}}>
              Marcar vuelta
            </button>
            <button className='logo reset-btn' onClick={()=>{setLaps([])}}>
              Reiniciar Vueltas
            </button>
          </div>
          
        </div>
        <div>
          <h2>
            Vueltas
          </h2>
          <ul>
            {
              laps.length > 0  &&
              laps.map((lap, index) => (
                <li key={index}>
                  {lap}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )

  function addLap(){
    const lap = `Vuelta ${laps.length + 1}: ${formatNumbers(minutes)} : ${formatNumbers(seconds)}`
    console.log(laps);
    
    setLaps([...laps, lap]);
  }

}

export default App
