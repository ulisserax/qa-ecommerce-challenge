import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import CheckoutPage from "../../pages/CheckoutPage";
import HomePage from "../../pages/HomePage";
import ProductDetailsPage from "../../pages/ProductDetailsPage";
import ShoppingCartPage from "../../pages/ShoppingCartPage";
import userData from "../../fixtures/data.json";
import selectRandomProduct from "../../support/utils/selectRandomProduct";

Given("I am on the checkout page", () => {
  HomePage.visit();
  HomePage.clickViewDetailsButton(selectRandomProduct());
  ProductDetailsPage.clickAddToCartButton();
  ShoppingCartPage.proceedToCheckout();
});

When("I enter {string} into the {string} field", (value, field) => {
  switch (field) {
    case "First Name":
      CheckoutPage.filloutFirstName(value);
      break;
    case "Email":
      CheckoutPage.filloutEmail(value);
      break;
    case "Phone":
      CheckoutPage.filloutPhone(value);
      break;
    case "Address":
      CheckoutPage.filloutStreet(value);
      break;
    case "City":
      CheckoutPage.filloutCity(value);
      break;
    case "State":
      CheckoutPage.filloutState(value);
      break;
    case "ZIP Code":
      CheckoutPage.filloutPostalCode(value);
      break;
    case "Country":
      CheckoutPage.filloutCountry(value);
      break;
    default:
      throw new Error(`Unknown field: ${field}`);
  }
});

Then(
  "Then I should see the error {string} for the {string} field",
  (errorMessage, fieldLabel) => {
    CheckoutPage.verifyErrorMessage(fieldLabel, errorMessage);
  }
);

When("I click the {string} button", (buttonName) => {
  CheckoutPage.clickOnBackToCartButton(buttonName);
});

Then("I should be redirected to the Shopping Cart page", () => {
  cy.url().should("include", "/cart");
});

Then(
  "I should see the order summary with {string} and the checkout button {string}",
  (summaryText, buttonName) => {
    CheckoutPage.verifyOrderSummary(summaryText);
    CheckoutPage.verifyCheckoutButton(buttonName);
  }
);

Then(
  "I should see the checkout button {string} and the order summary {string}",
  (buttonName, summaryText) => {
    CheckoutPage.verifyCheckoutButton(buttonName);
    CheckoutPage.verifyOrderSummary(summaryText);
  }
);

When("I fill out the checkout form with valid information", () => {
  CheckoutPage.filloutCheckoutForm(
    userData.firstName,
    userData.email,
    userData.phone,
    userData.address.street,
    userData.address.city,
    userData.address.state,
    userData.address.zipCode,
    userData.country
  );
});

And("I click on the {string} button to pay for the product", (buttonName) => {
  CheckoutPage.clickContinueToPaymentButton(buttonName);
});

Then("I should be redirected to the payment page", () => {
  cy.url().should("include", "/payment");
});
