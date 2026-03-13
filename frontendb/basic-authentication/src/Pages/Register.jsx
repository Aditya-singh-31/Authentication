import { useState } from "react";
import api from "../Api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

const navigate = useNavigate();

const [form,setForm] = useState({
name:"",
email:"",
password:""
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e)=>{
e.preventDefault();

try{

await api.post("/register",form);

alert("Verification email sent");

navigate("/");

}catch(err){
alert(err.response?.data?.message || "Registration failed");
}

};

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-2xl font-bold text-center mb-6">Register</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="name"
placeholder="Name"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<input
name="email"
type="email"
placeholder="Email"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<input
name="password"
type="password"
placeholder="Password"
className="w-full border p-2 rounded"
onChange={handleChange}
/>

<button
className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
Register
</button>

</form>

<p className="text-center mt-4">

Already have account?  
<Link className="text-blue-500" to="/">Login</Link>

</p>

</div>

</div>

);

}