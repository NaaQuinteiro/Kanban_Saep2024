// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Editar from './pages/Editar/Editar.js';
import CadastroUsers from './pages/CadastroUsers/CadastroUsers.js';
import CadastroTasks from './pages/CadastroTasks/CadastroTasks.js';
import Home from './pages/home/index.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/gerenciar-tarefas" element={<Home/>} />
                <Route path="/cadastrar-tarefas" element={<CadastroTasks/>} />
                <Route path="/cadastro-usuarios" element={<CadastroUsers />} />
                <Route path="/editar-tarefa/:id" element={<Editar />} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </Router>
    );
}

export default App;
