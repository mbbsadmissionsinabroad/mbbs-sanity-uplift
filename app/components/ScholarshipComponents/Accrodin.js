import React from "react";
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ChevronDownCircleOutline } from "mdi-material-ui";

const Accrodin = () => {
  const data = [
    {
      title: "Q: What are the Eligibility Criteria?",
      desc: "Those with a minimum score of 50% in their 10th & 11th grade examination and presently pursuing their 12th grades from science background are eligible to apply. While applying you should have a soft copy of your passport size photo of 100-150 KB. Upon successfully completing registration formalities you will be able to download the Hall ticket. Request you to kindly take some time to take a print out of the hall ticket.",
    },
    {
      title: "Q: What is the Scholarship Award?",
      desc: "The Scholarship award is not a CASH reward and its not transferable. The top 100/200 meritorious students of Vaidya Vigyan Scholarship can earn fee waiver as Scholarship from New Lyf on the tuition fee of the Foreign Medical Universities of their choice from the above list of Foreign medical universities. Please be informed the Vaidya Vigyan Scholarship awards are not applicable to any Universities in India.",
    },
    {
      title: "Q: What is the Vaidya Vigyan Scholarship exam pattern?",
      desc: "The duration of the examination will be 3 hours which is based objective type questions with no negative marking. The scholarship exam consists of 25 marks from each subject ie - Physics, Chemistry, Botnany, Zoology.",
    },
    {
      title: "Q: When is Vaidya Vigyan Scholarship Exam conducted?",
      desc: "The Vaidya Vigyan Scholarship Exam is conducted on 17th May-2024. Timing 10:00 am to 1:00pm. You have to report 1 hour before the exam time. You have to carry BLACK BALL POINT PEN. Rough papers will be provided in the examination hall.",
    },
    {
      title: "Q: When are results of Vaidya Vigyan Scholarship announced?",
      desc: "The results will be published in the New-Lyf website www.mbbsadmissionsinabroad.com on 31st May-2024 by 3:00 pm. And also sent to your registered E-mail ID and mobile number.",
    },
  ];
  return (
    <div className="bg-gray-100 mb-20 p-10">
      <div className="flex flex-col text-center w-full ">
        <h1 className="sm:text-4xl text-3xl font-bold title-font text-gray-900">
          Frequently Asked <span className="text-red-600">Questions</span>
        </h1>
      </div>
      <Grid container sx={{ width: "90%", margin: "30px auto 30px auto" }}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "#1c1c84" }}>
              {/* {title} */}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            {data.map((item, i) => (
              <Accordion key={i} sx={{ background: "rgba(0,0,0,.06)" }}>
                <AccordionSummary expandIcon={<ChevronDownCircleOutline />}>
                  <Typography variant="h3" sx={{ fontSize: "18px" }}>
                    <b>{item.title}</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ background: "#fff" }}>
                  <div
                    // className={styles.faqPTag}
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </div>
  );
};

export default Accrodin;
