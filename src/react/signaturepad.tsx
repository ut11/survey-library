import * as React from "react";
import { SurveyQuestionElementBase } from "./reactquestion_element";
import { QuestionSignaturePadModel } from "survey-core";
import { ReactQuestionFactory } from "./reactquestion_factory";

export class SurveyQuestionSignaturePad extends SurveyQuestionElementBase {
  constructor(props: any) {
    super(props);
    this.state = { value: this.question.value };
  }
  protected get question(): QuestionSignaturePadModel {
    return this.questionBase as QuestionSignaturePadModel;
  }
  protected renderElement(): JSX.Element {
    var cssClasses = this.question.cssClasses;
    return (
      <div className={cssClasses.root} ref={(root) => (this.control = root)}>
        <div>
          <canvas tabIndex={0}></canvas>
        </div>
        <div className={cssClasses.controls}>
          <button
            type="button"
            className={cssClasses.clearButton}
            title={this.question.clearButtonCaption}
          >
            ✖
          </button>
        </div>
      </div>
    );
  }
}

ReactQuestionFactory.Instance.registerQuestion("signaturepad", (props) => {
  return React.createElement(SurveyQuestionSignaturePad, props);
});
