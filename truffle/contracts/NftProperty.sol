// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// URI POUR TEST ==> "https://gateway.pinata.cloud/ipfs/QmUegKTCJ8r6td4AfT22FjJHCVMJn4fKTVCK4MH7zNM7Mn/{id}.json"

interface CollectorsDAO {
    function getProposalStatus(uint256 _proposalId)
        external
        view
        returns (bool proposalStatus);

    function updatePropertyMintStatus(uint256 _proposalId) external;
}

/// @notice this contract manage the ERC1155 collection of each collector chain collections
/// @notice (for Jury) IPFS upload not managed yet
contract NftProperty is ERC1155URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _id;

    string public collectionName;
    uint256 public _collectionId;

    struct PropertyNft {
        uint256 collectionId;
        uint256 nftId;
        string name;
        uint256 value;
        address minter;
        string image;
    }

    CollectorsDAO collectorsDAO;

    PropertyNft[] public propertyNfts;

    /// @notice URI structure have to be managed from the front end in order to define custom attributes for each collection
    constructor(
        uint256 collectionId_,
        string memory collectionURI_,
        address daoContractAddress_
    )
        ERC1155(
            /* URI de la collection*/
            collectionURI_
        )
    {
        _collectionId = collectionId_;
        collectorsDAO = CollectorsDAO(daoContractAddress_);
    }

    /// @notice function mint() mint new NFT and send it to the owner of the object
    /// @notice 100 NFTs will be mint each time (managed by front end)
    function mintPropertyNft(
        uint256 _proposalId,
        string memory _name,
        uint256 _value,
        uint256 _numberOfItem,
        address _minter,
        string memory _image
    ) external {
        // get the proposal status to allow the mint
        bool proposalStatus = collectorsDAO.getProposalStatus(_proposalId);
        require(proposalStatus == true, "proposal is not accepted");

        uint256 newPropertyNftId = _id.current();
        propertyNfts.push(
            PropertyNft(
                _collectionId,
                newPropertyNftId,
                _name,
                _value,
                _minter,
                _image
            )
        );
        _mint(msg.sender, newPropertyNftId, _numberOfItem, "");
        _id.increment();
        collectorsDAO.updatePropertyMintStatus(_proposalId);
    }

    function getCollectionId() external view returns (uint256) {
        return _collectionId;
    }
}
