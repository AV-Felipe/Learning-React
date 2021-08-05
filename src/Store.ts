import { QuestionData } from './QuestionsData';
import { Store, createStore, combineReducers } from 'redux';

//typescript types para o state de nossa store
interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[];
  readonly viewing: QuestionData | null;
  readonly searched: QuestionData[];
}

//nossa store terá uma propriedade questions que é um objeto composto pelas propriedades da interface definida acima
export interface AppState {
  readonly questions: QuestionsState;
}

//estado inicial da store
const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};

/*
definição das actions
*/

//action 1.1 - indicar que as perguntas sem resposta estão sendo buscadas no servidor
//A: criamos uma constante para armazenar o action type da ação
export const GETTINGUNANSWEREDQUESTIONS = 'GettingUnansweredQuestions';
//B: criamos uma função que retorna essa action
export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTINGUNANSWEREDQUESTIONS,
  } as const);

//action 1.2 - receber as perguntas sem resposta do servidor
//A
export const GOTUNANSWEREDQUESTIONS = 'GotUnansweredQuestions';
//B
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOTUNANSWEREDQUESTIONS,
    questions: questions,
  } as const);

//repetimos o mesmo esquema acima para as demais actions
export const GETTINGQUESTION = 'GetingQuestion';
export const gettingQuestionAction = () =>
  ({
    type: GETTINGQUESTION,
  } as const);

export const GOTQUESTION = 'GotQuestion';
export const gotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOTQUESTION,
    question: question,
  } as const);

export const SEARCHINGQUESTIONS = 'SearchingQuestions';
export const searchingQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHINGQUESTIONS,
  } as const);

export const SEARCHEDQUESTIONS = 'SearchedQuestions';
export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHEDQUESTIONS,
    questions,
  } as const);

/*
definição do reducer
*/

type QuestionsActions =
  | ReturnType<typeof gettingUnansweredQuestionsAction>
  | ReturnType<typeof gotUnansweredQuestionsAction>
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionsAction>
  | ReturnType<typeof searchedQuestionsAction>;

const questionReducer = (
  state = initialQuestionState,
  action: QuestionsActions
) => {
  switch (action.type) {
    case GETTINGUNANSWEREDQUESTIONS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOTUNANSWEREDQUESTIONS: {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case GETTINGQUESTION: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOTQUESTION: {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case SEARCHINGQUESTIONS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case SEARCHEDQUESTIONS: {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
  }
  return state;
};

/*
criação da store
*/

const rootReducer = combineReducers<AppState>({
  questions: questionReducer,
});

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
