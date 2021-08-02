/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { gray3, gray6 } from '../Styles';
import React from 'react';
import { Page } from '../Page';
import { useParams } from 'react-router-dom';
import { QuestionData, getQuestion } from '../QuestionsData';
import { async } from 'q';
import { number } from 'yargs';
import { AnswerList } from '../AnswerList';

export const QuestionPage = () => {
  //hook para obter um question data vindo da função getQuestion do componente QuestionData, iniciado como null
  const [question, setQuestion] = React.useState<QuestionData | null>(null);

  //hook do React-Router para obter uma propriedade do caminho da url
  const { questionId } = useParams();

  //hook para executarmos a função get question e obtermos os valores que serão armazenados em question
  React.useEffect(() => {
    //função para podermos executar getQestion, que é assincrono, no useEffect hook
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    //condicional para, caso haja um questionId, converê-lo de string para number e passá-lo para a doGetQuestion
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId]); //o useEffect hook será atualizado sempre que tivermos uma mudança no questionId
  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {/*na expressão abaixo estamos retornando uma conjunção, porém, no react só podemos retornar para renderização objetos simples, 
        para contornar esse problema, utilizamos o React.fragment nós podemos compor um objeto de partes de varios outros
        sem criar novos nós no DOM*/}
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on 
                ${question.created.toLocaleDateString()}
                ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
