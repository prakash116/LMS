import React, { useState } from 'react'
import Weather from '../Components/Weather'
import AddCourse from '../Components/AddCourse'
import GetAllCourse from '../Components/GetAllCourse'

function FacultyDasbord() {
  let time;
const currentHour = new Date().getHours();

switch (true) {
  case currentHour >= 5 && currentHour < 12:
    time = "Good Morning";
    break;
  case currentHour >= 12 && currentHour < 18:
    time = "Good Afternoon";
    break;
  default:
    time = "Good Evening";
    break;
}
  const [show, setShow ] = useState({visibility: "hidden" })
  return (
    <>
      <div className='w-full h-full bg-indigo-900 flex'>
        <div className='w-1/4 border-r-2 p-1'>
            <div>
                <Weather/>
            </div>
        </div>
        <div className='w-full'>
        <div className='w-full bg-sky-950/80 p-3 flex items-center justify-between container'>
          <h1 className="text-lg font-bold text-white">Welcome Sir/Ma'am</h1>
          <h1 className="text-lg font-bold text-white">{time}</h1>
          <button onClick={() => setShow({ visibility: "visible" })}
            type="button"
            className="flex items-center justify-center w-fit px-5 py-2 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
            >Add New Course</button>
        </div>
        <GetAllCourse/>
        </div>
      </div>
      <div className='w-full h-full bg-slate-900/60 top-0 absolute flex justify-around items-center'
      style={show}
      >
          <AddCourse btn={setShow}/>
      </div>

    </>
  )
}

export default FacultyDasbord
