import React from "react";

function FacultyDetail({ data }) {
  return (
    <div className="flex w-full justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-black/90 p-4 md:p-7 border-1 border-l-4 border-r-4 rounded-2xl">
        {/* Heading */}
        <div className="flex justify-center text-xl md:text-2xl font-bold font-serif mb-4">
          <h1 className="border-b-2 border-t-1 p-1 bg-slate-900 w-fit px-6 rounded-2xl">
            Faculty Detail
          </h1>
        </div>

        {/* Faculty Details */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {/* Left Section */}
            <div className="text-sm md:text-lg font-mono w-full">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="p-2">
                    <td className="p-2">
                      <h2>Faculty Name</h2>
                    </td>
                    <td className="p-2">
                      <h2>:</h2>
                    </td>
                    <td className="p-2">
                      <h2>{data.facultyName}</h2>
                    </td>
                  </tr>
                  <tr className="p-2">
                    <td className="p-2">
                      <h2>Profession</h2>
                    </td>
                    <td className="p-2">
                      <h2>:</h2>
                    </td>
                    <td className="p-2">
                      <h2>{data.facultyProfession}</h2>
                    </td>
                  </tr>
                  <tr className="p-2">
                    <td className="p-2">
                      <h2>Phone No.</h2>
                    </td>
                    <td className="p-2">
                      <h2>:</h2>
                    </td>
                    <td className="p-2">
                      <h2>{data.facultyMobile}</h2>
                    </td>
                  </tr>
                  <tr className="p-2">
                    <td className="p-2">
                      <h2>Email</h2>
                    </td>
                    <td className="p-2">
                      <h2>:</h2>
                    </td>
                    <td className="p-2">
                      <h2>{data.facultyEmail}</h2>
                    </td>
                  </tr>
                  <tr className="p-2">
                    <td className="p-2">
                      <h2>City</h2>
                    </td>
                    <td className="p-2">
                      <h2>:</h2>
                    </td>
                    <td className="p-2">
                      <h2>{data.facultyCity}</h2>
                    </td>
                  </tr>
                  <tr className="p-2">
                    <td className="p-2">
                      <h2>Join Date</h2>
                    </td>
                    <td className="p-2">
                      <h2>:</h2>
                    </td>
                    <td className="p-2">
                      {data?.createdAt ? (
                        <h2>{data.createdAt.split("T")[0]}</h2>
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center items-center">
              <img
                src={`http://localhost:8585/faculty/${data.facultyProfile}`}
                alt="Faculty Profile"
                className="h-32 w-32 md:h-45 md:w-45 rounded-md"
              />
              <h1 className="font-semibold p-1">Faculty Profile</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDetail;