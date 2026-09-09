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
@endtoend @information
Scenario Outline: 2 - Enter invalid information

When I add the cheapest product to the cart
And I open the information
And I enter "<firstName>" as first name, "<lastName>" as last name, and "<postalCode>" as postal code
And I click Continue
Then the "<errorMessage>" error message should be displayed

Examples:
| firstName | lastName | postalCode | errorMessage                    |
| jhon      | kh       | aa         | Error: Postal Code is required  |
|           | kh       | 6000       | Error: First Name is required   |
| rodri     |          | 6000       | Error: Last Name is required    |
