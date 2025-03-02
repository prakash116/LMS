import React, { useState } from "react";
import Contact from "./Contact";
import emailjs from "@emailjs/browser";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Landing() {
  const [selectedMode, setSelectedMode] = useState(null);
  const { user } = useSelector((state) => state.loginSlice)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handlUser = () => {
    if(user){
      toast.success("Allready registered")
    }
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill all the fields");
      return;
    }

    const serviseId = "service_p52ityf";
    const templateId = "template_j2yiuja";
    const publicKey = "rk3VyQHl2omE-tVMu";

    const templateParams = {
      to_name: "Prakash Mani",
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send(serviseId, templateId, templateParams, publicKey)
      .then((response) => {
        toast.success(`Message sent to ${email}`);
        setName("");
        setEmail("");
        setMessage("");
        return response;
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return (
    <>
      <section className="h-[100vh] flex overflow-hidden justify-between bg-indigo-950 items-center">
        <div className="container flex flex-col p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row gap-5 justify-between">
          <div className="flex items-center w-1/2">
            <img
              src="/Images/Landing.png"
              className="object-contain w-[40vw] -mb-15 -ml-30 absolute"
            />
          </div>
          <div className="flex flex-col w-1/2 justify-center bg-slate-900/95 border-l-1 border-r-1 text-center p-8 rounded-lg">
            <div>
              <h1 className="font-bold text-xl">
                Connect to any course-related query
              </h1>
              <p>Learn from india's best teachers</p>
              <h1 className="font-bold text-lg p-1">
                <table className="w-full text-center">
                  <tbody>
                    <tr>
                      <td className="w-1/3 pl-7">
                        <hr className="border-gray-400" />
                      </td>
                      <td className="w-1/3 px-2 whitespace-nowrap">
                        Select the Session Mode
                      </td>
                      <td className="w-1/3 pr-7">
                        <hr className="border-gray-400" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </h1>
              <div className="flex gap-2 px-8">
                {["Online", "Offline"].map((mode) => (
                  <h1
                    key={mode}
                    className={`w-1/2 p-2 bg-lime-300 font-bold text-cyan-600 rounded-md cursor-pointer transition-all 
            ${
              selectedMode === mode
                ? "border-2 border-sky-400 bg-lime-400"
                : "border-2 border-transparent"
            }`}
                    onClick={() => setSelectedMode(mode)}
                  >
                    {mode}
                  </h1>
                ))}
              </div>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-1/3 pl-7">
                      <hr className="border-gray-400" />
                    </td>
                    <td className="w-1/3 font-bold text-lg p-1 px-2 whitespace-nowrap">
                      Enter Your Details
                    </td>
                    <td className="w-1/3 pr-7">
                      <hr className="border-gray-400" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex w-full justify-center">
              <form
                onSubmit={handelSubmit}
                noValidate=""
                className="w-full max-w-md p-2 rounded-2xl shadow-lg space-y-3"
              >
                <div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    className="w-full   mt-1 p-2 border border-gray-300 rounded-md focus:ring-1  focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your Number or Email"
                  />
                </div>

                <div>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    id="message"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your email address and message"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300 font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-indigo-900 text-white border-t-1">
        <div className="font-bold bg-indigo-900">
          <h1 className="text-2xl text-center p-2 ">
            <span className="text-pink-600">Comprehensive learning programs</span> & <span className="text-pink-600">classes for all students</span>
          </h1>
          <p className="text-center">
            Become lifelong learners with India's best teachers, <br />
            engaging video lessons and personalised learning journeys
          </p>
        </div>

        <div className="p-10">
          <div className="bg-indigo-950/95 w-full h-[50vh] rounded-md">
            <div className="flex w-full justify-center absolute -mt-2 -ml-10">
              <h1 className="bg-green-600 py-2 px-6 rounded-t-lg border-t-1">
                Course Details
              </h1>
            </div>
            <div className="flex w-full items-center">
              <div className="w-1/2 p-8">
                <div className="">
                  <h1 className="font-bold text-xl pl-1 ml-10">
                    Technical Course
                  </h1>
                  <div className="flex">
                    <img
                      src="/Images/tech.png"
                      alt=""
                      className="h-40 ml-10 bg-slate-800 rounded-lg"
                    />
                    <div className="w-400 flex justify-center text-center align-center">
                      <div className="mr-10">
                        <img
                          src="Images/icon.png"
                          alt=""
                          className="w-40 pl-6"
                        />
                        <p className="-mt-3">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-xl text-blue-500">
                          Know More{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[50vh] py-15">
                <div className="border-1 h-[25vh]"></div>
              </div>
              <div className="w-1/2 p-8">
                <div className="">
                  <h1 className="font-bold text-xl pl-1 ml-20">
                    Non-Technical Course
                  </h1>
                  <div className="flex">
                    <img
                      src="/Images/pd.png"
                      alt=""
                      className="h-40 ml-20 bg-slate-800 rounded-lg"
                    />
                    <div className="w-400 flex justify-center text-center align-center">
                      <div>
                        <img
                          src="Images/icon.png"
                          alt=""
                          className="w-40 pl-6"
                        />
                        <p className="-mt-3">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-blue-500 text-xl">
                          Know More{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center absolute -mt-13 -ml-10">
              <NavLink to='/course' className="btn bg-indigo-600 py-2 px-6">
                Book a FREE class
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="w-full bg-indigo-950 text-white border-b-1">
      <div className="font-bold bg-indigo-950 pt-3">
          <h1 className="text-2xl text-center p-2 ">
            <span className="text-pink-600">Comprehensive learning programs</span> & <span className="text-pink-600">classes for all students</span>
          </h1>
          <p className="text-center">
            Become lifelong learners with India's best teachers, <br />
            engaging video lessons and personalised learning journeys
          </p>
        </div>

        <div className="p-10">
          <div className="bg-indigo-900/90 w-full h-[50vh] rounded-md">
            <div className="flex w-full justify-center absolute -mt-2 -ml-10">
              <h1 className="py-2 bg-green-600 px-6 border-t-1 rounded-t-lg">Achivment</h1>
            </div>
            <div className="flex w-full items-center">
              <div className="w-1/2 p-8">
                <div className="">
                  <h1 className="font-bold text-xl pl-1 ml-10">
                    Certification
                  </h1>
                  <div className="flex">
                    <img
                      src="/Images/certificate.jpg"
                      alt=""
                      className="h-40 ml-10 bg-slate-800 rounded-lg"
                    />
                    <div className="w-400 flex justify-center text-center align-center">
                      <div className="mr-10">
                        <img
                          src="Images/icon.png"
                          alt=""
                          className="w-40 pl-6"
                        />
                        <p className="-mt-3">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-xl text-blue-500">
                          Know More{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[50vh] py-15">
                <div className="border-1 h-[25vh]"></div>
              </div>
              <div className="w-1/2 p-8">
                <div className="">
                  <h1 className="font-bold text-xl pl-1 ml-20">Placement</h1>
                  <div className="flex">
                    <img
                      src="/Images/placement.png"
                      alt=""
                      className="h-40 ml-20 bg-slate-800 rounded-lg"
                    />
                    <div className="w-400 flex justify-center text-center align-center">
                      <div>
                        <img
                          src="Images/icon.png"
                          alt=""
                          className="w-40 pl-6"
                        />
                        <p className="-mt-3">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-blue-500 text-xl">
                          Know More{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center absolute -mt-13 -ml-10">
              <NavLink onClick={handlUser} to='/register' className="btn bg-indigo-600 py-2 px-6">Register</NavLink>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-indigo-900">
        <div className="text-center w-full p-4">
          <table className="w-full text-center">
            <tbody>
              <tr>
                <td className="w-1/3 pl-7">
                  <hr className="border-indigo-400" />
                </td>
                <td className="w-1/3 px-2 whitespace-nowrap">
                  <h1 className="font-bold text-3xl py-4">
                    Get the LMS advantage
                  </h1>
                </td>
                <td className="w-1/3 pr-7">
                  <hr className="border-indigo-400" />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="w-full flex justify-between text-white p-4">
            <div className="flex flex-col items-center text-center gap-4 w-[27vw] bg-slate-900/50 py-15 rounded-lg">
              <img
                src="/Images/Skills.jpeg"
                alt=""
                className="w-50 rounded-md pb-6"
              />
              <h2 className="font-bold text-xl">
                Developed Your Technical Skills
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                et velit vel nunc faucibus pharetra.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 w-[27vw] bg-slate-900/50 py-15 rounded-lg">
              <img
                src="/Images/pd.jpg"
                alt=""
                className="w-50 rounded-md pb-6"
              />
              <h2 className="font-bold text-xl">Developed your PD Skill</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                et velit vel nunc faucibus pharetra.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 w-[27vw] bg-slate-900/50 py-15 rounded-lg">
              <img
                src="/Images/job.jpg"
                alt=""
                className="w-50 rounded-md pb-6"
              />
              <h2 className="font-bold text-xl">Get the job</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                et velit vel nunc faucibus pharetra.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section>
        <Contact />
      </section>
    </>
  );
}

export default Landing;
