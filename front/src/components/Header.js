import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './Header.module.css'; 
import ComputerImage from '../assets/img/Computer.png';

const Header = () => {
    return (
        <header className={estilos.header}>
            <nav className={estilos.nav}>
                <Link className={estilos.link} to="/gerenciar-tarefas">Gerenciamento de Tarefas</Link>
                <Link className={estilos.link} to="/cadastro-usuarios">Cadastro de Usuário</Link>
                <Link className={estilos.link} to="/cadastrar-tarefas">Cadastro de Tarefas</Link>
            </nav>
            <div className={estilos.img}>
                <Link className={estilos.link} to="/">
                    <img  src={ComputerImage}></img>
                </Link>
            </div>
        </header>
    );
};

export default Header;