import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  width: 100%;
`;

export const Grid = styled.main`
  display: grid;
  width: 100%;

  border-top: 1px solid #333;
  border-left: 1px solid #333;

  grid-template-columns: minmax(50px, 1fr) 11fr;
`;

export const Sidebar = styled.aside`
  display: grid;
  grid-template-rows: repeat(13, 1fr);
`;

export const Content = styled.div`
  display: grid !important;
  /* grid-template-columns: repeat(7, 1fr); */
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 12fr;
  /* grid-template-rows: repeat(13, 1fr); */

  /* grid-auto-flow: column; */
`;

export const ContentDate = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const ContentDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(12, 1fr);

  grid-auto-flow: column;
`;

export const Cell = styled.div`
  border-bottom: 1px solid #333;
  border-right: 1px solid #333;
  position: relative;

  /* overflow: hidden; */

  box-sizing: border-box;

  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  background-color: #fbfbfb;

  font-weight: 300;
  overflow-wrap: break-word;

  span {
    white-space: nowrap;
    display: block;

    font-size: 1.5vmin;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    span {
      font-size: 3.5vmin;
    }
  }

  ${props =>
    props.type === 'available' &&
    css`
      background-color: #bafec9;
    `};

  ${props =>
    (props.type === 'hockey' || props.type === 'res') &&
    css`
      background-color: #f6b3ba;
    `};

  ${props =>
    props.type === 'figure' &&
    css`
      background-color: #bae1ff;
    `};

  ${props =>
    props.type === 'disco' &&
    css`
      background-color: #b381c8;
    `};

  ${props =>
    props.type === 'black' &&
    css`
      background-color: #f9f9f9;
      flex-direction: column;

      span {
        display: block;
        white-space: nowrap;
        overflow: hidden;

        text-transform: uppercase;
        font-weight: 600;
      }
    `};

  ${props =>
    props.icon &&
    css`
      color: #333;
    `};

  ${props =>
    props.current &&
    css`
      position: relative;

      /* background-color: #fadfba; */

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 100;
        background-color: rgba(255, 255, 255, 0.4);

        /* border-left: 2px solid #333; */
        /* border-right: 2px solid #333; */
        box-sizing: border-box;
      }
    `};

  ${props =>
    !props.current &&
    props.type === 'black' &&
    css`
      background-color: #fadfba;
    `};

  select {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }
`;

export const Workers = styled.div`
  display: inline-block;
  button {
    background: transparent;
    border: none;
  }
`;
