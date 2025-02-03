import sinon from "sinon";
import Contact from "../src/contact";
import { XrmMockGenerator } from "xrm-mock";

describe("Contact", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createString("description");
    XrmMockGenerator.Attribute.createLookup("primarycontactid", {
      entityType: "contact",
      id: "{00000000-0000-0000-0000-000000000001}",
      name: "Bob",
    });
  });

  it("should set description to parent contact's firstname", () => {
    const stub = sinon.stub(Xrm.WebApi, "retrieveRecord").resolves({
      firstname: "Bob",
    });

    return Contact.onLoad().then(() => {
      let description = Xrm.Page.getAttribute("description").getValue();
      expect(description).toBe("My parent is called Bob"); // Pass
    });
  });
});