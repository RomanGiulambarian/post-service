import { FC, useEffect } from "react";
import Button from "../ui/button/button";
import Field from "../ui/field";
import { SubmitHandler, useForm } from "react-hook-form";

import { validEmail } from "../constants";

export interface AuthFields {
  email: string;
  password: string;
}

interface LoginFormProps {
  login: (data: AuthFields) => void;
}

const LoginForm: FC<LoginFormProps> = ({ login }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AuthFields>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<AuthFields> = (data) => {
    login(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        {...register("email", {
          required: "Email обязательное поле",
          pattern: {
            value: validEmail,
            message: "Некорректный email",
          },
        })}
        type="email"
        label="Email"
        error={errors.email}
      />
      <Field
        {...register("password", {
          required: "Пароль обязательное поле",
          minLength: {
            value: 6,
            message: "Минимальный размер пароля 6",
          },
        })}
        type="password"
        label="Пароль"
        error={errors.password}
      />
      <Button>Вход</Button>
    </form>
  );
};

export default LoginForm;
