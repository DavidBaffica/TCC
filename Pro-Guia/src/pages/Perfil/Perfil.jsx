import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../componentes/Navbar'; 

const Perfil = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        alert('Você saiu da conta!');
        navigate('/'); 
    };

    return (
        <div>
            <Navbar />
            
            <div className="page-container">
                
                <div className="base-card profile">
                    <h2>Meu Perfil</h2>
                    <p className="footer-text profile-description">
                        Aqui você pode gerenciar seus dados e configurações da conta.
                    </p>
                    
                    
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger" 
                    >
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Perfil;