import React from "react";
import Navbar from "./Navbar";
import QuizQuestion from "../ui/QuizQuestion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DoQuizPage() {
  // const output = `[ { "Question": "What does SaaS stand for in cloud computing?", "responses": ["Software as a Service", "Security as a Service", "Server as a Service", "Storage as a Service"], "correct": "Software as a Service" }, { "Question": "What is the main benefit of using cloud computing services?", "responses": ["Decreased security", "Limited scalability", "Increased cost", "Flexibility and scalability"], "correct": "Flexibility and scalability" }, { "Question": "What is a public cloud in cloud computing?", "responses": ["A cloud infrastructure used by a single organization", "A cloud infrastructure shared by multiple organizations", "A cloud infrastructure dedicated to a specific industry", "A cloud infrastructure without internet connectivity"], "correct": "A cloud infrastructure shared by multiple organizations" } ]`;
  // const [output_3, setOutput3] = useState("");
  const output = useSelector((state) => state.outputState.outputObject);
  const json_object = JSON.parse(output);
  const [submitted, setSubmitted] = useState(false);

  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [score, setScore] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const json_object = JSON.parse(output);
    const temp = [];
    for (var i = 0; i < json_object.length; i++) {
      temp.push(false);
    }
    setAnswers(temp);
  }, [output]);

  // useEffect(() => {}, [output_2]);
  useEffect(() => {}, [score]);
  const getAnswers = (answer, qn) => {
    var oldArray = answers;
    oldArray[qn] = answer;
    setAnswers(oldArray);
    // console.log(answers);
  };

  function handleSubmit() {
    setSubmitted(true);
    var total = 0;
    const _ = json_object.map((item, qn) => {
      if (item.correct === answers[qn]) {
        total = total + 1;
        return true;
      } else {
        return false;
      }
    });
    setCorrect(_);
    setScore(total);
  }
  function handleShowPrompt() {
    setShowPrompt(true);
  }

  return (
    <div>
      <Navbar name="Do Quiz" />
      <div className="flex flex-row mx-10">
        <ul className="w-10/12">
          {json_object.map((item, id) => {
            return (
              <li class="mb-5">
                <QuizQuestion
                  question={item["Question"]}
                  responses={item["responses"]}
                  getAnswers={getAnswers}
                  id={id}
                  submitted={submitted}
                  correct={correct[id]}
                />
              </li>
            );
          })}
        </ul>
        <div className="w-48">
          <button
            type="button"
            class=" w-48 focus:outline-none disabled:opacity-75 disabled:hover:bg-green-700 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleSubmit}
            disabled={answers.length !== json_object.length}
          >
            Submit test
          </button>
          {submitted && (
            <div className="mt-3">
              Test Score: {score} / {answers.length}
            </div>
          )}
          <button
            type="button"
            class=" w-48 focus:outline-none disabled:opacity-75 disabled:hover:bg-green-700 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleShowPrompt}
            disabled={!submitted}
          >
            View Prompt
          </button>
          {showPrompt && <div className="w-56 mt-3">{output}</div>}
        </div>
      </div>
    </div>
  );
}
