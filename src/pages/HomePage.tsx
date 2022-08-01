import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";

import UrlForm from "../components/UrlForm";

export default function HomePage() {
  return (
    <div className="container">
      <Result
        icon={<SmileOutlined style={{ fontSize: "150px" }} />}
        title="Hello In URL Shortener"
        extra={<UrlForm />}
      />
    </div>
  );
}
