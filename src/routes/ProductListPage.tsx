import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { DummyData } from "../lib/DummyData";
import Card from "../components/Card";
import { motion } from "framer-motion";

const listVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition:{
    duration:1
  } },
};

const searchBar = {
  hidden:{opacity:0},
  visible:{opacity:1, transition:{
    duration:2
  }}
}

const ProductListPage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "AuthContext not found. Ensure your component is wrapped with AuthContextProvider."
    );
  }
  const { currentUser } = authContext;

  const [list, setList] = useState(DummyData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filterData = DummyData.filter((data) =>
      data.thumbnail.toLowerCase().includes(search.toLowerCase())
    );
    setList(filterData);
  }, [search]);

  return (
    <motion.div className="flex flex-col justify-center w-full items-center gap-8 pb-8">
      <motion.h1 className="text-center text-slate-500 text-lg font-semibold">You are logged in as {currentUser?.email}</motion.h1>
      <motion.input
        type="text"
        placeholder="Search ..."
        className="border-2 border-[#7E60BF] focus:outline-blue-700 rounded-md px-4 py-2 w-[80%] sm:w-[60%] md:w-[40%] "
        onChange={(e) => setSearch(e.target.value)}
        variants={searchBar}
        initial='hidden'
        animate='visible'
      />
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {list.map((data) => (
          <Card
            key={data.id}
            title={data.title}
            thumbnail={data.thumbnail}
            price={data.price}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProductListPage;
