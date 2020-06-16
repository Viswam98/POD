import React,{Component} from 'react';
import web3 from './web3.js'
import POD from './POD'

var keyT=null;

class Seller extends Component{
  constructor(props){
    super(props)
    this.state = {
      signed:false,
      Key:'0'
    }
    this.sign = this.sign.bind(this)
    this.update = this.update.bind(this)
    this.tick= this.tick.bind(this)
    this.createPackageAndKey=this.createPackageAndKey.bind(this)
  }
  sign = (event) => {
    this.setState({
      signed:true
    })

    this.props.SignTermsAndConditions(this.props.address)
  }

  async createPackageAndKey(){
    await POD.methods.createPackageAndKey().send({
      from: this.props.address
    })
  }

  async tick() {
    console.log("tick",this.props.index)
    if(this.props.index !== await POD.methods.state().call() ){
      this.props.reRender();
    }

    let keyt = await POD.methods.returnKey().call({
      from: this.props.address
    })
    console.log(keyt);
    if(this.state.key !== keyt){
      this.setState({
        key: keyt
      })
    }
  }
  async update(){
    console.log("update",this.props.index)
    const interval = setInterval( () => {
      this.tick()
    }, 3500);
  }
  componentDidUpdate(prevProps, prevState) {
    this.update()
  }
  componentDidMount(prevProps, prevState) {
    this.update()
  }
  render(){
    return(

      <div>

        <h1>Seller Component</h1>
        <h3>Adderss: {this.props.address}</h3>
        <h3>State: {this.props.state}</h3>
        <h3>Price: {this.props.price}</h3>
        {this.props.state==='waitingForVerificationbySeller' ?  <button onClick={this.sign}>Sign terms and conditions</button>:null}
        {this.props.state==='MoneyWithdrawn'? <button onClick={this.createPackageAndKey}>Create Package And Key</button>:null}
        {this.props.state==='PackageAndTransporterKeyCreated'?
          <h3>Transporter Key: {this.state.key}</h3>
        :null}

      </div>

    )
  }
}

export default Seller;
