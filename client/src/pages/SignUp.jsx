import { Alert, Button, Label, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { useState } from "react";
//import { set } from "mongoose";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };
  //console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-white">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* Left side */}

        <div className=" flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              GreatNess
            </span>
            Blog
          </Link>
          <p className=" text-sm mt-5">
            This is a knowledge material for Dynamics 365 Business Central where
            you can find random issues and their resolutions. You can signup
            with your email and password or Google to get access to the system.
          </p>
        </div>
        {/* Right side */}

        <div className=" flex-1">
          <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label
                value="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Name
              </Label>

              <TextInput
                id="username"
                type="text"
                //placeholder="Enter your username"
                required={true}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Enter your name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label
                value="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Email
              </Label>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                required={true}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            {/* <Label value="Your username" /> */}
            <div>
              <Label
                value="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Password
              </Label>
              <TextInput
                id="password"
                type="password"
                placeholder="Enter your password"
                required={true}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
            <Button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
              //gradientDuoTone="purpleToPink"
              pill
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Signg In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
