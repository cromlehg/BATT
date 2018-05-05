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

  const manager = '0x66C1833F667eAE8ea1890560e009F139A680F939';

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
    preitoPrice.should.bignumber.equal(tokens(6650));
    const itoPrice = await ito.price();
    itoPrice.should.bignumber.equal(tokens(5000));
  });

  it ('preITO should have softcap as described in README', async function () {
    const preitoSoftcap = await preito.softcap();
    preitoSoftcap.should.bignumber.equal(ether(3500));
  });

  it ('preITO and ITO should have hardcap as described in README', async function () {
    const preitoHardcap = await preito.hardcap();
    preitoHardcap.should.bignumber.equal(ether(12000));
    const itoHardcap = await ito.hardcap();
    itoHardcap.should.bignumber.equal(ether(23000));
  });

  it ('preITO and ITO should have minimal insvested limit as described in README', async function () {
    const preitoMinInvest = await ito.minInvestedLimit();
    preitoMinInvest.should.bignumber.equal(ether(0.1));
    const itoMinInvest = await ito.minInvestedLimit();
    itoMinInvest.should.bignumber.equal(ether(0.1));
  });

  it ('preITO and ITO should have wallets as described in README', async function () {
    const preitoWallet = await preito.wallet();
    preitoWallet.should.bignumber.equal('0xB53E3f252fBCD041e46Aad82CFaEe326E04d1396');
    const itoWallet = await ito.wallet();
    itoWallet.should.bignumber.equal('0x8f1C4E049907Fa4329dAC9c504f4013620Fa39c9');
  });

  it ('bounty, advisors, founders, company wallets should be as described in README', async function () {
    const bountyWallet = await ito.wallets(0);
    bountyWallet.should.bignumber.equal('0x3180e7B6E726B23B1d18D9963bDe3264f5107aef');
    const advisorsWallet = await ito.wallets(1);
    advisorsWallet.should.bignumber.equal('0x36A8b67fe7800Cd169Fd46Cd75824DC016a54d13');
    const foundersWallet = await ito.wallets(2);
    foundersWallet.should.bignumber.equal('0xDf9CAAE51eED1F23B4ae9AeCDbdeb926252eFFC4');
    const companyWallet = await ito.wallets(3);
    companyWallet.should.bignumber.equal('0x7D648BcAbf05CEf119C9a11b8E05756a41Bd29Ad');
  });

});

