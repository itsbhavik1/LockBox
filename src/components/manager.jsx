import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, useAuth0 } from "@auth0/auth0-react";

const manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const passwordRef = useRef();
  const {user} = useAuth0();


  console.log("User's email is ", user?.email);

  const {isAuthenticated } = useAuth0();

  const getPasswords = async () => {
    let req = await fetch(`http://localhost:3000/?email=${user?.email}`);
    let passwords = await req.json();
    setpasswordArray(passwords);
};

  useEffect(() => {
    getPasswords();

  }, [user?.email]);

  const showPassword = () => {
    if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
    }
  };

  const copyText = (e) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    navigator.clipboard.writeText(e);
  };

  const savePassword = async () => {
    if (
        form.site.length > 3 &&
        form.username.length > 3 &&
        form.password.length > 3
    ) {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user?.email, ...form, id: uuidv4() }),
        });

        setform({ site: "", username: "", password: "" });
        toast("Password Saved!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    } else {
        toast("Error: URL / Username too short");
    }
};

  


const deletePassword = async (id) => {
  console.log("Deleting password with id ", id);
  let c = confirm("Do you really want to delete this password?");
  if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email, id }),
      });

      toast("Password Deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
  }
};

const editPassword = (id) => {
  if (user.email === 'bhavik85747@gmail.com') {
      setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
  } else {
      toast("You are not authorized to edit this password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
  }
};

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <ToastContainer />

      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className=" md:mycontainer ">
          <h1 className="text-4xl text font-bold text-center">
            <span className="text-green-500"> &lt;</span>

            <span className="text-black">Lock</span>
            <span className="text-green-500">Box/&gt;</span>
          </h1>
          <p className="text-black text-center font-serif">
            Manage all your passwords
          </p>
          <div className="flex flex-col p-4 text-black gap-4 items-center ">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="rounded-full border border-green-500  w-full py-1 px-4"
              type="text"
              name="site"
            />
            <div className=" flex w-full space-x-3 justify-center">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="rounded-full border border-green-500 w-1/2 py-1 px-4 "
                type="text"
                name="username"
              />

              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-1/2  py-1 px-4"
                type="password"
                name="password"
              />
              <button onClick={showPassword}>
                <lord-icon
                  src="https://cdn.lordicon.com/fmjvulyw.json"
                  trigger="hover"
                ></lord-icon>
              </button>
            </div>

            <button
              onClick={savePassword}
              className="flex gap-2 px-6 justify-center items-center bg-green-400 rounded-full w-fit p-2 hover:bg-green-500 "
            >
              <lord-icon
                src="https://cdn.lordicon.com/pdsourfn.json"
                target=".btn"
                trigger="hover"
              ></lord-icon>
              Add password
            </button>
          </div>
          {isAuthenticated ? 
          <div className="passwords ">
            <h2 className="font-bold text-2xl py-4">Your passwords</h2>
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length != 0 && (


              <table className="table-auto w-full rounded-md overflow-hidden ">
                <thead className="bg-green-400 text-white">
                  <tr>
                    <th>Site</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="flex items-center justify-center  py-2 border border-white text-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/ujxzdfjx.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </td>

                        <td className="py-2 border border-white text-center ">
                          {item.username}
                        </td>

                        <td className="py-2 border border-white text-center  ">
                          <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/ujxzdfjx.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                          </div>
                        </td>

                        <td className="py-2 border border-white text-center ">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/zfzufhzk.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                                marginRight: "13px",
                              }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer "
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/xekbkxul.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>: <div className="mx-5 my-5 font-bold">Please login first</div>}
        </div>
      </div>
    </>
  );
};

export default manager;