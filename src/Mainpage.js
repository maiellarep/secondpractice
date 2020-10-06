import React from 'react';
import './App.css';
import AllArticles from './AllArticles';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';

function Mainpage() {
  return (
    <div>
        <Menu />
        <Header title="Главная страница"/>
        <AllArticles />
        <Footer />

    </div>
  );
};

export default Mainpage;
