import { Contact } from 'components/contactEl/Contact';
import {
  getContacts,
  getError,
  getFilter,
  getIsLoading,
} from 'redux/selectors';
import css from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllThunk } from 'services/api';
import Loader from 'components/Loader/Loader';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const loading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const filteredContacts = contacts
    .filter(({ name }) => name.toLowerCase().includes(filter))
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    dispatch(fetchAllThunk());
  }, [dispatch]);

  return (
    <ul className={css.list}>
      {loading && <Loader />}
      {error && <div>{error}</div>}
      {filteredContacts.map(({ id, name, phone }) => {
        return (
          <li key={id} className={css.item}>
            <Contact id={id} name={name} phone={phone} />
          </li>
        );
      })}
    </ul>
  );
};
