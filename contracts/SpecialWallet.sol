pragma solidity ^0.4.18;

import './PercentRateFeature.sol';
import './math/SafeMath.sol';

contract SpecialWallet is PercentRateFeature {
  
  using SafeMath for uint;

  uint public endDate;

  uint initialBalance;

  bool public started;

  uint public startDate;

  uint availableAfterStart;

  uint public withdrawed;

  uint public startQuater;

  uint public quater1;

  uint public quater2;

  uint public quater3;

  uint public quater4;

  modifier notStarted() {
    require(!started);
    _;
  }

  function start() public onlyOwner notStarted {
    started = true;
    startDate = now;

    uint year = 1 years;
    uint quater = year.div(4);
    uint prevYear = endDate.sub(1 years);

    quater1 = prevYear;
    quater2 = prevYear.add(quater);
    quater3 = prevYear.add(quater.mul(2));
    quater4 = prevYear.add(quater.mul(3));

    initialBalance = this.balance;

    startQuater = curQuater();
  }

  function curQuater() public view returns (uint) {
    if(now > quater4) 
      return 4;
    if(now > quater3) 
      return 3;
    if(now > quater2) 
      return 2;
    return 1;
  }
 
  function setAvailableAfterStart(uint newAvailableAfterStart) public onlyOwner notStarted {
    availableAfterStart = newAvailableAfterStart;
  }

  function setEndDate(uint newEndDate) public onlyOwner notStarted {
    endDate = newEndDate;
  }

  function withdraw(address to) public onlyOwner {
    require(started);
    if(now >= endDate) {
      to.transfer(this.balance);
    } else {
      uint cQuater = curQuater();
      uint toTransfer = initialBalance.mul(availableAfterStart).div(percentRate);
      if(startQuater < 4 && cQuater > startQuater) {
        uint secondInitialBalance = initialBalance.sub(toTransfer);
        uint quaters = 4;
        uint allQuaters = quaters.sub(startQuater);        
        uint value = secondInitialBalance.mul(cQuater.sub(startQuater)).div(allQuaters);         
        toTransfer = toTransfer.add(value);
      }
      toTransfer = toTransfer.sub(withdrawed); 
      to.transfer(toTransfer);
      withdrawed = withdrawed.add(toTransfer);        
    }
  }

  function () public payable {
  }

}
