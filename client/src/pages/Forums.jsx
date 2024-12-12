import { ForumContext } from "../context/forum.context";
import { useContext } from "react";
import Aside from "../components/Aside";
import ForumCard from "../components/ForumCard";

const Forums = () => {
  const { forums } = useContext(ForumContext);
  console.log("foros", forums);

  return (
    <div className="flex">
      <aside className="min-h-screen w-64 bg-gray-800">
        <Aside />
      </aside>
      <main className="min-h-screen flex-1 text-white flex flex-col bg-gray-900 mt-8 justify items-center">
        <h1 className="text-3xl font-bold text-center mb-8 mt-16">New Forums</h1>
        <div className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {forums.map((forum) => (
              <ForumCard
                key={forum._id}
                title={forum.title}
                description={forum.description}
                className="bg-white rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forums;
