// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.8.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.2/utils/Counters.sol";

contract Colours is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    bool public publicPhase = false;
    bool public allowListPhase = false;
    uint256 maxSupply = 3;
    string private _baseTokenURI;
    bool public revealed = false;
    mapping(address => bool) public allowList;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Colours", "COL") {}

    function _baseURI() internal view override returns (string memory) {
        //    //return "https://ipfs.io/ipfs/QmRHFPdEducAavhhE1rLLS7YS23MUBXd8PayiiNVXLicBh/";
        return _baseTokenURI;
    }

    function editMintPhases(
        bool _publicPhase,
        bool _allowListPhase
    ) external onlyOwner {
        publicPhase = _publicPhase;
        allowListPhase = _allowListPhase;
    }

    function allowListMint() public payable {
        require(allowListPhase, "Allow List Mint Closed");
        require(allowList[msg.sender] == true, "Not in Allow List");
        require(msg.value == 0.001 ether, "Not Enough Funds");
        _mintColour();
    }

    function publicMint() public payable {
        require(publicPhase, "Public Mint Closed");
        require(msg.value == 0.003 ether, "Not Enough Funds");
        _mintColour();
    }

    function setAllowList(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            allowList[addresses[i]] = true;
        }
    }

    function _mintColour() internal {
        require(totalSupply() < maxSupply, "Sold Out!");
        uint256 tokenId = _tokenIdCounter.current() + 1;
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        //return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokenId))) : "";

        // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        //if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        //    string memory baseURI = _baseURI();
        string memory metadataPointerId = !revealed
            ? "unrevealed"
            : Strings.toString(tokenId);
        string memory result = string(
            abi.encodePacked(baseURI, metadataPointerId, ".json")
        );
        //     return _toString(tokenId);
        return bytes(baseURI).length != 0 ? result : "";
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function reveal() external onlyOwner {
        revealed = true;
    }
}
