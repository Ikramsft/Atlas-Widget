import Footer from "containers/navs/Footer";
import Sidebar from "containers/navs/Sidebar";
import TopNav from "containers/navs/Topnav";
import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter, withRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
const AppLayout = ({ containerClassnames, children, history }) => {

  const { data: session, loading, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    // eslint-why will cause unnecessary re renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session]);
  if (session) {

    return (
      <>

        <div id="app-container" className={containerClassnames}>
          <TopNav history={history} session={session} />
          <Sidebar />
          <main>
            <div className="container-fluid">{children}</div>
          </main>
          <Footer />
        </div>
      </>
    );
  } else if (status === "loading") {
    return <div id="app-container" className={containerClassnames}><div className="loading"></div></div >
  }


};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};
export async function getServerSideProps(context) {
  const csrfToken = (await getCsrfToken(context)) || null;
  return requireAuthentication(context, ({ session }) => {
    return {
      props: { session, csrfToken },
    };
  });
}

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
