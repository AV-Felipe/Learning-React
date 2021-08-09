/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from '../Styles';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Page } from '../Page';
import { useParams } from 'react-router-dom';
import { getQuestion, postAnswer } from '../QuestionsData';
import { AnswerList } from '../AnswerList';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, gettingQuestionAction, gotQuestionAction } from '../Store';

type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const dispatch = useDispatch(); //hook para o envio de actions para a store
  const question = useSelector((state: AppState) => state.questions.viewing); //hook para recuperar informações da store, passamos o state como argumento e a prop que queremos retornar na função
  const [successfullySubmitted, setsuccessfullySubmitted] =
    React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  //hook do React-Router para obter uma propriedade do caminho da url
  const { questionId } = useParams();

  //hook para executarmos a função get question e obtermos os valores que serão armazenados em question
  React.useEffect(() => {
    //função para podermos executar getQestion, que é assincrono, no useEffect hook
    const doGetQuestion = async (questionId: number) => {
      dispatch(gettingQuestionAction());
      const foundQuestion = await getQuestion(questionId);
      dispatch(gotQuestionAction(foundQuestion));
    };
    //condicional para, caso haja um questionId, converê-lo de string para number e passá-lo para a doGetQuestion
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]); //o useEffect hook será atualizado sempre que tivermos uma mudança no questionId

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: 'Fredoswaldo',
      created: new Date(),
    });
    setsuccessfullySubmitted(result ? true : false);
  };
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
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <Fieldset
                disabled={formState.isSubmitting || successfullySubmitted}
              >
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    id="content"
                    {...register('content', {
                      required: true,
                      minLength: 50,
                    })}
                  />
                  {errors.content && errors.content.type === 'required' && (
                    <FieldError>You must enter the answer</FieldError>
                  )}
                  {errors.content && errors.content.type === 'minLength' && (
                    <FieldError>
                      The content must be at least 50 characters
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {successfullySubmitted && (
                  <SubmissionSuccess>
                    Your answer was successfully submited
                  </SubmissionSuccess>
                )}
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
