// Type declaration for Content component props
interface ContentProps {
  courseParts: { name: string; exerciseCount: number }[];
}

// Content component renders the name of the course
// const Content = (courseParts: ContentProps) => {
//   return (
//     <div>
//       {courseParts.map((part, index) => (
//         <p key={index}>
//           {part.name} {part.exerciseCount}
//         </p>
//       ))}
//     </div>
//   );
// };

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
