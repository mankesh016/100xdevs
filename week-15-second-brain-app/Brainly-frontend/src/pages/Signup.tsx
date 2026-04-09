import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("You have signed up!");
  }
  return (
    <>
      <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
        <div className="w-64 bg-white rounded-md px-6 py-8 flex flex-col gap-4">
          <Input placeholder="Username" ref={usernameRef} />
          <Input placeholder="Password" ref={passwordRef} />

          <Button
            size="md"
            type="primary"
            text="Signup"
            fullWidth={true}
            onClick={() => {
              signup();
            }}
          />
        </div>
      </div>
    </>
  );
};
