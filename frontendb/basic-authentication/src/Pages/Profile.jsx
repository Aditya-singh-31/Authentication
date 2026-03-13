import { useQuery } from "@tanstack/react-query";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile(){

const navigate = useNavigate();

const token = localStorage.getItem("token");

const fetchProfile = async()=>{

const res = await api.get("/profile",{
headers:{
Authorization:`Bearer ${token}`
}
});

return res.data;

};

const {data,isLoading,error} = useQuery({
queryKey:["profile"],
queryFn:fetchProfile
});

const logout = ()=>{
localStorage.removeItem("token");
navigate("/");
};

if(isLoading) return <div className="text-center mt-10">Loading...</div>;

if(error) return <div className="text-center mt-10 text-red-500">Error loading profile</div>;

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

<div className="space-y-3">

<p><strong>Name:</strong> {data.data.name}</p>

<p><strong>Email:</strong> {data.data.email}</p>

<p><strong>Verified:</strong> {data.data.verified ? "Yes" : "No"}</p>

</div>

<button
onClick={logout}
className="w-full mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600"
>
Logout
</button>

</div>

</div>

);

}