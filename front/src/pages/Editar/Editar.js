import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import estilos from "../CadastroTasks/CadastroTasks.module.css"
import confetti from 'canvas-confetti'; // Importando a biblioteca de confetes


const Editar = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [task, setTask] = useState(null); // Armazena a tarefa
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const navigate = useNavigate(); // Para redirecionar após a edição
  const [usuarios, setUsuarios] = useState([]); // Lista de usuários
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

  // Carrega a lista de usuários da API quando o componente é montado
  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Carrega os dados da tarefa para edição
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`);
        console.log('Dados da Tarefa:', response.data); // Verifique se os dados estão sendo retornados
        const taskData = response.data;
        setTask(taskData);
        // Preenche o formulário com os dados da tarefa
        setFormData({
          usuario: taskData.usuario || "",
          descricao: taskData.descricao || "",
          setor: taskData.setor || "",
          prioridade: taskData.prioridade || "baixa",
          status: taskData.status || "a_fazer",
        });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar a tarefa:', error);
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTask();
  }, [id]);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para enviar os dados atualizados para a API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    axios.put(`http://localhost:8000/api/tasks/${id}/`, formData)
      .then(response => {
        setMsn("Tarefa atualizada com sucesso!"); // Define a mensagem
        dispararConfetes(); // Dispara os confetes
        setTimeout(() => {
          setMsn(''); // Reseta a mensagem após 2 segundos
          navigate("/gerenciar-tarefas"); // Redireciona após a mensagem desaparecer
        }, 2000);
      })
      .catch(error => {
        console.error("Erro ao atualizar a tarefa:", error);
        alert("Erro ao atualizar a tarefa. Tente novamente.");
      });
  };

  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header></Header>

      <h2 className={estilos.subtitle}>Edite sua tarefa</h2>
      <div className={estilos.containerForm}>
        <form className={estilos.form} onSubmit={handleSubmit}>
        <div className={estilos.mensagem}>
            <p>{msn}</p>
        </div>

          <div className={estilos.inputs}>
            <label className={estilos.label}>Usuário:</label>
            <select className={estilos.input} name="usuario" value={formData.usuario} onChange={handleChange} required>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.username}
                </option>
              ))}
            </select>
          </div>

          <div className={estilos.inputs}>
            <label  className={estilos.label}>Descrição da Tarefa:</label>
            <textarea className={estilos.textarea}
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className={estilos.inputs}>
            <label className={estilos.label}>Setor:</label>
            <input className={estilos.input}
              type="text"
              name="setor"
              value={formData.setor}
              onChange={handleChange}
              required
            />
          </div>

          <div className={estilos.inputsDrp}>

            <div className={estilos.gridItem}>
              <label className={estilos.label}>Prioridade:</label>
              <select className={estilos.input}
                name="prioridade"
                value={formData.prioridade}
                onChange={handleChange}
                required
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div className={estilos.gridItem}>
              <label className={estilos.label}>Status:</label>
              <select className={estilos.input}name="status" value={formData.status} onChange={handleChange} required>
                <option value="a_fazer">To Do</option>
                <option value="fazendo">In Progress</option>
                <option value="pronto">Done</option>
              </select>
            </div>
          </div>

          <div className={estilos.button}>
            <button  className={estilos.buttonSubmit} type="submit">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editar;
