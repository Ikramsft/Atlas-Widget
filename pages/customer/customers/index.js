import { Colxx, Separator } from "components/common/CustomBootstrap";
import AddCustomerPopup from "components/customer/AddCustomerPopup";
import LeftSide from "components/customer/leftside";
import RightSide from "components/customer/rightside";
import AppLayout from "layout/AppLayout";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { Button, Row } from "reactstrap";

import {
  useGetCustomerDetailsMutation,
  useGetCustomerListMutation
} from "services/customerApi";
import Cookies from "universal-cookie";

const searchPath = `https://apib.getatlas.us/v1.0/customers`;

function Customer({ intl, match }) {
  const { data: session, loading, status } = useSession();

  const [getCustomerList] = useGetCustomerListMutation();
  const [getCustomerDetails] = useGetCustomerDetailsMutation();
  const cookies = useMemo(() => new Cookies(), []);
  const [customerDetails, setcustomerDetails] = useState();
  const [isSelected, setIsSelected] = useState();
  const [viewAddCustomer, setViewAddCustomer] = useState(false);

  const handleCustomerDetails = async (id) => {
    setIsSelected(id);
    try {
      const result = await getCustomerDetails({ id, accessToken: session && session?.accessToken });
      if (result?.data?.result?.success) {
        setcustomerDetails(result?.data?.result?.data?.customers);
      }
    } catch (e) {
      console.log(">>>>: src/pages/customer : getcustomerDetails -> error", e);
    }
  };

  return (
    <AppLayout>
      <div>
        <Row className="align-items-center justify-content-between">
          <Colxx xxs="12" sm="3">
            <h1 className="mt-2">Customer</h1>
          </Colxx>
          <Colxx xxs="12" sm="3">
            <Button
              type="button"
              className=""

              onClick={() => setViewAddCustomer(true)}

            >
              {/* {" "} */}
              <p className="m-0"><i className="simple-icon-user-follow" ></i> Add Customer</p>
            </Button>
          </Colxx>

        </Row>
        <Separator className="mb-5" />
        <Row>
          <Colxx xxs="12" lg="4">
            <LeftSide
              handleCustomerDetails={handleCustomerDetails}
              isSelected={isSelected}
            />
          </Colxx>
          <Colxx xxs="12" lg="8"  >
            {isSelected ? (
              <RightSide
                customerDetails={customerDetails}
                isSelected={isSelected}

              />
            ) : (<div className="d-flex align-items-center justify-content-center h-full">

              <h3 className="text-center text-muted " >Select Customer to see details</h3>
            </div>
            )}
          </Colxx>
        </Row>
        <AddCustomerPopup setView={setViewAddCustomer} view={viewAddCustomer} />
      </div>
    </AppLayout>
  );
}

export default Customer;
