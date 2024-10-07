import {motion} from 'framer-motion'
type CardInfo = {
    id?: number,
    title:string,
    price:number,
    thumbnail:string
}
const Card = ({title,price,thumbnail}:CardInfo) => {
  return (
    <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="border-black shadow-md p-8 h-[16rem] w-[12rem] sm:h-[19rem] sm:w-[14rem] md:h-[19rem] md:w-[14rem] rounded-2xl overflow-hidden shadow-[#7E60BF]">
        <motion.div className="bg-white w-full h-full flex flex-col rounded-md ">
          <motion.div className="relative mb-3 w-full h-[10rem] ">
            <motion.img
              src={thumbnail}
              className="object-fit relative shadow-md rounded-md"
              alt=""
            />
            <p className="absolute bottom-1 -right-3 md:font-semibold md:text-2xl underline -rotate-45 text-[#15B392] ">
              $ {price}
            </p>
          </motion.div>
          <motion.h1 className="md:font-bold md:text-lg  text-[#433878] ">{title}</motion.h1>
        </motion.div>
      </motion.div>
  )
}

export default Card