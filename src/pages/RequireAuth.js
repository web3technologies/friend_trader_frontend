import Login from "./Login"; 

const RequireAuth = ({ children, user, handleSignIn}) => {

    if (!user) {
       return <Login handleSignIn={handleSignIn}/>;
    }
    return children;
  };

export default RequireAuth