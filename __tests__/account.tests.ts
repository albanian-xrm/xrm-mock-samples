import Account from "../src/account";
import { ItemCollectionMock, XrmMockGenerator } from "xrm-mock";

describe("Account", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();

    // Setup the tab and section
    const isTabVisible = true;
    const tabParent :Xrm.Ui = null;
    const sectionParent :Xrm.Controls.Tab = null;
    const controls  = new ItemCollectionMock<Xrm.Controls.Control>();
    const sections = new ItemCollectionMock([
      XrmMockGenerator.Section.createSection(
        "sectionToToggle",
        "Section Label",
        true,
        sectionParent,
        controls
      ),
    ]);

    const tab = XrmMockGenerator.Tab.createTab(
      "tabName",
      "Tab Label",
      isTabVisible,
      "expanded",
      tabParent,
      sections
    );
  });

  it("show a section when a the toggle value is 'show'", () => {
    const controlAttribute = XrmMockGenerator.Attribute.createString({
      name: "toggleField",
      value: "show",
    });

    const context = XrmMockGenerator.getEventContext();
    Account.onLoad(context);

    // Verify if sections are visible or not
    const formContext = context.getFormContext();
    const section = formContext.ui.tabs
      .get("tabName")
      .sections.get("sectionToToggle");

    expect(section.getVisible()).toBe(true);
  });

  it("hide a section when a the toggle value is not 'show'", () => {
    const controlAttribute = XrmMockGenerator.Attribute.createString({
      name: "toggleField",
      value: "don't show",
    });

    const context = XrmMockGenerator.getEventContext();
    Account.onLoad(context);

    // Verify if sections are visible or not
    const formContext = context.getFormContext();
    const section = formContext.ui.tabs
      .get("tabName")
      .sections.get("sectionToToggle");

    expect(section.getVisible()).toBe(false);
  });
});