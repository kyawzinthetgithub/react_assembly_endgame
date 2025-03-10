import Header from "./components/Header";
import Won from "@/components/WonStatus.jsx";
import { languages } from "../dummy/languages";
import { useState } from "react";
import clsx from "clsx";

export default function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessLetters, setGuessLetters] = useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //mapping for languages
  const languageEl = languages.map((lang) => (
    <span
      className="px-3 py-1 rounded"
      key={lang.name}
      style={{ background: lang.backgroundColor, color: lang.color }}
    >
      {lang.name}
    </span>
  ));

  //mapping for currentWord
  const letterEl = currentWord.split("").map((letter, index) => (
    <span
      key={index}
      className="bg-[#323232] font-semibold flex justify-center items-center px-4 py-2 border-b border-white select-none"
    >
      {letter.toUpperCase()}
    </span>
  ));

  ////mapping for keyboard
  const keyboard = alphabet.split("").map((letter, idx) => {
    const isGuessed = guessLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    return (
      <button
        key={idx}
        type="button"
        onClick={() => addGuessLetter(letter)}
        className={clsx(
          "cursor-pointer w-10 h-10 flex justify-center items-center bg-[#fcba29] hover:bg-[#f5d182] rounded font-semibold text-xl text-gray-600",
          { "bg-green-500": isCorrect, "bg-red-500": isWrong }
        )}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const addGuessLetter = (letter) => {
    setGuessLetters((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  };

  return (
    <>
      <main>
        <section className="flex justify-center items-center">
          <Header />
        </section>
        <section className="flex justify-center w-full">
          <Won />
        </section>

        <section className="languagesSection flex flex-wrap justify-center items-center gap-3 w- px-10 mb-9">
          {languageEl}
        </section>

        <section className="flex justify-center items-center gap-x-3">
          {letterEl}
        </section>

        <section className="flex flex-wrap justify-center items-center gap-3 mt-5 max-w-[500px] mx-auto">
          {keyboard}
        </section>

        <section className="newGameBtn flex justify-center mt-5">
          <button className="bg-blue-500 px-10 py-2 rounded capitalize text-black cursor-pointer hover:bg-blue-400 font-semibold">
            new game
          </button>
        </section>
      </main>
    </>
  );
}
