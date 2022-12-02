import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Main from './components/Main';
import Web3 from 'web3';
import { initMarketplace } from './store/actions/marketplace';
import Menu from './components/Menu';
import { initFactory } from './store/actions/factory';
import { initDAO } from './store/actions/dao';

function App() {

  const marketplaceArtifact = useSelector(state => state.marketplace.artifact);
  const factoryArtifact = useSelector(state => state.factory.artifact);
  const daoArtifact = useSelector(state => state.dao.artifact);
  const dispatch = useDispatch();
  // initialization of marketplace contract
  const initMarketplaceContract = useCallback(
    async marketplaceArtifact => {
      if (marketplaceArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = marketplaceArtifact;
        let address, contract, owner;
        try {
          address = marketplaceArtifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          // owner = await contract.methods.owner().call()
          // console.log("owner =>",owner);
        } catch (err) {
          console.error(err);
        }
        dispatch(initMarketplace(marketplaceArtifact, web3, accounts, networkID, contract,owner));

      }
    }, []);
  
  // initialization of factory contract
  const initFactoryContract = useCallback(
    async factoryArtifact => {
      if (factoryArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = factoryArtifact;
        let address, contract, owner;
        try {
          address = factoryArtifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          // owner = await contract.methods.owner().call()
          // console.log("owner =>",owner);
        } catch (err) {
          console.error(err);
        }
        dispatch(initFactory(factoryArtifact, web3, accounts, networkID, contract,owner));

      }
    }, []);

  // initialization of factory contract
  const initDaoContract = useCallback(
    async daoArtifact => {
      if (daoArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = daoArtifact;
        let address, contract, owner;
        try {
          address = daoArtifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          // owner = await contract.methods.owner().call()
          // console.log("owner =>",owner);
        } catch (err) {
          console.error(err);
        }
        dispatch(initDAO(daoArtifact, web3, accounts, networkID, contract,owner));

      }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        console.log("before init marketplace");
        var artifact = require("./contracts/MarketPlace.json");
        initMarketplaceContract(artifact);
        console.log("before init factory");

        artifact = require("./contracts/Factory.json");
        initFactoryContract(artifact);
        console.log("before init dao");

        artifact = require("./contracts/CollectorsDAO.json");
        initDaoContract(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [initMarketplaceContract, initFactoryContract, initDaoContract]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      initMarketplaceContract(marketplaceArtifact);
      initFactoryContract(factoryArtifact);
      initDaoContract(daoArtifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [initMarketplaceContract, marketplaceArtifact, initFactoryContract, factoryArtifact, initDaoContract, daoArtifact]);


  return (
    <div className="App">
      <header className="App-header">
        <Menu />
        <Main />
      </header>
    </div>
  );
}

export default App;
