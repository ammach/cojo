import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { scrollToTopOfThePage } from "@hooks/window";
import { Form as ConfiguredForm } from "@components/form/Form";
import { ReactComponent as TeaSvg } from "@components/form/formSlider/tea.svg";
import { ReactComponent as CapsuleSvg } from "@components/form/formSlider/capsule.svg";
import { ReactComponent as CoffeeSvg } from "@components/form/formSlider/coffee.svg";
import { FormSlider } from "@components/form/formSlider/FormSlider";
import { MealsOfWeek } from "@components/form/mealsOfWeek/MealsOfWeek";
import { proStep3State, proStep3ActionReductionState } from "./ProStep3State";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import {
  REPAS_QUESTION1,
  REPAS_QUESTION1_ERROR_MSG,
  SAVIER_VOUS_RESTAU,
  REPAS_QUESTION1_INFO,
  CURSEUR_BOISSONS,
} from "@utils/constants";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import {
  question1_subQuestions,
  actionReductionDataDejeuners,
  curseurQuestion,
  actionReductionDataCafe,
} from "./ProStep3Config";

// Restauration
export function ProStep3({ step, setNextStep }) {
  const [form] = Form.useForm();

  const mealBetail = "5f55500f273e7";
  const mealPoulet = "5f5550293a164";
  const actionBetail = "5f60a03929c5e";
  const actionPoulet = "5f60a04cb2a94";

  const [render, setRender] = useState(0);
  const [switch1Value, setSwitch1Value] = useState(false);
  const [switch2Value, setSwitch2Value] = useState(false);
  const [slider1Value, setSlider1Value] = useState(0);
  const [slider2Value, setSlider2Value] = useState(0);
  const [slider3Value, setSlider3Value] = useState(0);
  const [question1State, setQuestion1State] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  });

  const getValueLessThanQuestionValue = (options, questionValue) => {
    return options.reverse().find(({ value }) => value <= questionValue).value;
  };

  const handleSwitch1Change = (isChecked) => {
    setSwitch1Value(isChecked);
  };

  const handleSwitch2Change = (isChecked) => {
    setSwitch2Value(isChecked);
  };

  useEffect(() => {
    scrollToTopOfThePage();
    const setReponsesOfStep = (stepState) => {
      stepState.forEach(({ question, response, actions }) => {
        form.setFieldsValue({
          [question]: response,
        });
        if (actions) {
          actions.forEach(({ id, response }) => {
            form.setFieldsValue({
              [id]: response,
            });
          });
        }
      });
      setQuestion1State(form.getFieldValue("repas_question1"));
      setSlider1Value(form.getFieldValue("5f5550724626b"));
      setSlider2Value(form.getFieldValue("5f55508b92e6c"));
      setSlider3Value(form.getFieldValue("5f5550b00730d"));

      let nbrBetail = 0;
      let nbrPoulet = 0;

      ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach(
        async (day) => {
          if (form.getFieldValue("repas_question1")[day] === mealBetail) {
            nbrBetail++;
          } else if (
            form.getFieldValue("repas_question1")[day] === mealPoulet
          ) {
            nbrPoulet++;
          }
        }
      );

      for (let i = 1; i <= nbrBetail; i++) {
        actionReductionDataDejeuners[0].options.push({
          text: `${i}`,
          value: i,
        });
      }

      for (let i = 1; i <= nbrPoulet; i++) {
        actionReductionDataDejeuners[1].options.push({
          text: `${i}`,
          value: i,
        });
      }
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) => {
        form.setFieldsValue({
          [question]: response,
        });
      });
      setSwitch1Value(form.getFieldValue("restauration-switch-1"));
      setSwitch2Value(form.getFieldValue("restauration-switch-2"));
    };

    const stepState = getResponsesOfQuestionsOfStep(step);
    if (stepState) {
      setReponsesOfStep(stepState);
    }
    const settingsOfStep = getSettingsOfStep(step);
    if (settingsOfStep) {
      setSettingsOfStep(settingsOfStep);
    }
  }, [form, step]);

  const onFinish = (values) => {
    saveResponsesOfQuestionsStep(proStep3State(values), step);
    saveSettingsStep(proStep3ActionReductionState(values), step);
    const submitButton = document.querySelector('[type="submit"]');
    submitButton.blur();
    setNextStep();
  };

  const onFieldsChange = () => {
    setRender(Math.random);
  };

  const onChangeMealsOfWeek = (data) => {
    let nbrBetail = 0;
    let nbrPoulet = 0;

    ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach(
      async (day) => {
        if (data[day] === mealBetail) {
          nbrBetail++;
        } else if (data[day] === mealPoulet) {
          nbrPoulet++;
        }
      }
    );

    actionReductionDataDejeuners[0].options = [{ text: "0", value: 0 }];
    actionReductionDataDejeuners[1].options = [{ text: "0", value: 0 }];

    for (let i = 1; i <= nbrBetail; i++) {
      actionReductionDataDejeuners[0].options.push({ text: `${i}`, value: i });
    }

    for (let i = 1; i <= nbrPoulet; i++) {
      actionReductionDataDejeuners[1].options.push({ text: `${i}`, value: i });
    }

    if (data.monday) {
      if (nbrBetail < form.getFieldValue(actionBetail)) {
        const value = getValueLessThanQuestionValue(
          actionReductionDataDejeuners[0].options,
          nbrBetail
        );
        form.setFieldsValue({
          [actionBetail]: value,
        });
      }

      if (nbrPoulet < form.getFieldValue(actionPoulet)) {
        const value = getValueLessThanQuestionValue(
          actionReductionDataDejeuners[1].options,
          nbrPoulet
        );
        form.setFieldsValue({
          [actionPoulet]: value,
        });
      }
    }
  };

  return (
    <ConfiguredForm
      id={step}
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => console.log("onFinishFailed")}
      onFieldsChange={onFieldsChange}
    >
      <div className="wizard-content-right-form-parent">
        <div className="pro-step-title-container">
          <span className="pro-step-title">
            Restauration aux heures de bureaux
          </span>
        </div>

        <MealsOfWeek
          form={form}
          name="repas_question1"
          questions={question1_subQuestions}
          label={REPAS_QUESTION1}
          tooltipTitle={REPAS_QUESTION1_INFO}
          errorMsg={REPAS_QUESTION1_ERROR_MSG}
          state={question1State}
          onChange={onChangeMealsOfWeek}
        />
      </div>

      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          savierVous={SAVIER_VOUS_RESTAU}
          saviezVousPosition={-1}
          selectDetail={actionReductionDataDejeuners}
          switchName="restauration-switch-1"
          setSwitchValue={handleSwitch1Change}
          isOpened={switch1Value}
        />
      </div>

      <div className="wizard-content-right-form-parent">
        <div className="forms-margin boissons-chaudes">
          <FormSlider
            form={form}
            labels={CURSEUR_BOISSONS}
            questions={[
              curseurQuestion(
                "Café en capsule",
                "5f5550724626b",
                <CapsuleSvg />,
                slider1Value,
                setSlider1Value
              ),
              curseurQuestion(
                "Café en vrac",
                "5f55508b92e6c",
                <CoffeeSvg />,
                slider2Value,
                setSlider2Value
              ),
              curseurQuestion(
                "Thé",
                "5f5550b00730d",
                <TeaSvg />,
                slider3Value,
                setSlider3Value
              ),
            ]}
          />
        </div>
      </div>

      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          savierVous={SAVIER_VOUS_RESTAU}
          saviezVousPosition={0}
          selectDetail={actionReductionDataCafe}
          switchName="restauration-switch-2"
          setSwitchValue={handleSwitch2Change}
          isOpened={switch2Value}
          render={render}
        />
      </div>
    </ConfiguredForm>
  );
}
