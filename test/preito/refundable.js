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

export default function (Token, Crowdsale, SpecialWallet, wallets) {
  let token;
  let crowdsale;
  let specialwallet;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    specialwallet = await SpecialWallet.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.setPeriod(this.period);
    await crowdsale.setPrice(this.price);
    await crowdsale.setSoftcap(this.softcap);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);
    await crowdsale.setWallet(this.wallet);
    await crowdsale.setPercentRate(this.PercentRate);
    await crowdsale.setSpecialWallet(specialwallet.address);
    await specialwallet.setAvailableAfterStart(50);
    await specialwallet.setEndDate(1546300800);
    await specialwallet.transferOwnership(crowdsale.address);
    await crowdsale.setNextSaleAgent(wallets[10]);
    await crowdsale.setFirstBonus(100);
    await crowdsale.setFirstBonusTokensLimit(30000000000000000000000000);
    await crowdsale.setSecondBonus(50);
  });

  it('should deny refunds before end', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]});
    await crowdsale.refund({from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should deny refunds after end if goal was reached', async function () {
    await crowdsale.sendTransaction({value: this.softcap, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    await crowdsale.refund({from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should allow refunds after end if goal was not reached', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap.minus(1);
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    await crowdsale.finish({from: owner});
    const balance = await crowdsale.balances(wallets[3]);
    balance.should.be.bignumber.equal(investment);
    const pre = web3.eth.getBalance(wallets[3]);
    await crowdsale.refund({from: wallets[3], gasPrice: 0}).should.be.fulfilled;
    const post = web3.eth.getBalance(wallets[3]);
    post.minus(pre).should.be.bignumber.equal(investment);
  });

  it('should correctly calculate refund', async function () {
    const owner = await crowdsale.owner();
    const investment1 = ether(1);
    const investment2 = ether(2);
    await crowdsale.sendTransaction({value: investment1, from: wallets[3]});
    await crowdsale.sendTransaction({value: investment2, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    await crowdsale.finish({from: owner});
    const pre = web3.eth.getBalance(wallets[3]);
    await crowdsale.refund({from: wallets[3], gasPrice: 0}).should.be.fulfilled;
    const post = web3.eth.getBalance(wallets[3]);
    post.minus(pre).should.bignumber.equal(investment1.plus(investment2));
  });

  it('should forward funds to wallets after end if goal was reached', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap;
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    const pre = web3.eth.getBalance(specialwallet.address);
    await crowdsale.finish({from: owner}).should.be.fulfilled;
    const post = web3.eth.getBalance(specialwallet.address);
    const dev = web3.eth.getBalance('0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770');  
    const special = web3.eth.getBalance('0x1D0B575b48a6667FD8E59Da3b01a49c33005d2F1');
    dev.plus(special).should.be.bignumber.equal(ether(32.5));
    post.minus(pre).plus(dev).plus(special).should.be.bignumber.equal(investment);
  });

  it('should withdraw, but send funds to dev and special wallets just once', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap;
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    const pre = web3.eth.getBalance(specialwallet.address);
    await crowdsale.withdraw({from: owner}).should.be.fulfilled;
    const post = web3.eth.getBalance(specialwallet.address);
    post.minus(pre).plus(ether(32.5)).should.be.bignumber.equal(investment);
    await crowdsale.sendTransaction({value: ether(10), from: wallets[3]});
    await crowdsale.withdraw({from: owner}).should.be.fulfilled;
    const post1 = web3.eth.getBalance(specialwallet.address);
    post1.minus(post).should.be.bignumber.equal(ether(10));
  });
}
