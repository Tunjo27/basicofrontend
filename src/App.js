import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import List from './components/Body/List';
import Item from './components/Body/Item';
import Detail from './components/Body/Detail';
import Login from './components/Body/Login';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight >= document.body.clientHeight) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (userData) => {
    setUser(userData);
  
    localStorage.setItem('user', JSON.stringify(userData));
  
    setIsModalOpen(false);
  };  

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('user');

    setUser(null);
  };

  const renderProtectedRoute = (element) => {
    if (!user) {
      return <Navigate to="/Login" />;
    }
    return element;
  };

  return (
    <Router>
      <Header user={user} onOpenModal={handleOpenModal} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<List />} />
        {isModalOpen && <Route path="/Login" element={<Login onLogin={handleLogin} isOpen={isModalOpen} onRequestClose={handleCloseModal} />} />}
        <Route path="/Items" element={renderProtectedRoute(<Item user={user} />)} />
        <Route path="/Details" element={renderProtectedRoute(<Detail user={user} />)} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      {isFooterVisible ? (
        <Footer className="footer static-footer" />
      ) : (
        <Footer className="footer scrollable-footer" />
      )}
    </Router>
  );
};

export default App;
