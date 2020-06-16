var deploy = require('./deploy');
async function t(){
  var d = await deploy();
  console.log("interface: ",d.interface)
  console.log("address: ",d.address)
}
t()
// console.log(compile.interface)
// console.log(compile.bytecode)
