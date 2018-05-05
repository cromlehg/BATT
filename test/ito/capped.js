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

  it('should accept payments within hardcap', async function () {
    await crowdsale.sendTransaction({value: this.hardcap.minus(this.minInvestedLimit), from: wallets[3]}).should.be.fulfilled;
    await crowdsale.sendTransaction({value: this.minInvestedLimit, from: wallets[4]}).should.be.fulfilled;
  });

  it('should reject payments below min investment limit', async function () {
    const value = this.minInvestedLimit.minus(ether(0.01));
    await crowdsale.sendTransaction({value: value, from: wallets[5]}).should.be.rejectedWith(EVMRevert);
  });

  it('should reject payments outside hardcap', async function () {
    await crowdsale.sendTransaction({value: this.hardcap, from: wallets[5]}).should.be.fulfilled;
    await crowdsale.sendTransaction({value: ether(1), from: wallets[6]}).should.be.rejectedWith(EVMRevert);
  });
}

