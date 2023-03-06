import React, { useEffect, useState, useCallback } from 'react';

const CountriesList = () => {
  const [myList, setMyList] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [options, setOptions] = useState([]);
  const API_ENDPOINT = `https://algochurn-server.onrender.com/practice/countries`;

  useEffect(() => {
    onChange(keyWord);
  }, [keyWord]);

  const debounce = (cb, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const onChange = useCallback(
    debounce((word) => {
      if (word.length > 1) {
        getResults(word);
      } else {
        setOptions([]);
      }
    }, 500),
    []
  );

  const getResults = (word) => {
    console.log(word);
    fetch(`${API_ENDPOINT}/${word}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOptions(data.countries);
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (value) => setKeyWord(value);

  const handleClick = (option) => {
    if (myList.filter((country) => country === option).length > 0) return;
    setMyList([...myList, option]);
  };

  const handleDelete = (option) =>
    setMyList(myList.filter((li) => li !== option));

  return (
    <div style={{ padding: '10px' }}>
      <input
        value={keyWord}
        type="text"
        placeholder="Type to search"
        onChange={(event) => handleInput(event.target.value)}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#f1f5f9',
          width: '400px',
        }}
      ></input>
      <div style={{ height: '100px', position: 'relative' }}>
        {options.length > 0 ? (
          <div
            style={{
              backgroundColor: '#f1f5f9',
              width: '200px',
              borderRadius: '5px',
              position: 'absolute',
              top: '10px',
              padding: '4px 4px',
            }}
          >
            {options.map((option, idx) => (
              <div
                className="listItem"
                key={`option-${option}-${idx}`}
                onClick={() => handleClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <h1>My List</h1>
        {myList.length > 0 ? (
          <div
            style={{
              width: '200px',
              backgroundColor: '#f1f5f9',
              padding: '10px',
            }}
          >
            {myList.map((li) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}
              >
                <p>{li}</p>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(li)}
                >
                  X
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CountriesList;
