import React, { useEffect } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";

// Empreinte numérique
export function ProStep2({ step, setNextStep }) {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("get storedValues");
  }, []);

  const onFinish = () => {
    console.log("onFinish");
    const submitButton = document.querySelector('[type="submit"]');
    submitButton.blur();
    setNextStep();
  };

  return (
    <ConfiguredForm
      id={step}
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => console.log("onFinishFailed")}
    >
      ProStep2
    </ConfiguredForm>
  );
}
