// // const Header = ({ courseName }) => {
// //   return <p>{courseName}</p>;
// // };

// // Type declaration for Header component props
// interface HeaderProps {
//   courseName: string;
// }

// // Header component renders the name of the course
// const Header = (courseName: HeaderProps) => {
//   return <h1>{courseName.courseName}</h1>;
// };

// export default Header;

import React from "react";

// Type declaration for Header component props
interface HeaderProps {
  courseName: string;
}

// Header component renders the name of the course
const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

export default Header;
