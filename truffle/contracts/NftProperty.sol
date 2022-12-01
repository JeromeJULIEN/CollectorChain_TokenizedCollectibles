// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// URI POUR TEST ==> "https://gateway.pinata.cloud/ipfs/QmUegKTCJ8r6td4AfT22FjJHCVMJn4fKTVCK4MH7zNM7Mn/{id}.json"

interface CollectorsDAO {
    function getProposalStatus(uint256 _daoId, uint256 _proposalId)
        external
        view
        returns (bool proposalStatus);
}

contract NftProperty is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter public _id;

    string public collectionName;
    uint256 public collectionId;

    struct PropertyNft {
        uint256 itemId;
        string name;
        uint256 value;
    }

    CollectorsDAO collectorsDAO;

    PropertyNft[] propertyNfts;

    /// @notice URI structure have to be managed from the from end in order to define custom attributes for each collection
    constructor(uint256 collectionId_, string memory collectionURI_)
        ERC1155(
            /* URI de la collection*/
            collectionURI_
        )
    {
        collectionId = collectionId_;
    }

    function setCollectorsDAO(address _address) external {
        collectorsDAO = CollectorsDAO(_address);
    }

    /// @notice function mint() mint new NFT and send it to the owner of the object
    function mint(
        uint256 _proposalId,
        string memory _name,
        uint256 _value,
        uint256 _numberOfItem
    ) public {
        // get the proposal status to allow the mint
        bool proposalStatus = collectorsDAO.getProposalStatus(
            collectionId,
            _proposalId
        );
        require(proposalStatus == true, "proposal is not accepted");

        uint256 newPropertyNftId = _id.current();
        propertyNfts.push(PropertyNft(newPropertyNftId, _name, _value));
        _mint(msg.sender, newPropertyNftId, _numberOfItem, "");
        _id.increment();
    }
}
