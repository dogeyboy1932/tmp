import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [connected, setConnected] = useState(false);
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  const [message, setMessage] = useState('');
  const [LoginError, setLoginError] = useState(false)
  const [LoginSuccess, setLoginSuccess] = useState(false)

  const handleConnectWallet = async () => {
    // Your logic to connect the wallet
    

    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request user's permission to connect their MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setConnected(true);
        console.log('Wallet connected successfully!');
      } else {
        console.log('MetaMask not detected. Please install MetaMask to connect your wallet.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };


  // REVISE
  const handleDisonnectWallet = async () => {
    // Your logic to connect the wallet
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Reset the connection to disconnect the wallet
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        setConnected(false);
        console.log('Wallet disconnected successfully!');
      } else {
        console.log('MetaMask not detected. Please install MetaMask to connect your wallet.');
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const handleToken1Change = (e) => {
    setToken1(e.target.value);
  };

  const handleToken2Change = (e) => {
    setToken2(e.target.value);
  };

  const handleSwap = () => {
    if (token1 && token2) {
      // Perform swap logic here
      setMessage(`Swapping ${token1} for ${token2}`);
      
      setLoginSuccess(true)
      setTimeout(() => setMessage('') , 3000);
      setTimeout(() => setLoginSuccess(false) , 3000);

    } else {
      setMessage('Please select both tokens');
      setLoginError(true)
      setTimeout(() => setMessage('') , 3000);
      setTimeout(() => setLoginError(false) , 3000);
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '2px', backgroundColor: 'orange', borderBottom: '3.5px solid black' }}>
        <div>
          <h2 style={{ fontFamily: 'cursive', fontSize: '4em', backgroundColor: 'black', color: '#e22a22', margin: '0px', display: 'inline-block', border: '4px solid #000'}}>
            UNICHAIN PROJ
          </h2>
        </div>
              
        <div style={{padding: '15px', border: '4px solid #000', backgroundColor: '#f8f8ff', display: 'block' }}>
          <h3 style={{ fontFamily: 'Bradley Hand', fontSize: '1.35em', marginTop: '10px', color: '#000'}}>
            <span style={{ color: '#ff6347' }}>By:</span>
              dogeyboy19
            {/* <span style={{ color: '#ff6347' }}>**</span> */}
          </h3>

        </div>
      </div>

      {!connected ? (
        <div style={{padding: '5px', border: '4px solid #000', backgroundColor: '#f8f8ff', display: 'block', textAlign: 'center'}}>
          <h3 style={{ fontFamily: 'Bradley Hand', fontSize: '1.35em', marginTop: '5px', color: '#000', marginBottom: '5px'}}>
            <button className="goodButton" onClick={handleConnectWallet}>Connect Wallet</button>
          </h3>
        </div>
      ) : (
        <>
          <div style={{padding: '5px', border: '4px solid #000', backgroundColor: '#f8f8ff', display: 'block', textAlign: 'center', }}>
            <h3 style={{ fontFamily: 'Bradley Hand', fontSize: '1.35em', marginTop: '5px', color: '#000', marginBottom: '5px'}}>
              <button className="badButton" onClick={handleDisonnectWallet}>Disconnect Wallet</button>
            </h3>
          </div>
          
          
          <div style={{ color: 'black', backgroundColor: 'white', textAlign: 'center', padding: "20px", border: '3.5px solid black'}}>
            <div className="select-container">
              
              
              <select className="token-select" value={token1} onChange={handleToken1Change}>
                <option value="">Select Token 1</option>
                <option value="Token A">Token A</option>  {/*RENAME THIS: IDK TOKEN NAMES*/}
                <option value="Token B">Token B</option>
                <option value="Token C">Token C</option>
                {/* Add more tokens as needed */}
              </select>
              <select className="token-select" value={token2} onChange={handleToken2Change}>
                <option value="">Select Token 2</option>
                <option value="Token A">Token A</option>
                <option value="Token B">Token B</option>
                <option value="Token C">Token C</option>
                {/* Add more tokens as needed */}
              </select>


            </div>
            <button className="swap-button" onClick={handleSwap}>Swap</button>
            <p className="message">{message}</p>

            {LoginError && (
              <div className={`notification notification-error`}>
                <div className="notification-content" backgroundColor="red">
                  Please select both tokens!
                </div>
              </div>
            )}

            {LoginSuccess && (
              <div className={`notification notification-success`}>
                <div className="notification-content" backgroundColor="red">
                  SOME COOL SHIT BOUTTA HAPPEN -- SWAP CONTRACT WAS CALLED
                </div>
              </div>
            )}

          </div>
        </>
        
      )}
    </div>
  );
};

export default App;