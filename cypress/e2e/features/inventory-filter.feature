# language: en
Feature: SauceDemo - Products sorting / filter
  As a logged in user
  I want to sort the products on the inventory page
  So that I can browse them in the order I prefer

  # Login is done via API/session (cookie) and cached — no UI login here.
  Background:
    Given I am logged in as "standardUser"
    And I am on the inventory page

  @smoke
  Scenario: Default sort is Name (A to Z)
    Then the active sort option should be "Name (A to Z)"
    And the product names should be sorted in "ascending" order

  @filter
  Scenario: Sort products by Name (A to Z)
    When I sort the products by "Name (A to Z)"
    Then the product names should be sorted in "ascending" order

  @filter
  Scenario: Sort products by Name (Z to A)
    When I sort the products by "Name (Z to A)"
    Then the product names should be sorted in "descending" order

  @filter
  Scenario: Sort products by Price (low to high)
    When I sort the products by "Price (low to high)"
    Then the product prices should be sorted in "ascending" order

  @filter
  Scenario: Sort products by Price (high to low)
    When I sort the products by "Price (high to low)"
    Then the product prices should be sorted in "descending" order

    @endtoend
