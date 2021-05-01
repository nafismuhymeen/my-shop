import React from 'react';
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 100%
`;



const Spinner = ({ loading }) => {
    return (
        <BarLoader color="#d2302c" loading={loading} css={override} />
    );
};

export default Spinner;