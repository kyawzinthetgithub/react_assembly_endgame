import Header from "./components/Header";
import Won from "@/components/WonStatus.jsx";
import { languages } from "../dummy/languages";
import { useState } from "react";

export default function App() {
  const [currentWord, setCurrentWord] = useState("react");

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const languageEl = languages.map((lang) => (
    <span
      className="px-3 py-1 rounded"
      key={lang.name}
      style={{ background: lang.backgroundColor, color: lang.color }}
    >
      {lang.name}
    </span>
  ));

  const letterEl = currentWord.split("").map((letter, index) => (
    <span
      key={index}
      className="bg-[#323232] font-semibold flex justify-center items-center px-4 py-2 border-b border-white select-none"
    >
      {letter.toUpperCase()}
    </span>
  ));

  const keyboard = alphabet.split('').map((letter,idx) => (
    <button key={idx} type="button" className="w-10 h-10 flex justify-center items-center bg-[#fcba29] rounded font-semibold text-xl text-gray-600">{letter.toUpperCase()}</button>
  ))

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

        <section className="flex flex-wrap justify-center items-center gap-3 mt-5 max-w-[450px] mx-auto">
          {keyboard}
        </section>
      </main>
    </>
  );
}
