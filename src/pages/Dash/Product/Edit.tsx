import { useParams } from "react-router-dom";

export function PageDashProductEdit() {
  const params = useParams();
  return <div>Product Edit Page {JSON.stringify(params)}</div>;
}
