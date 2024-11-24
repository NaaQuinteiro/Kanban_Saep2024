import React, { useState, useEffect } from 'react';
import axios from 'axios';
import estilos from './CadastroUsers.module.css'
import Header from '../../components/Header';

import confetti from 'canvas-confetti'; // Importando a biblioteca de confetes


function CadastroUsers() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // Estado para a mensagem
  const [msn, setMsn] = React.useState('');

  // Função que dispara os confetes
  const dispararConfetes = () => {
    confetti({
      particleCount: 100,    // Quantidade de confetes
      angle: 90,             // A direção dos confetes
      spread: 180,           // Espalhamento dos confetes
      origin: { y: 0.6 },    // Posição de origem dos confetes (um pouco abaixo da parte superior)
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'], // Cores dos confetes
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/', {
        username,
        email,
      });
      console.log('Usuário cadastrado:', response.data);
      setMsn('Cadastro concluído com sucesso')
      setUsername('');
      setEmail('');
    } catch (error) {
      console.log("Username: ", username)
      console.log("Email: ", email)
      console.error('Erro ao cadastrar usuário:', error);
      setMsn('Erro ao cadastrar usuário.')
    }
  };

   // Usando useEffect para disparar confetes quando 'msn' for atualizado
   useEffect(() => {
    if (msn) {
      dispararConfetes(); // Ativa os confetes quando a mensagem for exibida
    }
  }, [msn]);  // O efeito é disparado sempre que 'msn' mudar


  return (
    <div className={estilos.body}>

      <Header></Header>

      <main className={estilos.main}>
        <h2 className={estilos.subtitle}>Cadastre um novo usuário</h2>
        <form onSubmit={handleSubmit} className={estilos.form}>

          <div className={estilos.inputs} >
            <label className={estilos.label}  htmlFor="username">Nome:</label>
            <input className={estilos.input} 
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={estilos.inputs} >
            <label className={estilos.label} htmlFor="email">Email:</label>
            <input className={estilos.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={estilos.button}>
            <button type="submit" className={estilos.buttonSubmit}>Cadastrar</button>
          </div>
          <div className={estilos.mensagem}>
            <p>{msn}</p>
          </div>
        </form>
      </main>
    </div>
  );
}


export default CadastroUsers;
