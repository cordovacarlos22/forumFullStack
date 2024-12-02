import { useAuthContext } from "../hooks/useAuth";

const Home = () => {
  const { userPayload, autenticated } = useAuthContext(); // token viene del contexto

  return (
    <div>
      <h1>Home</h1>
      {autenticated ? (
        <div>
          <p>Name: {userPayload.firstName}</p>
          <p>Email: {userPayload.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
