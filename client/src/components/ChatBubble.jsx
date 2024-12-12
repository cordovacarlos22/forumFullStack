import chatIcon from '../assets/chatIcon.svg';

const ChatBubble = ({ onclick }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className="fixed bottom-4 right-4 z-50 bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
    >
      <img
       src={chatIcon}
        alt="chat icon"
        className='h-16 w-16' />
      lets chat
    </button>
  );
};

export default ChatBubble;
