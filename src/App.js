import { Component } from 'react';

import Form from './components/Form';
import Filter from './components/Filter';
import Contacts from './components/Contacts';

import s from './App.module.css';
// import { stringify } from 'uuid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  };

  componentDidMount() {
    const localcontacts = JSON.parse(localStorage.getItem('contacts'));
    if (localcontacts) {
      this.setState({ contacts: localcontacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onSubmit = contact => {
    const isInContacts = this.state.contacts.find(
      el => el.name === contact.name,
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, contact],
      };
    });
  };

  removeContact = id => {
    const contacts = this.state.contacts.filter(contact => contact.id !== id);

    this.setState({ contacts });
  };

  onFilterChangeHandle = ({ currentTarget }) => {
    const value = currentTarget.value;

    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter),
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={s.app}>
        <h1 className={s.app__title}>Phonebook</h1>
        <Form onSubmit={this.onSubmit} />
        <h2 className={s.app__title}>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          onInputChange={this.onFilterChangeHandle}
        />
        <Contacts
          contacts={this.state.contacts}
          filteredContacts={filteredContacts}
          removeHandler={this.removeContact}
        />
      </div>
    );
  }
}

export default App;