const HDWalletProvider=require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compileOutput=require('./compile.js');
const provider = new HDWalletProvider(
  'phrase',
  'https://rinkeby.infura.io/v3/<t>',
  0,
  5
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account',accounts[0])
  const result = await new web3.eth.Contract(JSON.parse(compileOutput.interface))
  .deploy(
    {
      data:'0x'+compileOutput.bytecode,
      arguments:[
        accounts[0],
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[4],
      '0x7465737400000000000000000000000000000000000000000000000000000000'
      ]
    }
  )
  .send({gas:'5000000',from:accounts[0]});

  console.log(compileOutput.interface)
  console.log('Contract deployed to',result.options.address);

  return {interface : compileOutput.interface , address: result.options.address};
};
 deploy();
