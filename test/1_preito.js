import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './preito/capped';
import common from './preito/common';
import refundable from './preito/refundable';
import additional from './preito/additional';

const token = artifacts.require('Token.sol');
const crowdsale = artifacts.require('PreITO.sol');
const specialwallet = artifacts.require('SpecialWallet.sol');

contract('PreITO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, specialwallet, accounts);
});

contract('PreITO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, specialwallet, accounts);
});

contract('PreITO - refundable features test', function (accounts) {
  before(config);
  refundable(token, crowdsale, specialwallet, accounts);
});

contract('PreITO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, specialwallet, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('30 May 2018 00:00:00 GMT');
  this.period = 30;
  this.price = tokens(30000);
  this.softcap = ether(1000);
  this.hardcap = ether(33366);
  this.minInvestedLimit = ether(1);
  this.wallet = '0x0fc0b9f68DCc12B72203e579d427d1ddf007e464';
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
