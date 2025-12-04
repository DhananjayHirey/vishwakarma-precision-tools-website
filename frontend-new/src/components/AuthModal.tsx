import { X } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../../../frontend/src/components/ui/input";
import { RippleButton } from "../../../frontend/src/components/ui/ripple-button";
import { toast } from "sonner";
import { useApi } from "@/api/useFetch";
import { login } from "@/api/auth.api";

function AuthModal({ setAuthModalVisible, authModalVisible }) {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { call: loginCall, data: loginData, loading: loginLoading, error: loginError } = useApi(login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
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
    // throw new Error("Function not implemented.");
    loginCall({ email, password })
  }

  async function handleRegister() {
    // throw new Error("Function not implemented.");
    // e.preventDefault()
    const addressObject = {
      fullName: fullname,
      phone: phone,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
    };

    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", JSON.stringify(addressObject));

    if (avatar) {
      formData.append("avatar", avatar);
    }
    const url = import.meta.env.VITE_SERVER_URL;

    const res = await fetch(url + "/api/users/register", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      {/* LOGIN FORM */}
      <div className="flex flex-col bg-zinc-200 p-6 rounded-2xl">
        <div className="flex justify-end">
          <X
            onClick={() => setAuthModalVisible(false)}
            className="cursor-pointer"
          />
        </div>
        <div>
          <div
            className={
              isLoginForm
                ? "  w-96  flex flex-col"
                : "  w-96    flex-col hidden"
            }
          >
            <h3 className="text-center font-bold text-2xl mb-12">LOGIN</h3>
            <Input
              type="text"
              placeholder="Email"
              className="p-2 rounded-lg   border-2 border-black mb-8  focus:bg-zinc-300"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              className="p-2 rounded-lg   border-2 border-black mb-8 focus:bg-zinc-300"
              onChange={(e) => setPassword(e.target.value)}
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
          <div className={!isLoginForm ? "     flex" : "    hidden"}>
            <div className="flex flex-col">
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
                  <Input
                    type="text"
                    className="w-full p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Username</label>
                  <Input
                    type="text"
                    className="w-full p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  <Input
                    type="email"
                    className="w-full p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label>Password</label>
                  <Input
                    type="password"
                    className="p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Avatar Upload */}
                <div>
                  <label>Upload Avatar</label>
                  <Input
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
            <div
              className={
                avatar ? "mt-19 flex flex-col ms-4" : "mt-16 flex flex-col ms-4"
              }
            >
              <div>
                <label>Full name</label>
                <Input
                  type="text"
                  className="p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Phone</label>
                <Input
                  type="text"
                  className="p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Street</label>
                <Input
                  type="text"
                  className="p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>City</label>
                <Input
                  type="text"
                  className="p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>State</label>
                <Input
                  type="text"
                  className="p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>ZIP Code</label>
                <Input
                  type="text"
                  className="p-2 rounded-lg   border-2 border-black mb-4  focus:bg-zinc-300 w-full"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIGN UP FORM */}
    </>
  );
}

export default AuthModal;
