import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { getAll, getByType } from '../data/pets';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (type) => {
    this.setState({
      ...this.state,
      filters: {
        type: type
      }
    });
  }

  onFindPetsClick = () => {
    if(this.state.filters.type === "all"){
      this.setState({
        ...this.state,
        pets: getAll()
      });
    } else {
      this.setState({
        ...this.state,
        pets: getByType(this.state.filters.type)
      });
    }
  }

  onAdoptPet = (id) => {
    const newPets = [...this.state.pets];
    const indexOfPetToAdopt = newPets.findIndex(pet => pet.id === id);
    const petToAdopt = newPets.find(pet => pet.id === id);

    petToAdopt.isAdopted = true;
    newPets.splice(indexOfPetToAdopt, 1, petToAdopt);
    this.setState({
      ...this.state,
      pets: newPets
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType}
                filter={this.state.filters.type}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
