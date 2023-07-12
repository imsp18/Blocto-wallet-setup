import './App.css';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useEffect, useState } from 'react';
import logout from './logout.svg';

  fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn")

  function App() {
    const [user, setUser] = useState();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
      fcl.currentUser().subscribe(setUser);
    }, []);

    const handleWalletToggle = () => {
      if (isConnected) {
        fcl.unauthenticate();
        setIsConnected(false);
      } else {
        fcl.authenticate();
        setIsConnected(true);
      }
    };

  return (
    <div className="App">
      <button onClick={handleWalletToggle}>
        {isConnected ? `${user?.addr}` : 'Connect Wallet'}
        {isConnected && (
          <img onClick={handleWalletToggle} src={logout} alt="Log out" />
        )}
      </button>
    </div>
  );
}

export default App;
