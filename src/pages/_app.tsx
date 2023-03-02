import { type AppType } from "next/dist/shared/lib/utils";
import { FirebaseAppProvider } from "reactfire";
import { FirebaseProps } from "~/lib/FirebaseProps";
import { firebaseConfig } from "~/lib/firebaseConfig";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProps>
        <Component {...pageProps} />
      </FirebaseProps>
    </FirebaseAppProvider>
  );
};

export default MyApp;
