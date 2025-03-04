import { useState } from "react";
import Spinner from "./components/Spinner";
import copy from "copy-to-clipboard";
import { BsClipboard } from "react-icons/bs";

export default function Time() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    setLoading(true);

    const response = await fetch("/api/code/time", {
      method: "POST",
      body: JSON.stringify({ prompt: dataObj.prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    const formatted: any = "The time complexity of this function is " + result;
    setData(formatted);
    setLoading(false);
  };

  return (
    <div className="text-center text-sm md:text-xl">
      <div className="md:my-5 my-2  text-xl md:text-3xl">
        {" "}
        Time Complexity Calculator⌛
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="md:text-xl text-base resize rounded-md mt-5 px-2 md:px-20 md:py-5 py-3   "
          name="prompt"
          placeholder="Enter your query"
          required

        />{" "}
        <br />
        <button
          type="submit"
          className="bg-third text-base md:text-xl text-secondary mt-10 rounded  px-8 md:px-10 py-2 md:my-4 my-2 hover:bg-secondary hover:text-third border-2 border-third"
        >
          Submit
        </button>
      </form>
      {loading ? <Spinner /> : null}
      <textarea
        className="resize rounded-md  sm:w-[20rem] sm:h-[20rem] w-[21rem] h-[15rem]  md:w-[40rem] md:h-[20rem] text-center py-5 px-1 mt-10"
        value={data}
      ></textarea>
      <br />
      <button
        type="button"
        value="copy text"
        className="bg-third text-base md:text-xl cursor-pointer text-secondary mt-8 md:mt-2 rounded px-6 md:px-10 py-2 my-4 hover:bg-secondary hover:text-third border-2 border-third"
        onClick={() => {
          copy(`${data}`);
          alert("Copied to clipboard");

        }}
      >
        {" "}
        <BsClipboard className="inline" /> copy to clipboard
      </button>
    </div>
  );
}
