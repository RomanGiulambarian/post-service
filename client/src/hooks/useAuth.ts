import { useTypedSelector } from "../store/store";

export const useAuth = () => {
  const { accessToken } = useTypedSelector((state) => state.auth);

  return {
    isAuth: !!accessToken,
  };
};
