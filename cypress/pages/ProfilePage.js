class ProfilePage {
  elements = {
    profilePicture: () => cy.get('[data-testid="profile-picture"]'),
    userName: () => cy.get('[data-testid="profile-name"]'),
    userNameInput: () => cy.get('[data-testid="profile-name-input"]'),
    userEmail: () => cy.get('[data-testid="profile-email"]'),
    userEmailInput: () => cy.get('[data-testid="profile-email-input"]'),
    editMainPageButton: () => cy.get('[data-testid="nav-to-profile"]'),
    backToHomeButton: () => cy.get('[data-testid="back-to-home"]'),
    editProfileButton: () => cy.get('[data-testid="edit-profile"]'),
    pageSection: (title) => cy.contains("h2", title),
    emptyOrderList: () => cy.get('[data-testid="no-orders"]'),
  };

  visit() {
    cy.visit("/profile");
    cy.url().should("include", "/profile");
  }

  verifyProfilePicture() {
    this.elements.profilePicture().should("be.visible");
  }

  verifyUserName(name) {
    this.elements.userName().should("contain.text", name);
  }

  verifyUserEmail(email) {
    this.elements.userEmail().should("contain.text", email);
  }

  clickEditMainPageButton() {
    this.elements.editMainPageButton().click();
  }

  clickBackToHomeButton() {
    this.elements.backToHomeButton().click();
  }

  clickEditProfileButton() {
    this.elements.editProfileButton().click();
    this.elements.userNameInput().should("be.visible");
  }

  changeUserName(newName) {
    this.elements.userNameInput().clear().type(newName);
  }

  changeUserEmail(newEmail) {
    this.elements.userEmailInput().clear().type(newEmail);
  }

  redirectToHomePage() {
    cy.url().should("include", "/");
  }

  seeSectionTitle(title) {
    this.elements.pageSection(title).should("be.visible");
  }

  seeEmptyOrderList() {
    this.elements.emptyOrderList().should("be.visible");
  }
}

export default new ProfilePage();
