import React, { useEffect, useRef, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;