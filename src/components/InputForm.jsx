import React from "react";

export default function InputForm({ label, ...props }) {
  return (
    <label className="form-control w-full max-w-xs md:max-w-md">
      <div className="label">
        <span className="text-lg md:text-xl">{label}</span>
      </div>
      <input
        {...props}
        className="input input-bordered w-full md:input-lg xl:input xl:input-bordered"
      />
    </label>
  );
}
