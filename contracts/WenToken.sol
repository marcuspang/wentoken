// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract WenToken is ERC1155, Ownable, ERC1155Supply {
  uint256 public constant BLACK = 0;
  uint256 public constant BLUE = 1;
  uint256 public constant GREEN = 2;
  uint256 public constant RED = 3;

  constructor() ERC1155("") {
    _mint(msg.sender, BLACK, 10**1, "");
    _mint(msg.sender, BLUE, 10**9, "");
    _mint(msg.sender, GREEN, 10**18, "");
    _mint(msg.sender, RED, 10**27, "");
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
}
