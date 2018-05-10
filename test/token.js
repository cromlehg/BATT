import additional from './token/additional';
import basic from './token/basic';
import mintable from './token/mintable';
import ownable from './token/ownable';
import standard from './token/standard';

const token = artifacts.require('Token.sol');

contract('BATT Token - BasicToken test', function (accounts) {
  basic(token, accounts);
});
contract('BATT Token - StandardToken test', function (accounts) {
  standard(token, accounts);
});
contract('BATT Token - Mintable test', function (accounts) {
  mintable(token, accounts);
});
contract('BATT Token - Ownable test', function (accounts) {
  ownable(token, accounts);
});

contract('BATT Token - Additional conditions test', function (accounts) {
  additional(token, accounts);
});
