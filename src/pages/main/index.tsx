import { Layout, GNB, AppBar, Wrapper } from "../../components";
import EstimateStauts from "./components/EstimateStatus";
const userType = "user";

export default function Main() {
  return (
    <Layout>
      <AppBar prefix="logo" />
      <Wrapper>
        <EstimateStauts />
      </Wrapper>
      <GNB type={userType} />
    </Layout>
  );
}
