![Blockchain Agro Trading Token](logo.svg "Blockchain Agro Trading Token")

# Blockchain Agro Trading Token smart contract

* _Standard_                                                                            : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : BUILD
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_        : BUILD
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
4. _Configurator_ - contract with main configuration for production

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _mintTokensByETHExternal_ and _mintTokensExternal_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
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
1. _Token_ -
2. _PreITO_ -
3. _ITO_ -

### Features
* Manually mint tokens by owner or sale agent at any time until token minting finished. 
* Manually mint tokens in ether value by owner or sale agent at corresponding sale contract during current sale processing.  
* Softcap ETH available after softcap reached
* 50% ETH over softcap available after ITO finished
* Other 50% over softcap quarterly available untill 2019

### Crowdsale stages

#### PreITO
* _Minimal insvested limit_     : 1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Softcap_                     : 1000 ETH
* _Hardcap_                     : 16 666 ETH
* _Start_                       : 
* _Period_                      : 30 days
* _Wallet_                      : 0x0fc0b9f68DCc12B72203e579d427d1ddf007e464

##### Bonus system
* First 30 000 000 - 100% discount
* Other - 50% discount

#### ITO
* _Minimal insvested limit_     : 1 ETH
* _Base price_                  : 1 ETH = 30 000 Tokens
* _Hardcap_                     : 40 000 ETH
* _Start_                       : 
* _Period_                      : 30 days

