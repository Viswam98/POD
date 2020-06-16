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
      transporterKey:'0'
    }
    
    this.sign = this.sign.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.update = this.update.bind(this)
    this.tick= this.tick.bind(this)
    this.requestPackageKey= this.requestPackageKey.bind(this)
    this.verifyKeyBuyer= this.verifyKeyBuyer.bind(this)
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

      </div>

    )
  }
}
// {(this.props.state==='waitingForVerificationbySeller' && !this.props.buyClicked) ? <button onClick={this.buy}>Buy</button>:null}

export default Buyer;
