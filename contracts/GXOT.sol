// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IUniswapV4Router {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
}

contract GXOT is ERC20, Ownable, ReentrancyGuard {
    // World Chain addresses
    address public constant USDC_ADDRESS = 0x79A02482A880bCE3F13e09Da970dC34db4CD24d1;
    address public constant WETH_ADDRESS = 0x4200000000000000000000000000000000000006;
    address public constant WLD_ADDRESS = 0x2cFc85d8E48F8EAB294be644d9E25C3030863003;
    address public constant SWAP_ROUTER = 0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6;
    
    // Token configuration
    uint256 public constant MAX_SUPPLY = 3_000_000_000 * 10**18; // 3 billion tokens
    uint256 public constant TEAM_ALLOCATION = MAX_SUPPLY * 10 / 100; // 10%
    uint256 public constant DEX_ALLOCATION = MAX_SUPPLY * 90 / 100; // 90%
    
    // DAO and governance
    address public daoContract;
    address public teamWallet;
    bool public isDAOActive;
    bool public liquidityAdded;
    
    // Liquidity management
    mapping(address => uint256) public liquidityProviders;
    uint256 public totalLiquidityProvided;
    
    // Events
    event DAOActivated(address daoContract);
    event LiquidityAdded(address provider, uint256 amount);
    event LiquidityRemoved(address provider, uint256 amount);
    event TeamTokensDistributed(address teamWallet, uint256 amount);
    
    modifier onlyDAO() {
        require(msg.sender == daoContract || msg.sender == owner(), "Only DAO or owner");
        _;
    }
    
    constructor(address _teamWallet) ERC20("GXOT", "GXOT") Ownable(msg.sender) {
        require(_teamWallet != address(0), "Invalid team wallet");
        teamWallet = _teamWallet;
        
        // Mint total supply to contract
        _mint(address(this), MAX_SUPPLY);
        
        // Distribute team allocation immediately
        _transfer(address(this), teamWallet, TEAM_ALLOCATION);
        emit TeamTokensDistributed(teamWallet, TEAM_ALLOCATION);
    }
    
    function activateDAO(address _daoContract) external onlyOwner {
        require(_daoContract != address(0), "Invalid DAO contract");
        require(!isDAOActive, "DAO already active");
        
        daoContract = _daoContract;
        isDAOActive = true;
        
        // Transfer ownership to DAO
        _transferOwnership(_daoContract);
        
        emit DAOActivated(_daoContract);
    }
    
    function addLiquidityToDEX() external onlyOwner {
        require(!liquidityAdded, "Liquidity already added");
        require(balanceOf(address(this)) >= DEX_ALLOCATION, "Insufficient tokens");
        
        // Approve router to spend tokens
        _approve(address(this), SWAP_ROUTER, DEX_ALLOCATION);
        
        // Transfer DEX allocation to router for liquidity
        _transfer(address(this), SWAP_ROUTER, DEX_ALLOCATION);
        
        liquidityAdded = true;
    }
    
    function provideLiquidity(uint256 tokenAmount) external payable nonReentrant {
        require(tokenAmount > 0, "Amount must be greater than 0");
        require(msg.value > 0, "ETH amount must be greater than 0");
        require(isDAOActive, "DAO not active yet");
        
        // Transfer tokens from user
        _transfer(msg.sender, address(this), tokenAmount);
        
        // Record liquidity provision
        liquidityProviders[msg.sender] += tokenAmount;
        totalLiquidityProvided += tokenAmount;
        
        emit LiquidityAdded(msg.sender, tokenAmount);
    }
    
    function removeLiquidity(uint256 tokenAmount) external nonReentrant {
        require(tokenAmount > 0, "Amount must be greater than 0");
        require(liquidityProviders[msg.sender] >= tokenAmount, "Insufficient liquidity");
        
        liquidityProviders[msg.sender] -= tokenAmount;
        totalLiquidityProvided -= tokenAmount;
        
        // Return tokens to user
        _transfer(address(this), msg.sender, tokenAmount);
        
        emit LiquidityRemoved(msg.sender, tokenAmount);
    }
    
    function getLiquidityInfo(address provider) external view returns (uint256) {
        return liquidityProviders[provider];
    }
    
    function getContractBalance() external view returns (uint256) {
        return balanceOf(address(this));
    }
    
    // Emergency functions (only DAO)
    function emergencyWithdraw() external onlyDAO {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    function updateTeamWallet(address newTeamWallet) external onlyDAO {
        require(newTeamWallet != address(0), "Invalid address");
        teamWallet = newTeamWallet;
    }
    
    // Receive ETH
    receive() external payable {}
}
