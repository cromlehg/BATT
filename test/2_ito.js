import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './ito/capped';
import common from './ito/common';
import bounty from './ito/bounty';
import additional from './ito/additional';

const token = artifacts.require('Token.sol');
const crowdsale = artifacts.require('ITO.sol');
const specialwallet = artifacts.require('SpecialWallet.sol');

contract('ITO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, specialwallet, accounts);
});

contract('ITO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, specialwallet, accounts);
});

contract('ITO - bounty test', function (accounts) {
  before(config);
  bounty(token, crowdsale, specialwallet, accounts);
});

contract('ITO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, specialwallet, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('30 Jun 2018 00:00:00 GMT');
  this.period = 30;
  this.price = tokens(30000);
  this.hardcap = ether(23000);
  this.minInvestedLimit = ether(1);
  this.BountyTokensWallet = '0x31Dba1B0b92fa23Eec30e2fF169dc7Cc05eEE915';
  this.AdvisorsTokensWallet = '0x8c76033Dedd13FD386F12787Ab4973BcbD1de2A8';
  this.FoundersTokensWallet = '0x7Ae3c0DdaC135D69cA8E04d05559cd42822ecf14';
  this.BountyTokensPercent = 1;
  this.AdvisorsTokensPercent = 1;
  this.FoundersTokensPercent = 8;
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
