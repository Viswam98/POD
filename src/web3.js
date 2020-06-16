import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider); //to replace the provider injected by metamask
const web3 = new Web3(window.ethereum);

window.ethereum.enable();

export default web3;
