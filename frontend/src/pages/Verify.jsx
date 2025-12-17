import { error } from 'console';
import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";


const Verify = () => {
    const [searchparams]=useSearchParams;
    const token=searchparams.get("token");
    const email=searchparams.get("email");

    const[loading,setLoading]=useState(true);
    const[verifying,setVerifying]=useState(false);
    const[error,setError]=useState("");
    const[formdata,setFormdata]=useState({
        password,
        confirmPassword,
    })

    useEffect(()=>{
        const VerifyToken=async()=>{
            try{
            const {data}=await axios.put("/verify",{token,email})
            if(data.success){
                setVerifying(true);
            }
            else{
                setError("Verification denied")
            }
        }
        catch(err){ 
            setError("Something went wrong")
        }
        finally{
            setLoading(true)
        }
    }},[token,email])

    const changeHandler=(e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const submitPassword=async()=>{
        if (formdata.password!=formdata.confirmPassword){
            alert("Password Do not match")
            return;
        }

        try{
        const {data}=axios.post("/setpassword",{
            email,
            token,
            password:formdata.password
        })
        if(data.success){
            alert("password setted sucessfully");
            navigate("/login")
         }
         else{
            alert(data.message)
         }}
         catch(e){
        alert("Error in Setting Password")
    }

}

  return (
    <div className='verify-content'>
        {loading &&<h2>Verifying the token</h2>}
        {!loading && error &&<h2 style={{color:red}}>{error}</h2>}
        {!loading &&verify && (<>
        <h2>Set Your Password</h2>
        <input name="password" placeholder='password' value={formdata.password} onChange={changeHandler} type='password' >Enter your Password</input>
        <input name='confirmpassword' placeholder='Confirm Password' value={formdata.confirmPassword} onChange={changeHandler} type='password'>Confirm Passowrd</input>
        <button onClick={submitPassword}>Submit</button>
        </>)}
    </div> 
  )
}
export default Verify
