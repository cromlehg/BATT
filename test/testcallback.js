import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import callback from './testcallback/callback';

const token = artifacts.require('Token.sol');
const crowdsale = artifacts.require('ITO.sol');
const callbacktest = artifacts.require('CallbackTest.sol');

contract('Callback test', function (accounts) {
  before(config);
  callback(token, crowdsale, callbacktest, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('30 Jun 2018 00:00:00 GMT');
  this.period = 90;
  this.price = tokens(5000);
  this.hardcap = ether(23000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0x8f1C4E049907Fa4329dAC9c504f4013620Fa39c9';
  this.BountyTokensWallet = '0x3180e7B6E726B23B1d18D9963bDe3264f5107aef';
  this.AdvisorsTokensWallet = '0x36A8b67fe7800Cd169Fd46Cd75824DC016a54d13';
  this.FoundersTokensWallet = '0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770';
  this.CompanyTokensWallet = '0x7D648BcAbf05CEf119C9a11b8E05756a41Bd29Ad';
  this.BountyTokensPercent = 2;
  this.AdvisorsTokensPercent = 3;
  this.FoundersTokensPercent = 11;
  this.CompanyTokensPercent = 4;
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
