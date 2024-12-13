import { useEffect, useRef } from "react";
const CreateComent = ({ onClick }) => {
    const textAreaRef = useRef(null)
  
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }, [])
    return (
      <div className="border-2 w-full max-w-2xl mx-auto p-4 rounded-xl border-gray-400">
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 rounded-lg border bg-gray-800 border-gray-700">
            <textarea
              id="comment"
              rows="6"
              ref={textAreaRef}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800"
              placeholder="Write a coment"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
            >
              Comentar
            </button>
            <button
              type="button"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
              onClick={onClick}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default CreateComent;
  
