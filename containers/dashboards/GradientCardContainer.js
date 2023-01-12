import React from "react";

import GradientCard from "../../components/cards/GradientCard";
import IntlMessages from "../../helpers/IntlMessages";

const GradientCardContainer = () => {
  return (
    <GradientCard>
      <span className="badge badge-pill badge-theme-3 align-self-start mb-3">
        <IntlMessages id="dashboards.gogo" />
      </span>
      <p className="lead text-white">
        <IntlMessages id="dashboards.magic-is-in-the-details" />
      </p>
      <p className="text-white">
        <IntlMessages id="dashboards.yes-it-is-indeed" />
      </p>
    </GradientCard>
  );
};
export default GradientCardContainer;
