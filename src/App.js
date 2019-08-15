import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [todoItem, setTodoItem] = useState('');

  useEffect(() => {
    fetch('http://localhost:4567/items.json')
      .then(response => response.json())
      .then(items => {
        setLoading(false);
        setItems(items);
      });
  }, []);

  const addItem = e => {
    e.preventDefault();
    if (todoItem.length > 0) {
      fetch('http://localhost:4567/items.json', {
        method: 'POST',
        body: JSON.stringify({ item: todoItem }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(items => {
          setLoading(false);
          setItems(items);
        });

      setTodoItem('');
    }
  };

  const deleteItem = itemId => {
    fetch('http://localhost:4567/items.json', {
      method: 'DELETE',
      body: JSON.stringify({ id: itemId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(items => {
        setItems(items);
      });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">
          <img src={logo} className="App-logo" alt="logo" />
          My Todo List
        </span>
      </nav>

      <div className="px-3 py-2">
        <form className="form-inline my-3" onSubmit={addItem}>
          <div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
            <input
              className="form-control col-12"
              placeholder="What do you need to do?"
              value={todoItem}
              onChange={e => setTodoItem(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2 col-4 col-sm-2">
            Add
          </button>
        </form>

        {loading && <p>Loading...</p>}

        {!loading && items.length === 0 && (
          <div className="alert alert-secondary">No items - all done!</div>
        )}

        {!loading && items && (
          <table className="table table-striped">
            <tbody>
              {items.map((item, i) => {
                return (
                  <tr key={item.id} className="row">
                    <td className="col-1">{i + 1}</td>
                    <td className="col-10">{item.item}</td>
                    <td className="col-1">
                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => deleteItem(item.id)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
