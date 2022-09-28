import React from "react"

export default function InputShell({ children, label, required, outline }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">
        {label} {required && <span className="text-err-red">*</span>}
      </label>
      <div
        className={`${
          outline ? "border-2 border-border-color" : "bg-inp-grey"
        } my-1 w-full rounded-std px-2`}
      >
        {children}
      </div>
    </div>
  )
}

export function TextInput({ type, placeholder }) {
  return (
    <input
      type={type || "text"}
      className="border-none outline-none bg-transparent py-1 w-full"
      style={{ background: "transparent" }}
      placeholder={placeholder}
    />
  )
}

export function TextArea({ rows, col, placeholder }) {
  return (
    <textarea
      rows={rows}
      className="border-none outline-none my-1 bg-inp-grey w-full rounded-std py-1"
      placeholder={placeholder}
    ></textarea>
  )
}

export function SelectOption({ options }) {
  return (
    <select className="border-none outline-none bg-transparent py-1 w-full"
        style={{background: "transparent"}}
    >
        <option value="none" disabled selected>-- Select --</option>
        {options&&options.map((option)=>(
            <option>
                {option}
            </option>    
        ))}
    </select>
  )
}
