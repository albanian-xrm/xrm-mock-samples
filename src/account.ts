export default class Account {
    // Table - in this example, we are working with the Account table
  
    // OnLoad events
    static onLoad(executionContext:Xrm.Events.EventContext) {
      "use strict";
  
      // On Load events - execute toggleSectionVisibility function.
      Account.toggleSectionVisibility(executionContext);
    }
  
    static toggleSectionVisibility(executionContext:Xrm.Events.EventContext) {
      "use strict";
      var formContext = executionContext.getFormContext();
      var toggleValue = formContext.getAttribute("toggleField").getValue();
  
      if (toggleValue === "show") {
        formContext.ui.tabs
          .get("tabName")
          .sections.get("sectionToToggle")
          .setVisible(true);
      } else {
        formContext.ui.tabs
          .get("tabName")
          .sections.get("sectionToToggle")
          .setVisible(false);
      }
    }
  }