import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faSnowflake,
  faHockeyPuck,
  faSkating,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Content, Grid, Sidebar, Cell } from './style';

library.add(faSnowflake, faHockeyPuck, faSkating);

const myDate = () => {
  const a = new Date();
  const r = a.getDate();

  return r;
};

myDate();

const App = () => {
  const [storage, setStorage] = useState([]);
  const [io, setIo] = useState();

  useEffect(() => {
    axios.get('/api').then(res => {
      let newRes = res.data;

      newRes = {
        ...newRes,
        date: newRes.date.slice(0, 7).map(item => {
          let newItem = {};

          newItem = {
            ...newItem,
            week: item.replace(/[(\d-\d)]+/g, ''),
            day: item.match(/[\d-\d]+/g)[0],
          };

          return newItem;
        }),
        time: newRes.time.slice(1, 13),
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
            <Cell type="black" empty />
            {storage.time.map((item, i) => (
              <Cell key={i} type="black">
                <span>{item}</span>
              </Cell>
            ))}
          </Sidebar>

          <Content>
            {storage.date.map((item, i) => (
              <Cell key={i} type="black" current={i === io}>
                <span>{item.week}</span>
                <span>{item.day}</span>
              </Cell>
            ))}

            {storage.content.map((item, i) => (
              <Cell key={i} type={item} icon>
                <span>
                  {item === 'available' && <FontAwesomeIcon icon="skating" />}
                </span>
                <span>
                  {item === 'hockey' && <FontAwesomeIcon icon="hockey-puck" />}
                </span>
                <span>
                  {item === 'figure' && <FontAwesomeIcon icon="snowflake" />}
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
