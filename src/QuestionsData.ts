import { PageTitle } from './PageTitle';
//interface é um tipo próprio do typescript (não existe no JS) e é similar ao conceio de interface no c#
//aqui definimos a estrutura que esperamos para as questões com s quais trabalharemos
export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
}
export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}
export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

const questions: QuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
    userName: 'Bob',
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content: 'To catch problems earlier speeding up your developments',
        userName: 'Jane',
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          'So, that you can use the JavaScript features of tomorrow, today',
        userName: 'Fred',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
];

//a sintaxe async/await é uma outra forma de função assincrona
//marcando uma função como async, indicamos que teremos etapas que dependem do retorno de uma promise e deveremos ter um return no final
//a clause await interrompe a execução das próximas etapas da função até a resolução de uma promise
//essa interrupção, no entanto, não impede outras funções de serem executadas enquanto a promise não é resolvida
//a função evocada no await, assim como qualquer função que retorna uma promise, pode ser seguida de .then, .catch e .finally
//outro formato para uma função assincrona é async função{try{await ...}catch(erro){tratamento}finally{encerramento independente do caso}}
export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter((q) => q.answers.length === 0);
};

// função para simular um delay de uma chamada assincrona e retornar um objeto promise
// promise é um objeto do JS que representa o sucesso ou falha de uma operação assincrona
// resolve é o caso de sucesso
// reject é o caso de falha
// para cada aso podemos associar uma função, nesse caso apenas estamos usando o resolve
// funções que retornam promises podem ser encadeadas com .then(outra função que retorna uma promise) para cada caso de resolve
// e .catch(função) no caso de reject
// ao final de tudo podemos ter um .finally(função)
const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getQuestion = async (
  questionId: number
): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter((q) => q.questionId === questionId);
  return results.length === 0 ? null : results[0];
};

export const searchQuestions = async (
  criteria: string
): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLocaleLowerCase().indexOf(criteria.toLocaleLowerCase()) >= 0 ||
      q.content.toLocaleLowerCase().indexOf(criteria.toLocaleLowerCase()) >= 0
  );
};

export const postQuestion = async (
  question: PostQuestionData
): Promise<QuestionData | undefined> => {
  await wait(500);
  const questionId = Math.max(...questions.map((q) => q.questionId)) + 1;
  const newQuestion: QuestionData = {
    ...question,
    questionId,
    answers: [],
  };
  questions.push(newQuestion);
  return newQuestion;
};
