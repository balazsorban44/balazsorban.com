import * as React from "react"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"

export function useAnalytics() {
  const router = useRouter()

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return
    }

    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      includedDomains: ["balazsorban.com"],
    })

    function handleRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [router.events])
}
