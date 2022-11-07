import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

export default function NoMatch() {
  const history = useHistory();

  const handleBackHome = () => {
    history.push("/home");
  };

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            返回首页
          </Button>
        }
      />
    </div>
  );
}
