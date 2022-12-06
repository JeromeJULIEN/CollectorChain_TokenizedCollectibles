// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./NftProperty.sol";
import "./NftDigital.sol";

interface ICollectorsDAO {
    function createDAO(string memory _name) external;
}

contract Factory is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _id;

    event collectionCreated(
        uint256 collectionId,
        string collectionName,
        address propertyCollectionAddress,
        address digitalCollectionAddress
    );

    struct Collection {
        uint256 _collectionId;
        string _name;
        address _propertyCollectionAddress;
        address _digitalCollectionAddress;
    }

    Collection[] public collections;

    ICollectorsDAO collectorsDAO;

    address daoContractAddress;

    /// @dev mapping collectionName => collectionAddress
    mapping(string => address) public collectionsAddress;

    constructor(address daoAddress_) {
        daoContractAddress = daoAddress_;
        collectorsDAO = ICollectorsDAO(daoAddress_);
    }

    function createCollection(
        string memory _collectionName,
        string memory _collectionURI,
        string memory _collectionSymbol
    )
        external
        onlyOwner
        returns (address nftPropertyAddr, address nftDigitalAddr)
    {
        require(
            bytes(_collectionName).length > 0,
            "collection name should not be null"
        );
        require(
            bytes(_collectionURI).length > 0,
            "collection URI should not be null"
        );

        NftProperty nftProperty = new NftProperty(
            _id.current(),
            _collectionURI,
            daoContractAddress
        );
        NftDigital nftDigital = new NftDigital(
            _id.current(),
            _collectionName,
            _collectionSymbol,
            daoContractAddress
        );

        Collection memory newCollection;
        newCollection._collectionId = _id.current();
        newCollection._name = _collectionName;
        newCollection._propertyCollectionAddress = address(nftProperty);
        newCollection._digitalCollectionAddress = address(nftDigital);
        collections.push(newCollection);

        collectorsDAO.createDAO(_collectionName);

        emit collectionCreated(
            _id.current(),
            _collectionName,
            address(nftProperty),
            address(nftDigital)
        );

        _id.increment();

        return (address(nftProperty), address(nftDigital));
    }
}
