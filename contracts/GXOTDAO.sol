// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./GXOT.sol";

contract GXOTDAO is ReentrancyGuard {
    GXOT public immutable gxotToken;
    
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) votes;
    }
    
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_PROPOSAL_THRESHOLD = 1000000 * 10**18; // 1M tokens
    uint256 public constant QUORUM_PERCENTAGE = 10; // 10% of total supply
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 votes);
    event ProposalExecuted(uint256 indexed proposalId);
    
    modifier onlyTokenHolder() {
        require(gxotToken.balanceOf(msg.sender) > 0, "Must hold GXOT tokens");
        _;
    }
    
    constructor(address payable _gxotToken) {
        gxotToken = GXOT(_gxotToken);
    }
    
    function createProposal(string memory description) external onlyTokenHolder {
        require(gxotToken.balanceOf(msg.sender) >= MIN_PROPOSAL_THRESHOLD, "Insufficient tokens for proposal");
        require(bytes(description).length > 0, "Description cannot be empty");
        
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.startTime = block.timestamp;
        newProposal.endTime = block.timestamp + VOTING_PERIOD;
        
        emit ProposalCreated(proposalCount, msg.sender, description);
    }
    
    function vote(uint256 proposalId, bool support) external onlyTokenHolder nonReentrant {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.id != 0, "Proposal does not exist");
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        uint256 voterBalance = gxotToken.balanceOf(msg.sender);
        require(voterBalance > 0, "No voting power");
        
        proposal.hasVoted[msg.sender] = true;
        proposal.votes[msg.sender] = voterBalance;
        
        if (support) {
            proposal.forVotes += voterBalance;
        } else {
            proposal.againstVotes += voterBalance;
        }
        
        emit VoteCast(proposalId, msg.sender, support, voterBalance);
    }
    
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.id != 0, "Proposal does not exist");
        require(block.timestamp > proposal.endTime, "Voting still active");
        require(!proposal.executed, "Proposal already executed");
        
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
        uint256 quorumRequired = (gxotToken.totalSupply() * QUORUM_PERCENTAGE) / 100;
        
        require(totalVotes >= quorumRequired, "Quorum not reached");
        require(proposal.forVotes > proposal.againstVotes, "Proposal rejected");
        
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }
    
    function getProposal(uint256 proposalId) external view returns (
        uint256 id,
        address proposer,
        string memory description,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 startTime,
        uint256 endTime,
        bool executed
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.proposer,
            proposal.description,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.startTime,
            proposal.endTime,
            proposal.executed
        );
    }
    
    function hasVoted(uint256 proposalId, address voter) external view returns (bool) {
        return proposals[proposalId].hasVoted[voter];
    }
    
    function getVotingPower(address voter) external view returns (uint256) {
        return gxotToken.balanceOf(voter);
    }
}
