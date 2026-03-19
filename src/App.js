import React, { useState } from 'react';
import './App.css';

function App() {
  const [totes, setTotes] = useState([]);
  const [newToteName, setNewToteName] = useState('');
  const [selectedToteId, setSelectedToteId] = useState(null);
  const [newItemName, setNewItemName] = useState('');

  const createTote = (e) => {
    e.preventDefault();
    if (!newToteName.trim()) return;
    const newTote = {
      id: Date.now().toString(), // simple unique ID
      name: newToteName.trim(),
      contents: []
    };
    setTotes([...totes, newTote]);
    setNewToteName('');
  };

  const addItemToTote = (e) => {
    e.preventDefault();
    if (!newItemName.trim() || !selectedToteId) return;
    
    setTotes(totes.map(tote => {
      if (tote.id === selectedToteId) {
        return { ...tote, contents: [...tote.contents, newItemName.trim()] };
      }
      return tote;
    }));
    setNewItemName('');
  };

  const removeItemFromTote = (toteId, indexToRemove) => {
    setTotes(totes.map(tote => {
      if (tote.id === toteId) {
        return { 
          ...tote, 
          contents: tote.contents.filter((_, index) => index !== indexToRemove) 
        };
      }
      return tote;
    }));
  };

  const selectedTote = totes.find(t => t.id === selectedToteId);

  return (
    <div className="App" style={{ padding: '20px', display: 'flex', gap: '40px', textAlign: 'left', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Totes List Section */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>My Totes</h2>
        <form onSubmit={createTote} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={newToteName} 
            onChange={e => setNewToteName(e.target.value)} 
            placeholder="New Tote Name" 
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Tote
          </button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {totes.map(tote => (
            <li 
              key={tote.id} 
              style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                marginBottom: '15px', 
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: selectedToteId === tote.id ? '#e3f2fd' : 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => setSelectedToteId(tote.id)}
            >
              <div>
                <h3 style={{ margin: '0 0 10px 0' }}>{tote.name}</h3>
                <p style={{ margin: 0, color: '#666' }}>Items: {tote.contents.length}</p>
              </div>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${tote.id}`} 
                alt={`QR Code for ${tote.name}`} 
                style={{ borderRadius: '4px' }}
              />
            </li>
          ))}
          {totes.length === 0 && <p style={{ color: '#666' }}>No totes created yet. Create one above!</p>}
        </ul>
      </div>

      {/* Tote Details Section */}
      <div style={{ flex: 2, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {selectedTote ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '30px' }}>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedTote.id}`} 
                alt={`QR Code for ${selectedTote.name}`} 
                style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}
              />
              <div>
                <h2 style={{ marginTop: 0 }}>Tote Details: {selectedTote.name}</h2>
                <p style={{ color: '#666' }}>ID: {selectedTote.id}</p>
              </div>
            </div>
            
            <h3>Contents</h3>
            <form onSubmit={addItemToTote} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={newItemName} 
                onChange={e => setNewItemName(e.target.value)} 
                placeholder="New Item Name" 
                style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Add Item
              </button>
            </form>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              {selectedTote.contents.map((item, index) => (
                <li key={index} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item}</span>
                  <button 
                    onClick={() => removeItemFromTote(selectedTote.id, index)}
                    style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </li>
              ))}
              {selectedTote.contents.length === 0 && <p style={{ color: '#666' }}>This tote is currently empty.</p>}
            </ul>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#666' }}>
            <h2>Select a tote to view and edit its contents</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;