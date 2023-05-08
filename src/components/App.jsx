import { ContactsForm } from './contactsForm/ContactsForm';
import { ContactsList } from './contactsList/ContactsList';
import { Filter } from './filter/Filter';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.container}>
      <div>
        <h2>Phonebook</h2>
        <ContactsForm />
      </div>
      <div>
        <h2>Contacts</h2>
        <Filter />
        <ContactsList />
      </div>
    </div>
  );
};
