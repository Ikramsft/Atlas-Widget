import { Box, Grid, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { CardTitle, Nav, NavItem, TabContent, TabPane } from "reactstrap";

import { default as classnames, default as classNames } from "classnames";
import TemplateList from "components/template/templatelist";
import AppLayout from "layout/AppLayout";
import { Card, CardBody } from "reactstrap";
import { useGetTemplatesMutation } from "services/templateApi";

const Template = () => {
  const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(true);
  const [isEditMessage, setIsEditMessage] = useState(false);
  const [isEditMail, setIsEditMail] = useState(false);
  const [activeFirstTab, setActiveFirstTab] = useState("1");
  const [getTemplates] = useGetTemplatesMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, loading, status } = useSession();
  const [templateList, setTemplateList] = useState([]);
  const [emailTemplateList, setEmailTemplateList] = useState([]);
  const [smsTemplateList, setSmsTemplateList] = useState([]);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [message, setMessage] = useState('');
  const { vertical, horizontal, open } = state;
  const fetchTemplateCallback = useCallback(() => {
    const fetchTemplateData = async () => {
      setIsLoading(true);
      try {
        const result = await getTemplates({ accessToken: session && session.accessToken });
        if (result?.data?.result?.success) {
          setTemplateList(result?.data?.result?.data?.templates);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log(
          ">>>>: src/pages/templatelist : email template -> error",
          e
        );
      }
    };
    fetchTemplateData();
  }, [getTemplates]);
  useEffect(() => {
    fetchTemplateCallback();
  }, [fetchTemplateCallback]);
  useEffect(() => {
    if (templateList) {

      let tempEmail = []
      let tempSms = []
      templateList?.map(item => {
        if (item?.mode === 'email') {
          tempEmail.push(item)
          return setEmailTemplateList(tempEmail)
        } else if (item?.mode === 'sms') {
          tempSms.push(item)
          return setSmsTemplateList(tempSms)
        }
      })
    }
  }, [templateList])

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <AppLayout>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item sx={12} lg={12}>
          <Card>
            <CardTitle className="m-0 text-center">
              <Nav tabs className="card-header-tabs justify-content-center ">
                <NavItem>
                  <a
                    href="#"
                    className={classnames({
                      active: activeFirstTab === "1",
                      "nav-link": true,
                    })}
                  >
                    <span
                      onClick={() => {
                        setActiveFirstTab("1");
                      }}
                    >
                      {" "}
                      Email
                    </span>
                  </a>
                </NavItem>
                <NavItem>
                  <a
                    href="#"
                    className={classNames({
                      active: activeFirstTab === "2",
                      "nav-link": true,
                    })}
                  >
                    <span
                      onClick={() => {
                        setActiveFirstTab("2");
                      }}
                    >
                      {" "}
                      Message
                    </span>
                  </a>
                </NavItem>

              </Nav>
            </CardTitle>
            <CardBody>
              <Box className="mb-4">

                <TabContent activeTab={activeFirstTab} className="pt-2">
                  <TabPane tabId="1">
                    <Box className="relative">
                      <Box
                        className="email-template"
                      >
                        <Box>
                          <Box
                            sx={{
                              display: isEditMail ? "none" : "block",
                              color: "#8f8f8f",
                              fontSize: "14px",
                            }}
                          >
                            <TemplateList
                              fetchTemplateCallback={fetchTemplateCallback}
                              data={emailTemplateList}
                              isLoading={isLoading}
                              setState={setState}
                              setMessage={setMessage}
                              accessToken={session && session.accessToken}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </TabPane>
                  <TabPane tabId="2">
                    <Box className="relative">
                      <Box
                        className="message-template"
                      >
                        <TemplateList
                          fetchTemplateCallback={fetchTemplateCallback}
                          data={smsTemplateList}
                          isLoading={isLoading}
                          setState={setState}
                          setMessage={setMessage}
                          accessToken={session && session.accessToken}
                        />
                      </Box>
                    </Box>
                  </TabPane>

                </TabContent>
              </Box>

            </CardBody>
          </Card>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
          />
        </Grid>
      </Grid>
    </AppLayout>
  );
};

export default Template;
