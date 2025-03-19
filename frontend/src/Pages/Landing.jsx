import React, { useState } from "react";
import Contact from "./Contact";
import emailjs from "@emailjs/browser";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Landing() {
  const [selectedMode, setSelectedMode] = useState(null);
  const { user } = useSelector((state) => state.loginSlice);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handlUser = () => {
    if (user) {
      toast.success("Allready registered");
    }
  };

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
      <section className="h-screen flex overflow-hidden justify-between bg-indigo-950 items-center">
        <div className="container flex flex-col p-4 sm:p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row gap-5 justify-between">
          {/* Image Section */}
          <div className="flex items-center justify-center lg:justify-start w-full lg:w-1/2">
            <img
              src="/Images/Landing.png"
              className="object-contain w-full lg:w-[40vw] max-w-[500px] lg:-mb-15 lg:-ml-30"
              alt="Landing"
            />
          </div>

          {/* Form Section */}
          <div className="flex flex-col w-full lg:w-1/2 justify-center bg-slate-900/80 hover:bg-slate-950 hover:border-amber-300 border-l-1 border-r-1 text-center p-4 sm:p-8 rounded-lg">
            <div>
              <h1 className="font-bold text-lg sm:text-xl">
                Connect to any course-related query
              </h1>
              <p className="text-sm sm:text-base">
                Learn from India's best teachers
              </p>
              <h1 className="font-bold text-md sm:text-lg p-1">
                <table className="w-full text-center">
                  <tbody>
                    <tr>
                      <td className="w-1/3 pl-4 sm:pl-7">
                        <hr className="border-gray-400" />
                      </td>
                      <td className="w-1/3 px-2 whitespace-nowrap text-sm sm:text-base">
                        Select the Session Mode
                      </td>
                      <td className="w-1/3 pr-4 sm:pr-7">
                        <hr className="border-gray-400" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </h1>
              <div className="flex gap-2 px-4 sm:px-8">
                {["Online", "Offline"].map((mode) => (
                  <h1
                    key={mode}
                    className={`w-1/2 p-2 bg-lime-300 font-bold text-cyan-600 rounded-md cursor-pointer transition-all text-sm sm:text-base ${
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
                    <td className="w-1/3 pl-4 sm:pl-7">
                      <hr className="border-gray-400" />
                    </td>
                    <td className="w-1/3 font-bold text-md sm:text-lg p-1 px-2 whitespace-nowrap">
                      Enter Your Details
                    </td>
                    <td className="w-1/3 pr-4 sm:pr-7">
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
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your Number or Email"
                  />
                </div>

                <div>
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    id="message"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                    placeholder="Enter your email address and message"
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300 font-semibold text-sm sm:text-base"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-indigo-900 text-white border-t-1">
        {/* Heading Section */}
        <div className="font-bold bg-indigo-900">
          <h1 className="text-xl sm:text-2xl text-center p-2">
            <span className="text-pink-600">
              Comprehensive learning programs
            </span>{" "}
            & <span className="text-pink-600">classes for all students</span>
          </h1>
          <p className="text-center text-sm sm:text-base">
            Become lifelong learners with India's best teachers, <br />
            engaging video lessons and personalised learning journeys
          </p>
        </div>

        {/* Course Details Section */}
        <div className="p-4 sm:p-10">
          <div className="bg-indigo-950/95 w-full h-auto sm:h-[50vh] rounded-md relative">
            {/* Course Details Heading */}
            <div className="flex w-full justify-center absolute -mt-4 sm:-mt-2 -ml-0 sm:-ml-10">
              <h1 className="bg-green-600 py-2 px-6 rounded-t-lg border-t-1 text-sm sm:text-base">
                Course Details
              </h1>
            </div>

            {/* Course Content */}
            <div className="flex flex-col sm:flex-row w-full items-center pt-12 sm:pt-0">
              {/* Technical Course */}
              <div className="w-full sm:w-1/2 p-4 sm:p-8">
                <div>
                  <h1 className="font-bold text-lg sm:text-xl pl-1 ml-0 sm:ml-10">
                    Technical Course
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center">
                    <img
                      src="/Images/tech.png"
                      alt="Technical Course"
                      className="h-32 sm:h-40 ml-0 sm:ml-10 bg-slate-800 rounded-lg"
                    />
                    <div className="w-full sm:w-400 flex justify-center text-center items-center mt-4 sm:mt-0">
                      <div className="mr-0 sm:mr-10">
                        <img
                          src="/Images/icon.png"
                          alt="Icon"
                          className="w-32 sm:w-40 pl-0 sm:pl-6"
                        />
                        <p className="-mt-3 text-sm sm:text-base">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-lg sm:text-xl text-blue-500">
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px sm:h-[25vh] w-full sm:w-px bg-gray-600 my-4 sm:my-0"></div>

              {/* Non-Technical Course */}
              <div className="w-full sm:w-1/2 p-4 sm:p-8">
                <div>
                  <h1 className="font-bold text-lg sm:text-xl pl-1 ml-0 sm:ml-20">
                    Non-Technical Course
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center">
                    <img
                      src="/Images/pd.png"
                      alt="Non-Technical Course"
                      className="h-32 sm:h-40 ml-0 sm:ml-20 bg-slate-800 rounded-lg"
                    />
                    <div className="w-full sm:w-400 flex justify-center text-center items-center mt-4 sm:mt-0">
                      <div>
                        <img
                          src="/Images/icon.png"
                          alt="Icon"
                          className="w-32 sm:w-40 pl-0 sm:pl-6"
                        />
                        <p className="-mt-3 text-sm sm:text-base">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-lg sm:text-xl text-blue-500">
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book a FREE Class Button */}
            <div className="flex w-full justify-center absolute -mt-8 sm:-mt-13 -ml-0 sm:-ml-10">
              <NavLink
                to="/course"
                className="btn bg-indigo-600 py-2 px-6 text-sm sm:text-base"
              >
                Book a FREE class
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <hr />

      <section className="w-full bg-indigo-950 text-white border-b-1">
        {/* Heading Section */}
        <div className="font-bold bg-indigo-950 pt-3">
          <h1 className="text-xl sm:text-2xl text-center p-2">
            <span className="text-pink-600">
              Comprehensive learning programs
            </span>{" "}
            & <span className="text-pink-600">classes for all students</span>
          </h1>
          <p className="text-center text-sm sm:text-base">
            Become lifelong learners with India's best teachers, <br />
            engaging video lessons and personalised learning journeys
          </p>
        </div>

        {/* Achievement Section */}
        <div className="p-4 sm:p-10">
          <div className="bg-indigo-900/90 w-full h-auto sm:h-[50vh] rounded-md relative">
            {/* Achievement Heading */}
            <div className="flex w-full justify-center absolute -mt-4 sm:-mt-2 -ml-0 sm:-ml-10">
              <h1 className="py-2 bg-green-600 px-6 border-t-1 rounded-t-lg text-sm sm:text-base">
                Achievement
              </h1>
            </div>

            {/* Achievement Content */}
            <div className="flex flex-col sm:flex-row w-full items-center pt-12 sm:pt-0">
              {/* Certification Section */}
              <div className="w-full sm:w-1/2 p-4 sm:p-8">
                <div>
                  <h1 className="font-bold text-lg sm:text-xl pl-1 ml-0 sm:ml-10">
                    Certification
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center">
                    <img
                      src="/Images/certificate.jpg"
                      alt="Certification"
                      className="h-32 sm:h-40 ml-0 sm:ml-10 bg-slate-800 rounded-lg"
                    />
                    <div className="w-full sm:w-400 flex justify-center text-center items-center mt-4 sm:mt-0">
                      <div className="mr-0 sm:mr-10">
                        <img
                          src="/Images/icon.png"
                          alt="Icon"
                          className="w-32 sm:w-40 pl-0 sm:pl-6"
                        />
                        <p className="-mt-3 text-sm sm:text-base">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-lg sm:text-xl text-blue-500">
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px sm:h-[25vh] w-full sm:w-px bg-gray-600 my-4 sm:my-0"></div>

              {/* Placement Section */}
              <div className="w-full sm:w-1/2 p-4 sm:p-8">
                <div>
                  <h1 className="font-bold text-lg sm:text-xl pl-1 ml-0 sm:ml-20">
                    Placement
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center">
                    <img
                      src="/Images/placement.png"
                      alt="Placement"
                      className="h-32 sm:h-40 ml-0 sm:ml-20 bg-slate-800 rounded-lg"
                    />
                    <div className="w-full sm:w-400 flex justify-center text-center items-center mt-4 sm:mt-0">
                      <div>
                        <img
                          src="/Images/icon.png"
                          alt="Icon"
                          className="w-32 sm:w-40 pl-0 sm:pl-6"
                        />
                        <p className="-mt-3 text-sm sm:text-base">
                          Personalised learning app <br />
                          to learn anytime, anywhere
                        </p>
                        <button className="font-bold text-lg sm:text-xl text-blue-500">
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <div className="flex w-full justify-center absolute -mt-8 sm:-mt-13 -ml-0 sm:-ml-10">
              <NavLink
                onClick={handlUser}
                to="/register"
                className="btn bg-indigo-600 py-2 px-6 text-sm sm:text-base"
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-indigo-900">
        <div className="text-center w-full p-4">
          {/* Heading with Horizontal Lines */}
          <table className="w-full text-center">
            <tbody>
              <tr>
                <td className="w-1/3 pl-2 sm:pl-7">
                  <hr className="border-indigo-400" />
                </td>
                <td className="w-1/3 px-2 whitespace-nowrap">
                  <h1 className="font-bold text-2xl sm:text-3xl py-4">
                    Get the LMS advantage
                  </h1>
                </td>
                <td className="w-1/3 pr-2 sm:pr-7">
                  <hr className="border-indigo-400" />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Cards Section */}
          <div className="w-full flex flex-col sm:flex-row justify-between text-white p-4 gap-4 sm:gap-0">
            {/* Card 1: Technical Skills */}
            <div className="flex flex-col items-center text-center gap-4 w-full sm:w-[27vw] bg-slate-900/50 py-8 sm:py-15 rounded-lg">
              <img
                src="/Images/Skills.jpeg"
                alt="Technical Skills"
                className="w-40 sm:w-50 rounded-md pb-4 sm:pb-6"
              />
              <h2 className="font-bold text-lg sm:text-xl">
                Develop Your Technical Skills
              </h2>
              <p className="text-sm sm:text-base px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                et velit vel nunc faucibus pharetra.
              </p>
            </div>

            {/* Card 2: PD Skills */}
            <div className="flex flex-col items-center text-center gap-4 w-full sm:w-[27vw] bg-slate-900/50 py-8 sm:py-15 rounded-lg">
              <img
                src="/Images/pd.jpg"
                alt="PD Skills"
                className="w-40 sm:w-50 rounded-md pb-4 sm:pb-6"
              />
              <h2 className="font-bold text-lg sm:text-xl">
                Develop Your PD Skills
              </h2>
              <p className="text-sm sm:text-base px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                et velit vel nunc faucibus pharetra.
              </p>
            </div>

            {/* Card 3: Get the Job */}
            <div className="flex flex-col items-center text-center gap-4 w-full sm:w-[27vw] bg-slate-900/50 py-8 sm:py-15 rounded-lg">
              <img
                src="/Images/job.jpg"
                alt="Get the Job"
                className="w-40 sm:w-50 rounded-md pb-4 sm:pb-6"
              />
              <h2 className="font-bold text-lg sm:text-xl">Get the Job</h2>
              <p className="text-sm sm:text-base px-4">
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
