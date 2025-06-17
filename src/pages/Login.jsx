import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import CardContent from '../components/CardContent';
import Button from '../components/Button';
import DarkModeToggle from '../components/DarkModeToggle';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();

  const [inputName, setInputName] = useState('');
  const [password, setPassword] = useState('');
  const { setUserName } = useContext(UserContext);
  const [errors, setErrors] = useState({ userName: '', password: '' });

  const handleLogin = () => {
    let valid = true;
    const newErrors = { userName: '', password: '' };

    if (inputName.length < 3) {
      newErrors.userName = 'O nome de usuário deve ter no mínimo 3 caracteres.';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setUserName(inputName);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-500 ease-in-out">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-xl font-bold">Login</h1>

          <div className="flex flex-col gap-4 w-full px-6">
            <input
              className="border-b-2 bg-transparent py-2 px-1 text-base text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Digite seu nome de usuário"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            {errors.userName && <span className="text-red-500 text-sm">{errors.userName}</span>}

            <input
              className="border-b-2 bg-transparent py-2 px-1 text-base text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className="w-full mt-4">
            <Button className="w-full" onClick={handleLogin}>Entrar</Button>
          </div>
        </CardContent>
      </Card>

      <DarkModeToggle isHide={true}></DarkModeToggle>
    </div>
  );
};

export default Login;
