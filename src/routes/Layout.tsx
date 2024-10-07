import { Outlet } from "react-router-dom";

const Layout = ({}) => {
  return (<div className="h-screen w-screen lg:w-[80vw] mx-auto ">
    <Outlet/>
  </div>);
};

export default  Layout ;
