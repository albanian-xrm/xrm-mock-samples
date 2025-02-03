export default class Contact {
    public static onLoad(): Promise<void> {
      return Promise.resolve(this.describeParent());
    }
  
    private static async describeParent(): Promise<void> {
      const parentsName = await this.getParentsName();
      return Promise.resolve(Xrm.Page.getAttribute("description").setValue("My parent is called " + parentsName));
    }
  
    private static getParentsName(): Promise<string> {
      const parentId = Xrm.Page.getAttribute("primarycontactid").getValue()[0].id;
  
      return new Promise((resolve, reject) => {
        Xrm.WebApi.retrieveRecord("contact", parentId, "?$select=firstname").then((result) => {
          resolve(result.firstname);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
  