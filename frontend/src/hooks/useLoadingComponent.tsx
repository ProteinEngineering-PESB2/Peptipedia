import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import { topbar } from "react-router-loading";

topbar.config({
  autoRun: false,
  barThickness: 5,
  barColors: {
    0: "#2962ff",
    0.3: "#2962ff",
    1.0: "#2962ff",
  },
  shadowBlur: 5,
  className: "topbar",
});

export default function useLoadingComponent() {
  const loadingContext = useLoadingContext();

  const loading = async () => {
    loadingContext.done();
  };

  useEffect(() => {
    loading();
  }, []);

  return {};
}
