import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Main from './components/Main';
import Web3 from 'web3';
import { initWeb3 } from './store/actions/web3';

function App() {
  
  const artifact = require("./contracts/SimpleStorage.json");
    const dispatch = useDispatch();
    useEffect(()=> {
        // initialization of web3 constants
        const init = async() => {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
            const accounts = await web3.eth.requestAccounts();
            // console.log("accounts ==>", accounts);
            const networkID = await web3.eth.net.getId();
            // console.log("networkID ==>", networkID)
            const { abi } = artifact;
            let address, contract;
            // console.log("ABI ==>", abi)
            try {
              address = artifact.networks[networkID].address;
              // console.log('address ==>', address)
              contract = new web3.eth.Contract(abi, address);
              // console.log("contract ==>", contract)
            } catch (err) {
              console.error(err);
            }
            dispatch(initWeb3(artifact, web3, accounts, networkID, contract));
            ;

        };

        init()
    },[])
  
  return (
    <div className="App">
      <header className="App-header">
        <Main />
      </header>
    </div>
  );
}

export default App;
