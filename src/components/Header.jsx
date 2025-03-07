export default function Header() {
  return (
    <>
      <header className="text-center">
        <h1 className="font-medium text-xl md:text-3xl text-[#f9f4da] mb-5">Assembly: Endgame</h1>
        <p className="text-[0.875rem] max-w-[350px] text-[#8e8e8e] md:max-w-[500px] md:text-2xl">
          Guess the word within <span className="text-xl font-semibold text-green-500">8 attempts</span> to keep the programming world safe
          from Assembly.
        </p>
      </header>
    </>
  );
}
