import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
      <section className="py-6 pt-14 bg-indigo-950 dark:text-gray-100">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">
              Fill in the form to start a conversation
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Azadpur Delhi 110062</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>+91 8795901180</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>prakashmanig000@gmail.com</span>
              </p>
            </div>
          </div>
          <form
            onSubmit={handelSubmit}
            noValidate=""
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
          >
            <label className="block">
              <span className="mb-1">Full name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Leroy Jenkins"
                className="block p-1 w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75"
              />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="leroy@jenkins.com"
                className="block p-1 w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75"
              />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                className="block p-1 w-full rounded-md focus:ring focus:ring-opacity-75"
              ></textarea>
            </label>
            <button
              type="submit"
              className="self-center px-10 py-2 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
