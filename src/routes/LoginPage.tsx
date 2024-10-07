import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { motion } from "framer-motion";
import { IoLogoElectron } from "react-icons/io5";
import { toast } from "react-toastify";

const imgTextVariants = {
  initial:{
    x:"-100rem",
    opacity:0
  },
  animate:{
    x:0,
    opacity:1,
    transition:{
      type:"spring",
      stiffness:50,
      damping:10
    }
  }
}

const formVariants = {
  initial:{
    x:"100rem",
    opacity:0
  },
  animate:{
    x:0,
    opacity:1,
    transition:{
      type:"spring",
      stiffness:50,
      damping:10
    },
    staggerChildren:0.2
  }
}

const LoginPage = () => {
  const navigate = useNavigate();
  const imgUrl =
    "https://cdn.pixabay.com/photo/2023/03/02/16/34/living-room-7825796_640.jpg";

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "AuthContext not found. Ensure your component is wrapped with AuthContextProvider."
    );
  }
  const { updateUser } = authContext;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password,
      });

      if (!res.data.error) {
        console.log(res.data);
        updateUser(res.data);
        // const userRes = await apiRequest.get("/api/me");
        // console.log("API Request Success:", userRes.data);
        // const emailStr = email as string;
        // const passwordStr = password as string;

        // const user = { email: emailStr, password: passwordStr };
        // updateUser(user);
        const token = localStorage.getItem('authToken');
        console.log("gokken",token)
        fetch('https://intern-task-api.bravo68web.workers.dev/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        toast.success("Login Successfully !")
        navigate("/productList");
      } else {
        console.log("Invalid login credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };
  return (
    <motion.div className="h-full w-full flex overflow-hidden">
      <motion.div className="hidden flex-1 h-full relative md:flex ">
        <motion.img src={imgUrl} alt="" className="object-fit w-full " />
        <motion.div variants={imgTextVariants} initial="initial" animate="animate" className="absolute top-[10rem] left-10 ">
          <motion.h1 className="text-4xl text-white font-bold mb-4">
            Turn Your ideas <br /> into Reality
          </motion.h1>
          <motion.p className="text-xl text-white font-normal">
          The secret of our success is that we never, never give up.
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-1 justify-between flex-col w-full bg-[#f5f5f5] ">
        <motion.div variants={formVariants} initial="initial" animate="animate" className="flex flex-col justify-between h-full p-20">
          <motion.h1 className="text-xl flex gap-1 text-[#060606] font-semibold">
          <IoLogoElectron size={28} />
          E.C Assignment
          </motion.h1>
          <motion.div className="flex flex-col gap-4">
            <motion.div className="flex flex-col gap-4">
              <motion.h3 className="font-semibold text-2xl">Login</motion.h3>
              <motion.p className="text-base">
                Welcome Back! Please Enter Your Details
              </motion.p>
            </motion.div>
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col w-[80%] justify-center gap-4 mt-1"
            >
              <motion.input
                type="text"
                placeholder="Email"
                name="email"
                required
                className="w-full text-black py-2 bg-transparent border-b focus:border-black outline-none focus:outline-none"
              />
              <motion.input
                type="password"
                placeholder="Password"
                name="password"
                required
                className="w-full text-black py-2 bg-transparent border-b focus:border-black outline-none focus:outline-none"
              />
              <motion.div className="flex items-center">
                <motion.label className="flex items-center">
                  <motion.input
                    type="checkbox"
                    name="check"
                    className="w-4 h-4 mr-2"
                    checked
                    disabled
                  />
                  <motion.p className="text-sm">
                    Remember me for 30 days
                  </motion.p>
                </motion.label>
              </motion.div>

              <motion.button className="text-white py-2 font-semibold bg-[#060606] border-2 rounded-md text-center flex items-center justify-center">
                Login
              </motion.button>
            </motion.form>
            <motion.button
              onClick={() => navigate("/register")}
              className="py-2 text-[#060606] font-semibold bg-white border-black border-2 rounded-md w-[80%] "
            >
              Register
            </motion.button>
          </motion.div>
          <p className="text-sm font-normal text-[#060606]">
            Don't have a account ?{" "}
            <span
              onClick={() => navigate("/register")}
              className="font-semibold underline underline-offset-2 cursor-pointer"
            >
              Sign-up
            </span>{" "}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
