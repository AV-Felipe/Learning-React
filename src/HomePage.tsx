import React from 'react';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

export const HomePage = () => {
  //desestruturação de uma useState para armazenarmos os dados das questões
  //e um segundo para usarmos como flag do carregamento dessas
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const [questionsLoading, setQuestionsLoading] = React.useState(true);
  //useEffect para solicitarmos de forma assincrona os dados das questões ao carregar a página
  //a solicitação assincrona não pode ser feita diretamente pelo useEffect, por isso usamos um callback
  React.useEffect(() => {
    const doGetUnansweresQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweresQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    console.log('TODO - move to the AskPage');
  };
  //cada mudança de state provoca uma nova renderização da página, assim, ao alterarmos nossas state variables questions
  //e questionsLoading, provocamos a atualização de todos os elementos vinculados com essas
  return (
    <Page>
      <div>
        <div>
          <PageTitle>Unanswered Questions</PageTitle>
          <button onClick={handleAskQuestionClick}>Ask a question</button>
        </div>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
