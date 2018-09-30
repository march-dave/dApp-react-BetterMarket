pragma solidity ^0.4.23;

// import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
import "./oraclizeAPI_0.5.sol";

contract SmartPay is usingOraclize {
    address owner;
    address beneficiary;
    uint gweiToPayPerView;
    string youtubeId;
    bool withdrawn;
    
    constructor() public {
        owner = msg.sender;
    }
}