/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

//propriedades do tipo children são passadas pelo uso da função/classe como se fosse uma tag html <lala>propriedade</lala>
//o tipo ReactNode representa qualquer coisa que pode ser renderizada na pagina pode vir a integrar o DOM
interface Props {
  children: React.ReactNode;
}
export const PageTitle = ({ children }: Props) => (
  <h2
    css={css`
      font-size: 15px;
      font-weight: bold;
      margin: 10px 0px 5px;
      text-align: center;
      text-transform: uppercase;
    `}
  >
    {children}
  </h2>
);
