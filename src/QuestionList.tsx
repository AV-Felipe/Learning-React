/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { accent2, gray5 } from './Styles';
import React from 'react';
import { QuestionData } from './QuestionsData';
import { Question } from './Question';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

//na arrow function abaixo definimos que o QuestionList recebe uma props, do tipo Props, definido na interface acima.
//para fins de otimização, usamos o recurso de destructuring, o qual quebra cada proprieddade de um objeto em uma variável própria
//assim, ao invés de props: Props, usamos { data}:Props, dessa forma nós estaremos acessando as propriedades diretamente pela variável dela
//e não por meio da variável props (ao invés de props.data.map podemos usar data.map)
export const QuestionList = ({ data, renderItem }: Props) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0px 20px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top: 3px solid ${accent2};
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
    `}
  >
    {data.map((question) => (
      <li
        key={question.questionId}
        css={css`
          border-top: 1px solid ${gray5};
          :first-of-type {
            border-top: none;
          }
        `}
      >
        {renderItem ? renderItem(question) : <Question data={question} />}
      </li>
    ))}
  </ul>
);
