/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSearchParams } from 'react-router-dom'; //hook para acessar query parameters
import { QuestionList } from '../QuestionList';
import { searchQuestions, QuestionData } from '../QuestionsData';
import React from 'react';
import { Page } from '../Page';
import { react } from '@babel/types';
import { async } from 'q';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = React.useState<QuestionData[]>([]);
  const search = searchParams.get('criteria') || '';
  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResult = await searchQuestions(criteria);
      setQuestions(foundResult);
    };
    doSearch(search);
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
