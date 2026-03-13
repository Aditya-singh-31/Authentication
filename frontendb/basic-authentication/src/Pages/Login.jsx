import { useState } from "react";
import api from "../Api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){

const navigate = useNavigate();

const [form,setForm] = useState({
email:"",
password:""
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e)=>{

e.preventDefault();

try{

const res = await api.post("/login",form);

localStorage.setItem("token",res.data.token);

navigate("/profile");

}catch(err){

alert(err.response?.data?.message || "Login failed");

}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-2xl font-bold text-center mb-6">Login</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="email"
name="email"
placeholder="Email"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<button
className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
>
Login
</button>

</form>

<p className="text-center mt-4">

Don't have account?  
<Link className="text-blue-500" to="/register">Register</Link>

</p>

</div>

</div>

);

}