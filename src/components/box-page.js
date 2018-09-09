import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {Redirect} from 'react-router-dom';
import requiresLogin from './requires-login';
import {
  fetchBox, 
  createBox, 
  addVegetable, 
  updateBox, 
  setSelectDisplayBoolean, 
  errorMessage,
  successMessage
} from '../actions/boxes';
import {fetchVegetables} from '../actions/vegetables';
import BoxContents from './box-contents';


export class BoxPage extends React.Component {
  constructor(props) {
    super(props);

    this.select = null
    this.selectRef = select => {
       this.select = select
   }
  }
  
  componentDidMount() {
    const date = this.props.match.params.date;
    this.props.dispatch(fetchVegetables());
    this.props.dispatch(fetchBox(date))
    .then(() => {
        if (!this.props.box) {
          //console.log(this.props.box)
          this.props.dispatch(createBox(date))        
        } 
      })
      .then(() => {
        this.props.dispatch(setSelectDisplayBoolean())
        })
    .catch(err => {
      console.log(err);
    });
  }

  onSave = (e) => {
    e.preventDefault();

    const date = this.props.match.params.date;
    //map through added vegetables and generate array of box content objects
    const addedVegetables = [];
    
    if (this.props.unsavedBoxContents) {
      this.props.unsavedBoxContents.map(vegetable => {
       return addedVegetables.push(vegetable);
      });
    } else {
      this.props.savedBoxContents.map(vegetable => {
       return addedVegetables.push(vegetable);
      })
    }

    const boxContents = {
      boxContents: addedVegetables
    }

   if (boxContents.boxContents.length !== 8) {
     this.props.dispatch(errorMessage('Please select 8 items before saving.'));
     this.props.dispatch(successMessage(''));
   } else {
     this.props.dispatch(errorMessage(''));
     this.props.dispatch(successMessage('Your choices have been saved!'));
     this.props.dispatch(updateBox(boxContents, date));
  }
}

  onSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(addVegetable(this.select.value));
    this.props.dispatch(setSelectDisplayBoolean());
    
    console.log('selected:',this.select.value,'added:', this.props.unsavedBoxContents);
  }

  render() {
    const vegetableOptions = [];
    // if no vegetables have been selected provide all vegetable options to user
    // console.log('the box-page is rendering')
    if (this.props.loading) {
      return <Spinner name="three-bounce" />
    }

    if (this.props.goHome) {
      return <Redirect to='/dashboard' />
    }

    if (this.props.showAbout) {
      return <Redirect to='/about' />
    }

    if (this.props.unsavedBoxContents) {
      const remainingChoices = this.props.vegetables.filter((vegetable) => {
        return !(this.props.unsavedBoxContents.includes(vegetable.name))
       })
       for (let i = 0; i < remainingChoices.length; i++) {
         vegetableOptions.push(<option key={i} value={remainingChoices[i].name}>{remainingChoices[i].name}</option>)
       }
    // filter out any options that have already been selected
    } else if (this.props.savedBoxContents) {
        const remainingChoices = this.props.vegetables.filter((vegetable) => {
          return !(this.props.savedBoxContents.includes(vegetable.name))
         })
         for (let i = 0; i < remainingChoices.length; i++) {
           vegetableOptions.push(<option key={i} value={remainingChoices[i].name}>{remainingChoices[i].name}</option>)
         }
        }

  return (
    <div className='box-builder container'>
      <form className={this.props.selectDisplay ? '' : 'hide-vegetable-selector-form'} id='vegetable-select-form'
        onSubmit={this.onSubmit}>
        <label className='select-instructions' htmlFor='vegetable-selector'>Choose 8 vegetables from the list</label>
        <select className='vegetable-selector' 
          name='vegetable-selector' 
          id='vegetable-selector'
          aria-labelledby='vegetable-selector vegetable-selector-form'
          ref={this.selectRef}>
          {vegetableOptions}
        </select>
        <button type='submit' 
          className='vegetable-select-button' >Add to Box</button>
      </form>
      <BoxContents />
      <p>{this.props.errorMessage}</p>
      <p>{this.props.successMessage}</p>
      <button type='submit' onClick={(e) => this.onSave(e)}>Save</button>
    </div>
  )
}
  }

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      loggedIn: state.auth.authToken !== null,
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      box: state.box.pickUpDate,
      savedBoxContents: state.box.savedBoxContents,
      unsavedBoxContents: state.box.unsavedBoxContents,
      vegetables: state.vegetable.data,
      selectDisplay: state.box.displaySelectForm,
      loading: state.box.loading,
      errorMessage: state.box.errorMessage,
      successMessage: state.box.successMessage,
      goHome: state.box.goHome,
      showAbout: state.box.showAbout
  }
};

export default requiresLogin()(connect(mapStateToProps)(BoxPage));

