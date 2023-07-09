import {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import dataUser from "../data/dataUser";
import { initProduct, todoReducer } from "../reducers/CartReducer";
const AuthContext = createContext();
function AuthProvider(props) {
  const [user, setUser] = useState();
  const innit = JSON.parse(localStorage.getItem("cart"));

  const [state, dispatch] = useReducer(
    todoReducer,
    innit !== null ? innit : initProduct
  );
  const values = { user, setUser, state, dispatch };
  const [...dataUsers] = dataUser;
  useEffect(() => {
    const userDetail = () => {
      if (user) {
        dataUsers.length > 0 &&
          dataUsers.map(
            (item, index) =>
              item.username === user.username &&
              setUser({
                ...user,
                email: item.email,
                fullname: item.name.firstname + " " + item.name.lastname,
              })
          );
      }
    };
    userDetail();
  }, [localStorage.getItem("token")]);
  return (
    <AuthContext.Provider value={values} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === undefined)
    throw new Error(
      "useAuth must be use within a AuthProvider (from auth-context)"
    );
  return context;
}
export { useAuth, AuthProvider };
