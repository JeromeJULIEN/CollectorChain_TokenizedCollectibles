import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Marketplace from './components/Marketplace';
import Web3 from 'web3';
import { initMarketplace } from './store/actions/marketplace';
import { initFactory } from './store/actions/factory';
import { initDAO } from './store/actions/dao';
import {Routes, Route} from 'react-router-dom';
import Collection from './components/Collection';
import Home from './components/HomePage';
import MenuMain from './components/Menu/MenuMain';
import { initWeb3 } from './store/actions/web3';
import HowItWorks from './components/HowItWorks';
import Portfolio from './components/Portfolio';
import Dao from './components/Dao';
import Mint from './components/Mint';
import Admin from './components/Admin';
import DaoProposal from './components/DaoProposal';
import { addCollection, deleteAllCollections } from './store/actions/collections';
import Footer from './components/footer';

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
          owner = await contract.methods.owner().call()
          // console.log("owner =>",owner);
        } catch (err) {
          console.error(err);
        }
        dispatch(initWeb3(web3, accounts, networkID))
        dispatch(initMarketplace(marketplaceArtifact, contract, owner));

      }
    }, []);
  
  // initialization of factory contract
  const initFactoryContract = useCallback(
    async factoryArtifact => {
      if (factoryArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const networkID = await web3.eth.net.getId();
        const { abi } = factoryArtifact;
        let address, contract, owner;
        try {
          address = factoryArtifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          owner = await contract.methods.owner().call()
          // console.log("owner =>",owner);
        } catch (err) {
          console.error(err);
        }
        dispatch(initFactory(factoryArtifact, contract, owner));

      }
    }, []);

  // initialization of factory contract
  const initDaoContract = useCallback(
    async daoArtifact => {
      if (daoArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const networkID = await web3.eth.net.getId();
        const { abi } = daoArtifact;
        let address, contract, owner;
        try {
          address = daoArtifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          owner = await contract.methods.owner().call()
          // console.log("owner =>",owner);
        } catch (err) {
          console.error(err);
        }
        dispatch(initDAO(daoArtifact, contract, owner));

      }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        var artifact = require("./contracts/MarketPlace.json");
        initMarketplaceContract(artifact);

        artifact = require("./contracts/Factory.json");
        initFactoryContract(artifact);

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

   //! :::: GESTION EVENT COLLECTION CREATED :::::
   const factoryContract=useSelector(state =>state.factory.contract)
   useEffect(()=> {
    if(factoryContract !== null){
        (async () => {
            // COLLECTION ADDED
            let collectionCreationEvent = await factoryContract.getPastEvents('collectionCreated',{
                fromBlock : 0,
                toBlock:'latest'
            });
            let oldCollectionCreationEvent=[];
            collectionCreationEvent.forEach(event => {
                oldCollectionCreationEvent.push(
                    {
                        collectionName : event.returnValues.collectionName,
                        propertyCollectionAddress : event.returnValues.propertyCollectionAddress, 
                        digitalCollectionAddress : event.returnValues.digitalCollectionAddress
                    });
            });
            dispatch(deleteAllCollections());
            oldCollectionCreationEvent.forEach(collection => {
                dispatch(addCollection(collection.collectionName, collection.propertyCollectionAddress, collection.digitalCollectionAddress))});
            

            // console.log("event CCreated =>", collectionCreationEvents);
        })()
    };

}, [/*collectionCount,*/ factoryContract])


  return (
    <div className="App">
      <header className="App-header">
        <MenuMain />
      </header>
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/marketplace" element={<Marketplace />}/> 
          <Route path="/collection/:id" element={<Collection />}/> 
          <Route path="/howitworks" element={<HowItWorks />}/> 
          <Route path="/portfolio" element={<Portfolio />}/> 
          <Route path="/dao" element={<Dao />}/> 
          <Route path="/daoProposal/:id" element={<DaoProposal />}/> 
          <Route path="/mint" element={<Mint />}/> 
          <Route path="/admin" element={<Admin />}/> 
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
