import { useEffect, useState } from "react";
import axios, {AxiosError} from 'axios';

interface Entry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisiblity] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    axios.get<Entry[]>('http://localhost:3001/api/diaries').then(response => {
      setEntries(response.data);
    })
  }, [])

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      id: entries.length + 1,
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };
    try {
      const response = await axios.post<Entry>('http://localhost:3001/api/diaries', { content: entryToAdd })
        .then(response => {
          setEntries(entries.concat(response.data))
        });
      console.log(response);
    }
    catch (e) {
      const error = e as AxiosError;
      console.log(error.response?.data);
      setErrorText(String(error.response?.data));
      setErrorVisibility(true);
      setTimeout(() => {
        setErrorVisibility(false);
      }, 5000)
    }
    setNewDate('');
    setNewVisiblity('');
    setNewWeather('');
    setNewComment('');
  }

  return (
    <div>
      <h1>Add new entry</h1>
      {errorVisibility && <h1>Error: {errorText}</h1>}
      <form onSubmit={entryCreation} >
        date
        <input
          type="date"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
        <br></br>
        visibility
        <div>
          great <input type="radio" name="visibility" onChange={() => setNewVisiblity('great')}/>
          good <input type="radio" name="visibility" onChange={() => setNewVisiblity('good')}/>
          ok <input type="radio" name="visibility" onChange={() => setNewVisiblity('ok')}/>
          poor <input type="radio" name="visibility" onChange={() => setNewVisiblity('poor')}/>
        </div>
        weather
        <div>
            sunny <input type="radio" name="weather" onChange={() => setNewWeather('sunny')} />
            rainy <input type="radio" name="weather" onChange={() => setNewWeather('rainy')} />
            cloudy <input type="radio" name="weather" onChange={() => setNewWeather('cloudy')} />
            stormy <input type="radio" name="weather" onChange={() => setNewWeather('stormy')} />
            windy <input type="radio" name="weather" onChange={() => setNewWeather('windy')} />
        </div>
        comment
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br></br>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      <ul>
        {entries.map(entry =>
          <li key={entry.id}>
              <h2>{entry.date}</h2>
              <p>{entry.visibility}</p>
              <p>{entry.weather}</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
