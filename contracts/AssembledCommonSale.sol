pragma solidity ^0.4.18;

import './CommonSale.sol';
import './SpecialWallet.sol';

contract AssembledCommonSale is CommonSale {

  uint public period;

  SpecialWallet public specialWallet;

  function setSpecialWallet(address addrSpecialWallet) public onlyOwner {
    specialWallet = SpecialWallet(addrSpecialWallet);
  }

  function setPeriod(uint newPeriod) public onlyOwner {
    period = newPeriod;
  }

  function endSaleDate() public view returns(uint) {
    return start.add(period * 1 days);
  }

}
