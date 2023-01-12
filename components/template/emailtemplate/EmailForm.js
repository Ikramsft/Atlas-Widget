import { useFormik } from "formik";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import * as Yup from "yup";
export const initialValues = {
  id: 1,
  emailTitle: "Get Started",
  emailDescription:
    "Dynamically target high-payoff intellectual capital for customized technologies.Objectively integrate emerging core competencies before process- centric communities.Dramatically evisculate holistic innovation rather than client - centric data.<br /> <br />Progressively maintain extensive infomediaries via extensible niches.Dramatically disseminate standardized metrics after resource - leveling processes.",
  emailVarificationCodeTitle: "Verification Code",
  emailVarificationCode: "148 544 174",
  emailStepToFollowTitle: "Steps to Follow",

  emailStep1: "Preliminary thinking systems",
  emailStep2: "Bandwidth efficient",
  emailStep3: "Green space",
  emailStep4: "Social impact",
  emailCopyRight:
    "ColoredStrategies Inc, 35 Little Russell St. Bloomsburg London,UK",
  emailFooterLink: ["Copyright", "Unsubscribe"],
  buttonText: "Start Now",
  buttonLink: "#",
};

export const validationSchema = Yup.object({
  emailTitle: Yup.string("valid"),
  emailDescription: Yup.string("valid"),
  emailVarificationCodeTitle: Yup.string("valid"),
  emailVarificationCode: Yup.string("valid"),
  emailStepToFollowTitle: Yup.string("valid"),

  emailStep1: Yup.string("valid"),
  emailStep2: Yup.string("valid"),
  emailStep3: Yup.string("valid"),
  emailStep4: Yup.string("valid"),
  emailCopyRight: Yup.string("valid"),
  emailFooterLink: Yup.string("valid"),
  buttonText: Yup.string("valid"),
  buttonLink: Yup.string("valid"),
});

function EmailForm() {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Form className="pt-5">
        <FormGroup className="pb-3 text-center">
          <h6>Edit Email Template</h6>
        </FormGroup>

        <FormGroup>
          <Label>Template Title</Label>
          <Input type="text" name="emailTitle" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Template Description</Label>
          <Input
            type="textarea"
            rows="6"
            name="emailDescription"
            value=" Dynamically target high-payoff intellectual capital for
                    customized technologies. Objectively integrate emerging core
                    competencies before process-centric communities.
                    Dramatically evisculate holistic innovation rather than
                    client-centric data. Progressively maintain extensive
                    infomediaries via extensible niches. Dramatically
                    disseminate standardized metrics after resource-leveling
                    processes."
          />
        </FormGroup>
        <FormGroup>
          <Label>Verification Title</Label>
          <Input
            type="text"
            name="emailVarificationCodeTitle"
            value="get started"
          />
        </FormGroup>
        <FormGroup>
          <Label>Verification Code</Label>
          <Input type="text" name="emailVarificationCode" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Step to follow title</Label>
          <Input
            type="text"
            name="emailStepToFollowTitle"
            value="get started"
          />
        </FormGroup>
        <FormGroup>
          <Label>Step 1</Label>
          <Input type="text" name="emailStep1" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Step 2</Label>
          <Input type="text" name="emailStep2" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Step 3</Label>
          <Input type="text" name="emailStep3" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Step 4</Label>
          <Input type="text" name="emailStep4" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Copy right description</Label>
          <Input type="text" name="emailStep4" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Button Text</Label>
          <Input type="text" name="emailStep4" value="get started" />
        </FormGroup>
        <FormGroup>
          <Label>Button Link</Label>
          <Input type="text" name="emailStep4" value="get started" />
        </FormGroup>
        <Button type="submit">Update</Button>
      </Form>
    </>
  );
}

export default EmailForm;
