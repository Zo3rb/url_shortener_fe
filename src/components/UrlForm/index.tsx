import { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";

export default function UrlForm() {
  const [shortLink, setShortLink] = useState<string>("");

  const onFinish = async (values: any) => {
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL!, {
        destination: values.destination,
      });
      setShortLink(
        `${process.env.REACT_APP_BACKEND_URL}/${res.data.data.newShortUrl.shortId}`
      );
    } catch (error: any) {
      message.error(error.response.data[0]["message"]);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Please Add a Valid Link in The Input Area and Hit Generate");
  };

  return (
    <>
      <p>It's Easy, Just Add Your Link in The Input And Press Generate.</p>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Link"
          name="destination"
          rules={[{ required: true, message: "Please input your Link!" }]}
        >
          <Input />
        </Form.Item>

        <button
          type="submit"
          style={{
            backgroundColor: "blue",
            border: "1px solid #000",
            color: "#fff",
            padding: "5px 20px",
            marginTop: "15px",
          }}
        >
          Generate
        </button>
      </Form>

      {shortLink && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            minHeight: "30px",
          }}
        >
          <textarea
            value={shortLink}
            disabled
            style={{
              resize: "none",
              minWidth: "50%",
            }}
          ></textarea>
          <button
            onClick={() => navigator.clipboard.writeText(shortLink)}
            style={{ cursor: "pointer" }}
          >
            Copy
          </button>
        </div>
      )}
    </>
  );
}
