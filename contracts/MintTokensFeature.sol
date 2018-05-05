pragma solidity ^0.4.18;

import './MintTokensInterface.sol';
import './math/SafeMath.sol';

contract MintTokensFeature is MintTokensInterface {

  using SafeMath for uint;

  function mintTokens(address to, uint tokens) internal {
    token.mint(to, tokens);
    minted = minted.add(tokens);
  }

}
