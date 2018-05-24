![Blockchain Agro Trading Token](logo.svg "Blockchain Agro Trading Token")

# Blockchain Agro Trading Token smart contract

* _Standard_                                                                            : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : Blockchain Agro Trading Token
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_        : BATT
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_    : 18
* _Emission_                                                                            : Mintable
* _Crowdsales_                                                                          : 2
* _Fiat dependency_                                                                     : No
* _Tokens locked_                                                                       : Yes

## Smart-contracts description

Extended tokens are minted after the all stages are finished.  
There is a special function to return 3rd party tokens that were sent by mistake (function retrieveTokens()).  
Each stage has a direct minting function in wei. This is made to support the external payment gateways.

### Contracts contains
1. _Token_ - Token contract
2. _PreITO_ - PreITO contract
3. _ITO_ - ITO contract
4. _SpecialWallet_ - Wallet contract
5. _Configurator_ - contract with main configuration for production

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _mintTokensByETHExternal_ and _mintTokensExternal_.

### How to invest
To purchase tokens investor should send ETH (more than minimum) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Tokens distribution

* _Bounty tokens percent_       : 1% 
* _Advisors tokens percent_     : 1%
* _Founders tokens percent_     : 8% 
* _PreITO + ITO_                : 90%

## Main network configuration

* _Bounty tokens wallet_        : 0x31Dba1B0b92fa23Eec30e2fF169dc7Cc05eEE915
* _Advisors tokens wallet_      : 0x8c76033Dedd13FD386F12787Ab4973BcbD1de2A8
* _Founders tokens wallet_      : 0x7Ae3c0DdaC135D69cA8E04d05559cd42822ecf14
* _Contracts manager_           : 0x529E6B0e82EF632F070D997dd50C35aAa939cB37

### Links
1. _Token_ - https://etherscan.io/token/0x9d9859ec1dad9348eac7f4338af6c9dfd92ebd12
2. _PreITO_ - https://etherscan.io/address/0xd10399746b72a23662f8ba010f951b002dc45cfe
3. _ITO_ - https://etherscan.io/address/0xc07c8052168579a08c73318c899104b8dcb66698
4. _SpecialWallet_ - https://etherscan.io/address/0xd4fa8d79738b8e873f0d6ce8a1cc9108d8255ef5

### Features
* Manually mint tokens by owner or sale agent at any time until token minting finished. 
* Manually mint tokens in ether value by owner or sale agent at corresponding sale contract during current sale processing.  
* Softcap ETH available after softcap reached
* 18 ETH to 0x1D0B575b48a6667FD8E59Da3b01a49c33005d2F1 after softcap
* 50% ETH over softcap available after ITO finished
* Other 50% over softcap quarterly available untill 2019

### Crowdsale stages

#### PreITO
* _Minimal insvested limit_     : 1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Softcap_                     : 1000 ETH
* _Hardcap_                     : 33 366 ETH
* _Start_                       : 
* _Period_                      : 30 days
* _Wallet_                      : 0x0fc0b9f68DCc12B72203e579d427d1ddf007e464

##### Bonus system
* First 30 000 000 + 100% bonus
* Other + 50% bonus

#### ITO
* _Minimal insvested limit_     : 0.1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Hardcap_                     : 23 000 ETH
* _Start_                       : 
* _Period_                      : 30 days


## Ropsten network configuration #1

### Links
1. _Token_ - https://ropsten.etherscan.io/address/0x9856b0414d395b64ea1a6bd3f309e05b3f08476a
2. _PreITO_ - https://ropsten.etherscan.io/address/0x9ca762cff2ec1a55273f6b18abcb8948f03dce3d
3. _ITO_ - https://ropsten.etherscan.io/address/0xb194c529a8f6713387b9e41510239ae719f632ec
4. _SpecialWallet_ - https://ropsten.etherscan.io/address/0x7f2e3f40069733d4019184106991b76f49ab3110

### Crowdsale stages

#### PreITO

* _Minimal insvested limit_     : 1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Softcap_                     : 1 ETH
* _Hardcap_                     : 33 366 ETH
* _Start_                       : 11 May 2018 00:00:00 GMT
* _Period_                      : 30 days
* _Wallet_                      : 0x8fd94be56237ea9d854b23b78615775121dd1e82

##### Bonus system
* First 30 000 + 100% bonus
* Other + 50% bonus

##### Purchasers

* 1 ETH => 60000 tokens, gas = 179716
https://ropsten.etherscan.io/tx/0x44265eab9553f8307d33aba9cb7982f7986fb67f6a7f638ac9897ac3397db3c2

