import { useSetAtom } from 'jotai';
import React, { useId, useEffect, useState } from 'react';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space, Typography } from '../styles/variables';

import { Box } from './Box';
import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

const _Button = styled(Button)`
  color: ${Color.MONO_A};
`;

const _Content = styled.section`
  white-space: pre-line;
`;

type CachedContent = {
  term: string | null;
  contact: string | null;
  question: string | null;
  company: string | null;
  overview: string | null;
};

export const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [cachedContent, setCachedContent] = useState<CachedContent>({
    term: null,
    contact: null,
    question: null,
    company: null,
    overview: null,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const fetchAndCacheContent = async (key: keyof CachedContent, url: string) => {
    if (!cachedContent[key]) {
      const content = await fetch(url).then((res) => res.text());
      setCachedContent((prev) => ({ ...prev, [key]: content }));
      return content;
    }
    return cachedContent[key];
  };

  const handleRequestToTermDialogOpen = async () => {
    const term = await fetchAndCacheContent('term', '/assets/footers/term.txt');
    updateDialogContent(
      <_Content aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {term}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToContactDialogOpen = async () => {
    const contact = await fetchAndCacheContent('contact', '/assets/footers/contact.txt');
    updateDialogContent(
      <_Content aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {contact}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToQuestionDialogOpen = async () => {
    const question = await fetchAndCacheContent('question', '/assets/footers/question.txt');
    updateDialogContent(
      <_Content aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {question}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToCompanyDialogOpen = async () => {
    const company = await fetchAndCacheContent('company', '/assets/footers/company.txt');
    updateDialogContent(
      <_Content aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {company}
        </Text>
      </_Content>,
    );
  };

  const handleRequestToOverviewDialogOpen = async () => {
    const overview = await fetchAndCacheContent('overview', '/assets/footers/overview.txt');
    updateDialogContent(
      <_Content aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {overview}
        </Text>
      </_Content>,
    );
  };

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <_Button disabled={!isClient} onClick={handleRequestToTermDialogOpen}>
            利用規約
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </_Button>
          <_Button disabled={!isClient} onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </_Button>
        </Flex>
      </Flex>
    </Box>
  );
};
