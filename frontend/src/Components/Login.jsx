import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function Login(){
  const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
   let nav = useNavigate()
      async function LoginLogic() {
        try {
            if(!email || !password){
                toast.error("All Feilds Are Required ")
                return;
            }
            await axios.post("http://localhost:3003/crud/login",{
                email : email,
                pswd : password

            })
            .then((a)=>{
                setemail("")
                setpassword("")
                localStorage.setItem("UserInfo",JSON.stringify(a.data.user))
                toast.success(a.data.msg);
                nav("/s")
            }).catch((e)=>{
                toast.error(e.message)
            })
        } catch (error) {
            toast.error(error.response?.data.msg)
        }
      }
      return(
      <div className="container mt-5">
      <ToastContainer/>
      <h2 className="text-center mb-4">LOGIN</h2>
      <hr />

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


      <button className="btn btn-primary mt-3" type="submit" onClick={LoginLogic}>
        SIGNIN
      </button>
      <Link className="mt-3" to="/fp">forget password</Link>
    </div>
        )
    }