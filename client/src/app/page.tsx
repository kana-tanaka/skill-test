"use client";

import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to the Todo List App</h1>
      <p className="text-center">This is a simple application to manage your todos.</p>
      <p className="text-center">
        Navigate to the <a href="/todo-list">Todo List</a> to get started.
      </p>
    </div>
  );
}

export default Home;