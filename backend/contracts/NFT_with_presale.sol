// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721Enumerable, Ownable {
    string public baseUri;
    uint public maxSupply;
    uint public softcap;
    uint public minMintFee;
    uint public start;
    uint public end;
    uint public uniqeContributors;
    uint public contribution;
    uint public maxPerWallet;
    uint private nonce = 1;
    uint private platformCut;
    uint private platformToken;
    uint public dumpProfit;
    uint public contributionCount;

    address private platformWallet = 0x412Bb6E1feBbfCf428dd0f6a739c30C79128a244;
    
    mapping(address=>uint) public contributor;
    mapping(address=>uint) public contributorValue;

    modifier presaleStarted {
        require(start < block.timestamp, "presale has not started");
        _;
    }

    modifier presaleEnded {
        require(end < block.timestamp, "presale has not ended");
        _;
    }

    modifier presalePeriod {
        require(end > block.timestamp && start < block.timestamp, "outside presale period" );
        _;
    }


    // test input  "sss", "nft", "nft", 6, 2, 1, 3, 2, 2, 2
    // test input ["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"]

    constructor(
        string memory _baseUri,
        string memory name,
        string memory symbol,
        uint256 _maxSupply,
        uint256 _start,
        uint256 _end,
        uint256 _presaleFee,
        uint256 _presaleMaxPerWallet,
        uint256 _presaleSoftCap,
        uint256 _presalePlatformCutPercentage
    ) ERC721(name, symbol) payable {
        maxSupply = _maxSupply;
        start = _start;
        end = _end;
        minMintFee = _presaleFee;
        maxPerWallet = _presaleMaxPerWallet;
        softcap = _presaleSoftCap;
        platformToken = _presalePlatformCutPercentage == 1? 1 : 0;
        platformCut = _presalePlatformCutPercentage;
        baseUri = _baseUri;
        payable(platformWallet).transfer(msg.value);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function contribute () external payable presalePeriod {
        require(msg.value >= minMintFee, "payment is less than the mint fee");
        require(contributor[msg.sender] < maxPerWallet, "you have ordered maximally");
        if(contributor[msg.sender] == 0){
            uniqeContributors++;
        }
        contribution+=msg.value;
        contributor[msg.sender]++;
        contributorValue[msg.sender]+=msg.value;
        contributionCount++;
    }

    function dump () external presalePeriod {
        require(contributor[msg.sender] > 0, "nothing to dump");
        uniqeContributors--;
        uint _dump = contributorValue[msg.sender] - (10 * contributorValue[msg.sender] / 100);
        dumpProfit += (10 * contributorValue[msg.sender] / 100);
        contributionCount-=contributor[msg.sender];
        contribution -= contributorValue[msg.sender];
        contributor[msg.sender]=0;
        contributorValue[msg.sender]=0;
        payable(msg.sender).transfer(_dump);
    }

    function claim() external presaleEnded {
        require(contributor[msg.sender] > 0, "nothing to claim");
        if(contributionCount >= softcap){
           for (uint i=0; i < contributor[msg.sender]; i++){
                mint(msg.sender);
           }
        }else {
            payable(msg.sender).transfer(contributorValue[msg.sender]);
            contributor[msg.sender]=0;
            contributorValue[msg.sender]=0;
        }
    }

    function mint(address to) internal {
        require(maxSupply > totalSupply() + platformToken, "tokens are all claimed");
        _safeMint(to, nonce);
        nonce++;
    }

    function withdraw() public onlyOwner presaleEnded {
        require(address(this).balance > 0, "no funds");
        if(contribution >= softcap){
            uint _profit = (platformCut/100) * contribution;
            uint profit = address(this).balance - _profit;
            contribution=0;
            platformCut=0;
            if(platformToken > 0){
                _safeMint(platformWallet, nonce);
                nonce++;
            }
            payable(msg.sender).transfer(profit);
            payable(platformWallet).transfer(_profit);
        }else {
            payable(msg.sender).transfer((address(this).balance - contribution));
        }
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}