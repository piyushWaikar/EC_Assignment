import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import {motion} from 'framer-motion';
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
    y:"90rem",
    opacity:0
  },
  animate:{
    y:0,
    opacity:1,
    transition:{
      type:"spring",
      stiffness:50,
      damping:10
    },
    staggerChildren:0.2
  }
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const imgUrl =
    "https://cdn.pixabay.com/photo/2022/07/31/04/42/seat-7354939_640.png";

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "AuthContext not found. Ensure your component is wrapped with AuthContextProvider."
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login",{email,password})
      console.log("api Request res", res.data);
      toast.success("Register Successfully!")
    } catch (err) {
      console.log(err);
      toast.error("Error Registering");
    } finally {
      navigate("/login");
    }
  };

  return (
    <motion.div className="h-full w-full flex overflow-hidden">
      <motion.div className=" md:flex hidden flex-1 h-full relative ">
        <motion.img src={imgUrl} alt="" className="object-fit w-full " />
        <motion.div variants={imgTextVariants} initial='initial' animate='animate' className="absolute top-[10rem] left-10 ">
          <motion.h1 className="text-4xl text-black font-bold mb-4">
            Turn Your ideas <br /> into Reality
          </motion.h1>
          <motion.p className="text-xl text-black font-normal">
          The secret of our success is that we never, never give up.
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div className="flex flex-1 justify-between flex-col w-full bg-[#f5f5f5] ">
        <motion.div variants={formVariants} initial='initial' animate='animate' className="flex flex-col justify-between h-full p-20">
          <motion.h1 className="text-xl flex items-center gap-1 text-[#060606] font-semibold">
          <IoLogoElectron size={28} />
            E.C Assignment
          </motion.h1>
          <motion.div className="flex flex-col gap-4">
            <motion.div className="flex flex-col gap-4">
              <motion.h3 className="font-semibold text-2xl">Register</motion.h3>
              <motion.p className="text-base">
                Hello Folk's! Please Enter Your Details
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
              <motion.button className="text-white py-2 font-semibold bg-[#060606] border-2 rounded-md text-center flex items-center justify-center">
                Register
              </motion.button>
            </motion.form>
          </motion.div>
          <motion.p className="text-sm font-normal text-[#060606]">
            Already have an account ?{" "}
            <motion.span onClick={()=>navigate("/login")} className="font-semibold underline underline-offset-2 cursor-pointer">
              Sign-in
            </motion.span>{" "}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
