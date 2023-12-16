
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4 ;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract NFT is ERC721URIStorage{
    uint256 tokenCount;
constructor() ERC721("Dapp NFT", "NFT"){}
function mint (string memory tokenURI) public returns (uint256 ){
tokenCount++;
_safeMint(msg.sender,tokenCount);
_setTokenURI(tokenCount,tokenURI);
return tokenCount;
}
}
