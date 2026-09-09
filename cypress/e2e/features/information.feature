# language: en
Feature: SauceDemo - Information
  As a logged in user
  I want to add my information for payement

  # Login is done via API/session (cookie) and cached — no UI login here.
  Background:
    Given I am logged in as "standardUser"
    And I am on the information page

  @endtoend @information
 **Scenario: 1 - Enter valid information**
When I add the cheapest product to the cart
When I open the information
When the user enters valid information and clicks Continue
Then the user should be redirected to the Overview page
Then the selected product should be listed in the cart
Then the Finish button should be displayed
```
