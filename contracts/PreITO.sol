pragma solidity ^0.4.18;

import './AssembledCommonSale.sol';
import './SoftcapFeature.sol';
import './NextSaleAgentFeature.sol';

contract PreITO is SoftcapFeature, NextSaleAgentFeature, AssembledCommonSale {

  uint public firstBonusTokensLimit;

  uint public firstBonus;

  uint public secondBonus;

  function setFirstBonusTokensLimit(uint _tokens) public onlyOwner {
    firstBonusTokensLimit = _tokens;
  }

  function setFirstBonus(uint newFirstBonus) public onlyOwner {
    firstBonus = newFirstBonus;
  }

  function setSecondBonus(uint newSecondBonus) public onlyOwner {
    secondBonus = newSecondBonus;
  }

  function calculateTokens(uint _invested) internal returns(uint) {
    uint tokens = _invested.mul(price).div(1 ether);
    if(minted <= firstBonusTokensLimit) {
      if(firstBonus > 0) {
        tokens = tokens.add(tokens.mul(firstBonus).div(percentRate));
      }
    } else {
      if(secondBonus > 0) {
        tokens = tokens.add(tokens.mul(secondBonus).div(percentRate));
      }
    }
    return tokens;
  }

  function softcapReachedCallabck() internal {
    wallet = specialWallet;
  }

  function mintTokensByETH(address to, uint _invested) internal returns(uint) {
    uint _tokens = super.mintTokensByETH(to, _invested);
    updateBalance(to, _invested);
    return _tokens;
  }

  function finish() public onlyOwner {
    if (updateRefundState()) {
      token.finishMinting();
    } else {
      withdraw();
      specialWallet.transferOwnership(nextSaleAgent);
      token.setSaleAgent(nextSaleAgent);
    }
  }

  function fallback() internal minInvestLimited(msg.value) returns(uint) {
    require(now >= start && now < endSaleDate());
    updateInvested(msg.value);
    return mintTokensByETH(msg.sender, msg.value);
  }

}
