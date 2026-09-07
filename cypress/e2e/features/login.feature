# language: en
Feature: SauceDemo - Login
  As a user of SauceDemo
  I want to authenticate on the platform
  So that I can access the products inventory

  Background:
    Given I am on the login page

  @smoke @positive
  Scenario: Successful login with a standard user
    When I login with the "standardUser" account
    Then I should be redirected to the inventory page

  @negative
  Scenario: Login blocked for a locked out user
    When I login with the "lockedOutUser" account
    Then I should see the error message "lockedOut"

  @negative
  Scenario: Login rejected with invalid credentials
    When I login with the "invalidUser" account
    Then I should see the error message "invalidCredentials"

  @negative
  Scenario: Login rejected when username is missing
    When I enter the username "" and the password "secret_sauce"
    And I click the login button
    Then I should see the error message "usernameRequired"

  @negative
  Scenario: Login rejected when password is missing
    When I enter the username "standard_user" and the password ""
    And I click the login button
    Then I should see the error message "passwordRequired"

  @negative
  Scenario Outline: Login rejected for multiple invalid combinations
    When I enter the username "<username>" and the password "<password>"
    And I click the login button
    Then I should see the error message "<messageKey>"

    Examples:
      | username      | password     | messageKey          |
      |               | secret_sauce | usernameRequired    |
      | standard_user |              | passwordRequired    |
      | ghost_user    | secret_sauce | invalidCredentials  |
