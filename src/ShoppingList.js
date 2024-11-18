import React, { useState } from 'react';
import ShoppingListItem from './ShoppingListItem';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState('My Shopping List');
  const [newItem, setNewItem] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), name: newItem, resolved: false }]);
      setNewItem('');
    }
  };

  const handleToggleResolved = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, resolved: !item.resolved } : item));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return filter === 'resolved' ? item.resolved : !item.resolved;
  });

  return (
      <div>
        {/* List name */}
        <h2>{listName}</h2>

        {/* Add new item */}
        <div>
          <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add a new item"
          />
          <button onClick={handleAddItem}>Add</button>
        </div>

        {/* Filter */}
        <div>
          <label>
            <input
                type="radio"
                name="filter"
                checked={filter === 'all'}
                onChange={() => setFilter('all')}
            />
            All
          </label>
          <label>
            <input
                type="radio"
                name="filter"
                checked={filter === 'unresolved'}
                onChange={() => setFilter('unresolved')}
            />
            Only unchecked
          </label>
          <label>
            <input
                type="radio"
                name="filter"
                checked={filter === 'resolved'}
                onChange={() => setFilter('resolved')}
            />
            Only checked
          </label>
        </div>

        {/* Item list*/}
        <ul>
          {filteredItems.map(item => (
              <ShoppingListItem
                  key={item.id}
                  item={item}
                  onToggleResolved={handleToggleResolved}
                  onDelete={handleDeleteItem}
              />
          ))}
        </ul>
      </div>
  );
}

export default ShoppingList;

