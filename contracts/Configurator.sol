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

    address manager = 0x66C1833F667eAE8ea1890560e009F139A680F939;

    token = new Token();
    specialWallet = new SpecialWallet();
    preITO = new PreITO();
    ito = new ITO();

    specialWallet.setAvailableAfterStart(50);
    specialWallet.setEndDate(1546300800);
    specialWallet.transferOwnership(preITO);

    commonConfigure(preITO);
    commonConfigure(ito);

    preITO.setWallet(0xB53E3f252fBCD041e46Aad82CFaEe326E04d1396);
    preITO.setStart(1524441600);
    preITO.setSoftcap(1000000000000000000000);
    preITO.setHardcap(16666000000000000000000);
    preITO.setFirstBonus(100);
    preITO.setFirstBonusTokensLimit(30000000000000000000000000);
    preITO.setSecondBonus(50);

    token.setSaleAgent(preITO);

    ito.setStart(1527206400);
    ito.setHardcap(40000000000000000000000);

    ito.addWallet(0x3180e7B6E726B23B1d18D9963bDe3264f5107aef, 1);
    ito.addWallet(0x36A8b67fe7800Cd169Fd46Cd75824DC016a54d13, 1);
    ito.addWallet(0xDf9CAAE51eED1F23B4ae9AeCDbdeb926252eFFC4, 8);

    preITO.setNextSaleAgent(ito);

    token.transferOwnership(manager);
    preITO.transferOwnership(manager);
    ito.transferOwnership(manager);
  }

  function commonConfigure(AssembledCommonSale sale) internal {
    sale.setPercentRate(100);
    sale.setPeriod(30);
    sale.setPrice(30000000000000000000000);
    sale.setMinInvestedLimit(1000000000000000000);
    sale.setSpecialWallet(specialWallet);
    sale.setToken(token);
  }

}

