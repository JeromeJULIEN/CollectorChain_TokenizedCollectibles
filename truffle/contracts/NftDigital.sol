// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

interface IICollectorsDAO {
    function getProposalStatus(uint256 _daoId, uint256 _proposalId)
        external
        view
        returns (bool proposalStatus);
}

contract NftDigital is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _id;

    string collectionName;
    string collectionSymbol;
    uint256 collectionId;

    struct DigitalNft {
        uint256 nftId;
        string nftName;
    }

    IICollectorsDAO collectorsDAO;

    DigitalNft[] digitalNfts;

    constructor(
        uint256 collectionId_,
        string memory collectionName_,
        string memory collectionSymbol_
    ) ERC721(collectionName_, collectionSymbol_) {
        collectionId = collectionId_;
    }

    function setCollectorsDAO(address _address) external {
        collectorsDAO = IICollectorsDAO(_address);
    }

    function mintDigitalNft(
        uint256 _proposalId,
        string memory _name,
        string calldata _nftURI
    ) public {
        // get the proposal status to allow the mint
        bool proposalStatus = collectorsDAO.getProposalStatus(
            collectionId,
            _proposalId
        );
        require(proposalStatus == true, "proposal is not accepted");

        uint256 newDigitalNftId = _id.current();
        digitalNfts.push(DigitalNft(newDigitalNftId, _name));
        _mint(msg.sender, newDigitalNftId);
        _setTokenURI(newDigitalNftId, _nftURI);
        _id.increment();
    }
}