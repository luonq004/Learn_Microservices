import "bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <Header {...pageProps} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  try {
    const { data } = await client.get("/api/users/current-user");

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
      pageProps,
      ...data,
    };
  } catch (error) {
    return {
      pageProps: {},
    };
  }
};

export default AppComponent;
