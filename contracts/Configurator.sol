pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './AssembledCommonSale.sol';
import './Token.sol';
import './PreITO.sol';
import './ITO.sol';
import './SpecialWallet.sol';

contract Configurator is Ownable {

  Token public token;

  SpecialWallet public specialWallet;

  PreITO public preITO;

  ITO public ito;

  function deploy() public onlyOwner {

    address manager = 0x529E6B0e82EF632F070D997dd50C35aAa939cB37;

    token = new Token();
    specialWallet = new SpecialWallet();
    preITO = new PreITO();
    ito = new ITO();

    specialWallet.setAvailableAfterStart(50);
    specialWallet.setEndDate(1546300800);
    specialWallet.transferOwnership(preITO);

    commonConfigure(preITO);
    commonConfigure(ito);

    preITO.setWallet(0x0fc0b9f68DCc12B72203e579d427d1ddf007e464);
    preITO.setStart(1524441600);
    preITO.setSoftcap(1000000000000000000000);
    preITO.setHardcap(33366000000000000000000);
    preITO.setFirstBonus(100);
    preITO.setFirstBonusTokensLimit(30000000000000000000000000);
    preITO.setSecondBonus(50);
    preITO.setMinInvestedLimit(1000000000000000000);

    token.setSaleAgent(preITO);

    ito.setStart(1527206400);
    ito.setHardcap(23000000000000000000000);

    ito.addWallet(0x8c76033Dedd13FD386F12787Ab4973BcbD1de2A8, 1);
    ito.addWallet(0x31Dba1B0b92fa23Eec30e2fF169dc7Cc05eEE915, 1);
    ito.addWallet(0x7Ae3c0DdaC135D69cA8E04d05559cd42822ecf14, 8);
    ito.setMinInvestedLimit(100000000000000000);

    preITO.setNextSaleAgent(ito);

    token.transferOwnership(manager);
    preITO.transferOwnership(manager);
    ito.transferOwnership(manager);
  }

  function commonConfigure(AssembledCommonSale sale) internal {
    sale.setPercentRate(100);
    sale.setPeriod(30);
    sale.setPrice(30000000000000000000000);
    sale.setSpecialWallet(specialWallet);
    sale.setToken(token);
  }

}

