import additional from './token/additional';
import basic from './token/basic';
import mintable from './token/mintable';
import ownable from './token/ownable';
import standard from './token/standard';

const token = artifacts.require('Token.sol');

contract('BUILDToken - BasicToken test', function (accounts) {
  basic(token, accounts);
});
contract('BUILDToken - StandardToken test', function (accounts) {
  standard(token, accounts);
});
contract('BUILDToken - Mintable test', function (accounts) {
  mintable(token, accounts);
});
contract('BUILDToken - Ownable test', function (accounts) {
  ownable(token, accounts);
});

contract('BUILDToken - Additional conditions test', function (accounts) {
  additional(token, accounts);
});
