import axios from 'axios';
import React, { useState } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


function Creates() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [age, setage] = useState(0);



  async function submitfunc() {
    try {

      let user_regex = /^[a-zA-Z0-9_]{3,16}$/
      let pswd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

if (!name || !email || !password || age <= 0 ) {
  toast.error("All Fields Are Required ")
  return;
}

if (!user_regex.test(name)) {
  toast.error("Invalid Username")
  return;
}

if (!pswd_regex.test(password)) {
  toast.error("Password Must Be Strong")
  return;
}
      await axios.post("http://localhost:3003/crud/", {
        n: name,
        e: email,
        p: password,
        a: age
      }).then((a) => {
      toast.success(a.data.msg)
      })
    } catch (error) {
    if (error.status === 409) {
      alert(error.response.data.msg)
    } else {
      alert(error.message)
    }
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer/>
      <h2 className="text-center mb-4">SAVE DATA FORM</h2>
      <hr />

      <div className="mb-3">
        <label className="form-label">Enter your name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Enter your email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Enter your password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Enter your age</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setage(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-3" type="submit" onClick={submitfunc}>
        Submit
      </button>
    </div>
  );
}

export default Creates;