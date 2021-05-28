import styled from 'styled-components/macro';

const minLiSize = 270;
const maxLiSize = 540;
const gapLiSize = 12;
const width = 0.8;
const windowWidth = width ** -1;

export const AppointmentContainer = styled.main`
  display: grid;
  width: ${width * 100}%;
  margin-top: 58px;
  margin-bottom: 36px;
  font-weight: 700;
  color: #fcfff9;

  grid-template:
    'label button'
    'ol ol'
    'load-more load-more';

  > .load-more {
    display: block;
    grid-area: load-more;

    > button {
      display: inline-flex;
      font-size: 14px;
      background-color: #87b75d;

      &:hover {
        background-color: #a5df71;
      }

      &:active {
        background-color: #789b59;
      }
    }

    > button:nth-of-type(even) {
      margin-left: 12px;
    }

    > button svg {
      height: 18px;
      width: 18px;
      color: #fcfff9;
      animation: none;
    }
  }

  #label {
    align-self: center;
    grid-area: label;
  }

  .action-button {
    height: unset;
    margin: 0;
    padding: 4px 18px;
    line-height: 20px;

    svg {
      width: 18px;
      height: 18px;
      width: 2px;
    }
  }

  #appoint-button {
    align-self: center;
    justify-self: end;
    font-size: 18px;
    font-family: 'Rubik', sans-serif;
    font-weight: 700;
    background-color: #23212c;
    grid-area: button;
  }

  @media (max-width: ${(maxLiSize + gapLiSize) * windowWidth}px) {
    grid-template-areas:
      'label'
      'ol'
      'load-more'
      'button';

    justify-content: center;

    #label {
      text-align: center;
    }

    > .load-more {
      margin-top: -16px;
      justify-self: center;

      button {
        font-size: 72%;
        padding: 4px 8px;
      }

      > button svg {
        width: 12px;
        height: 12px;
      }
    }

    #appoint-button {
      margin-top: 32px;
      font-size: 18px;
      width: 100%;
      justify-self: center;
    }
  }

  row-gap: 27px;
  justify-content: space-between;

  > .load-more {
    margin-top: -15px;
  }

  h1 {
    align-self: center;
    color: #23212c;
  }

  svg {
    width: 24px;
    stroke-width: 2px;
    color: #23212c;
    margin-right: 10px;
  }

  > ol {
    display: inline-flex;
    width: 100%;
    flex-wrap: wrap;

    overflow-x: hidden;
    gap: ${gapLiSize}px;

    list-style-type: none;
    grid-area: ol;

    // total-width (* 1.25 [main-max-size]⁻¹) <8/10⁻¹ = 10/8>
    @media (min-width: ${(minLiSize * 2 + gapLiSize) * windowWidth}px) {
      // gap * (li-quantity-in-1st-line - 1) / li-quantity-in-1st-line = thisPx
      > li:nth-of-type(n + 2) {
        max-width: calc(50% - 6px);
      }
    }

    @media (min-width: ${(minLiSize * 3 + gapLiSize * 2) * windowWidth}px) {
      > li:nth-of-type(n + 2) {
        max-width: calc((100% / 3) - 8px);
      }
    }

    @media (min-width: ${(minLiSize * 4 + gapLiSize * 3) * windowWidth}px) {
      > li:nth-of-type(n + 2) {
        max-width: calc(25% - 9px);
      }
    }

    @media (min-width: ${(minLiSize * 5 + gapLiSize * 4) * windowWidth}px) {
      > li:nth-of-type(n + 2) {
        max-width: calc(20% - 9.6px);
      }
    }
  }
`;

export const AppointmentWrapper = styled.li`
  flex-grow: 1;

  min-width: ${minLiSize}px;
  max-width: ${maxLiSize}px;

  background-color: #96cb67;
  border-radius: 6px;

  font-size: 18px;

  > .doctor-info {
    .avatar-container {
      position: relative;
      width: 50px;
      height: 50px;

      img {
        border: 2px solid #23212c;
        position: relative;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }

    display: flex;
    align-items: center;

    column-gap: 18px;
    padding: 9px 18px;

    border-radius: 6px;

    background-color: #87b75d;
    box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.2);

    span:nth-of-type(1) {
      font-family: 'Rubik', sans-serif;
      color: #23212c;
      margin-bottom: 4px;
    }
  }

  > .appointment-info {
    display: grid;
    grid-template-areas:
      'time day'
      'unit unit';
    row-gap: 6px;
    padding: 12px 14px;

    .time {
      grid-area: time;
    }

    .day {
      justify-self: end;
      grid-area: day;
    }

    .unit {
      grid-area: unit;
    }
  }

  > .more-info-button {
    height: 32px;
    width: 66%;
    margin: 0 auto;
    font-size: 14px;
    background-color: #87b75d;
    box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #a5df71;
    }

    &:active {
      background-color: #789b59;
      box-shadow: none;
    }

    margin-bottom: 14px;
  }

  span {
    display: flex;
    align-items: center;
  }
`;
