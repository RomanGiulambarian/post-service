import { FC, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import LoginForm, { AuthFields } from "../../components/login-form";
import IndentBox from "../../components/indent-box";
import { useAppDispatch } from "../../store/store";
import { login } from "../../store/auth/actions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login: FC = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
      return;
    }
  }, [isAuth, navigate]);

  const callbacks = {
    login: useCallback(({ email, password }: AuthFields) => {
      dispath(login({ email, password }));
    }, []),
  };

  return (
    <PageLayout>
      <IndentBox marginBottom="large">
        <h1>Авторизация</h1>
      </IndentBox>
      <LoginForm login={callbacks.login} />
    </PageLayout>
  );
};

export default Login;
