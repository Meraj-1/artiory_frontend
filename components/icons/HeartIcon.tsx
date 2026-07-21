// "use client";

// // Update the import path below to the correct location of your context file
// import { useWhislistContext } from "../context/WhislistContext";
// import { Heart } from "lucide-react";
// import { useEffect, useState } from "react";

// type props = {
//   id: number;
// };

// export const HeartIcon = ({ id }: props) => {
//   const { whislistState, whislistDispatch } = useWhislistContext();
//   const [isWhisList, setIsWhisList] = useState(false);

//   useEffect(() => {
//     setIsWhisList(whislistState.some((item) => item === id));
//   }, [id, whislistState]);

//   const handleToggleWhislist = () => {
//     if (isWhisList) {
//       whislistDispatch({ type: "REMOVE_TO_WHISLIST", payload: id });
//     } else {
//       whislistDispatch({ type: "ADD_TO_WHISLIST", payload: id });
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("whislist", JSON.stringify(whislistState));
//   }, [whislistState]);

//   return (
// <div className="absolute top-2 right-2 cursor-pointer">
//   <Heart
//     onClick={handleToggleWhislist}
//     fill={isWhisList ? "#00b8a2" : "white"}
//     color={isWhisList ? "#00b8a2" : "#000"}
//   />
// </div>

//   );
// };
