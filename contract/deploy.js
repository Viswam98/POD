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
      '0x906706e2C7e9B5eb075cc7fA0941384608642E4E',
      '0x8a3352D4e2C28704689061eF7B7912F3210DdC20',
      '0x1c8F6fBe05FBD7ff72a187537Fb287F3EEd2e328',
      '0x068A4CeDe4461F8207eA0F066C94F805E4ef1aaa',
      '0xbab24640f8538BE2b9C704a3ab930C40b3856f3C',
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
