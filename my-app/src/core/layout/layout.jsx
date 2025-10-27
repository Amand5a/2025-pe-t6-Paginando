
import { Header } from "../../components/ui/Header";
import { Sidebar } from "../../components/ui/Sidebar";
import Footer from "../../components/ui/footer";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
