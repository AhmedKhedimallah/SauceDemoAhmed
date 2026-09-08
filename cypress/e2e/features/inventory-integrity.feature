# language: en
Feature: SauceDemo - Inventory visual integrity (problem_user)
  As a QA engineer
  I want to detect the problem_user visual defect
  So that the broken product images are caught by automation

  # Login is done via API/session (cookie) and cached — no UI login here.
  Background:
    Given I am logged in as "problemUser"
    And I am on the inventory page

  @negative @problemuser
  Scenario: problem_user shows the same broken image for every product
    Then all product images should be identical
