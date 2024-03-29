import React from "react";

export default function TextOutput(props) {
  return (
    <div>
      <div class="flex rounded bg-slate-200 min-h-screen mt-7 pt-7 pl-10 ">
        <h6>{props.text}</h6>
      </div>
    </div>
  );
}
