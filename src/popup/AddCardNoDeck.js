import React, { Component } from 'react'
// import { autoUpdater } from 'electron';
import '../App.css';
import { TODAY } from '../utils/helpers';
import { connect } from 'react-redux';
import { addCard,receiveDecks } from '../actions';
import DB from '../utils/db';


export class AddCardNoDeck extends Component {
  state = {
    db: new DB('jonathanrosado'),
    recto: '',
    verso:'',
    deck:'',
    cardAdded:false
  }

  updateValue = (e) => {

    this.setState({
        [e.target.name]: e.target.value
    })
  }

  onCancel = () => {
    this.setState({recto:'',verso:''});
    localStorage.removeItem('recto');
    localStorage.removeItem('verso');
}

  handleSave = (e) => {
    e.preventDefault()
    const {recto, verso, deck} = this.state;

    if(recto && verso){
      this.state.db.addCardToDeck(deck,{recto,verso}).then(
        (value) => {
          console.log('card added :');
          console.log(value);
          let dueDate = TODAY;
          let { recto, verso, difficulty, interval, update, id} = value
          this.props.dispatch(addCard({recto, verso, difficulty, interval, update, id, deck,dueDate}));
          this.setState({ recto:'',verso:'', deck:'', cardAdded:true});
          localStorage.removeItem('recto');
          localStorage.removeItem('verso');
          setTimeout(() => this.setState({cardAdded:false}), 1000)
        }
      )
    }
  }

  async componentDidMount() {
    let sync = await this.state.db.sync();
    let decks = await this.state.db.initializeDB();
    this.props.dispatch(receiveDecks(decks))
    console.log(this.props)
    
    localStorage.getItem('recto') && this.setState({'recto': localStorage.getItem('recto')})
    localStorage.getItem('verso') && this.setState({'verso': localStorage.getItem('verso')})
    
  }

  setToLocalStorage = (e) => {
    localStorage.setItem(e.target.name, e.target.value)
  }

  render() {
    const { decks } = this.props;
    console.log(decks)
    const {recto, verso} = this.state;
    return (
        <React.Fragment>
            
      <div className="container">
        <form >
            <h3>Deck</h3>
            <select name="deck" id="deckname" className="deckname-selector" onChange={this.updateValue} onMouse>
                <option value="">Select a Deck</option>
                {Object.keys(decks).map(deckname => (
                    <option value={deckname}> {deckname} </option>
                ))}
            </select>
            

            <h3>Recto</h3>
            <textarea name="recto" value={recto} onChange={this.updateValue} onMouseLeave={this.setToLocalStorage}/>
            <br/>
            <h3>Verso</h3>
            <textarea name="verso" value={verso} onChange={this.updateValue} onMouseLeave={this.setToLocalStorage}/>

            {this.state.cardAdded ? 
            <p className="btn add-card-success">Successfully Added card</p>
             :
            <React.Fragment>
              <button className="btn refresh-btn" onClick={(e) => this.handleSave(e)}>Save</button>
              <button className="btn cancel-btn" onClick={() => this.onCancel()}>Cancel</button>
            </React.Fragment> }
            

          
        </form>
      </div>
      </React.Fragment>
    )
  }
}
function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(AddCardNoDeck)
