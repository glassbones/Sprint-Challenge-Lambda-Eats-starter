import React, { useState } from 'react'
import * as yup from 'yup' 
import axios from 'axios'

export default function FormData(){

    //users
    const [usersState, setUsersState] = useState([])

    // state
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        size: '',
        sauce: '',
        pepperonis: false,
        pineapple: false,
        olives: false,
        sausage: false,
        special: ''
    })

    // schema
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field").test('len', 'Name must be at least 2 characters', val => val.length > 1),
        email: yup.string().email("Must be a valid Email address").required("Must include an Email address"),   //thought it was .test but no luck :c
        password: yup.string().required("Password is a required field"),
        size: yup.string().required("Please choose a size"),
        sauce: yup.string().required("Please choose a sauce"),
        pepperonis: yup.boolean(), //.oneOf([true], "Please agree to the Terms of Service"),
        pineapple: yup.boolean(),
        olives: yup.boolean(),
        sausage: yup.boolean(),
        special: yup.string()
    })

    // errorState
    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        size: '',
        sauce: '',
        pepperonis: '',
        pineapple: '',
        olives: '',
        sausage: '',
        special: ''
    })


    // onSubmit
    const onSubmit = e => {
        e.preventDefault()
        if (Object.values(errorState).every(value => !value)) return
        console.log('submitted!')
        axios
        .post('https://reqres.in/api/users', formState)
        .then(res => setUsersState([...usersState, res]))
        .catch(err => console.log('error' + err))

    }

    // onChange
    const onChangeHandle = e => {
        // have to do this line because we want to pass the synthetic event to validation
        // https://reactjs.org/docs/events.html
        e.persist()
        //send to validation
        validate(e)
        // set value depending on input type (checkbox or other)
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        // [e.target.name] selects the name key of e.target
        setFormState({ ...formState, [e.target.name]: value })
        console.log(formState)
    }
    
    // validation
    const validate = e =>{
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrorState({
                ...errorState,
                [e.target.name]: ''
            })
        })
        .catch(err => {
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0]
            })
        })
    }

 

    // returnStatement
    return (
        <div>
   
            <form onSubmit={onSubmit}
                style={{
                display:'flex',
                flexDirection:'column',
                width:'200px', 
                justifyContent:'center', 
                alignItems:'center',
                fontSize: '12px' }}>

                <label
                    htmlFor="name"
                    textcontent={'Name'} // Accessibilty BOOM!
                    hidden/> 
                <input
                    style={{margin:"2px"}}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    // State Related Attributes
                    value={formState.name}
                    onChange={onChangeHandle}
                />

                { //if error display <p>error</p>
                errorState.name.length ?
                <p style={{color: `red`, margin:"2px"}} >{errorState.name}</p> : null }

                <label 
                    htmlFor="email"
                    textcontent={'Email'} // Accessibilty BOOM!
                    hidden/>
                <input
                    style={{margin:"2px"}}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    // State Related Attributes
                    value={formState.email}
                    onChange={onChangeHandle}
                />

                { //if error display <p>error</p>
                errorState.email ?
                <p style={{color: `red`, margin:"2px"}} >{errorState.email}</p> : null }

                <label 
                    htmlFor="password"
                    textcontent={'Password'} // Accessibilty BOOM!
                    hidden/>
                <input
                    style={{margin:"2px"}}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    // State Related Attributes
                    value={formState.password}
                    onChange={onChangeHandle}
                />

                { //if error display <p>error</p>
                errorState.password ?
                <p style={{color: `red`, margin:"2px"}} >{errorState.password}</p> : null }

                <label 
                    htmlFor="size"
                    textcontent={'Pizza Size'} // Accessibilty BOOM!
                    hidden/>
                <select 
                    style={{margin:"2px", width: '162px'}}
                    value={formState.size}
                    name="size" 
                    id="size" 
                    onClick={ e => e.target.firstElementChild.setAttribute('disabled','') } //what is a better way to do this?
                    onChange={onChangeHandle}>
                    <option value={1}> Pizza Size</option>
                    <option value="large">Large</option>
                    <option value="medium">Medium</option>
                    <option value="small">Small</option>
                </select>

                <label 
                    htmlFor="sauce"
                    textcontent={'Choose your sauce'} // Accessibilty BOOM!
                    hidden/>
                <select 
                    style={{margin:"2px", width: '162px'}}
                    value={formState.sauce}
                    name="sauce" 
                    id="sauce" 
                    onClick={ e => e.target.firstElementChild.setAttribute('disabled','') } //what is a better way to do this?
                    onChange={onChangeHandle}>
                    <option value={1}>Choose your sauce</option>
                    <option value="tomato">Tomato</option>
                    <option value="pesto">Pesto</option>
                    <option value="bbq">BBQ</option>
                    <option value="alfredo">Alfredo</option>
                </select>

                <label 
                    htmlFor="pepperonis">
                    Pepperonis?
                    <input
                    
                        type="checkbox"
                        name="pepperonis"
                        id="pepperonis"
                        // State Related Attributes
                        checked={formState.pepperonis}
                        onChange={onChangeHandle}
                    />
                </label>

                <label 
                    htmlFor="pineapple">
                    Pineapple?
                    <input

                        type="checkbox"
                        name="pineapple"
                        id="pineapple"
                        // State Related Attributes
                        checked={formState.pineapple}
                        onChange={onChangeHandle}
                    />
                </label>

                <label 
                    htmlFor="olives">
                    Olives?
                    <input
                        
                        type="checkbox"
                        name="olives"
                        id="olives"
                        // State Related Attributes
                        checked={formState.olives}
                        onChange={onChangeHandle}
                    />
                </label>

                <label 
                    htmlFor="sausage">
                    Sausage?
                    <input
                        
                        type="checkbox"
                        name="sausage"
                        id="sausage"
                        // State Related Attributes
                        checked={formState.sausage}
                        onChange={onChangeHandle}
                    />
                </label>
                
                <label 
                    htmlFor="size"
                    textcontent={'Special'} // Accessibilty BOOM!
                    hidden/>
                    <textarea
                    type="textarea" 
                    name="special" 
                    id="special"

                    style={{
                        marginTop:'4px',
                        width:'162px',
                        height:'50px',
                        resize: 'none' }}>
                    Special Instructions?
                    </textarea>


                <button style={{margin:"12px"}} > Order! </button>
            
            </form>

            { //if users
            usersState.length > 0 ? 
            <pre
            style={{overflow: 'scroll',width: '200px', height: '40px', border: 'solid lightgrey'}}>{JSON.stringify(usersState)}</pre>
             : null}

        </div>
        
    )
}