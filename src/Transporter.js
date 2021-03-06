import React,{Component} from 'react';
import web3 from './web3.js'
import POD from './POD'


class Transporter extends Component{
  constructor(props){
    super(props)
    this.state = {
      signed:false,
      key:'0',
      keySubmitted:false,
      keyGenerated:false,
      showKey: false,
      buyerKey: '0',
      cancellable: false,
      reason:'r',
      isBuyerExceededTime:false
    }
    this.sign = this.sign.bind(this)
    this.update = this.update.bind(this)
    this.tick= this.tick.bind(this)
    this.setKey = this.setKey.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deliverPackage = this.deliverPackage.bind(this)
    this.verifyTransporter = this.verifyTransporter.bind(this)
    this.cancelTransaction= this.cancelTransaction.bind(this)
    this.BuyerExceededTime= this.BuyerExceededTime.bind(this)
  }
  sign = (event) => {
    this.setState({
      signed:true
    })

    this.props.SignTermsAndConditions(this.props.address)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  setKey(evt){
    evt.preventDefault();
    this.setState({
      keySubmitted: !this.state.keySubmitted
    })
  }

  async deliverPackage(){
    await POD.methods.deliverPackage().send({
      from: this.props.address
    })
  }

  async verifyTransporter(evt){
    evt.preventDefault()
    await POD.methods.verifyTransporter(this.state.key,this.state.buyerKey).send({
      from: this.props.address
    })
  }

  async cancelTransaction(){
    await POD.methods.cancelTransaction(this.state.reason).send({
      from: this.props.address
    })
  }

  async BuyerExceededTime(){
    await POD.methods.BuyerExceededTime().send({
      from: this.props.address
    })
  }

  async tick() {
    console.log("tick",this.props.index)
    if(this.props.index !== await POD.methods.state().call()){
      this.props.reRender();
    }
    let keyt = await POD.methods.returnKey().call({
      from: this.props.address
    })
    if(this.state.key !== keyt){
      this.setState({
        key: keyt
      })
    }
    let cancellable = await POD.methods.cancellable(this.props.address).call()
    if(this.state.cancellable != cancellable){
      this.setState({
        cancellable: cancellable
      })
    }
    let isBuyerExceededTime = await POD.methods.isBuyerExceededTime().call({
      from: this.props.address
    })
    if(this.state.isBuyerExceededTime != isBuyerExceededTime){
      this.setState({
        isBuyerExceededTime: isBuyerExceededTime
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
        <h1>Transporter Component</h1>
        <h3>Adderss: {this.props.address}</h3>
        <h3>State: {this.props.state}</h3>

        {this.props.state!=='Aborted' && this.props.state!=='PaymentSettledSuccess' ?
          <div>
            {this.props.state==="waitingForVerificationbyTransporter"  ?<button onClick={this.sign}>Sign terms and conditions</button>:null}

              {this.state.key !== '0' ?
                (
                  this.state.showKey ?
                  <div>
                    <h3>key: {this.state.key}</h3>
                    <button onClick={() => {this.setState({showKey: !this.state.showKey})}}>Hide Key</button>
                  </div>
                  :<button onClick={() => {this.setState({showKey: !this.state.showKey})}}>Show Key</button>
                )
                :null}
              {this.props.state === "PackageAndTransporterKeyCreated" ?
                <div>
                  <button onClick={this.deliverPackage}>Start Package Delivery</button>
                </div>
              : null}

              {this.props.state === "PackageKeyGivenToBuyer"  ?
                <form onSubmit={this.verifyTransporter}>
                  <label htmlFor='key'>Enter Buyer key: </label>
                    <input
                      type='text'
                      name='buyerKey'
                      value={this.state.buyerKey}
                      onChange={this.handleChange}
                      id='buyerKey'
                    />
                  {this.state.buyerKey !== '0' && this.state.buyerKey !== '' ? <button>Submit</button> : null}
                </form>
              : null}

              {(this.props.state==='ArrivedToDestination') && this.state.isBuyerExceededTime ?
                <div>
                  <label htmlFor='BuyerExceededTime'>Buyer exceeded time: </label>
                    <button
                      name='BuyerExceededTime'
                      onClick={this.BuyerExceededTime}
                      id='BuyerExceededTime'
                    >Cancel</button>
                </div>
              :null}

              {this.state.cancellable ?
                <button onClick={this.cancelTransaction}>Cancel</button>
              :null}
            </div>
          :null}


      </div>

    )
  }
}

export default Transporter;
