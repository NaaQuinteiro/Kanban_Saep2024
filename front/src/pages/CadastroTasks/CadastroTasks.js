// Task.js
import React, { useState, useEffect } from "react";
import estilos from './CadastroTasks.module.css';
import axios from "axios";
import Header from "../../components/Header";

import confetti from 'canvas-confetti'; // Importando a biblioteca de confetes


const CadastroTasks = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    usuario: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

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

  // Carrega a lista de usuários e observa mudanças no estado 'msn'
  useEffect(() => {
    // Carrega a lista de usuários da API
    axios.get("http://localhost:8000/api/users/")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));

    // Dispara confetes quando 'msn' muda e não está vazio
    if (msn) {
      dispararConfetes(); // Ativa os confetes
    }
  }, [msn]); // O useEffect será executado quando 'msn' mudar

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    axios.post("http://localhost:8000/api/tasks/", formData)
      .then(response => {
        setMsn('Tarefa Cadastrada com sucesso!'); // Define a mensagem
        setFormData({
          usuario: "",
          descricao: "",
          setor: "",
          prioridade: "baixa",
          status: "a_fazer",
        });
  
        // Reseta a mensagem após 2 segundos
        setTimeout(() => {
          setMsn('');
        }, 2000);
      })
      .catch(error => console.error("Erro ao cadastrar tarefa:", error));
  };

  return (
    <div>

      <Header></Header>

      <h2 className={estilos.subtitle}>Cadastre uma nova tarefa</h2>

      <div className={estilos.containerForm}>
        <form className={estilos.form} onSubmit={handleSubmit}>
        <div className={estilos.mensagem}>
            <p>{msn}</p>
        </div>
          <div className={estilos.inputs}>
            <label className={estilos.label}>Usuário:</label>
            <select className={estilos.input} name="usuario" value={formData.usuario} onChange={handleChange} required>
              <option value="">Selecione um usuário</option>
              {usuarios.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>

          <div className={estilos.inputs}>
            <label className={estilos.label}>Descrição da Tarefa:</label>
            <textarea className={estilos.textarea} name="descricao" value={formData.descricao} onChange={handleChange} required />
          </div>

          <div className={estilos.inputs}>
            <label className={estilos.label}>Setor:</label>
            <input className={estilos.input} type="text" name="setor" value={formData.setor} onChange={handleChange} required />
          </div>

          <div className={estilos.inputsDrp}>
            
            <div className={estilos.gridItem}>
              <label className={estilos.label}>Prioridade:</label>
              <select className={estilos.input} name="prioridade" value={formData.prioridade} onChange={handleChange} required>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className={estilos.gridItem}>
              <label className={estilos.label}>Status:</label>
              <select className={estilos.input} name="status" value={formData.status} onChange={handleChange} required>
                <option value="a_fazer">To Do</option>
                <option value="fazendo">In Progress</option>
                <option value="pronto">Done</option>
              </select>
            </div>
          </div>
          <div className={estilos.button}>
            <button className={estilos.buttonSubmit} type="submit">Cadastrar Tarefa</button>
          </div>
        
        </form>
      </div>
    </div>
  );
};

export default CadastroTasks;
