import { useState } from 'react';

const Modal = ( { setModalOpen, selectedButton, setSelectedButton } ) => {
  const [password, setPassword] = useState('');


  return (
    <>
    {selectedButton === 'delete' && (

    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4 flex justify-center">
            Are you sure?
        </h2>
        <p>Your account will be permanently deleted.</p>
        <p>Please enter your password to confirm.</p>

        {/* Formulario */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // lógica de validación
          }}
        >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setModalOpen(false)
                setSelectedButton('overview')}} 
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
                ${password.length === 0 ? 'opacity-50 cursor-not-allowed' : '' }`
              }
              disabled={password.length === 0}
            >
              Comfirm
            </button>
          </div>
        </form>
      </div>
    </div>
    )}

    {selectedButton === "edit" && (

        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4 text-center">Edit Profile</h2>
            <p className="mb-2 text-center">Functionality under construction.</p>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setModalOpen(false)
                setSelectedButton('overview')}}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default Modal;
