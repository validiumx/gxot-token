// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./GXOT.sol";

interface IUniswapV4Pool {
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB, uint256 liquidity);
    
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);
}

contract LiquidityManager is ReentrancyGuard {
    GXOT public immutable gxotToken;
    address public constant SWAP_ROUTER = 0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6;
    address public constant WETH_ADDRESS = 0x4200000000000000000000000000000000000006;
    
    struct LiquidityPosition {
        uint256 tokenAmount;
        uint256 ethAmount;
        uint256 liquidityTokens;
        uint256 timestamp;
    }
    
    mapping(address => LiquidityPosition[]) public userPositions;
    mapping(address => uint256) public totalUserLiquidity;
    
    event LiquidityAdded(address indexed user, uint256 tokenAmount, uint256 ethAmount, uint256 liquidity);
    event LiquidityRemoved(address indexed user, uint256 tokenAmount, uint256 ethAmount, uint256 liquidity);
    
    constructor(address payable _gxotToken) {
        gxotToken = GXOT(_gxotToken);
    }
    
    function addLiquidity(uint256 tokenAmount, uint256 minEthAmount) external payable nonReentrant {
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(msg.value > 0, "ETH amount must be greater than 0");
        require(msg.value >= minEthAmount, "Insufficient ETH provided");
        
        // Transfer tokens from user
        require(gxotToken.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");
        
        // Approve router to spend tokens
        gxotToken.approve(SWAP_ROUTER, tokenAmount);
        
        // Add liquidity to Uniswap V4
        (uint256 actualTokenAmount, uint256 actualEthAmount, uint256 liquidity) = 
            IUniswapV4Pool(SWAP_ROUTER).addLiquidity(
                address(gxotToken),
                WETH_ADDRESS,
                tokenAmount,
                msg.value,
                tokenAmount * 95 / 100, // 5% slippage tolerance
                msg.value * 95 / 100,   // 5% slippage tolerance
                address(this),
                block.timestamp + 300   // 5 minutes deadline
            );
        
        // Record user's liquidity position
        userPositions[msg.sender].push(LiquidityPosition({
            tokenAmount: actualTokenAmount,
            ethAmount: actualEthAmount,
            liquidityTokens: liquidity,
            timestamp: block.timestamp
        }));
        
        totalUserLiquidity[msg.sender] += liquidity;
        
        // Refund excess ETH
        if (msg.value > actualEthAmount) {
            payable(msg.sender).transfer(msg.value - actualEthAmount);
        }
        
        emit LiquidityAdded(msg.sender, actualTokenAmount, actualEthAmount, liquidity);
    }
    
    function removeLiquidity(uint256 positionIndex) external nonReentrant {
        require(positionIndex < userPositions[msg.sender].length, "Invalid position index");
        
        LiquidityPosition storage position = userPositions[msg.sender][positionIndex];
        require(position.liquidityTokens > 0, "No liquidity to remove");
        
        uint256 liquidityToRemove = position.liquidityTokens;
        
        // Remove liquidity from Uniswap V4
        (uint256 tokenAmount, uint256 ethAmount) = 
            IUniswapV4Pool(SWAP_ROUTER).removeLiquidity(
                address(gxotToken),
                WETH_ADDRESS,
                liquidityToRemove,
                0, // Accept any amount of tokens back
                0, // Accept any amount of ETH back
                msg.sender,
                block.timestamp + 300
            );
        
        totalUserLiquidity[msg.sender] -= liquidityToRemove;
        
        // Remove position (swap with last element and pop)
        userPositions[msg.sender][positionIndex] = userPositions[msg.sender][userPositions[msg.sender].length - 1];
        userPositions[msg.sender].pop();
        
        emit LiquidityRemoved(msg.sender, tokenAmount, ethAmount, liquidityToRemove);
    }
    
    function getUserPositions(address user) external view returns (LiquidityPosition[] memory) {
        return userPositions[user];
    }
    
    function getUserPositionCount(address user) external view returns (uint256) {
        return userPositions[user].length;
    }
    
    function getTotalLiquidity(address user) external view returns (uint256) {
        return totalUserLiquidity[user];
    }
    
    // Emergency function to recover stuck tokens
    function emergencyWithdraw(address token) external {
        require(msg.sender == address(gxotToken.owner()), "Only owner");
        if (token == address(0)) {
            payable(msg.sender).transfer(address(this).balance);
        } else {
            IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
        }
    }
    
    receive() external payable {}
}
