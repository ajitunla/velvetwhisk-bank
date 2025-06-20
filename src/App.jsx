import React, { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [transactions, setTransactions] = useState([
    "Ref #9082313 – Received $10,000 from Hope Children's Home",
    "Ref #9082323 – Received $20,000 from Hope Children's Home",
    "Ref #9082363 – Received $30,000 from Hope Children's Home",
    "Ref #9082373 – Received $50,000 from Hope Children's Home",
    "Ref #9082383 – Received $40,000 from Hope Children's Home",
    "Ref #9082393 – Received $90,000 from Hope Children's Home"
  ]);
  const [balance, setBalance] = useState(240000);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = () => {
    if (emailInput && passwordInput) {
      setIsAuthenticated(true);
    }
  };

  const handleTransfer = () => {
    if (amount && recipient && pinInput) {
      const newRef = Math.floor(Math.random() * 10000000);
      const newTransaction = `Ref #${newRef} – Sent $${amount} to ${recipient}`;
      setTransactions([newTransaction, ...transactions]);
      setBalance(balance - parseFloat(amount));
      setAmount('');
      setRecipient('');
      setPinInput('');
      setShowTransferForm(false);
    }
  };

  return (
    <div>
      <div className="app-header">
        <h1>VelvetWhisk Bank</h1>
        <p>Account: Elizabeth Eads</p>
      </div>

      {!isAuthenticated ? (
        <div className="login-box">
          <h2>Login</h2>

          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Log In</button>

          <div className="login-options">
            <button>Create Account</button>
            <button>Forgot Password?</button>
          </div>
        </div>
      ) : (
        <div className="login-box">
          <p><strong>Account:</strong> Elizabeth Eads</p>
          <p><strong>Balance:</strong> ${balance.toLocaleString()}</p>

          {showTransferForm ? (
            <>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient Name"
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN"
              />
              <button onClick={handleTransfer}>Send Money</button>
              <button onClick={() => setShowTransferForm(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setShowTransferForm(true)}>Make a Transfer</button>
          )}

          <div className="transactions">
            <h3>Transaction History</h3>
            {transactions.map((t, index) => (
              <div key={index} className="transaction-item">{t}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
