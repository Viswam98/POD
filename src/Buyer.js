import React,{Component} from 'react';
import web3 from './web3.js'
import POD from './POD'


class Buyer extends Component {
  constructor(props){
    super(props)
    this.state = {
      signed:false,
      key:'0',
      showKey:false,
      transporterKey:'0',
      cancellable: false,
      reason:'r',
      isRefundable:false
    }
    this.sign = this.sign.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.update = this.update.bind(this)
    this.tick= this.tick.bind(this)
    this.requestPackageKey= this.requestPackageKey.bind(this)
    this.verifyKeyBuyer= this.verifyKeyBuyer.bind(this)
    this.cancelTransaction= this.cancelTransaction.bind(this)
    this.refund= this.refund.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  sign = (event) => {
    this.setState({
      signed:true
    })
    this.props.SignTermsAndConditions(this.props.address)
  }

  async requestPackageKey(){
    await POD.methods.requestPackageKey().send({
      from: this.props.address
    })
  }

  async verifyKeyBuyer(evt){
    evt.preventDefault()
    console.log("verify");
    await POD.methods.verifyKeyBuyer(this.state.transporterKey,this.state.key).send({
      from: this.props.address
    })
  }

  async cancelTransaction(){
    await POD.methods.cancelTransaction(this.state.reason).send({
      from: this.props.address
    })
  }

  async refund(){
    await POD.methods.refund().send({
      from: this.props.address
    })
  }

  async tick() {
    console.log("tick",this.props.index)
    if(this.props.index !== await POD.methods.state().call()){
      this.props.reRender();
    }
    let keyb = await POD.methods.returnKey().call({
      from: this.props.address
    })
    if(this.state.key !== keyb){
      this.setState({
        key: keyb
      })
    }
    let cancellable = await POD.methods.cancellable(this.props.address).call()
    if(this.state.cancellable != cancellable){
      this.setState({
        cancellable: cancellable
      })
    }
    let isRefundable = await POD.methods.isRefundable().call({
      from: this.props.address
    })
    console.log(isRefundable)
    if(this.state.isRefundable != isRefundable){
      this.setState({
        isRefundable: isRefundable
      })
    }
  }
  async update(){
    console.log("update",this.props.index)
    const interval = setInterval( () => {
      this.tick()
    }, 3000);
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
        <h1>Buyer Component</h1>
        <h3>Adderss: {this.props.address}</h3>
        <h3>State: {this.props.state}</h3>

        {this.props.state!=='Aborted' && this.props.state !=='PaymentSettledSuccess' ?
          <div>
            {this.props.state==='waitingForVerificationbyBuyer' ? <button onClick={this.sign}>Sign terms and conditions</button>:null}
            {this.props.state==='ItemOnTheWay' ? <button onClick={this.requestPackageKey}>Request Package Key</button>:null}

            {this.state.key !== '0' ?
              (
                this.state.showKey ?
                <div>
                  <h3>Your Key: {this.state.key}</h3>
                  <button onClick={() => {this.setState({showKey: !this.state.showKey})}}>Hide Key</button>
                </div>
                :<button onClick={() => {this.setState({showKey: !this.state.showKey})}}>Show Key</button>
              )
              :null}

              {this.props.state === "ArrivedToDestination"  ?
                <form onSubmit={this.verifyKeyBuyer}>
                  <label htmlFor='key'>Enter Transporter key: </label>
                    <input
                      type='text'
                      name='transporterKey'
                      value={this.state.transporterKey}
                      onChange={this.handleChange}
                      id='transporterKey'
                    />
                  {this.state.transporterKey !== '0' && this.state.transporterKey !== '' ? <button>Submit</button> : null}
                </form>
              : null}

              {(this.props.state==='ItemOnTheWay' || this.props.state==='PackageKeyGivenToBuyer') && this.state.isRefundable ?
                <div>
                  <label htmlFor='refund'>Transporter exceeded time: </label>
                    <button
                      name='refund'
                      onClick={this.refund}
                      id='refund'
                    >Refund</button>
                </div>
              :null}

              {this.state.cancellable ?
                <button onClick={this.cancelTransaction}>Cancel Order</button>
              :null}
            </div>
          :null}
      </div>

    )
  }
}


export default Buyer;
