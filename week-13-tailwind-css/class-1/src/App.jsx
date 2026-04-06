import "./App.css";
import "./output.css";

function App() {
  return (
    <>
      <div className="flex justify-around">
        <div>hi there</div>
        <div>how are you doing</div>
        <div>all good?</div>
      </div>

      <div className="grid grid-cols-12">
        <div className="bg-yellow-200 col-span-5">hi there</div>
        <div className="bg-pink-300 col-span-5">how are you doing</div>
        <div className="bg-lime-400 col-span-2"> all good?</div>
      </div>

      <div className="sm:bg-yellow-300 md:bg-green-300 lg:bg-red-300 bg-cyan-300">
        <div>Tailwind css is mobile first.</div>
      </div>

      <div className="grid md:grid-cols-8 sm:grid-cols-4 grid-cols-2">
        <div className="bg-yellow-300 md:col-span-2 col-span-2">hi there</div>
        <div className="bg-pink-300 md:col-span-2 col-span-2">
          how are you doing
        </div>
        <div className="bg-lime-300 md:col-span-2 col-span-2"> all good?</div>
        <div className="bg-cyan-300 md:col-span-2 col-span-2"> all good?</div>
      </div>

      <div className="bg-[#0cd]">Custom backgroud color</div>
      <div className="bg-red-600">Red 600</div>
      <div className="bg-red-500">
        Red 500 : need server restart, overwritten with blue, in
        tailwind.config.js
      </div>
      <div className="bg-red-400">Red 400</div>
    </>
  );
}

export default App;
