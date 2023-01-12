/* eslint-disable no-param-reassign */
import { Snackbar } from "@mui/material";
import BottomNavigation from "components/wizard/BottomNavigation";
import TopNavigation from "components/wizard/TopNavigation";
import { createRef, useEffect, useState } from "react";
import { Step, Steps, Wizard } from "react-albus";
import { injectIntl } from "react-intl";
import { useCreateWidgetMutation, useUpdateWidgetMutation } from "services/widgetApi";
import Cookies from 'universal-cookie';
import { validateSchema } from "./formData";
import InsertCode from "./InsertCode";
import Layout from "./Layout";
import Platform from "./Platform";
import Setup from "./Setup";
const cookies = new Cookies();
const userData = cookies.get('userData')

const CreateWidgetForm = ({ intl, widgetIdData, pid }) => {
	const forms = [
		createRef(null),
		createRef(null),
		createRef(null),
	];
	const [bottomNavHidden, setBottomNavHidden] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedLayout, setSelectedLayout] = useState("badge");
	const [widgetId, setWidgetId] = useState();
	const [companyLocationId, setCompanyLocationId] = useState();
	const [companyId, setCompanyId] = useState();
	const [alert, setAlert] = useState();
	const [state, setState] = useState({
		open: false,
		vertical: "top",
		horizontal: "center",
	});
	const { vertical, horizontal, open } = state;
	useEffect(() => {
		setCompanyLocationId(userData?.user?.companyLocationId)
		setCompanyId(userData?.user?.companyId)
	}, [])
	// { "symbol": "<=5", "value": "5" }
	const [fields, setFields] = useState({
		name: "",
		domain_name: "",
		platform_filter: ["facebook", "googlemaps", "yelp"],
		rating_filter: { "symbol": "<=", value: "5" },
		order_filter: "desc",
	});
	const handleClose = () => {
		setState({ ...state, open: false });
	};
	useEffect(() => {
		if (widgetIdData) {
			const editdata = {
				name: widgetIdData[0]?.name,
				domain_name: widgetIdData[0]?.domain_name,
				details: widgetIdData[0]?.details?.type,
				platform_filter: widgetIdData[0]?.platform_filter?.map((item) => item),
				rating_filter: widgetIdData[0]?.rating_filter,
				order_filter: widgetIdData[0]?.order_filter,
			}
			setFields(editdata)
		}
	}, [widgetIdData])
	const [createWidget] = useCreateWidgetMutation();
	const [updateWidget] = useUpdateWidgetMutation();

	const onClickNext = (goToNext, steps, step) => {
		if (steps.length - 1 <= steps.indexOf(step)) { return; }
		const formIndex = steps.indexOf(step);
		const form = forms[formIndex].current;
		form.submitForm().then(async () => {
			if (!form.isDirty && form.isValid) {
				const newFields = { ...fields, ...form.values };
				setFields(newFields);
				if (steps.length - 2 <= steps.indexOf(step)) {

					setLoading(true);
					setTimeout(() => {
						setLoading(false);
					}, 3000);
				}
				if (formIndex !== 2) {
					goToNext();
				}
				if (formIndex === 3) {
					setBottomNavHidden(true);
				}
				step.isDone = true;
				if (formIndex === 2) {
					const dataModal = {
						"companylocation_id": companyLocationId,
						"name": await newFields.name || fields?.name,
						"domain_name": await newFields.domain_name || fields?.domain_name,
						"details": JSON.stringify({
							"type": selectedLayout,
						}),
						"platform_filter": await JSON.stringify(newFields.platform_filter || fields?.platform_filter),
						"rating_filter": await JSON.stringify(newFields.rating_filter || fields?.rating_filter),
						"order_filter": await newFields.order_filter || fields?.order_filter,
					};

					if (pid) {
						try {
							const result = await updateWidget({ payload: dataModal, id: pid });
							if (result?.data?.result?.success) {
								setWidgetId(result?.data?.result?.data?.widget_id)
								goToNext();
								setState({ ...state, open: true });
								setAlert("Widget Updated!!! go to list to see the changes");

							} else {
								setAlert(result?.error?.data?.error?.message || "Something went wrong, please try again");
								setState({ ...state, open: true });

							}
						} catch (e) { console.log(">>>>: src/pages/widget/create : createWidget -> error", e); }

					} else {
						try {
							const result = await createWidget(dataModal);
							if (result?.data?.result?.success) {
								setWidgetId(result?.data?.result?.data?.widget_id)
								goToNext();
								setState({ ...state, open: true });
								setAlert("Widget Created Successfully");
							} else {
								setAlert(result?.error?.data?.error?.message || "Something went wrong, please try again");
								const alert = await alert;
								setState({ ...state, open: true });
							}
						} catch (e) { console.log(">>>>: src/pages/widget/create : createWidget -> error", e); }
					}
				}
			}
		});
	};

	const onClickPrev = (goToPrev, steps, step) => {
		if (steps.indexOf(step) <= 0) {
			return;
		}
		goToPrev();
	};
	return (
		<div className="wizard wizard-default">
			<Wizard>
				<TopNavigation className="justify-content-center" disableNav />
				<Steps>
					<Step
						id="step1"
						name="Connect Platform"
					// desc={messages["wizard.step-desc-1"]}
					>
						<Platform validateSchema={validateSchema} forms={forms} fields={fields} />
					</Step>
					<Step id="step2" name="Select Layout">
						<Layout setSelectedLayout={setSelectedLayout} selectedLayout={selectedLayout} forms={forms} fields={fields} />
					</Step>
					{/* <Step id="step3" name="Select Style">
						<Style forms={forms} fields={fields} />
					</Step> */}
					<Step id="step3" name="Setup Widget">
						<Setup forms={forms} fields={fields} />
					</Step>
					<Step id="step4" name="Insert Code">
						<InsertCode widgetId={widgetId} companyLocationId={companyLocationId} companyId={companyId} />
					</Step>
				</Steps>
				<BottomNavigation
					onClickNext={onClickNext}
					onClickPrev={onClickPrev}
					className={`justify-content-center ${bottomNavHidden && "invisible"}`}
					prevLabel="Previous"
					nextLabel="Next"
				/>
			</Wizard>
			<div>
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={open}
					onClose={handleClose}
					message={alert}
					key={vertical + horizontal}
				/>
			</div>
		</div>
	);
};
export default injectIntl(CreateWidgetForm);