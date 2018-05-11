import basic from './specialwallet/basic';

const specialwallet = artifacts.require('SpecialWallet.sol');

contract('Special Wallet - basic test', function (accounts) {
  basic(specialwallet, accounts);
});
