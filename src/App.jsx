import Header from "./components/Header";
import Won from "@/components/WonStatus.jsx";
import Lost from "@/components/LostStatus.jsx";
import { languages } from "../dummy/languages";
import { useState } from "react";
import clsx from "clsx";
import { getFarewellText } from "../utils";

export default function App() {
  //state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessLetters, setGuessLetters] = useState([]);

  //derived values
  const wrongGuesLength = guessLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessLetters.includes(letter));
  const isGameLost = wrongGuesLength >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessLatter = guessLetters[guessLetters.length - 1];
  const lastGuessIncorrect =
    lastGuessLatter && !currentWord.includes(lastGuessLatter);

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //mapping for languages
  const languageEl = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuesLength;
    return (
      <span
        className="px-3 py-1 rounded relative overflow-hidden"
        key={lang.name}
        style={{ background: lang.backgroundColor, color: lang.color }}
      >
        {lang.name}
        {isLanguageLost && (
          <span className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.8)]">
            ☠️
          </span>
        )}
      </span>
    );
  });

  //mapping for currentWord
  const letterEl = currentWord.split("").map((letter, index) => {
    return (
      <span
        key={index}
        className="w-10 h-10 bg-[#323232] font-semibold flex justify-center items-center border-b border-white select-none"
      >
        {guessLetters.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    );
  });

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
        disabled={isGameOver}
        className={clsx(
          "cursor-pointer w-10 h-10 flex justify-center items-center bg-[#fcba29] rounded font-semibold text-xl text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-200",
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
          {isGameOver && isGameWon && <Won />}
          {isGameOver && isGameLost && <Lost />}
          {!isGameOver && lastGuessIncorrect && (
            <p className="bg-purple-500 rounded-md px-10 py-3 border border-dashed border-purple-100 my-5">
              {getFarewellText(languages[wrongGuesLength - 1].name)}
            </p>
          )}
        </section>

        <section className="languagesSection flex flex-wrap justify-center items-center gap-3 w- px-10 my-10">
          {languageEl}
        </section>

        <section className="flex justify-center items-center gap-x-3">
          {letterEl}
        </section>

        <section className="flex flex-wrap justify-center items-center gap-3 mt-5 max-w-[500px] mx-auto">
          {keyboard}
        </section>

        <section className="newGameBtn flex justify-center mt-5">
          {isGameOver && (
            <button className="bg-blue-500 px-10 py-2 rounded capitalize text-black cursor-pointer hover:bg-blue-400 font-semibold">
              new game
            </button>
          )}
        </section>
      </main>
    </>
  );
}
