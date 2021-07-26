import React from 'react';

//propriedades do tipo children são passadas pelo uso da função/classe como se fosse uma tag html <lala>propriedade</lala>
//o tipo ReactNode representa qualquer coisa que pode ser renderizada na pagina pode vir a integrar o DOM
interface Props {
  children: React.ReactNode;
}
export const PageTitle = ({ children }: Props) => <h2>{children}</h2>;
