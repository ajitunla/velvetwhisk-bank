import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [transactions, setTransactions] = useState([
    "Ref #9083213 - Received $10,000 from Hope Children's Home",
    "Ref #9083233 - Received $20,000 from Hope Children's Home",
    "Ref #9083263 - Received $30,000 from Hope Children's Home",
    "Ref #9083273 - Received $50,000 from Hope Children's Home",
    "Ref #9083283 - Received $40,000 from Hope Children's Home",
    "Ref #9083293 - Received $90,000 from Hope Children's Home"
  ]);
  const [balance, setBalance] = useState(240000);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('login');

  const handleLogin = () => {
    if (email && password) {
      setIsAuthenticated(true);
      setView('dashboard');
    } else {
      alert('Please enter email and password');
    }
  };

  const handleSignup = () => {
    if (email && password) {
      alert('Account created! Please log in.');
      setView('login');
    } else {
      alert('Enter valid email and password.');
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link sent to your email.');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('login');
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    const amountNumber = parseFloat(amount);

    if (!recipient || isNaN(amountNumber) || amountNumber <= 0) {
      alert('Please enter a valid recipient and amount.');
      return;
    }

    if (amountNumber > balance) {
      alert('Insufficient balance.');
      return;
    }

    if (pinInput !== '1952') {
      alert('Incorrect PIN.');
      return;
    }

    const refNumber = Math.floor(1000000 + Math.random() * 9000000);
    const newTransaction = `Ref #${refNumber} - Sent $${amountNumber.toFixed(2)} to ${recipient}`;
    setTransactions([newTransaction, ...transactions]);
    setBalance(balance - amountNumber);
    setRecipient('');
    setAmount('');
    setPinInput('');
    setShowTransferForm(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <header style={{ backgroundColor: '#4B0082', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>
        <h1>VelvetWhisk Bank</h1>
        <p>Account: Elizabeth Eads</p>
        {isAuthenticated && (
          <p>Account Number: 0452912038 | Routing Number: 110002938</p>
        )}
      </header>

      {view === 'login' && (
        <div style={{ backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h2>Login</h2>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 10, margin: '10px 0', width: '100%' }} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 10, margin: '10px 0', width: '100%' }} />
          <button onClick={handleLogin} style={{ padding: 10, width: '100%', backgroundColor: '#4B0082', color: 'white', border: 'none', borderRadius: 5 }}>Log In</button>
          <p style={{ marginTop: 10 }}>
            <button onClick={() => setView('signup')} style={{ marginRight: 10 }}>Create Account</button>
            <button onClick={handleForgotPassword}>Forgot Password?</button>
          </p>
        </div>
      )}

      {view === 'signup' && (
        <div style={{ backgroundColor: '#f2f2f2', padding: 20, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <h2>Sign Up</h2>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 10, margin: '10px 0', width: '100%' }} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 10, margin: '10px 0', width: '100%' }} />
          <button onClick={handleSignup} style={{ padding: 10, width: '100%', backgroundColor: '#4B0082', color: 'white', border: 'none', borderRadius: 5 }}>Register</button>
          <p style={{ marginTop: 10 }}>
            <button onClick={() => setView('login')}>Back to Login</button>
          </p>
        </div>
      )}

      {view === 'dashboard' && isAuthenticated && (
        <div>
          <div style={{ backgroundColor: '#fff', padding: 20, marginBottom: 20, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3>Account Balance</h3>
            <p style={{ fontSize: 24, margin: 0 }}>$ {balance.toFixed(2)}</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <button onClick={() => setShowTransferForm(!showTransferForm)} style={{ padding: 10, backgroundColor: '#4B0082', color: 'white', border: 'none', borderRadius: 5 }}>
              {showTransferForm ? 'Cancel Transfer' : 'Make a Transfer'}
            </button>

            {showTransferForm && (
              <form onSubmit={handleTransfer} style={{ marginTop: 15 }}>
                <input placeholder="Recipient Name" value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{ padding: 10, marginBottom: 10, width: '100%' }} />
                <input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: 10, marginBottom: 10, width: '100%' }} />
                <input placeholder="Enter PIN to Confirm" type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} style={{ padding: 10, marginBottom: 10, width: '100%' }} />
                <button type="submit" style={{ padding: 10, width: '100%', backgroundColor: '#4B0082', color: 'white', border: 'none', borderRadius: 5 }}>Confirm Transfer</button>
              </form>
            )}
          </div>

          <div style={{ backgroundColor: '#fff', padding: 20, marginBottom: 20, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3>Transaction History</h3>
            <ul>
              {transactions.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3>Bill Categories</h3>
            <ul>
              <li>Electricity</li>
              <li>Water</li>
              <li>Internet</li>
              <li>Rent</li>
            </ul>
          </div>

          <button onClick={handleLogout} style={{ marginTop: 20, padding: 10, width: '100%', backgroundColor: '#4B0082', color: 'white', border: 'none', borderRadius: 5 }}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default App;
