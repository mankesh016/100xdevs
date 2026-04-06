const Button = ({ disabled, children, onClick }) => {
  return (
    <span
      className={`flex justify-center items-center w-60 h-10 rounded-lg text-white ${disabled ? "bg-blue-300" : "bg-green-300"}`}
      onClick={() => onClick()}
    >
      {children}
    </span>
  );
};

const Input = () => {
  return (
    <input
      type="text"
      placeholder="Your Birth Year"
      className="h-10 w-60 p-5 mt-5 mb-10 bg-blue-500 rounded-md"
    />
  );
};

function Assignment() {
  function onClick() {
    console.log("continue clicked");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-blue-700">
        <div className="text-white text-2xl font-bold mb-16">
          Verity Your Age
        </div>
        <div className="text-blue-300">
          Please confirm your birth year. This data will not be stored.
        </div>
        <Input />
        <Button disabled={true} onClick={() => {}}>
          Continue
        </Button>
        <div className="italic text-sm pt-10 text-black">
          * Scroll Down to see the OTP page
        </div>
      </div>
    </>
  );
}

export default Assignment;
