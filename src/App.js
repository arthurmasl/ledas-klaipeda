import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faSnowflake,
  faHockeyPuck,
  faSkating,
  faBolt,
  faTimes,
  faMusic,
  faCoffee
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
  Content,
  Grid,
  Sidebar,
  Cell,
  ContentDays,
  ContentDate
} from './style';

library.add(
  faSnowflake,
  faHockeyPuck,
  faSkating,
  faBolt,
  faTimes,
  faMusic,
  faCoffee
);

const myDate = () => {
  const a = new Date();
  const r = a.getDate();

  return r;
};

const myTime = () => {
  var d = new Date();

  return { h: d.getHours(), m: d.getMinutes() };
};

const time = myTime();

myDate();

function romanize(num) {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX'
    ],
    roman = '',
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
}

const App = () => {
  const [storage, setStorage] = useState([]);
  const [io, setIo] = useState();
  const [city, setCity] = useState('');

  if (city) {
    localStorage.setItem('ledas-klaipeda-city', JSON.stringify(city));
  }

  useEffect(() => {
    if (localStorage.getItem('ledas-klaipeda')) {
      setStorage(JSON.parse(localStorage.getItem('ledas-klaipeda')));
    }

    if (localStorage.getItem('ledas-klaipeda-city')) {
      setCity(JSON.parse(localStorage.getItem('ledas-klaipeda-city')));
    }

    const apiUrl = `https://ledas-klaipeda.herokuapp.com/api`;
    // const apiUrl = `http://localhost:8000/api`;

    axios.get(apiUrl, { params: { city: city } }).then(res => {
      let newRes = res.data;

      newRes = {
        ...newRes,
        date: newRes.date.slice(0, 7).map(item => {
          let newItem = {};

          newItem = {
            ...newItem,
            week: item.replace(/[(\d-\d)]+/g, '').slice(0, 4),
            day: item.match(/[\d-\d]+/g)[0]
          };

          return newItem;
        }),
        time: newRes.time.slice(0, 12).map(item => {
          return { time1: item.slice(0, 5), time2: item.slice(6, 11) };
        }),
        content: newRes.content
          .filter(item => item)
          // .slice(0, 84)
          // .slice(0, 70)
          .slice(0, city === 'vilnius' ? 70 : 84)
          .map(item => {
            if (item.includes('€')) {
              return 'available';
            }

            if (item.toLowerCase().includes('ledo')) {
              return 'hockey';
            }

            if (item.toLowerCase().includes('dailusis')) {
              return 'figure';
            }

            if (item.toLowerCase().includes('rezervuota')) {
              return 'res';
            }

            if (item.toLowerCase().includes('diskoteka')) {
              return 'disco';
            }
            if (item.toLowerCase().includes('kerlingas')) {
              return 'kerl';
            }

            return item;
          })
      };

      window.localStorage.setItem('ledas-klaipeda', JSON.stringify(newRes));
      setStorage(newRes);

      console.log(newRes);
    });
  }, [city]);

  useEffect(() => {
    if (storage.date) {
      storage.date.forEach((item, i) => {
        if (item.day.includes(myDate().toString())) {
          setIo(i);
        }
      });
    }
  }, [io, storage.date]);

  if (storage.time)
    return (
      <Container>
        <Grid>
          <Sidebar city={city}>
            <Cell empty select>
              <select onChange={e => setCity(e.target.value)} value={city}>
                <option value="klaipeda">KLP</option>
                <option value="vilnius">VLN</option>
                {/* <option value="kaunas">Kaunas</option> */}
                {/* <option value="siauliai">Siauliai</option> */}
              </select>
            </Cell>
            {storage.time.map((item, i) => (
              <Cell
                key={i}
                current={time.h.toString().includes(item.time1.slice(0, 2))}
              >
                <span>{item.time1}</span>
                <span>{item.time2}</span>
              </Cell>
            ))}
          </Sidebar>

          <Content city={city}>
            <ContentDate>
              {storage.date.map((item, i) => (
                <Cell key={i} type="black" current={i !== io}>
                  <span>{romanize(i + 1)}</span>
                  {/* <span>{item.week}</span> */}
                  <span>{item.day}</span>
                  {/* <select
                  value={db.collection('storage').doc(item.day).worker}
                  onChange={e => setWorkers(e, item.day)}
                >
                  <option value="-">¯\_(ツ)_/¯</option>
                  <option value="A">Arūnas</option>
                  <option value="K">Kęstas</option>
                </select> */}
                </Cell>
              ))}
            </ContentDate>

            <ContentDays city={city}>
              {storage.content.map((item, i) => (
                <Cell key={i} type={item} icon>
                  <span>
                    {item === 'available' && (
                      <FontAwesomeIcon icon="bolt" size="lg" />
                    )}
                  </span>
                  <span>
                    {item === 'hockey' && (
                      <FontAwesomeIcon icon="hockey-puck" size="lg" />
                    )}
                  </span>
                  <span>
                    {item === 'figure' && (
                      <FontAwesomeIcon icon="snowflake" size="lg" />
                    )}
                  </span>
                  <span>
                    {item === 'res' && (
                      <FontAwesomeIcon icon="times" size="lg" />
                    )}
                  </span>
                  <span>
                    {item === 'disco' && (
                      <FontAwesomeIcon icon="music" size="lg" />
                    )}
                  </span>
                  <span>
                    {item === 'kerl' && (
                      <FontAwesomeIcon icon="coffee" size="lg" />
                    )}
                  </span>
                </Cell>
              ))}
            </ContentDays>
          </Content>
        </Grid>
      </Container>
    );

  return '';
};

export default App;
