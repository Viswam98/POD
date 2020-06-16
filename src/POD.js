//this is to create the instance of the contract. (the address and abi used in the code is copied from console after running deploy.js from lottery)
import web3 from './web3'


const address = '0x5aA8443c1ffa6B4B4fB8e6e7d03515C88BB990e2'
const abi =

[{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TermsIPFS_Hash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"createPackageAndKey","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"keyT","type":"string"},{"name":"keyR","type":"string"}],"name":"verifyTransporter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"SignTermsAndConditions","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"keyT","type":"string"},{"name":"keyR","type":"string"}],"name":"verifyKeyBuyer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"arbitrator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"attestaionAuthority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"requestPackageKey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"returnKey","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deliverPackage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"BuyerExceededTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"verificationHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"itemPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"transporter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_seller","type":"address"},{"name":"_buyer","type":"address"},{"name":"_transporter","type":"address"},{"name":"_arbitrator","type":"address"},{"name":"_attestationAuthority","type":"address"},{"name":"_itemID","type":"bytes32"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"}],"name":"TermsAndConditionsSignedBy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"}],"name":"collateralWithdrawnSuccessfully","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"},{"indexed":false,"name":"key","type":"uint256"}],"name":"PackageCreatedBySeller","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"}],"name":"PackageIsOnTheWay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"},{"indexed":false,"name":"key","type":"uint256"}],"name":"PackageKeyGivenToBuyer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"}],"name":"ArrivedToDestination","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"}],"name":"BuyerEnteredVerificationKeys","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"}],"name":"SuccessfulVerification","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"}],"name":"VerificationFailure","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"entityAddress","type":"address"},{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"reason","type":"string"}],"name":"CancellationReuest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"}],"name":"RefundDueToCancellation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"}],"name":"DeliveryTimeExceeded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"}],"name":"EtherTransferredToArbitrator","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"info","type":"string"},{"indexed":false,"name":"entityAddress","type":"address"}],"name":"BuyerExceededVerificationTime","type":"event"}]




//exports a complete copy of our contract (lottery) with which we can work from our react side of the code
export default new web3.eth.Contract(abi,address)
