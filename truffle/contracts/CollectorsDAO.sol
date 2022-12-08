// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @notice this contract manage all topic of the DAO : subDao creation, member management, proposal and vote management
contract CollectorsDAO is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _id;
    Counters.Counter public _proposalCount;

    enum VotingOptions {
        Yes,
        No
    }

    enum VotingStatus {
        pending,
        accepted,
        refused
    }

    struct SubDao {
        uint256 id;
        string name;
    }

    SubDao[] public subDao;

    struct Proposal {
        uint256 daoId;
        uint256 proposalId;
        address author;
        string name;
        string description;
        uint256 value;
        uint256 votesForYes;
        uint256 votesForNo;
        bool status;
        string votingStatus;
        bool propertyNftMinted;
        bool digitalNftMinted;
        string docOwnership;
        string mainImage;
    }

    event daoCreated(uint256 daoId, string daoName);

    event memberAdded(address newMember);

    event proposalCreated(
        uint256 daoId,
        uint256 proposalId,
        address owner,
        string proposalName,
        string proposalDesc,
        uint256 value,
        string docOwnership,
        string mainImage
    );

    event voteSetted(
        uint256 proposalId,
        address voter,
        VotingOptions vote,
        bool updatedProposalStatus
    );

    event proposalClosed(
        uint256 proposalId,
        uint256 finalValue,
        string votingStatus
    );

    event propertyMinted(uint256 proposalId, bool propertyMinted);
    event digitalMinted(uint256 proposalId, bool digitalMinted);

    /// @notice list of members of the DAO : user address => member status
    /// @notice allow member to vote and close proposal
    mapping(address => bool) public daoMembers;

    /// @notice store all proposals: proposalId => proposal
    /// @dev call by front end
    mapping(uint256 => Proposal) public proposals;
    /// @notice who already votes for which proposal and to avoid vote twice: voter => proposalId => vote Status
    /// @dev call by front end
    mapping(address => mapping(uint256 => bool)) public votes;

    /// @dev to be used later
    uint256 constant VOTING_PERIOD = 7 days;

    /// @notice create a new DAO linked to a collection
    /// @param _name name of the new collection
    /// @dev function call by factory contract
    function createDAO(string memory _name) external {
        SubDao memory newSubDao;
        newSubDao.id = _id.current();
        newSubDao.name = _name;

        subDao.push(newSubDao);

        emit daoCreated(_id.current(), _name);

        _id.increment();
    }

    /// @notice add member to DAO to allow him to vote and close for proposal
    /// @notice only owner of the contract can call the function
    function addDaoMember(address _newMember) external onlyOwner {
        require(daoMembers[_newMember] == false, "already a member");
        daoMembers[_newMember] = true;

        emit memberAdded(_newMember);
    }

    /// @notice create a new proposal
    /// @param _daoId dao concerned by the proposal
    /// @param _name name of the object to mint
    /// @param _description description of the object to mint
    /// @param _value estimated value of the object by the applicant
    /// @param _docOwnership picture of the proof of ownership provided by the applicant
    /// @param _mainImage picture of the object provided by the applicant
    function createProposal(
        uint256 _daoId,
        string memory _name,
        string memory _description,
        uint256 _value,
        string memory _docOwnership,
        string memory _mainImage
    ) external {
        uint256 proposalId = _proposalCount.current();

        proposals[proposalId] = Proposal(
            _daoId,
            proposalId,
            msg.sender,
            _name,
            _description,
            _value,
            0,
            0,
            false,
            "pending",
            false,
            false,
            _docOwnership,
            _mainImage
        );

        emit proposalCreated(
            _daoId,
            proposalId,
            msg.sender,
            _name,
            _description,
            _value,
            _docOwnership,
            _mainImage
        );

        _proposalCount.increment();
    }

    /// @notice set a vote for a proposal
    /// @notice only DAO members can do it
    /// @notice user need to vote yes or no + give a estimated value
    function vote(
        uint256 _proposalId,
        uint256 _value,
        VotingOptions _vote
    ) external {
        Proposal storage proposal = proposals[_proposalId];
        require(daoMembers[msg.sender] == true, "not member of the DAO");
        require(votes[msg.sender][_proposalId] == false, "already voted");
        votes[msg.sender][_proposalId] = true;
        if (_vote == VotingOptions.Yes) {
            proposal.votesForYes += 1;
            if (
                (proposal.votesForYes * 100) /
                    (proposal.votesForYes + proposal.votesForNo) >
                50
            ) {
                proposal.status = true;
                proposal.value =
                    (proposal.value * (proposal.votesForYes - 1) + _value) /
                    proposal.votesForYes;
            }
        } else {
            proposal.votesForNo += 1;
            if (
                (proposal.votesForNo * 100) /
                    (proposal.votesForYes + proposal.votesForNo) >
                50
            ) {
                proposal.status = false;
            }
        }

        emit voteSetted(_proposalId, msg.sender, _vote, proposal.status);
    }

    /// @notice close a proposal
    /// @notice only DAO members can do it
    /// @notice the status of the proposal is set during this fonction (accepted if vote yes > vote no)
    function closeProposal(uint256 _proposalId) external {
        require(daoMembers[msg.sender] == true, "not member of the DAO");
        if (proposals[_proposalId].status == true) {
            proposals[_proposalId].votingStatus = "accepted";
        } else {
            proposals[_proposalId].votingStatus = "refused";
            proposals[_proposalId].value = 0;
        }

        emit proposalClosed(
            _proposalId,
            proposals[_proposalId].value,
            proposals[_proposalId].votingStatus
        );
    }

    /// @dev getter for development purpose
    function getProposalStatus(uint256 _proposalId)
        external
        view
        returns (bool proposalStatus)
    {
        // require(block.timestamp >= proposals[_daoId][_proposalId].createdAt + VOTING_PERIOD, "Voting period is not over");
        return proposals[_proposalId].status;
    }

    /// @dev for front end management purpose
    function updatePropertyMintStatus(uint256 _proposalId) external {
        proposals[_proposalId].propertyNftMinted = true;

        emit propertyMinted(_proposalId, true);
    }

    /// @dev for front end management purpose
    function updateDigitalMintStatus(uint256 _proposalId) external {
        proposals[_proposalId].digitalNftMinted = true;

        emit digitalMinted(_proposalId, true);
    }
}
