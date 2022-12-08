// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./NftProperty.sol";
import "./NftDigital.sol";

interface ICollectorsDAO {
    function createDAO(string memory _name) external;
}

/// @notice This contract manage the creation of new type of object collection on collectorChain
/// @notice each collection creation will create : 1 sub dao, 1 ERC1155collection (propertt nft), 1 ERC721 collection(digital nft)
/// @dev subDao, 1155 and 721 collection will be linked by a unique id for each colllction
contract Factory is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _id;

    event collectionCreated(
        uint256 collectionId,
        string collectionName,
        address propertyCollectionAddress,
        address digitalCollectionAddress
    );

    /// @dev main information stored for each collections
    struct Collection {
        uint256 _collectionId;
        string _name;
        address _propertyCollectionAddress;
        address _digitalCollectionAddress;
    }

    Collection[] public collections;

    /// @dev used to avoid twice collection in createCollection require
    mapping(string => bool) collectionName;

    ICollectorsDAO collectorsDAO;

    address daoContractAddress;

    /// @dev get the dao contract address to be able to create subDao
    constructor(address daoAddress_) {
        daoContractAddress = daoAddress_;
        collectorsDAO = ICollectorsDAO(daoAddress_);
    }

    /// @notice function that create the subDao, 1155 and 721 collection
    /// @notice only owner of the contract can do it
    /// @param _collectionName Type of object
    /// @param _collectionURI URI for 1155 collection
    /// @param _collectionSymbol symbol of the token for the collection. Should be the same for all the collections
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
        require(
            collectionName[_collectionName] == false,
            "collection already created"
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

        collectionName[_collectionName] = true;

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
