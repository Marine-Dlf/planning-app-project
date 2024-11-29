import React, { useEffect, useState } from 'react';
import '../styles/components/popup.scss';

// Define the types for event and props for strong typing
type Event = {
  typeName?: string;
  eventName: string;
  time: string | null;
  location: string;
  comment: string;
  date: string;
  types_id?: number | string; // To accommodate potential edits where ID could be a string
};

type FormProps = {
  closePopup: () => void;
  selectedDate: Date;
  fetchEvents: () => Promise<void>;
  eventSelected?: Event & {id?:string};
  isEditMode: boolean;
  types: { id: number; typeName: string }[]; // Type array for the category dropdown options
};

// Initialize empty event data with default values
const EMPTY_EVENT: Event = {
  typeName: '',
  eventName: '',
  time: null,
  location: '',
  comment: '',
  date: '',
};

// Functional component with props typed
const Form: React.FC<FormProps> = ({
  closePopup,
  selectedDate,
  fetchEvents,
  eventSelected,
  isEditMode,
  types,
}) => {
  // Utility function to format dates
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD
  };

  // State for form data with proper types
  const [formData, setFormData] = useState<Event>({
    ...EMPTY_EVENT,
    date: formatDate(selectedDate),
  });

  const formfields = [
    { label: 'Catégorie', type: 'select', name: 'types_id', options: types },
    { label: 'Evènement', type: 'text', name: 'eventName' },
    { label: 'Horaire', type: 'time', name: 'time' },
    { label: 'Lieu', type: 'text', name: 'location' },
  ];

  // Effect for pre-filling the form during edit mode
  useEffect(() => {
    if (isEditMode && eventSelected) {
      setFormData({
        ...eventSelected,
        date: eventSelected.date.split('T')[0], // Ensure correct format
      });
    }
  }, [isEditMode, eventSelected]);

  // Change handler for form inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submission handler for the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (formData.eventName.trim() === '' || !formData.types_id) {
      alert('Merci de renseigner la catégorie et le nom de l’évènement');
      return;
    }

    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode
      ? `http://localhost:5000/events/${eventSelected?.id}`
      : 'http://localhost:5000/events';

    try {
      const formDataToSend = {
        ...formData,
        time: formData.time === '' ? null : formData.time,
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (res.ok) {
        await fetchEvents(); // Refresh events
        console.log(`Evènement ${isEditMode ? 'modifié' : 'créé'} avec succès !`);
        closePopup();
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error('Erreur lors de l’enregistrement de l’événement :', error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formStep">
          {isEditMode ? (
            <div>
              <label>Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="hidden">
              <label>Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                readOnly
              />
            </div>
          )}
          {formfields.map((field) => (
            <div key={field.name} className="formStep">
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name as keyof Event] || ''}
                  onChange={handleChange}
                >
                  <option value="">- - Choisir une catégorie - -</option>
                  {field.options &&
                    field.options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.typeName}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof Event] || ''}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>
        <div className="formStep">
          <label>Commentaire</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        <div className="saveButton">
          <button type="submit">{isEditMode ? 'Modifier' : 'Enregistrer'}</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
