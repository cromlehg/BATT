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

contract('PreITO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, accounts);
});

contract('PreITO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, accounts);
});

contract('PreITO - refundable features test', function (accounts) {
  before(config);
  refundable(token, crowdsale, accounts);
});

contract('PreITO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('30 Apr 2018 00:00:00 GMT');
  this.period = 42;
  this.price = tokens(6650);
  this.softcap = ether(3500);
  this.hardcap = ether(12000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0xB53E3f252fBCD041e46Aad82CFaEe326E04d1396';
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
