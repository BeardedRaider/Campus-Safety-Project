import Layout from "./components/Layout";
import PageContainer from "./components/PageContainer";

export default function App() {
  return (
    <Layout>
      <div className="safe-top safe-bottom">
        <PageContainer>
          <div className="text-center text-xl">Safe Area Test</div>
        </PageContainer>
      </div>
    </Layout>
  );
}
