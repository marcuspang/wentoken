// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// store all listings for tokens
contract WenTokenListing {
  struct Listing {
    address seller;
    uint256 price;
    uint256 tokenCount;
    uint256 tokenId;
  }

  // contract => listingId => Listing
  mapping(address => mapping(uint256 => Listing)) public listings;
  uint256 public listingIndex;
  // user => purchased value by others
  mapping(address => uint256) public balances;

  function addListing(
    address contractAddress,
    uint256 price,
    uint256 tokenId,
    uint256 tokenCount
  ) public {
    ERC1155 token = ERC1155(contractAddress);
    require(tokenCount > 0, "invalid tokenCount to list");
    require(
      token.balanceOf(msg.sender, tokenId) >= tokenCount,
      "insufficient tokens to list"
    );
    require(
      token.isApprovedForAll(msg.sender, address(this)),
      "contract does not have approval to modify token"
    );

    // store listing
    listings[contractAddress][listingIndex] = Listing(
      msg.sender,
      price,
      tokenCount,
      tokenId
    );
    listingIndex++;
  }

  function purchaseToken(
    address contractAddress,
    uint256 listingId,
    uint256 amount
  ) public payable {
    Listing memory item = listings[contractAddress][listingId];
    require(
      amount > 0 || amount > item.tokenCount,
      "invalid amount of tokens entered"
    );
    require(msg.value >= item.price * amount, "insufficient amount sent");
    // store the amount paid in balances
    balances[item.seller] += msg.value;

    ERC1155 token = ERC1155(contractAddress);
    token.safeTransferFrom(item.seller, msg.sender, item.tokenId, amount, "");
  }

  function withdrawFunds(uint256 amount, address payable to) public {
    require(amount <= balances[msg.sender], "insufficient balance");
    to.transfer(amount);
    balances[msg.sender] -= amount;
  }

  function getListing(address contractAddress, uint256 listingId)
    public
    view
    returns (Listing memory)
  {
    return listings[contractAddress][listingId];
  }

  function getListingIndex() public view returns (uint256) {
    return listingIndex;
  }
}
