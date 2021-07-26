import React from 'react';
import { QuestionData } from './QuestionsData';

//propriedades com uma exclamação são consideradas opcionais, esse é um recurso do typescript que também é válido para parâmetros de funções
interface Props {
  data: QuestionData;
  showContent?: boolean;
}

export const Question = ({ data, showContent = true }: Props) => (
  <div>
    <div>{data.title}</div>
    {showContent && (
      <div>
        {data.content.length > 50
          ? `${data.content.substring(0, 50)}...`
          : data.content}
      </div>
    )}
    <div>
      {`Asked by ${data.userName} on
       ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
);
