import React from "react";

export default function SelectForm({
  label,
  option1 = "AC",
  option2 = "CCTV",
  ...props
}) {
  return (
    <label className="form-control w-full max-w-xs md:max-w-md">
      <div className="label">
        <span className="label-text text-lg md:text-xl">{label}</span>
      </div>
      <select
        {...props}
        className="select select-bordered md:input-lg xl:input xl:input-bordered "
      >
        <option disabled selected>
          Pilih
        </option>
        <option className="text-xs">{option1}</option>
        <option className="text-xs">{option2}</option>
      </select>
    </label>
  );
}
