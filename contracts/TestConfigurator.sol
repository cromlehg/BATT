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
}

contract ITO {
  function setStart(uint newStart) public;
  function addMilestone(uint period, uint bonus) public;
  function setPrice(uint newPrice) public;
  function setMinInvestedLimit(uint newMinInvestedLimit) public;
  function setHardcap(uint newHardcap) public;
  function setWallet(address newWallet) public;
  function addWallet(address wallet, uint percent) public;
  function setPercentRate(uint newPercentRate) public;
  function setToken(address newToken) public;
  function transferOwnership(address newOwner) public;
  function lockAddress(address newLockAddress, uint newLockDays) public;
}

contract TestConfigurator is Ownable {
  Token public token;
  PreITO public preITO;
  ITO public ito;

  function setToken(address _token) public onlyOwner {
    token = Token(_token);
  }

  function setPreITO(address _preITO) public onlyOwner {
    preITO = PreITO(_preITO);
  }

  function setITO(address _ito) public onlyOwner {
    ito = ITO(_ito);
  }

  function deploy() public onlyOwner {
    token.setSaleAgent(preITO);

    preITO.setStart(1524700800);
    preITO.setPeriod(42);
    preITO.setPrice(6650000000000000000000);
    preITO.setMinInvestedLimit(100000000000000000);
    preITO.setSoftcap(1500000000000000000);
    preITO.setHardcap(2000000000000000000);
    preITO.setWallet(0x8fd94be56237ea9d854b23b78615775121dd1e82);
    preITO.setPercentRate(100);
    preITO.setToken(token);
    preITO.setNextSaleAgent(ito);

    ito.setStart(1524700800);
    ito.addMilestone(15, 25);
    ito.addMilestone(15, 20);
    ito.addMilestone(15, 15);
    ito.addMilestone(15, 10);
    ito.addMilestone(15, 5);
    ito.addMilestone(15, 0);
    ito.setPrice(5000000000000000000000);
    ito.setMinInvestedLimit(100000000000000000);
    ito.setHardcap(23000000000000000000000);
    ito.setWallet(0x8fd94be56237ea9d854b23b78615775121dd1e82);
    ito.addWallet(0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29, 2);
    ito.addWallet(0x24a7774d0eba02846580A214eeca955214cA776C, 3);
    ito.addWallet(0xaa8ed6878a202eF6aFC518a64D2ccB8D73f1f2Ca, 11);
    ito.addWallet(0x470a2D1105EaE6aAe879623357F615Ab9cbf906E, 4);
    ito.setPercentRate(100);
    ito.setToken(token);
    ito.lockAddress(0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29,30);

    token.transferOwnership(owner);
    preITO.transferOwnership(owner);
    ito.transferOwnership(owner);
  }

}

