Feature: Checkout Page

    Navigate through the checkout process, ensuring all fields are validated and the user can successfully complete their purchase.

Background: User is on the checkout page after adding items to the cart
    Given I am on the checkout page

Scenario: Fill out checkout form
    
    When I fill out the checkout form with valid information
    And I click on the "Continue to Payment" button to pay for the product
    Then I should be redirected to the payment page

Scenario Outline: Invalid fields

    When I enter "<value>" into the "<field>" field
    Then Then I should see the error "<errorMessage>" for the "<field>" field

    Examples:
      | field      | value       | errorMessage                                          |
      | First Name | A           | Name must be 2-30 characters and contain only letters |
      | Email      | 123         | Please enter a valid email address                   |
      | Phone      | abc         | Phone number must be 10-15 digits                    |
      | Address    | 12          | Street address must be at least 5 characters         |
      | City       | 456         | City must contain only letters and spaces            |
      | ZIP Code   | abcde       | ZIP code must be 4 or 5 digits                       |


Scenario: Return to cart from the checkout page
  
  When I click the "Back to Cart" button
  Then I should be redirected to the Shopping Cart page

