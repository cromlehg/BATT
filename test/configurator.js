import ether from './helpers/ether';
import tokens from './helpers/tokens';
import {advanceBlock} from './helpers/advanceToBlock';
import {increaseTimeTo, duration} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

const Configurator = artifacts.require('Configurator.sol');
const Token = artifacts.require('Token.sol');
const PreITO = artifacts.require('PreITO.sol');
const ITO = artifacts.require('ITO.sol');

contract('Configurator integration test', function (accounts) {
  let configurator;
  let token;
  let preito;
  let ito;

  const manager = '0x529E6B0e82EF632F070D997dd50C35aAa939cB37';

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
    configurator = await Configurator.new();
    await configurator.deploy();

    const tokenAddress = await configurator.token();
    const preitoAddress = await configurator.preITO();
    const itoAddress = await configurator.ito();

    token = await Token.at(tokenAddress);
    preito = await PreITO.at(preitoAddress);
    ito = await ITO.at(itoAddress);
  });

  it('contracts should have token address', async function () {
    const tokenOwner = await token.owner();
    tokenOwner.should.bignumber.equal(manager);
  });

  it('contracts should have preITO address', async function () {
    const preitoOwner = await preito.owner();
    preitoOwner.should.bignumber.equal(manager);
  });

  it('contracts should have ITO address', async function () {
    const itoOwner = await ito.owner();
    itoOwner.should.bignumber.equal(manager);
  });

  it('preITO and ITO should have start time as described in README', async function () {
    const preitoStart = await preito.start();
    preitoStart.should.bignumber.equal((new Date('23 Apr 2018 00:00:00 GMT')).getTime() / 1000);
    const itoStart = await ito.start();
    itoStart.should.bignumber.equal((new Date('25 May 2018 00:00:00 GMT')).getTime() / 1000);
  });

  it ('preTCO and ITO should have price as described in README', async function () {
    const preitoPrice = await preito.price();
    preitoPrice.should.bignumber.equal(tokens(30000));
    const itoPrice = await ito.price();
    itoPrice.should.bignumber.equal(tokens(30000));
  });

  it ('preITO should have softcap as described in README', async function () {
    const preitoSoftcap = await preito.softcap();
    preitoSoftcap.should.bignumber.equal(ether(1000));
  });

  it ('preITO and ITO should have hardcap as described in README', async function () {
    const preitoHardcap = await preito.hardcap();
    preitoHardcap.should.bignumber.equal(ether(33366));
    const itoHardcap = await ito.hardcap();
    itoHardcap.should.bignumber.equal(ether(23000));
  });

  it ('preITO and ITO should have minimal insvested limit as described in README', async function () {
    const preitoMinInvest = await preito.minInvestedLimit();
    preitoMinInvest.should.bignumber.equal(ether(1));
    const itoMinInvest = await ito.minInvestedLimit();
    itoMinInvest.should.bignumber.equal(ether(0.1));
  });

  it ('preITO should have wallets as described in README', async function () {
    const preitoWallet = await preito.wallet();
    preitoWallet.should.bignumber.equal('0x0fc0b9f68DCc12B72203e579d427d1ddf007e464');
  });

  it ('bounty, advisors, founders wallets should be as described in README', async function () {
    const bountyWallet = await ito.wallets(0);
    bountyWallet.should.bignumber.equal('0x8c76033Dedd13FD386F12787Ab4973BcbD1de2A8');
    const advisorsWallet = await ito.wallets(1);
    advisorsWallet.should.bignumber.equal('0x31Dba1B0b92fa23Eec30e2fF169dc7Cc05eEE915');
    const foundersWallet = await ito.wallets(2);
    foundersWallet.should.bignumber.equal('0x7Ae3c0DdaC135D69cA8E04d05559cd42822ecf14');
  });

});

