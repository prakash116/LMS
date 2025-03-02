import React from "react";
function FacultyDetail({ data }) {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-[70vw] bg-black/90 p-7 border-1 border-l-4 border-r-4 rounded-2xl">
        <div className="flex justify-center text-2xl font-bold font-serif mb-4">
          <h1 className="border-b-2 border-t-1 p-1 bg-slate-900 w-fit px-6 rounded-2xl">
            Faculty Detail
          </h1>
        </div>
        <div>
          <div className="grid grid-cols-2 p-2">
            {/* Left */}
            <div className="border-r-1 text-lg font-mono w-[120%]">
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
            {/* Rigth */}
            <div className="ml-25 flex flex-col justify-center items-center">
              <img
                src={`http://localhost:8585/faculty/${data.facultyProfile}`}
                type=""
                className="h-45 w-45 rounded-md"
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
