// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract WenToken is ERC1155, Ownable, ERC1155Supply {
  uint256 public constant RED = 0;
  uint256 public constant BLUE = 1;
  uint256 public constant GREEN = 2;
  uint256 public constant PINK = 3;
  uint256 public constant YELLOW = 4;
  uint256 public constant ORANGE = 5;

  constructor() ERC1155("") {
    _mint(msg.sender, RED, 10**1, "");
    _mint(msg.sender, BLUE, 10**2, "");
    _mint(msg.sender, GREEN, 10**3, "");
    _mint(msg.sender, PINK, 10**4, "");
    _mint(msg.sender, YELLOW, 10**3, "");
    _mint(msg.sender, ORANGE, 10**1, "");
  }

  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  function mint(
    address account,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public onlyOwner {
    _mint(account, id, amount, data);
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }

  // The following functions are overrides required by Solidity.
  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal override(ERC1155, ERC1155Supply) {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }

  function executeTrade(
    address from,
    address to,
    uint256 fromId,
    uint256 fromAmount,
    uint256 toId,
    uint256 toAmount,
    bytes memory data
  ) public {
    safeTransferFrom(from, to, fromId, fromAmount, data);
    safeTransferFrom(to, from, toId, toAmount, data);
  }

  function executeTradeBatch(
    address from,
    address to,
    uint256[] memory fromIds,
    uint256[] memory fromAmounts,
    uint256[] memory toIds,
    uint256[] memory toAmounts,
    bytes memory data
  ) public {
    safeBatchTransferFrom(from, to, fromIds, fromAmounts, data);
    safeBatchTransferFrom(to, from, toIds, toAmounts, data);
  }
}
