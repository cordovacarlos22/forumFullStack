import { Link } from 'react-router-dom';
const ForumCard = ({id, title, description}) => {
  return (
    <Link
     to={`/forum/${id}`}
     className="flex flex-col p-3 border border-gray-400 rounded-md"
     >
    <div key={id}>
      <footer className="flex items-center mb-2">
        <img
          className="mr-2 w-8 h-8 rounded-full"
          src="https://i.pinimg.com/736x/d3/5f/70/d35f709f7ecd27747a231b0da3d5c55f.jpg"
          alt={title}
        />
        <p className="text-lg font-semibold text-white">{title}</p>
      </footer>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
    </Link>
  );
};

export default ForumCard;
