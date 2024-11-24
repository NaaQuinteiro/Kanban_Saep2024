import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import estilos from './index.module.css';
import Header from '../../components/Header';

// Tela de gerenciamento de tarefas 
const Home = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);  // Lista de usuários
    const [tasks, setTasks] = useState([]);  // Lista de tarefas
    const [statusOptions] = useState([
        { value: 'a_fazer', label: 'To do' },
        { value: 'fazendo', label: 'In Progress' },
        { value: 'pronto', label: 'Done' }
    ]);

    // Função para buscar os usuários
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/');
            setUsuarios(response.data);  // Armazena os usuários na variável de estado
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // Função para buscar as tarefas
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error("Erro ao buscar as tarefas:", error);
        }
    };

    // Chama as funções quando o componente é montado
    useEffect(() => {
        fetchUsuarios();
        fetchTasks();
    }, []);

    // Função para buscar o nome do usuário com base no ID
    const getUserNameById = (userId) => {
        const user = usuarios.find(u => u.id === userId);  // Busca o usuário pelo ID
        return user ? user.username : 'Usuário não encontrado';  // Retorna o nome ou mensagem de erro
    };

    // Função para atualizar o status da tarefa
    const handleStatusChange = async (taskId, newStatus) => {
        console.log("ID da Tarefa:", taskId);
        console.log("Novo Status:", newStatus);

        // Encontre a tarefa que será atualizada
        const taskToUpdate = tasks.find(task => task.id === taskId);

        if (!taskToUpdate) {
            console.error("Tarefa não encontrada!");
            return;
        }

        try {
            // Enviar o objeto completo com o novo status
            const updatedTask = {
                ...taskToUpdate, // Copia todos os campos da tarefa
                status: newStatus, // Atualiza apenas o status
            };

            await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, updatedTask);

            // Atualiza a lista localmente
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? updatedTask : task
                )
            );

            alert("Status da tarefa atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o status da tarefa:", error);
            alert("Erro ao atualizar o status. Verifique os dados e tente novamente.");
        }
    };

    // Função para excluir a tarefa
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/tasks/del/${taskId}/`);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            alert("Tarefa excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
            alert("Erro ao excluir a tarefa. Tente novamente.");
        }
    };

    return (
        <div>
            <Header></Header>

            <h2 className={estilos.subtitle}>Tarefas</h2>

            <div className={estilos.gridContainer}>
                {tasks.map((task) => (
                    <div key={task.id} className={`${estilos.taskCard} ${estilos[task.status]}`}>
                        <h3 className={estilos.titleCard}>{task.descricao}</h3>
                        <p className={estilos.text}><strong>Setor:</strong> {task.setor}</p>
                        <p className={estilos.text}><strong>Prioridade:</strong> {task.prioridade}</p>
                        <p className={estilos.text}><strong>Usuário:</strong> {getUserNameById(task.usuario)}</p> {/* Exibe o nome do usuário */}
                        <p className={estilos.text}><strong>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>

                        {/* Status editável */}
                        <div className={estilos.statusContainer}>
                            <label className={estilos.label}><strong>Status:</strong></label>
                            <select
                                value={task.status} // Exibe o status atual da tarefa
                                onChange={(e) => {
                                    const newStatus = e.target.value;
                                    setTasks(prevTasks =>
                                        prevTasks.map(t =>
                                            t.id === task.id ? { ...t, status: newStatus } : t
                                        )
                                    );
                                }}
                                className={estilos.statusDropdown}
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => handleStatusChange(task.id, task.status)} // Usa o status da tarefa
                                className={estilos.updateStatus}>
                                Alterar status
                            </button>
                        </div>

                        <div className={estilos.buttonsContainer}>
                            <button onClick={() => navigate(`/editar-tarefa/${task.id}`)} // Navega para a página de edição
                                className={estilos.updateButton}>
                                    Editar
                            </button>
                            <button onClick={() => handleDeleteTask(task.id)} // Exclui a tarefa
                                className={estilos.deleteButton}>
                                    Excluir
                            </button>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {

}

export default Home;
