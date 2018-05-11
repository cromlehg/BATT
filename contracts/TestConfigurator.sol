pragma solidity ^0.4.18;

import './ownership/Ownable.sol';

contract Token {
  function setSaleAgent(address newSaleAgent) public;
  function transferOwnership(address newOwner) public;
}

contract PreITO {
  function setStart(uint newStart) public;
  function setPeriod(uint newPeriod) public;
  function setPrice(uint newPrice) public;
  function setMinInvestedLimit(uint newMinInvestedLimit) public;
  function setSoftcap(uint newSoftcap) public;
  function setHardcap(uint newHardcap) public;
  function setWallet(address newWallet) public;
  function setPercentRate(uint newPercentRate) public;
  function setToken(address newToken) public;
  function transferOwnership(address newOwner) public;
  function setNextSaleAgent(address newICO) public;
  function setSpecialWallet(address addrSpecialWallet) public;
  function setFirstBonusTokensLimit(uint _tokens) public;
  function setFirstBonus(uint newFirstBonus) public;
  function setSecondBonus(uint newSecondBonus) public;
}

contract ITO {
  function setStart(uint newStart) public;
  function setPeriod(uint newPeriod) public;
  function setPrice(uint newPrice) public;
  function setMinInvestedLimit(uint newMinInvestedLimit) public;
  function setHardcap(uint newHardcap) public;
  function addWallet(address wallet, uint percent) public;
  function setPercentRate(uint newPercentRate) public;
  function setToken(address newToken) public;
  function transferOwnership(address newOwner) public;
  function setSpecialWallet(address addrSpecialWallet) public;
}

contract SpecialWallet {
  function setAvailableAfterStart(uint newAvailableAfterStart) public;
  function setEndDate(uint newEndDate) public;
  function transferOwnership(address newOwner) public;
}

contract TestConfigurator is Ownable {
  Token public token;
  PreITO public preITO;
  ITO public ito;
  SpecialWallet public specialWallet;

  function setToken(address _token) public onlyOwner {
    token = Token(_token);
  }

  function setPreITO(address _preITO) public onlyOwner {
    preITO = PreITO(_preITO);
  }

  function setITO(address _ito) public onlyOwner {
    ito = ITO(_ito);
  }

  function setSpecialWallet(address _specialWallet) public onlyOwner {
    specialWallet = SpecialWallet(_specialWallet);
  }

  function deploy() public onlyOwner {
    specialWallet.setAvailableAfterStart(50);
    specialWallet.setEndDate(1546300800);
    specialWallet.transferOwnership(preITO);

    token.setSaleAgent(preITO);

    preITO.setStart(1525996800);
    preITO.setPeriod(30);
    preITO.setPrice(30000000000000000000000);
    preITO.setMinInvestedLimit(1000000000000000000);
    preITO.setSpecialWallet(specialWallet);
    preITO.setSoftcap(1000000000000000000);
    preITO.setHardcap(33366000000000000000000);
    preITO.setFirstBonus(100);
    preITO.setFirstBonusTokensLimit(30000000000000000000000);
    preITO.setSecondBonus(50);
    preITO.setWallet(0x8fd94be56237ea9d854b23b78615775121dd1e82);
    preITO.setPercentRate(100);
    preITO.setToken(token);
    preITO.setNextSaleAgent(ito);

    ito.setStart(1525996800);
    ito.setPeriod(30);
    ito.setPrice(30000000000000000000000);
    ito.setMinInvestedLimit(1000000000000000000);
    ito.setSpecialWallet(specialWallet);
    ito.setHardcap(23000000000000000000000);
    ito.addWallet(0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29, 1);
    ito.addWallet(0x24a7774d0eba02846580A214eeca955214cA776C, 1);
    ito.addWallet(0xaa8ed6878a202eF6aFC518a64D2ccB8D73f1f2Ca, 8);
    ito.setPercentRate(100);
    ito.setToken(token);

    token.transferOwnership(owner);
    preITO.transferOwnership(owner);
    ito.transferOwnership(owner);
  }

}

