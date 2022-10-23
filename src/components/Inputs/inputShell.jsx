import React, { useEffect, useState } from "react"

export default function InputShell({ children, label, required, outline, isError }){
  return (
    <div className="flex flex-col">
      <label htmlFor="">
        {label} {required && <span className="text-err-red">*</span>}
      </label>
      <div
        className={`${
          outline ? "border-2 border-border-color" : "bg-inp-grey"
        } my-1 w-full rounded-std px-2 ${isError? "border-2 border-[red]":""}`}
      >
        {children}
      </div>
    </div>
  )
}

export function TextInput({ type, placeholder, form, setForm, errors, name, min, max, required }) {
  return (
    <input
      type={type || "text"}
      className="border-none outline-none bg-transparent py-1 w-full"
      style={{ background: "transparent" }}
      placeholder={placeholder}
      // name={name}
      min={0}
      max={max}
      value={typeof form == "object" ? form[name] : form || ""}

      onChange={(e)=>{
        let value = e.target.value;
        setForm && setForm({...form, [name]: value});

        if(value){
          errors && (errors.current[name] = false);
        }
      }}

      onBlur={(e)=>{
        let value = Number(e.target.value);
        if(!errors) return;
        if(!value && required){ 
            errors.current = {...errors.current, [name]: true}
        }else {
            errors.current = {...errors.current, [name]: false}
        }
      }}

    />
  )
}

export function FileInput({ type, placeholder, form, setForm, errors, name, min, max, accept }) {
  const [error, setError] = useState(false);
  return (
    <>
    <input
      type={"file"}
      className="border-none outline-none bg-transparent py-1 w-full"
      style={{ background: "transparent" }}
      // placeholder={placeholder}
      accept={accept}

      onChange={(e)=>{
        let target = e.target;
        let value = e.target.files.length
        const filereader = new FileReader()
        filereader.readAsText(target.files[0], "UTF-8")
        filereader.onload = ({ target }) => {
          console.log(JSON.parse(target.result).length);
          let data = JSON.parse(target.result);
          if(!data.length){
            errors && (errors.current = {[name]: true ,...errors.current})
            setError(true);
            return;
          }else {
            setError(false);
          }
          setForm && setForm({...form, [name]: data});
        }

        if(value){
          errors && (errors.current[name] = false);
        }
      }}

      onBlur={(e)=>{
        let value = e.target.files.length;
        if(!errors) return;
        if(!value){ 
            errors.current = {...errors.current, [name]: true}
        }else {
            errors.current = {...errors.current, [name]: false}
        }
      }}

    />
    {error && <p className="text-[red]">Must be an array of objects with same keys</p>}
    </>
  )
}

export function TextArea({ rows, col, placeholder, form, setForm, errors, name }) {
  return (
    <textarea
      rows={rows}
      className="border-none outline-none my-1 bg-inp-grey w-full rounded-std py-1"
      placeholder={placeholder}
      value={form[name]}
      onChange={(e)=>{
        let value = e.target.value;
        setForm && setForm({...form, [name]: value});

        if(value){
          errors && (errors.current[name] = false);
        }
      }}

      onBlur={(e)=>{
        let value = e.target.value;
        if(!errors) return;
        if(!value){
            errors && (errors.current = {...errors.current, [name]: true});
        }else {
            errors && (errors.current = {...errors.current, [name]: false});
        }
      }}
    ></textarea>
  )
}

export function SelectOption({ options, form, setForm, errors, name, values }) {
  let [chosen, choose] = useState(false);
  return (
    <select className="border-none outline-none bg-transparent py-1 w-full"
        style={{background: "transparent"}}
        onChange={(e)=>{
            let value = e.target.value;
            chosen || choose(true);
            setForm && setForm({...form, [name]: value});

            if(value){
              errors && (errors.current[name] = false);
            }
        }}
        // defaultValue={"-- Select --"}
        onBlur={(e)=>{
            let value = e.target.value;
            if(!errors) return;
            if(!value){
                errors && (errors.current = {...errors.current, [name]: true});
            }else {
                errors && (errors.current = {...errors.current, [name]: false});
            }
        }}
    >
        <option value={""} disabled={chosen}>-- Select --</option>
        {options&&options.map((option, index)=>(
            <option value={values? values[index] : option} key={index}>
                {option}
            </option>    
        ))}
    </select>
  )
}
