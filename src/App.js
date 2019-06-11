import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faSnowflake,
  faHockeyPuck,
  faSkating,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Content, Grid, Sidebar, Cell } from './style';

library.add(faSnowflake, faHockeyPuck, faSkating, faBolt);

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

const apiUrl =
  // process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';
  'https://ledas-klaipeda.herokuapp.com/api';

const App = () => {
  const [storage, setStorage] = useState([]);
  const [io, setIo] = useState();

  useEffect(() => {
    if (localStorage.getItem('ledas-klaipeda')) {
      setStorage(JSON.parse(localStorage.getItem('ledas-klaipeda')));
    }

    axios.get(apiUrl).then(res => {
      let newRes = res.data;

      newRes = {
        ...newRes,
        date: newRes.date.slice(0, 7).map(item => {
          let newItem = {};

          newItem = {
            ...newItem,
            week: item.replace(/[(\d-\d)]+/g, '').slice(0, 4),
            day: item.match(/[\d-\d]+/g)[0],
          };

          return newItem;
        }),
        time: newRes.time.slice(1, 13).map(item => {
          return { time1: item.slice(0, 5), time2: item.slice(6, 11) };
        }),
        content: newRes.content
          .filter(item => item)
          .slice(0, 84)
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

            return item;
          }),
      };

      window.localStorage.setItem('ledas-klaipeda', JSON.stringify(newRes));
      setStorage(newRes);
    });
  }, []);

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
          <Sidebar>
            <Cell empty />
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

          <Content>
            {storage.date.map((item, i) => (
              <Cell key={i} type="black" current={i !== io}>
                <span>{i + 1}</span>
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

            {storage.content.map((item, i) => (
              <Cell key={i} type={item} icon>
                <span>
                  {item === 'available' && <FontAwesomeIcon icon="bolt" size="lg" />}
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
              </Cell>
            ))}
          </Content>
        </Grid>
      </Container>
    );

  return '';
};

export default App;
