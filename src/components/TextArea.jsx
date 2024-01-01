import React from "react";

export default function TextArea({ label, ...props }) {
  return (
    <label className="form-control w-full max-w-xs md:max-w-md">
      <div className="label">
        <span className="label-text text-lg md:text-xl">{label}</span>
      </div>
      <textarea
        {...props}
        className="textarea textarea-bordered h-24 md:textarea-lg xl:textarea xl:textarea-bordered"
        placeholder="Pesan Anda"
      ></textarea>
    </label>
  );
}
