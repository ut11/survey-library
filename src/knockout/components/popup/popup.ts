import * as ko from "knockout";
import { PopupBase } from "../../../popup";
import { ImplementorBase } from "../../kobase";
const template = require("html-loader?interpolate!val-loader!./popup.html");

export class PopupModel {
  constructor(
    public contentComponentName: string,
    public contentComponentData: any,
    public verticalPosition: "top" | "bottom" | "middle" = "bottom",
    public horizontalPosition: "left" | "right" | "center" = "left",
    public showPointer: boolean = true,
    public isModal: boolean = false,
    public onCancel = () => {},
    public onApply = () => {},
    public onHide = () => {},
    public onShow = () => {},
    public cssClass: string = ""
  ) {}

  public toggleVisibility() {
    this.onToggleVisibility && this.onToggleVisibility();
  }
  public onToggleVisibility: () => void;
}

export class PopupViewModel extends PopupBase {
  constructor(public model: PopupModel, targetElement: HTMLElement) {
    super(model, targetElement);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.innerHTML = template;

    new ImplementorBase(this);

    ko.applyBindings(this, this.container);
  }

  public dispose() {
    this.model.onToggleVisibility = undefined;
    ko.cleanNode(this.container);
    this.container.remove();
    this.container = undefined;
  }
}

ko.components.register("sv-popup", {
  viewModel: {
    createViewModel: (params: any, componentInfo: any) => {
      const viewModel = new PopupViewModel(
        params.model,
        componentInfo.element.parentElement
      );
      return viewModel;
    },
  },
  template: "<div></div>",
});
