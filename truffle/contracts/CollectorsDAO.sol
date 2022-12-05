// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract CollectorsDAO is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _id;

    enum VotingOptions {
        Yes,
        No
    }

    struct SubDao {
        uint256 id;
        string name;
        uint256 proposalCount;
    }

    SubDao[] public subDao;

    struct Proposal {
        uint256 id;
        address author;
        string name;
        string description;
        uint256 createdAt;
        uint256 votesForYes;
        uint256 votesForNo;
        bool status;
    }

    event daoCreated(uint256 daoId, string daoName);

    event proposalCreated(
        uint256 daoId,
        uint256 proposalId,
        string proposalName,
        string proposalDesc
    );

    /// @notice list of members of each DAO : user address => daoId (ie collectionId) => member status
    mapping(address => mapping(uint256 => bool)) public daoMembers;

    /// @notice store all proposals: daoId (ie CollectionId) => proposalId => proposal
    mapping(uint256 => mapping(uint256 => Proposal)) public proposals;
    /// @notice who already votes for who and to avoid vote twice: voter => daoId (ie collectionId) => proposalId => vote Status
    mapping(address => mapping(uint256 => mapping(uint256 => bool)))
        public votes;

    uint256 constant VOTING_PERIOD = 7 days;

    function createDAO(string memory _name) external {
        SubDao memory newSubDao;
        newSubDao.id = _id.current();
        newSubDao.name = _name;
        newSubDao.proposalCount = 0;

        subDao.push(newSubDao);

        emit daoCreated(_id.current(), _name);

        _id.increment();
    }

    function createProposal(
        uint256 _daoId,
        string memory _name,
        string memory _description
    ) external {
        uint256 proposalId = subDao[_daoId].proposalCount;

        proposals[_daoId][proposalId] = Proposal(
            proposalId,
            msg.sender,
            _name,
            _description,
            block.timestamp,
            0,
            0,
            false
        );

        emit proposalCreated(_daoId, proposalId, _name, _description);

        subDao[_daoId].proposalCount += 1;
    }

    function vote(
        uint256 _daoId,
        uint256 _proposalId,
        VotingOptions _vote
    ) external {
        Proposal storage proposal = proposals[_daoId][_proposalId];
        require(
            votes[msg.sender][_daoId][_proposalId] == false,
            "already voted"
        );
        require(
            block.timestamp <= proposal.createdAt + VOTING_PERIOD,
            "Voting period is over"
        );
        votes[msg.sender][_daoId][_proposalId] = true;
        if (_vote == VotingOptions.Yes) {
            proposal.votesForYes += 1;
            if (
                (proposal.votesForYes * 100) /
                    (proposal.votesForYes + proposal.votesForNo) >
                50
            ) {
                proposal.status = true;
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
    }

    function getProposalStatus(uint256 _daoId, uint256 _proposalId)
        external
        view
        returns (bool proposalStatus)
    {
        // require(block.timestamp >= proposals[_daoId][_proposalId].createdAt + VOTING_PERIOD, "Voting period is not over");
        return proposals[_daoId][_proposalId].status;
    }
}
