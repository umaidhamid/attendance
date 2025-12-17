import React, { useState } from 'react'

const LogSign = () => {
    const [state, setState] = useState("login")  // fixed initial value
    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })

    const changehandler = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const login = async () => {
        try {
            const response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    const signup = async () => {
        try {
            const response = await fetch("http://localhost:4000/signup", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='main-container'>
            <h1>{state === "login" ? "Log In" : "Sign Up"}</h1>
            <div className="log-sign-fields">
                <input
                    name="email"
                    value={formdata.email}
                    onChange={changehandler}
                    placeholder='Email'
                    type='email'
                />
                <input
                    name='password'
                    value={formdata.password}
                    onChange={changehandler}
                    placeholder='Password'
                    type='password'
                />
            </div>
            <div className="btn-container">
                <button onClick={() => { state === "login" ? login() : signup() }}>
                    Continue
                </button>
            </div>
            {state === "signup" ?
                <p className='loginhere'>
                    Already have an Account : <span onClick={() => setState("login")}>Log In Here</span>
                </p> :
                <p className='signuphere'>
                    Create an Account <span onClick={() => setState("signup")}>Sign Up Here</span>
                </p>
            }
        </div>
    )
}

export default LogSign
