import React from 'react';

import { css } from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Loader = () => {
    return (
        <div className='sweet-loading'>
        <PacmanLoader
          css={override}
          color={'#E1BC29'}
        />
      </div> 
    );
};

export default Loader;