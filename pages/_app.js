import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Breadcrumb from "../components/Breadcrumb";
import BreadcrumbItem from "../components/BreadcrumbItem";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <>
              <div className="absolute w-full ml-[2px] mt-[205px] hidden md:block">
                <Breadcrumb>
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  {breadcrumbs &&
                    breadcrumbs.map((breadcrumb) => (
                      <BreadcrumbItem
                        key={breadcrumb.href}
                        href={breadcrumb.href}
                      >
                        {breadcrumb.label}
                      </BreadcrumbItem>
                    ))}
                </Breadcrumb>
              </div>
              <Component {...pageProps} />
            </>
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=Login Required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=Admin Login Required");
  }
  return children;
}

export default MyApp;