* 1 ETH => 45000 tokens, gas = 63461
https://ropsten.etherscan.io/tx/0x7cd68029015dc1e96130b47beb9982db303dc51280b37fd056431524f71e73f9

* 0.1 ETH => rejected txn, less then mininal investment limit, gas = 21297
https://ropsten.etherscan.io/tx/0x233c1ff636101b8f59887738b096146f9fc152246e73359667746393dc8e7f62

##### Service operations

* finish, gas = 95715
https://ropsten.etherscan.io/tx/0x4cfa99010c3536ed5a507044e002dac73439cafbc4bae0b6c1fc2bad0839685d

#### ITO

* _Minimal insvested limit_     : 1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Hardcap_                     : 23 000 ETH
* _Start_                       : 11 May 2018 00:00:00 GMT
* _Period_                      : 30 days
* _Bounty tokens wallet_        : 0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29
* _Advisors tokens wallet_      : 0x24a7774d0eba02846580A214eeca955214cA776C
* _Founders tokens wallet_      : 0xaa8ed6878a202eF6aFC518a64D2ccB8D73f1f2Ca
* _Bounty tokens percent_       : 1%
* _Advisors tokens percent_     : 1%
* _Founders tokens percent_     : 8%

##### Purchasers

* 1 ETH => 30000 tokens, gas = 93944
https://ropsten.etherscan.io/tx/0x57d9f6566a2cf8f6feb800096e5b58e06904620fa6a38fb8b4d0e93fb5b0116a

##### Service operations

* finish, gas = 393668
https://ropsten.etherscan.io/tx/0xb63bf6259861e57dbf538f7eeb4fde23436897df62ce0ba92b6f01e54cb133b4


## Ropsten network configuration #2

### Links
1. _Token_ - https://ropsten.etherscan.io/address/0x9dd7def2449db1be9d8a0f36b30db29b68d0d6b8
2. _PreITO_ - https://ropsten.etherscan.io/address/0x7e08994c20904d19b52bcbbe503f22ccbcf982c6
3. _ITO_ - https://ropsten.etherscan.io/address/0x8c1786c31692a071c1c51cbdd51c6963efc0af0f
4. _SpecialWallet_ - https://ropsten.etherscan.io/address/0xd1a0cb13524c94541dd17171b767803ddae0fb6e

### Crowdsale stages

#### PreITO

* _Minimal insvested limit_     : 1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Softcap_                     : 1 ETH
* _Hardcap_                     : 33 366 ETH
* _Start_                       : 14 May 2018 00:00:00 GMT
* _Period_                      : 30 days
* _Wallet_                      : 0x8fd94be56237ea9d854b23b78615775121dd1e82

##### Bonus system
* First 30 000 + 100% bonus
* Other + 50% bonus

##### Purchasers

* 1 ETH => 60000 tokens, gas = 179716
https://ropsten.etherscan.io/tx/0xaef5df9deac4458ce41b324d1fc6699e21174d21e7951a23e9ca1e15d6b39e45

##### Service operations

* finish, gas = 70715
https://ropsten.etherscan.io/tx/0x6b40196e6e59065edfcb25e38d27df1c8ba8dfc8dd8aafbf03f06050c9e59342

#### ITO

* _Minimal insvested limit_     : 1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Hardcap_                     : 23 000 ETH
* _Start_                       : 14 May 2018 00:00:00 GMT
* _Period_                      : 30 days
* _Bounty tokens wallet_        : 0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29
* _Advisors tokens wallet_      : 0x24a7774d0eba02846580A214eeca955214cA776C
* _Founders tokens wallet_      : 0xaa8ed6878a202eF6aFC518a64D2ccB8D73f1f2Ca
* _Bounty tokens percent_       : 1%
* _Advisors tokens percent_     : 1%
* _Founders tokens percent_     : 8%

##### Purchasers

* 1 ETH => 30000 tokens, gas = 93944
https://ropsten.etherscan.io/tx/0xfb148d96f672d4610bc3204ad9d0393e4cf076768fd68a07a592da33c4345086

##### Service operations

* finish, gas = 393668
https://ropsten.etherscan.io/tx/0x4240bf75894405fb6822a79c63bcdbbac2f54daa29cd1197bc9200cee4e1c6bb

##### SpecialWallet

* withdraw (50% of funds), gas = 54016
https://ropsten.etherscan.io/tx/0x598ac07ed36359b19e1eecc36b6c635f2cd18971a325d92466b6c2a66eb4cf9a
