import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext =
  createContext();

function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  // LOAD USER
  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);

  // LOGIN
  const login = (
    userData,
    token
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

  };

  // CONTEXT VALUE
  const value = useMemo(() => ({

    user,

    login,

    logout,

  }), [user]);

  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );

}

export {
  AuthContext
};

export default AuthProvider;