import React from "react";
import Navbar from "./Navbar";
import TextInput from "../ui/TextInput";
import TextOutput from "../ui/TextOuput";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import { useDispatch } from "react-redux";
import { addOutput } from "../redux/outputState.ts";
import { Link } from "react-router-dom";
import SearchInput from "../ui/SearchInput.tsx";
import LoadingSpinner from "../ui/LoadingSpinner.tsx";

export default function CreateQuizPage() {
  const [outputMessage, setOutputMessage] = useState("");
  // const outputState = useSelector((state) => state.outputState.outputObject);
  const [inputMessage, setInputMessage] = useState("");
  const [quizObjects, setQuizObjects] = useState();
  const [noQns, setNoQns] = useState(-1);
  const [difficulty, setDifficulty] = useState(-1);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  function validateInputs() {
    if (inputMessage.length > 0 && noQns <= 10 && noQns > 0 && difficulty <= 10 && difficulty >= 1) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // This is the default and can be omitted
  });

  async function processMessageToChatGPT(chatMessages) {
    const topic = chatMessages;
    // const diff = "Intermediate";
    const lang = "English";
    const prompt = `
    Generate a quiz according to the following specifications:

    - topic: ${topic}
    - number of questions: ${noQns}
    - difficulty:  ${difficulty} out of 10, 10 is the most difficult.
    - language:  ${lang}

    Output should be (only) an unquoted json array of objects with keys:
    "Question", "responses", and "correct". Scramble the elements in the "responses" array such that the answer is not always the first element`;
    try {
      setIsLoading(true);
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      const output = response.choices[0].message.content;
      // const output = `[ { "Question": "What is the formula for calculating compound interest?", "responses": ["A = P(1 + r)^t", "A = P(1 - r)^t", "A = Pert", "A = Pe^rt"], "correct": "A = P(1 + r)^t" }, { "Question": "What is the term used to describe the risk associated with changes in interest rates?", "responses": ["Liquidity risk", "Credit risk", "Interest rate risk", "Market risk"], "correct": "Interest rate risk" }, { "Question": "What does the term 'Net Present Value (NPV)' represent in finance?", "responses": ["The present value of all cash inflows minus the present value of all cash outflows", "The amount of money saved in a bank", "The current stock price of a company", "The profit margin of a business"], "correct": "The present value of all cash inflows minus the present value of all cash outflows" }, { "Question": "In finance, what does the term 'Leverage' refer to?", "responses": ["The use of borrowed funds to increase returns", "The process of buying and selling stocks", "The amount of cash held in a portfolio", "The risk involved in investing"], "correct": "The use of borrowed funds to increase returns" }, { "Question": "What is the concept of 'CAPM' (Capital Asset Pricing Model) used for in finance?", "responses": ["Estimating the cost of equity", "Forecasting commodity prices", "Calculating company earnings", "Determining market trends"], "correct": "Estimating the cost of equity" }, { "Question": "What is 'Beta' in finance and how is it used?", "responses": ["Measure of a stock's volatility in relation to the market", "Interest rate on a loan", "Price of a company share", "Value of a bond"], "correct": "Measure of a stock's volatility in relation to the market" }, { "Question": "What is the role of a 'Financial Analyst' in the field of finance?", "responses": ["To provide investment advice to clients", "To manage a company's budget", "To handle customer transactions at a bank", "To supervise stock market operations"], "correct": "To provide investment advice to clients" }, { "Question": "What is the 'Efficient Market Hypothesis' (EMH) in finance?", "responses": ["The theory that stock prices always reflect all information available in the market", "The idea that only certain investors can make profitable trades", "The practice of trading at high speeds", "The process of predicting market crashes"], "correct": "The theory that stock prices always reflect all information available in the market" }, { "Question": "What does the term 'Dividend Yield' indicate in finance?", "responses": ["The ratio of dividends per share to its market price", "The interest rate on a bond", "The annual salary of a company executive", "The total assets of a business"], "correct": "The ratio of dividends per share to its market price" }, { "Question": "What is the 'Sharpe Ratio' used for in finance?", "responses": ["To measure the risk-adjusted return of an investment", "To estimate a company's annual revenue", "To determine a currency exchange rate", "To calculate the GDP of a country"], "correct": "To measure the risk-adjusted return of an investment" } ]`;
      // const output = `[ { "Question": "What does Saas for in cloud computing?", "responses": ["Software as a Service", "Security as a Service", "Server as a Service", "Storage as a Service"], "correct": "Software as a Service" }, { "Question": "What is the main benefit of using cloud computing services?", "responses": ["Decreased security", "Limited scalability", "Increased cost", "Flexibility and scalability"], "correct": "Flexibility and scalability" }, { "Question": "What is a public cloud in cloud computing?", "responses": ["A cloud infrastructure used by a single organization", "A cloud infrastructure shared by multiple organizations", "A cloud infrastructure dedicated to a specific industry", "A cloud infrastructure without internet connectivity"], "correct": "A cloud infrastructure shared by multiple organizations" } ]`;
      const json_object = JSON.parse(output);

      // dispatch(addOutput(output));
      setOutputMessage(JSON.stringify(json_object));
      setQuizObjects(output);

      json_object.map((element) => {
        console.log(element["Question"]);
        console.log(element["responses"]);
        console.log(element["correct"]);
      });
      setIsLoading(false);
      // const output = {"role":"assistant","content":"[\n {\n \"Question\": \"What is the primary benefit of using cloud computing?\",\n \"responses\": [\"Increased flexibility and scalability\", \"Lower cost\", \"Improved security\", \"Faster internet speeds\"],\n \"correct\": \"Increased flexibility and scalability\"\n },\n {\n \"Question\": \"What does SaaS stand for in cloud computing?\",\n \"responses\": [\"Software as a Solution\", \"Security as a Service\", \"Software as a Service\", \"Storage as a Service\"],\n \"correct\": \"Software as a Service\"\n },\n {\n \"Question\": \"What is a public cloud in cloud computing?\",\n \"responses\": [\"A cloud infrastructure used by only one organization\", \"A cloud infrastructure shared by multiple organizations\", \"A cloud infrastructure located on-premises\", \"A type of cloud that doesn't exist\"],\n \"correct\": \"A cloud infrastructure shared by multiple organizations\"\n }\n]"}`
    } catch (e) {
      console.log("ERROR when fetching from openapi: ", e);
    }
  }
  async function onClickHandler(event) {
    event.preventDefault();
    if (isValid) {
      processMessageToChatGPT(inputMessage);
      // processMessageToChatGPT(inputMessage);
      // setIsloading(false);
    } else {
      window.alert("Please enter a difficulty and number of images between 1 and 10");
    }
  }
  function onChangeHandler(event) {
    setInputMessage(event.target.value);
  }

  function generateQuiz() {
    dispatch(addOutput(quizObjects));
    window.alert("QUIZ GENERATED");
  }
  useEffect(() => {
    validateInputs();
  }, [inputMessage, outputMessage, noQns]);

  return (
    <div>
      <Navbar name="Create Quiz" />
      <div className="px-20 w-full">
        <h6>
          Enter a topic, select a difficulty between 1-10 and number of questions between 1 and 10. Click Generate GPT
          Response when done!{" "}
        </h6>
        <div className="flex flex-row justify-center">
          <TextInput onClick={onClickHandler} onChange={onChangeHandler} disabled={!isValid || isLoading} />
          {isLoading && (
            <div className="flex items-center pl-3">
              <LoadingSpinner />
            </div>
          )}
          <SearchInput parentProp={setDifficulty} placeholder="Difficulty" />
          <SearchInput parentProp={setNoQns} placeholder="Number qns" />
          {outputMessage && (
            <Link to="/do_quiz">
              <button
                type="button"
                class="w-48 ml-5 disabled:opacity-70 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-4 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={generateQuiz}
                disabled={isLoading}
              >
                Create Quiz from Prompt
              </button>
            </Link>
          )}
        </div>

        <TextOutput text={outputMessage} />
      </div>
    </div>
  );
}
