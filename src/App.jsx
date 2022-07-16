import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Container } from 'components/Container/Container';
import { Title } from 'components/Title/Title';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contactList', []);
  const [filter, setFilter] = useState('');

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = value => {
    const filterNormalize = value.toLowerCase();

    return contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(filterNormalize);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const contactDelete = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const handleSubmit = ({ name, number }) => {
    const isContact = contacts.find(contact => contact.name === name);
    if (isContact) {
      toast.error(`${name} is already in contact`, {
        autoClose: 3000,
      });
    } else {
      setContacts(state => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return [newContact, ...state];
      });
    }
  };

  return (
    <Container>
      <Title>Phone Book</Title>
      <ContactForm onSubmit={handleSubmit} />
      <Title>Contacts</Title>
      <Filter
        title="Find contact by name"
        onChange={handleFilterChange}
        value={filter}
      />
      <ContactList
        filtrationContacts={filteredContacts(filter)}
        onDelete={contactDelete}
      />
      <ToastContainer />
    </Container>
  );
};
