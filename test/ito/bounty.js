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
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);      
    await crowdsale.addWallet(wallets[3], this.BountyTokensPercent);
    await crowdsale.addWallet(wallets[4], this.AdvisorsTokensPercent);
    await crowdsale.addWallet(wallets[5], this.FoundersTokensPercent);
    await crowdsale.setPercentRate(this.PercentRate);
    await crowdsale.setSpecialWallet(specialwallet.address);
    await specialwallet.setAvailableAfterStart(50);
    await specialwallet.setEndDate(1546300800);
    await specialwallet.transferOwnership(crowdsale.address);
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
    const totalTokens = firstInvestorTokens
      .plus(secondInvestorTokens)
      .plus(BountyTokens)
      .plus(AdvisorsTokens)
      .plus(FoundersTokens);
   
    assert.equal(Math.round(BountyTokens.mul(this.PercentRate).div(totalTokens)), this.BountyTokensPercent);
    assert.equal(Math.round(AdvisorsTokens.mul(this.PercentRate).div(totalTokens)), this.AdvisorsTokensPercent);
    assert.equal(Math.round(FoundersTokens.mul(this.PercentRate).div(totalTokens)), this.FoundersTokensPercent); 
  });

}
