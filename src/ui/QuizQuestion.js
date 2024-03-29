import React, { useEffect } from "react";

export default function QuizQuestion(props) {
  useEffect(() => {}, [props.submitted]);
  function handleChange(event) {
    props.getAnswers(event.target.value, props.id);
    // }
  }
  // props.getAnswers(pr)

  return (
    <div
      className={`${!props.submitted && "bg-slate-100"} ${!props.correct && props.submitted && "bg-red-50"} ${
        props.correct && props.submitted && "bg-green-50"
      }
       h-full w-11/12 p-8 rounded-lg`}
    >
      <div class="mb-5">{props.question}</div>
      {/* <QuestionResponse response={props.responses[0]} /> */}
      <ul>
        {props.responses.map((item) => {
          return (
            <li class="flex items-center px-3 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-radio-1"
                type="radio"
                value={item}
                name={props.question}
                onChange={handleChange}
                class="w-4 h-4 text-blue-600 
                bg-gray-100 border-gray-300
                 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="bordered-radio-1"
                class={`ml-3 w-full py-4 ms-2 text-sm font-medium text-grey-900 dark:text-gray-300`}
              >
                {item}
              </label>
            </li>
          );
          // return <QuestionResponse key={item} response={item} />;
        })}
      </ul>
    </div>
  );
}
