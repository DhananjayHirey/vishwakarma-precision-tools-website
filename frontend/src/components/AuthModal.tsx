import { X } from "lucide-react";
import React, { useState } from "react";
import AvatarSelector from "./AvatarSelector";

import { RippleButton } from "./ui/ripple-button";

function AuthModal({ setAuthModalVisible, authModalVisible }) {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const res = await fetch("/loginform", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  function handleLogin() {
    throw new Error("Function not implemented.");
  }

  function handleRegister() {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      {/* LOGIN FORM */}
      <div className="flex justify-end">
        <X
          onClick={() => setAuthModalVisible(false)}
          className="cursor-pointer"
        />
      </div>

      <div
        className={
          isLoginForm
            ? "bg-zinc-200 p-6 rounded-2xl shadow-lg w-96 flex flex-col"
            : "bg-zinc-200 p-6 rounded-2xl shadow-lg w-96  flex-col hidden"
        }
      >
        <h3 className="text-center font-bold text-2xl mb-12">LOGIN</h3>
        <input
          type="text"
          placeholder="Email"
          className="p-2 rounded-lg focus:rounded-3xl focus:ps-4 border-2 border-black mb-8  focus:bg-zinc-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded-lg focus:rounded-3xl focus:ps-4 border-2 border-black mb-8 focus:bg-zinc-300"
        />
        {/* <button className="bg-zinc-900 text-zinc-50 p-3 rounded-lg">
          Login
        </button> */}
        <RippleButton
          className={"bg-black text-white cursor-pointer"}
          duration={300}
          onClick={() => handleLogin()}
        >
          Login
        </RippleButton>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue cursor-pointer underline"
            onClick={() => setIsLoginForm(false)}
          >
            Sign Up
          </span>
        </p>
      </div>

      {/* SIGN UP FORM */}
      <div
        className={
          !isLoginForm
            ? "bg-zinc-200 p-6 rounded-2xl shadow-lg w-96 flex"
            : "bg-zinc-200 p-6 rounded-2xl shadow-lg w-96 hidden"
        }
      >
        <div className="flex flex-col">
          <div className="flex justify-end">
            <X
              onClick={() => setAuthModalVisible(false)}
              className="cursor-pointer"
            />
          </div>
          <h3 className="text-center font-bold text-2xl mb-8">Sign Up</h3>
          {preview && (
            <div className=" flex justify-center">
              <img
                src={preview}
                alt="avatar preview"
                className="w-24 h-24 object-cover rounded-full border"
              />
            </div>
          )}
          <form onSubmit={handleSubmit} className=" max-w-md mx-auto">
            <div>
              <label>Name</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg focus:rounded-3xl focus:ps-4 border-2 border-black mb-4  focus:bg-zinc-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Username</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg focus:rounded-3xl focus:ps-4 border-2 border-black mb-4  focus:bg-zinc-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                className="w-full p-2 rounded-lg focus:rounded-3xl focus:ps-4 border-2 border-black mb-4  focus:bg-zinc-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                className="p-2 rounded-lg focus:rounded-3xl focus:ps-4 border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label>Upload Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-2 border-zinc-800 self-center w-full rounded-lg bg-zinc-400 mb-4 mt-1 cursor-pointer"
              />
            </div>

            {/* Preview */}

            <RippleButton
              className={"bg-black text-white cursor-pointer w-full"}
              duration={300}
              onClick={() => handleRegister()}
            >
              Sign Up
            </RippleButton>
          </form>
        </div>
        <div>
          <p>hi</p>
        </div>
      </div>
    </>
  );
}

export default AuthModal;
