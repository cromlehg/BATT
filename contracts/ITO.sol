pragma solidity ^0.4.18;

import './AssembledCommonSale.sol';
import './StagedCrowdsale.sol';
import './ExtendedWalletsMintTokensFeature.sol';

contract ITO is ExtendedWalletsMintTokensFeature, AssembledCommonSale {

  function calculateTokens(uint _invested) internal returns(uint) {
    return  _invested.mul(price).div(1 ether);
  }

  function setSpecialWallet(address addrSpecialWallet) public onlyOwner {
    super.setSpecialWallet(addrSpecialWallet);
    setWallet(addrSpecialWallet);
  }

  function finish() public onlyOwner {
     mintExtendedTokens();
     token.finishMinting();
     specialWallet.start();
     specialWallet.transferOwnership(owner);
  }

}
