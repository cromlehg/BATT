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
    await crowdsale.addWallet(this.BountyTokensWallet, this.BountyTokensPercent);
    await crowdsale.addWallet(this.AdvisorsTokensWallet, this.AdvisorsTokensPercent);    
    await crowdsale.addWallet(this.FoundersTokensWallet, this.FoundersTokensPercent);
    await crowdsale.setPercentRate(this.PercentRate);
    await crowdsale.setSpecialWallet(specialwallet.address);
    await specialwallet.setAvailableAfterStart(50);
    await specialwallet.setEndDate(1546300800);
    await specialwallet.transferOwnership(crowdsale.address);
  });

  it('should mintTokensByETHExternal by owner', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.mintTokensByETHExternal(wallets[4], ether(1), {from: owner}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[4]);
    balance.should.bignumber.equal(this.price.times(1));
  });

  it('should mintTokensByETHExternal by Direct Mint Agend', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.setDirectMintAgent(wallets[2], {from: owner});
    await crowdsale.mintTokensByETHExternal(wallets[5], ether(1), {from: wallets[2]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[5]);
    balance.should.bignumber.equal(this.price.times(1));
  });

  it('should mintTokensExternal by owner', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.mintTokensExternal(wallets[4], tokens(100), {from: owner}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[4]);
    balance.should.bignumber.equal(tokens(100));
  });

  it('should mintTokensExternal by Direct Mint Agent', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.setDirectMintAgent(wallets[3], {from: owner});
    await crowdsale.mintTokensExternal(wallets[6], tokens(100), {from: wallets[3]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[6]);
    balance.should.bignumber.equal(tokens(100));
  });

  it('should use special wallet for investments', async function () {
    const investment = ether(1);
    const pre = web3.eth.getBalance(specialwallet.address);
    const owner = await crowdsale.owner();
    await crowdsale.sendTransaction({value: investment, from: wallets[1]});
    const post = web3.eth.getBalance(specialwallet.address);
    post.minus(pre).should.bignumber.equal(investment);
  });

}
