import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (SpecialWallet, accounts) {
  let specialwallet;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    specialwallet = await SpecialWallet.new();
    await specialwallet.setAvailableAfterStart(50);
    await specialwallet.setEndDate(1546300800);
    await specialwallet.setPercentRate(100);
  });

  it('should not withdraw before start', async function () {
    const owner = await specialwallet.owner();
    const investment = ether(1);
    await specialwallet.sendTransaction({value: investment, from: accounts[1]});
    await specialwallet.withdraw(accounts[2], {from: owner}).should.be.rejectedWith(EVMRevert); 
  });

  it('should correct withdraw', async function () {
    const owner = await specialwallet.owner();
    const investment = ether(1);
    await specialwallet.sendTransaction({value: investment, from: accounts[1]});
    const specialbalance = web3.eth.getBalance(specialwallet.address); 
    await specialwallet.start({from: owner});

    const pre = web3.eth.getBalance(accounts[2]);
    await specialwallet.withdraw(accounts[2], {from: owner}).should.be.fulfilled;
    const post0 = web3.eth.getBalance(accounts[2]);
    post0.minus(pre).should.be.bignumber.equal(investment.times(0.5));

    await increaseTimeTo(1536451200);
    await specialwallet.withdraw(accounts[2], {from: owner}).should.be.fulfilled;
    const post = web3.eth.getBalance(accounts[2]);
    post.minus(post0).should.be.bignumber.equal(investment.times(0.25));    

    await increaseTimeTo(1541894400);
    await specialwallet.withdraw(accounts[2], {from: owner}).should.be.fulfilled;
    const post1 = web3.eth.getBalance(accounts[2]);
    post1.minus(post).should.be.bignumber.equal(investment.times(0.25));

  });

  it('should withdraw all funds after end date', async function () {
    const owner = await specialwallet.owner();
    const investment = ether(1);
    await specialwallet.sendTransaction({value: investment, from: accounts[1]});
    const specialbalance = web3.eth.getBalance(specialwallet.address); 
    await specialwallet.start({from: owner});
    await increaseTimeTo(1546300800);
    const pre = web3.eth.getBalance(accounts[2]);
    await specialwallet.withdraw(accounts[2], {from: owner}).should.be.fulfilled;
    const post = web3.eth.getBalance(accounts[2]);
    post.minus(pre).should.be.bignumber.equal(investment);    
  });

}
