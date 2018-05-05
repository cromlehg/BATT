import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';
import unixTime from '../helpers/unixTime';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.setPrice(this.price);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);   
    await crowdsale.addMilestone(15, 25);
    await crowdsale.addMilestone(15, 20);
    await crowdsale.addMilestone(15, 15);
    await crowdsale.addMilestone(15, 10);
    await crowdsale.addMilestone(15, 5);
    await crowdsale.addMilestone(15, 0);
    await crowdsale.setWallet(this.wallet);    
    await crowdsale.addWallet(this.BountyTokensWallet, this.BountyTokensPercent);
    await crowdsale.addWallet(this.AdvisorsTokensWallet, this.AdvisorsTokensPercent);    
    await crowdsale.addWallet(this.FoundersTokensWallet, this.FoundersTokensPercent);
    await crowdsale.addWallet(this.CompanyTokensWallet, this.CompanyTokensPercent);
    await crowdsale.setPercentRate(this.PercentRate);
    await crowdsale.lockAddress(this.BountyTokensWallet, 30);
  });

  it('crowdsale should be a saleAgent for token', async function () {
    const owner = await token.saleAgent();   
    owner.should.equal(crowdsale.address);
  });

  it('end should be equal to start + duration', async function () {
    const start = await crowdsale.start();
    const end = await crowdsale.endSaleDate();
    end.should.bignumber.equal(start.plus(duration.days(this.period)));
  });

  it('should reject payments before start', async function () {
    await crowdsale.setStart(latestTime() + duration.seconds(10));
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should accept payments after start', async function () {
    const start = await crowdsale.start();
    await crowdsale.setStart(latestTime() - duration.seconds(10));
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]}).should.be.fulfilled;
  });

  it('should reject payments after finish', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]}).should.be.fulfilled;
    const owner = await crowdsale.owner();
    await crowdsale.finish({from: owner}).should.be.fulfilled;
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should assign tokens to sender', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]});
    const balance = await token.balanceOf(wallets[3]);
    balance.should.be.bignumber.equal(this.price.times(1.25));
  });

  it('should reject payments after end', async function () {
    const end = await crowdsale.endSaleDate();
    await increaseTimeTo(end + duration.seconds(10));
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });
 
}
