import { useState } from "react";
import { Tooltip } from "reactstrap";

const TooltipItem = ({ id, item, text, placement }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <span>
      {/* <Button className="mr-1 mb-2" color="secondary" id={`tooltip_${id}`}>
        {item.text}
      </Button> */}
      <Tooltip
        placement={placement}
        isOpen={tooltipOpen}
        target={`tooltip_${id}`}
        toggle={() => setTooltipOpen(!tooltipOpen)}
      >
        {text}
      </Tooltip>
    </span>
  );
};
export default TooltipItem;
