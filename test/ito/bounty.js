import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

require('chai')
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
    await crowdsale.addWallet(wallets[3], this.BountyTokensPercent);
    await crowdsale.addWallet(wallets[4], this.AdvisorsTokensPercent);
    await crowdsale.addWallet(wallets[5], this.FoundersTokensPercent);
    await crowdsale.addWallet(wallets[6], this.CompanyTokensPercent);
    await crowdsale.setPercentRate(this.PercentRate);
    await crowdsale.lockAddress(wallets[3], 30);
  });

  it('should correctly calculate bonuses for bounty, advisors, founders, company wallets', async function () {
    await crowdsale.sendTransaction({value: ether(100), from: wallets[1]});
    await crowdsale.sendTransaction({value: ether(1), from: wallets[2]});
    const owner = await crowdsale.owner();
    await crowdsale.finish({from: owner});

    const firstInvestorTokens = await token.balanceOf(wallets[1]);
    const secondInvestorTokens = await token.balanceOf(wallets[2]);
    const BountyTokens = await token.balanceOf(wallets[3]);
    const AdvisorsTokens = await token.balanceOf(wallets[4]);
    const FoundersTokens = await token.balanceOf(wallets[5]);
    const CompanyTokens = await token.balanceOf(wallets[6]);
    const totalTokens = firstInvestorTokens
      .plus(secondInvestorTokens)
      .plus(BountyTokens)
      .plus(AdvisorsTokens)
      .plus(FoundersTokens)
      .plus(CompanyTokens);
   
    assert.equal(Math.round(BountyTokens.mul(this.PercentRate).div(totalTokens)), this.BountyTokensPercent);
    assert.equal(Math.round(AdvisorsTokens.mul(this.PercentRate).div(totalTokens)), this.AdvisorsTokensPercent);
    assert.equal(Math.round(FoundersTokens.mul(this.PercentRate).div(totalTokens)), this.FoundersTokensPercent);
    assert.equal(Math.round(CompanyTokens.mul(this.PercentRate).div(totalTokens)), this.CompanyTokensPercent);  
  });

}
