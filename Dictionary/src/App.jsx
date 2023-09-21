import React, { useState } from 'react'
import './App.css'

function App() {
  const [word, setWord] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  async function handleSearch() {
    try {

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const jsonData = await response.json()
      console.log(jsonData);
      setData(jsonData)
      setError(null)
    } catch (err) {
      setError(err.message)
      setData(null)
    }
  }

  return (
    <div>
      <header className='header__container'>
        <h2 className='header__container__h2'>Dictionary</h2>
      </header>
      <main className='main__container'>
        <section className='main__section--over'>
          <input 
            type="text"
            className='main__section--over__input'
            placeholder="Search word"
            onChange={(event) => setWord(event.target.value)}
          />
          <button className='main__section--over__btn' onClick={handleSearch}>Search</button>
        </section>
        <section className='main__section--under'>
          {error && <p>Error: {error}</p>}
          {data && (
            <div>
              {data.map((entry, index) => (
                <div key={index}>
                  <h3>Word: {entry.word}</h3>
                  <p>Phonetic: {entry.phonetic}</p>
                  <h4>Origin: {entry.origin}</h4>
                  <ul>
                    {entry.phonetics.map((phonetic, index) => (
                      <li key={index}>
                        Text: {phonetic.text}
                        {phonetic.audio && (
                          <audio controls>
                            <source src={phonetic.audio} type="audio/mpeg" />
                          </audio>
                        )}
                      </li>
                    ))}
                  </ul>
                  <ul>
                    {data[0].meanings.map((meaning, index) => (
                      <div key={index}>
                        <p>Part of Speech: {meaning.partOfSpeech}</p>
                        <p>Synonyms: {meaning.synonyms && meaning.synonyms.join(', ')}</p>
                        <p>Definitions:</p>
                        <ul>
                          {meaning.definitions.map((definition, index) => (
                            <li key={index}>
                              {definition.definition}
                              {definition.example && (
                                <p>Example: {definition.example}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App
