pragma solidity ^0.4.18;

import './TokenProvider.sol';

contract MintTokensInterface is TokenProvider {

  uint public minted;

  function mintTokens(address to, uint tokens) internal;

}

