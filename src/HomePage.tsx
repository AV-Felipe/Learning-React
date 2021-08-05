/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { PrimaryButton } from './Styles';
import { useNavigate } from 'react-router'; //this is a hook that returns a function that can be used to perform navigation
import { useSelector, useDispatch } from 'react-redux';
import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
  AppState,
} from './Store';
import { stat } from 'fs';

export const HomePage = () => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: AppState) => state.questions.unanswered
  );
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading
  );

  //useEffect para solicitarmos de forma assincrona os dados das questões ao carregar a página
  //a solicitação assincrona não pode ser feita diretamente pelo useEffect, por isso usamos um callback
  React.useEffect(() => {
    const doGetUnansweresQuestions = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
    };
    doGetUnansweresQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const handleAskQuestionClick = () => {
    navigate('ask');
  };
  //cada mudança de state provoca uma nova renderização da página, assim, ao alterarmos nossas state variables questions
  //e questionsLoading, provocamos a atualização de todos os elementos vinculados com essas
  return (
    <Page>
      <div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <PageTitle>Unanswered Questions</PageTitle>
          <PrimaryButton onClick={handleAskQuestionClick}>
            Ask a question
          </PrimaryButton>
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
