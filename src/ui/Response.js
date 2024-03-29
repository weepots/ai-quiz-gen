import React, { useEffect } from "react";
import { useState } from "react";

export default function QuestionResponse({ response }) {
  // const[clicked]
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked);
  };
  useEffect(() => {
    console.log(clicked);
  }, [clicked]);
  const componentClass = `flex justify-start w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium ${
    clicked && "text-blue-700"
  } focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 dark:bg-blue-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`;
  return (
    <button type="button" class={componentClass} onClick={toggleClicked}>
      {response}
    </button>
  );
}
