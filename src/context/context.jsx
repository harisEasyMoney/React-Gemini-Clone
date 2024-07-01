import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  //to save input data
  const [input, setInput] = useState("");
  //to send input filed data
  const [recentPrompt, setRecentPrompt] = useState("");
  //to store all input history and show in sidebar
  const [prevPrompts, setPrevPrompts] = useState([]);
  //used to hide cards and display result of prompt
  const [showResult, setshowResult] = useState(false);
  //used to show loading during fetching
  const [loading, setLoading] = useState(false);
  // to show result on mainpage
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setshowResult(true);
    const response = await runChat(input);
    setResultData(response);
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
