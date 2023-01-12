import { Grid } from "@mui/material";
import EmailTemplate from "components/template/emailtemplate";
import { useRouter } from "next/router";

import { Box } from "@mui/system";
import MessageTemplate from "components/template/messagetemplate";
import AppLayout from "layout/AppLayout";
import { LINKS } from "lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "reactstrap";
import {
  useGetTemplateDetailsMutation
} from "services/templateApi";
const Template = () => {
  const { query } = useRouter();
  const { pid, mode } = query;
  console.log("pid", pid)
  const [getDetails, response] = useGetTemplateDetailsMutation();
  const [templateDetails, setTemplateDetails] = useState();
  const [isLoading, setIsListLoading] = useState(false);

  console.log("id", response)
  const handleTemplateDetails = async (id) => {
    try {
      const result = await getDetails(id);
      if (result?.data?.result?.success) {
        setTemplateDetails(result?.data?.result?.data?.templates);
      }
    } catch (e) {
      console.log(">>>>: src/pages/template : getDetails -> error", e);
    }
  };
  useEffect(() => {
    handleTemplateDetails(pid)
  }, [pid])
  console.log({ templateDetails })
  return (
    <AppLayout>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sx={12} md={12} lg={10} xlg={8}>
          <Card>
            <CardBody>
              <Box>
                <Link href={LINKS.TEMPLATE} passHref>
                  <a>
                    <i className="simple-icon-arrow-left"></i>
                  </a>
                </Link>
              </Box>
              {
                response && response?.isLoading ? <div className="text-center"> <Spinner color="primary" className="mb-1" /></div> : (
                  <>
                    {mode === "email" && <EmailTemplate data={templateDetails} />}
                    {mode === "sms" && <MessageTemplate data={templateDetails} />}
                  </>
                )
              }

            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default Template;
