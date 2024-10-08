import styled from 'styled-components'

export const MinefieldCell = styled.button`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 16px;
  height: 16px;
  margin: 0px;
  padding: 0px;
  border: none;

  background-image: url('/tiles/hiddenCell.png');
`

export const MinefieldCellUncovered = styled.div`
  width: 16px;
  height: 16px;
  margin: 0px;
  padding: 0px;
  border: none;
`
