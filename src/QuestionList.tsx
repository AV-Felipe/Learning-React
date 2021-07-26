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
  <ul>
    {data.map((question) => (
      <li key={question.questionId}>
        {renderItem ? renderItem(question) : <Question data={question} />}
      </li>
    ))}
  </ul>
);
