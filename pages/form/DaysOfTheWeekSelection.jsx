import { useState } from "react";
import { Heading, Text, Box, Wrap, Button } from "@chakra-ui/react";
import DaysOfWeekSelection from "../../components/DaysOfWeek/DaysOfWeek.Component";
import Layout from "../../components/Layout/Layout";
import useForm from "../../components/FormProvider";

import { BackButton } from "../../components/LinkButton/LinkButton";
import Q1Progress from "../../public/images/progress-bar/q1-progress-dots.svg";
import Q1Cloud from "../../public/images/clouds/cloud-q1.svg";
import { useRouter } from 'next/router';
import { sendLogs } from '../../utils/sendLogs';

export default function Question1() {
  const { answers, setAnswers } = useForm();

  const saveAnswers = () => setAnswers(prev => ({ ...prev}));

  const router = useRouter();

  const logMessage = (msg) => {
    let incentiveMsg = () => {
      if (!!answers.incentive) {return "<filled>"}
      else return "<empty>"
    }
    return {
      page: router.pathname,
      event: msg,
      ...answers,
      incentive: incentiveMsg(),
    }
  }

  return (
    <Layout isText={true} Progress={Q1Progress}>
      <Box pos="absolute" top={["2", "5"]} left={["2", "10"]}>
        <BackButton
          href="/"
          onClick={() => {
            saveAnswers();
            sendLogs(logMessage("Back button clicked"));
          }}
        />
      </Box>
      <Q1Cloud />

      <Heading>
        What day(s) do you usually work from home?
      </Heading>

      <Wrap mt={5} w={["100%", "70%"]} justify="center" spacing={[3, 5]}>
        <DaysOfWeekSelection />
      </Wrap>

    </Layout>
  );
}