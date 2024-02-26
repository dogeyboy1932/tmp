import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [connected, setConnected] = useState(false);
  const [token1, setToken1] = useState('');
  const [token2, setToken2] = useState('');
  const [message, setMessage] = useState('');
  const [LoginError, setLoginError] = useState(false)
  const [LoginSuccess, setLoginSuccess] = useState(false)

  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('NaN');

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

  const handleToken1Change = async (e) => {
    setToken1(e.target.value);
  };




  const handleUpdates1 = async (e) => {
    const t1 = e.target.value;
    setToken1Amount(t1);

    setToken2Amount(t1 * 2);
    

    // console.log("VALUE TO CHANGE: ", e.target.value);

    // console.log(token1Amount, "-->", token2Amount);
  }



  const handleToken2Change = async (e) => {
    setToken2Amount(token1Amount * 2)
    setToken2(e.target.value);
  };




  const handleSwap = () => {    /// YOU'LL BE FUCKING WITH THIS EREN (I think)

    console.log(token1, "->", token1Amount);
    console.log(token2, "->", token2Amount);

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
      <div style={{ textAlign: 'center', padding: '2px'}}>
        <div>
          <h2 style={{ fontFamily: 'cursive', fontSize: '4em',  color: 'white', margin: '0px', display: 'inline-block'}}>
            UNICHAIN
          </h2>
        </div>
              
        {/* <div style={{padding: '15px', border: '4px solid #000', backgroundColor: '#f8f8ff', display: 'block' }}>
          <h3 style={{ fontFamily: 'Bradley Hand', fontSize: '1.35em', marginTop: '10px', color: '#000'}}>
            <span style={{ color: '#ff6347' }}></span>
              NavBar
            {/* <span style={{ color: '#ff6347' }}>**</span> */}
          {/* </h3> */}

        {/* </div> */}
      </div>

      
      

        <>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
            
            
            <div style={{ color: 'black', padding: "10px", border: '3.5px ', borderRadius: '30px' }}>
              
              <div className="big-card" style={{ color: 'black', backgroundColor: 'grey', marginBottom: '10px' }}>
                <h3 className='tiny-label'>You Pay</h3>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    className="bubble-input" 
                    style={{ fontFamily: 'Comic Sans MS', marginBottom: '10px', marginRight: '400px' }} 
                    type="text" 
                    id="create-username" 
                    value={token1Amount} 
                    onChange={(e) => {handleUpdates1(e)}} 
                  />
                  <select 
                    className="token-select" 
                    value={token1} 
                    onChange={handleToken1Change} 
                    style={{ marginBottom: '10px' }}>
                    <option value="Choose">Choose</option>
                    <option value="Token A">Token A</option>
                    <option value="Token B">Token B</option>
                    <option value="Token C">Token C</option>
                    {/* Add more tokens as needed */}
                  </select>
                </div>

              </div>
              {/* border: '3.5px solid black', */}

              <div className="big-card" style={{ color: 'black', backgroundColor: 'grey' }}>
                <h3 className='tiny-label'> You Recieve </h3>

                <div>
                  <div className="info-box" style={{ fontFamily: 'Comic Sans MS', display: 'inline-block', marginRight: '400px'}}>
                    {token2Amount}                  
                  </div>

                  <select className="token-select" value={token2} onChange={handleToken2Change}>
                    <option value="Choose">Choose</option>
                    <option value="Token A">Token A</option>
                    <option value="Token B">Token B</option>
                    <option value="Token C">Token C</option>
                    {/* Add more tokens as needed */}
                  </select>
                </div>
              </div>
            

              <div style={{marginTop: '5px'}}> </div>


                <p className="message">{message}</p>

                {/* <div className="info-box" style={{ fontFamily: 'Comic Sans MS', marginBottom: '10px', display: 'inline-block'}}>
                  {token1Amount}                  
                </div>

                <div className="info-box" style={{ fontFamily: 'Comic Sans MS', marginBottom: '10px', display: 'inline-block'}}>
                  {token2Amount}                  
                </div> */}


            </div>
    
          </div>
          
        </> 

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '10px' }}>
          {!connected ? (
            <button className="big-card" onClick={handleConnectWallet}>Connect</button>
          ) : (
            <button className="big-card" onClick={handleSwap}>Swap</button>
          )}
        </div>
        
        
        
        
        {LoginError && (
                  <div className="notification notification-error">
                    <div className="notification-content" style={{ backgroundColor: 'red' }}>
                      Please select both tokens!
                    </div>
                  </div>
                )}

                {LoginSuccess && (
                  <div className="notification notification-success">
                    <div className="notification-content" style={{ backgroundColor: 'green' }}>
                      Swap contract was called successfully.
                    </div>
                  </div>
                )}  
    </div>
  );
};

export default App;