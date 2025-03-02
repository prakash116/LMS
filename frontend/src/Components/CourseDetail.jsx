import React from 'react'

function CourseDetail({data}) {
  return (
    <div className='flex w-full justify-center items-center'>
        <div className='w-[70vw] bg-black/90 p-7 border-1 border-l-4 border-r-4 rounded-2xl'>
          <div className='flex justify-center text-2xl font-bold font-serif mb-4'>
            <h1 className='border-b-2 border-t-1 p-1 bg-slate-900 w-fit px-6 rounded-2xl'>Course Detail</h1>
          </div>
          <div>
            <div className='grid grid-cols-2 p-2'>
                {/* Left */}
                <div className='grid grid-cols-3 border-r-1 text-l font-mono w-[120%]'>
                    <h2>Course Title</h2>
                    <h2>:</h2>
                    <h2>{data.courseTitle}</h2>
                    <h2>Course Contant</h2>
                    <h2>:</h2>
                    <h2>{data.courseContent}</h2>
                    <h2>Faculty Name</h2>
                    <h2>:</h2>
                    <h2>{data.courseAuthor}</h2>
                    <h2>Course Add Data</h2>
                    <h2>:</h2>
                    {data && data.createdAt ? 
                    <>
                        <h2>{data?.createdAt.split("T")[0]}</h2>
                    <h2>Last Update</h2>
                    <h2>:</h2>
                    <h2>{data?.createdAt.split("T")[0]}</h2>
                    </> : <></>}
                </div>
                {/* Rigth */}
                <div className='ml-25 flex flex-col justify-center items-center'>
                    <img src={`http://localhost:8585/course/${data.coursePdf}`} type="" className='h-40 w-60' />
                    <h1 className='font-semibold p-1'>Thumbnail</h1>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CourseDetail
