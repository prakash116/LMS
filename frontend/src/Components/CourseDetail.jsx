import React from "react";

function CourseDetail({ data }) {
  return (
    <div className="flex w-full justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-black/90 p-4 md:p-7 border-1 border-l-4 border-r-4 rounded-2xl">
        {/* Heading */}
        <div className="flex justify-center text-xl md:text-2xl font-bold font-serif mb-4">
          <h1 className="border-b-2 border-t-1 p-1 bg-slate-900 w-fit px-6 rounded-2xl">
            Course Detail
          </h1>
        </div>

        {/* Course Details */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {/* Left Section */}
            <div className="grid grid-cols-3 gap-2 text-sm md:text-l font-mono border-r-0 md:border-r-1 w-full">
              <h2>Course Title</h2>
              <h2>:</h2>
              <h2>{data.courseTitle}</h2>
              <h2>Course Content</h2>
              <h2>:</h2>
              <h2>{data.courseContent}</h2>
              <h2>Faculty Name</h2>
              <h2>:</h2>
              <h2>{data.courseAuthor}</h2>
              <h2>Course Add Date</h2>
              <h2>:</h2>
              {data && data.createdAt ? (
                <>
                  <h2>{data?.createdAt.split("T")[0]}</h2>
                  <h2>Last Update</h2>
                  <h2>:</h2>
                  <h2>{data?.createdAt.split("T")[0]}</h2>
                </>
              ) : (
                <></>
              )}
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center items-center">
              <img
                src={`http://localhost:8585/course/${data.coursePdf}`}
                alt="Course Thumbnail"
                className="h-32 w-48 md:h-40 md:w-60"
              />
              <h1 className="font-semibold p-1">Thumbnail</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;