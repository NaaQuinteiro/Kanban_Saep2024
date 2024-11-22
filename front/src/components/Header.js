import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './Header.css'; 

const Header = ({ title }) => {
    return (
        <header className='header'>
            <h1>{title}</h1> {/* O título será passado como prop */}
            <nav className="nav">
                <Link className="Link" to="/cadastro-usuarios">Cadastro de Usuários</Link>
                <Link className="Link" to="/cadastrar-tarefas">Cadastro de Tarefas</Link>
                <Link className="Link" to="/gerenciar-tarefas">Gerenciamento de Tarefas</Link>
            </nav>
        </header>
    );
};

export default Header;